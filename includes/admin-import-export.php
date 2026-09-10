<?php
/**
 * The Import / Export screen.
 *
 * Under Testimonials, because that is where someone stands when they realise
 * their testimonials are still in another plugin.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Import_Export_Page' ) ) {

class BPBTB_Import_Export_Page {

	const PAGE_SLUG = 'bpbtb-import-export';
	const NONCE     = 'bpbtb_import_export';

	/**
	 * Largest CSV accepted, in bytes.
	 *
	 * A testimonial export is measured in kilobytes. Anything past this is not
	 * a testimonial file, and parsing it would only tie up the request.
	 */
	const MAX_CSV_BYTES = 5242880; // 5 MB.

	/**
	 * Hook up.
	 */
	public static function init() {
		add_action( 'admin_menu', [ __CLASS__, 'add_page' ] );
		add_action( 'admin_init', [ __CLASS__, 'handle_export' ] );
		add_action( 'admin_post_bpbtb_run_import', [ __CLASS__, 'handle_import' ] );
		add_action( 'admin_post_bpbtb_import_csv', [ __CLASS__, 'handle_csv_upload' ] );
	}

	/**
	 * Register the submenu page.
	 */
	public static function add_page() {
		add_submenu_page(
			'edit.php?post_type=testimonial',
			__( 'Import / Export', 'b-testimonials-block' ),
			__( 'Import / Export', 'b-testimonials-block' ),
			'manage_options',
			self::PAGE_SLUG,
			[ __CLASS__, 'render' ]
		);
	}

	/**
	 * This screen's URL, optionally carrying a result to report.
	 *
	 * @param array $args Query args.
	 * @return string
	 */
	private static function url( $args = [] ) {
		return add_query_arg(
			array_merge(
				[
					'post_type' => 'testimonial',
					'page'      => self::PAGE_SLUG,
				],
				$args
			),
			admin_url( 'edit.php' )
		);
	}

	/**
	 * Guard shared by every action on this screen.
	 */
	private static function require_permission() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to import or export testimonials.', 'b-testimonials-block' ), '', [ 'response' => 403 ] );
		}

		check_admin_referer( self::NONCE );
	}

	/**
	 * Import from one of the detected plugins.
	 */
	public static function handle_import() {
		self::require_permission();

		$slug    = isset( $_POST['source'] ) ? sanitize_key( wp_unslash( $_POST['source'] ) ) : '';
		$sources = BPBTB_Import_Sources::all();

		if ( ! isset( $sources[ $slug ] ) ) {
			wp_safe_redirect( self::url( [ 'bpbtb_error' => 'unknown-source' ] ) );
			exit;
		}

		$result = BPBTB_Import_Sources::import( $slug );

		wp_safe_redirect(
			self::url(
				[
					'bpbtb_done'     => 'import',
					'bpbtb_source'   => $slug,
					'bpbtb_imported' => (int) $result['imported'],
					'bpbtb_skipped'  => (int) $result['skipped'],
				]
			)
		);
		exit;
	}

	/**
	 * Import an uploaded CSV.
	 */
	public static function handle_csv_upload() {
		self::require_permission();

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- $_FILES, validated below.
		$file = isset( $_FILES['bpbtb_csv'] ) ? $_FILES['bpbtb_csv'] : null;

		if ( ! $file || ! isset( $file['tmp_name'] ) || ! is_uploaded_file( $file['tmp_name'] ) ) {
			wp_safe_redirect( self::url( [ 'bpbtb_error' => 'no-file' ] ) );
			exit;
		}

		if ( (int) ( $file['size'] ?? 0 ) > self::MAX_CSV_BYTES ) {
			wp_safe_redirect( self::url( [ 'bpbtb_error' => 'too-big' ] ) );
			exit;
		}

		/*
		 * The extension and the sniffed type must both agree this is text. An
		 * upload named .csv is not evidence of anything on its own, and this
		 * file is about to be parsed and turned into published posts.
		 */
		$check = wp_check_filetype_and_ext(
			$file['tmp_name'],
			(string) ( $file['name'] ?? '' ),
			[
				'csv' => 'text/csv',
				'txt' => 'text/plain',
			]
		);

		if ( empty( $check['ext'] ) || ! in_array( $check['ext'], [ 'csv', 'txt' ], true ) ) {
			wp_safe_redirect( self::url( [ 'bpbtb_error' => 'not-csv' ] ) );
			exit;
		}

		$rows   = [];
		$handle = fopen( $file['tmp_name'], 'r' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- an uploaded temp file, read line by line rather than held in memory.

		if ( ! $handle ) {
			wp_safe_redirect( self::url( [ 'bpbtb_error' => 'unreadable' ] ) );
			exit;
		}

		while ( false !== ( $cells = fgetcsv( $handle, 0, ',' ) ) ) {
			// fgetcsv gives [ null ] for a blank line.
			if ( [ null ] === $cells ) {
				continue;
			}

			$rows[] = $cells;
		}

		fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose

		$result = BPBTB_Import_Sources::import_csv_rows( $rows );

		if ( ! empty( $result['error'] ) ) {
			wp_safe_redirect(
				self::url(
					[
						'bpbtb_error'   => 'csv',
						'bpbtb_message' => rawurlencode( $result['error'] ),
					]
				)
			);
			exit;
		}

		wp_safe_redirect(
			self::url(
				[
					'bpbtb_done'     => 'csv',
					'bpbtb_imported' => (int) $result['imported'],
					'bpbtb_skipped'  => (int) $result['skipped'],
				]
			)
		);
		exit;
	}

	/**
	 * Stream every testimonial out as a CSV download.
	 *
	 * On admin_init rather than admin_post so that the nonce and the screen are
	 * the same ones the rest of this page uses, and so nothing has been printed
	 * before the headers go out.
	 */
	public static function handle_export() {
		if ( ! isset( $_GET['bpbtb_export'] ) || 'csv' !== $_GET['bpbtb_export'] ) {
			return;
		}

		self::require_permission();

		$rows = BPBTB_Import_Sources::export_rows();

		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=testimonials-' . gmdate( 'Y-m-d' ) . '.csv' );

		$out = fopen( 'php://output', 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- streaming a download.

		// A BOM, so Excel opens accented names and non-Latin scripts correctly
		// instead of as mojibake. Every other reader ignores it.
		echo "\xEF\xBB\xBF";

		foreach ( $rows as $row ) {
			fputcsv( $out, $row );
		}

		fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
		exit;
	}

	/**
	 * Report the outcome of the last action.
	 */
	private static function render_notices() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only display of our own redirect args.
		$done  = isset( $_GET['bpbtb_done'] ) ? sanitize_key( wp_unslash( $_GET['bpbtb_done'] ) ) : '';
		$error = isset( $_GET['bpbtb_error'] ) ? sanitize_key( wp_unslash( $_GET['bpbtb_error'] ) ) : '';

		if ( 'endpoint' === $done ) {
			printf(
				'<div class="notice notice-success is-dismissible"><p>%s</p></div>',
				esc_html__( 'Endpoint saved, and Google was read again with it.', 'b-testimonials-block' )
			);
		}

		if ( 'refreshed' === $done ) {
			printf(
				'<div class="notice notice-success is-dismissible"><p>%s</p></div>',
				esc_html__( 'Fetched again from the platform.', 'b-testimonials-block' )
			);

			return;
		}

		if ( $done ) {
			$imported = isset( $_GET['bpbtb_imported'] ) ? absint( $_GET['bpbtb_imported'] ) : 0;
			$skipped  = isset( $_GET['bpbtb_skipped'] ) ? absint( $_GET['bpbtb_skipped'] ) : 0;

			$message = sprintf(
				/* translators: %s: number of testimonials imported. */
				_n( '%s testimonial imported.', '%s testimonials imported.', $imported, 'b-testimonials-block' ),
				number_format_i18n( $imported )
			);

			if ( $skipped ) {
				$message .= ' ' . sprintf(
					/* translators: %s: number of rows skipped. */
					_n( '%s was already here and was left alone.', '%s were already here and were left alone.', $skipped, 'b-testimonials-block' ),
					number_format_i18n( $skipped )
				);
			}

			if ( ! $imported && ! $skipped ) {
				$message = __( 'Nothing to import — no usable rows were found.', 'b-testimonials-block' );
			}

			printf(
				'<div class="notice notice-success is-dismissible"><p>%s</p></div>',
				esc_html( $message )
			);
		}

		if ( $error ) {
			$messages = [
				'unknown-source' => __( 'That import source is not available.', 'b-testimonials-block' ),
				'no-file'        => __( 'Choose a CSV file first.', 'b-testimonials-block' ),
				'too-big'        => __( 'That file is larger than 5 MB. Split it and try again.', 'b-testimonials-block' ),
				'not-csv'        => __( 'That does not look like a CSV file.', 'b-testimonials-block' ),
				'unreadable'     => __( 'That file could not be read.', 'b-testimonials-block' ),
			];

			$message = isset( $messages[ $error ] )
				? $messages[ $error ]
				: ( isset( $_GET['bpbtb_message'] ) ? sanitize_text_field( wp_unslash( rawurldecode( (string) $_GET['bpbtb_message'] ) ) ) : __( 'Something went wrong.', 'b-testimonials-block' ) );

			printf(
				'<div class="notice notice-error is-dismissible"><p>%s</p></div>',
				esc_html( $message )
			);
		}
		// phpcs:enable WordPress.Security.NonceVerification.Recommended
	}

	/**
	 * Render the screen.
	 */
	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$survey = BPBTB_Import_Sources::survey();
		?>
		<div class="bpbtb-admin-page">

			<?php BPBTB_Admin_Menu::render_header(); ?>

			<div class="bpbtb-admin-main">
				<div class="bpbtb-admin-wrap">

					<?php
					/*
					 * Inside the wrapper, like the other styled pages: the
					 * stylesheet hides the notices core prints above the canvas,
					 * so a notice left outside would not show at all.
					 */
					self::render_notices();
					?>

					<header class="bpbtb-hero">
						<h1><?php esc_html_e( 'Import / Export Testimonials', 'b-testimonials-block' ); ?></h1>
					</header>

			<h2><?php esc_html_e( 'Import from another plugin', 'b-testimonials-block' ); ?></h2>

			<?php if ( empty( $survey ) ) : ?>
				<p>
					<?php esc_html_e( 'No testimonials from another plugin were found on this site. Strong Testimonials, Real Testimonials, Site Reviews and WooCommerce product reviews are detected automatically — including when the other plugin has been deactivated.', 'b-testimonials-block' ); ?>
				</p>
			<?php else : ?>
				<p>
					<?php esc_html_e( 'Nothing is changed or removed in the other plugin. You can run an import again later to pick up anything added since — testimonials already imported are left alone rather than duplicated.', 'b-testimonials-block' ); ?>
				</p>

				<table class="widefat striped" style="max-width:820px;">
					<thead>
						<tr>
							<th><?php esc_html_e( 'Source', 'b-testimonials-block' ); ?></th>
							<th><?php esc_html_e( 'Found', 'b-testimonials-block' ); ?></th>
							<th><?php esc_html_e( 'Already imported', 'b-testimonials-block' ); ?></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					<?php foreach ( $survey as $slug => $row ) : ?>
						<tr>
							<td><strong><?php echo esc_html( $row['label'] ); ?></strong></td>
							<td><?php echo esc_html( number_format_i18n( $row['available'] ) ); ?></td>
							<td><?php echo esc_html( number_format_i18n( $row['imported'] ) ); ?></td>
							<td>
								<?php if ( class_exists( 'BPBTB_Review_Import' ) && isset( BPBTB_Review_Import::platforms()[ $slug ] ) ) : ?>
									<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="display:inline;">
										<?php wp_nonce_field( self::NONCE ); ?>
										<input type="hidden" name="action" value="bpbtb_refresh_reviews" />
										<input type="hidden" name="platform" value="<?php echo esc_attr( $slug ); ?>" />
										<button type="submit" class="button" title="<?php esc_attr_e( 'Fetch again from the platform instead of using the cached copy.', 'b-testimonials-block' ); ?>">
											<?php esc_html_e( 'Refresh', 'b-testimonials-block' ); ?>
										</button>
									</form>
								<?php endif; ?>
								<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="display:inline;">
									<?php wp_nonce_field( self::NONCE ); ?>
									<input type="hidden" name="action" value="bpbtb_run_import" />
									<input type="hidden" name="source" value="<?php echo esc_attr( $slug ); ?>" />
									<button type="submit" class="button button-primary">
										<?php
										echo esc_html(
											$row['imported'] >= $row['available']
												? __( 'Check for new', 'b-testimonials-block' )
												: __( 'Import', 'b-testimonials-block' )
										);
										?>
									</button>
								</form>
							</td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
			<?php endif; ?>

			<?php if ( class_exists( 'BPBTB_Review_Import' ) ) : ?>
				<h2><?php esc_html_e( 'Import from Google and Facebook', 'b-testimonials-block' ); ?></h2>
				<table class="widefat striped" style="max-width:820px;">
					<tbody>
					<?php foreach ( BPBTB_Review_Import::platforms() as $bpbtb_slug => $bpbtb_label ) : ?>
						<?php
						$bpbtb_ready = BPBTB_Review_Import::is_connected( $bpbtb_slug );
						$bpbtb_error = BPBTB_Review_Import::remember_error( $bpbtb_slug );
						?>
						<tr>
							<td style="width:220px;"><strong><?php echo esc_html( $bpbtb_label ); ?></strong></td>
							<td>
								<?php if ( ! $bpbtb_ready ) : ?>
									<?php esc_html_e( 'Not connected.', 'b-testimonials-block' ); ?>
									<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-review-sources' ) ); ?>">
										<?php esc_html_e( 'Add your credentials on the Review Sources screen', 'b-testimonials-block' ); ?>
									</a>
									<?php esc_html_e( '— the same ones the rating badges use.', 'b-testimonials-block' ); ?>
								<?php elseif ( $bpbtb_error ) : ?>
									<span style="color:#b32d2e;"><?php echo esc_html( $bpbtb_error ); ?></span>
								<?php else : ?>
									<?php esc_html_e( 'Connected. Reviews appear in the table above when there are any to import.', 'b-testimonials-block' ); ?>
								<?php endif; ?>
							</td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
				<?php
				$bpbtb_mode   = BPBTB_Review_Import::endpoint_mode();
				$bpbtb_report = BPBTB_Review_Import::endpoint_report();
				$bpbtb_tone   = [ 'good' => '#1e7e34', 'warn' => '#8a6d3b', 'bad' => '#b32d2e' ];
				?>
				<h3 style="margin-top:1.5em;"><?php esc_html_e( 'Which Google endpoint to read', 'b-testimonials-block' ); ?></h3>
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="max-width:820px;">
					<?php wp_nonce_field( 'bpbtb_import_export' ); ?>
					<input type="hidden" name="action" value="bpbtb_google_endpoint" />
					<p>
						<select name="endpoint" style="max-width:100%;">
							<?php foreach ( BPBTB_Review_Import::endpoint_modes() as $bpbtb_value => $bpbtb_label ) : ?>
								<option value="<?php echo esc_attr( $bpbtb_value ); ?>" <?php selected( $bpbtb_mode, $bpbtb_value ); ?>>
									<?php echo esc_html( $bpbtb_label ); ?>
								</option>
							<?php endforeach; ?>
						</select>
						<button type="submit" class="button"><?php esc_html_e( 'Save and read again', 'b-testimonials-block' ); ?></button>
					</p>
				</form>
				<?php if ( '' !== $bpbtb_report['text'] ) : ?>
					<p style="max-width:820px;color:<?php echo esc_attr( $bpbtb_tone[ $bpbtb_report['tone'] ] ); ?>;">
						<strong><?php esc_html_e( 'Last read:', 'b-testimonials-block' ); ?></strong>
						<?php echo esc_html( $bpbtb_report['text'] ); ?>
					</p>
				<?php endif; ?>
				<p class="description" style="max-width:820px;">
					<?php
					esc_html_e(
						'Google has two Place Details endpoints. The legacy one still works for Cloud projects that already had it switched on, but it was frozen on 1 March 2025 and cannot be enabled on a project created since — so a key made today only gets Places API (New). Automatic tries the old one first and falls back, which is the safe setting for a site being handed to someone else. Either way the imported reviews are identical, and switching between them re-imports nothing.',
						'b-testimonials-block'
					);
					?>
				</p>

				<p class="description" style="max-width:820px;">
					<?php
					esc_html_e(
						'Google returns at most five reviews per listing. That is a Google limit rather than a plugin one — Place Details has no pagination, and no API key raises it. Facebook returns recommendations for a Page you administer; those with no written text are skipped, because a bare thumbs-up is not a testimonial.',
						'b-testimonials-block'
					);
					?>
				</p>

				<hr />
			<?php endif; ?>

			<h2><?php esc_html_e( 'Import a CSV', 'b-testimonials-block' ); ?></h2>
			<p>
				<?php esc_html_e( 'The first row must be a header. Columns are matched by name, so Name, Author, Client or Reviewer all work — as do Review, Text, Testimonial or Feedback, and Rating, Stars or Score. Anything unrecognised is ignored.', 'b-testimonials-block' ); ?>
			</p>
			<p class="description">
				<?php
				printf(
					/* translators: %s: comma-separated list of column names. */
					esc_html__( 'Recognised columns: %s', 'b-testimonials-block' ),
					esc_html( implode( ', ', BPBTB_Import_Sources::csv_columns() ) )
				);
				?>
			</p>
			<form method="post" enctype="multipart/form-data" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php wp_nonce_field( self::NONCE ); ?>
				<input type="hidden" name="action" value="bpbtb_import_csv" />
				<input type="file" name="bpbtb_csv" accept=".csv,text/csv,text/plain" required />
				<button type="submit" class="button"><?php esc_html_e( 'Import CSV', 'b-testimonials-block' ); ?></button>
			</form>

			<hr />

			<h2><?php esc_html_e( 'Export', 'b-testimonials-block' ); ?></h2>
			<p><?php esc_html_e( 'Download every testimonial as a CSV — for a backup, for a spreadsheet, or to move to another site.', 'b-testimonials-block' ); ?></p>
			<p>
				<a class="button" href="<?php echo esc_url( wp_nonce_url( self::url( [ 'bpbtb_export' => 'csv' ] ), self::NONCE ) ); ?>">
					<?php esc_html_e( 'Export CSV', 'b-testimonials-block' ); ?>
				</a>
			</p>

				</div><?php // .bpbtb-admin-wrap ?>
			</div><?php // .bpbtb-admin-main ?>
		</div><?php // .bpbtb-admin-page ?>
		<?php
	}
}
}

BPBTB_Import_Export_Page::init();
