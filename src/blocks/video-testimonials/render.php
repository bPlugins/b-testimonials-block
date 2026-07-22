<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'bpbtb_video_data' ) ) {
	/**
	 * Build the embed markup (and a poster fallback) for a video URL.
	 *
	 * @param string $url Video URL (YouTube, Vimeo or direct file).
	 * @return array{embed:string,thumb:string}
	 */
	function bpbtb_video_data( $url ) {
		$url  = trim( (string) $url );
		$data = [
			'embed' => '',
			'thumb' => '',
		];

		if ( '' === $url ) {
			return $data;
		}

		if ( preg_match( '~(?:youtu\.be/|youtube\.com/(?:watch\?v=|embed/|shorts/))([A-Za-z0-9_-]{6,})~', $url, $m ) ) {
			$src           = 'https://www.youtube.com/embed/' . $m[1] . '?autoplay=1&rel=0';
			$data['embed'] = '<iframe src="' . esc_url( $src ) . '" title="' . esc_attr__( 'Video testimonial', 'b-testimonials-block' ) . '" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
			$data['thumb'] = 'https://img.youtube.com/vi/' . $m[1] . '/hqdefault.jpg';
			return $data;
		}

		if ( preg_match( '~vimeo\.com/(?:video/)?([0-9]+)~', $url, $m ) ) {
			$src           = 'https://player.vimeo.com/video/' . $m[1] . '?autoplay=1';
			$data['embed'] = '<iframe src="' . esc_url( $src ) . '" title="' . esc_attr__( 'Video testimonial', 'b-testimonials-block' ) . '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
			return $data;
		}

		$data['embed'] = '<video src="' . esc_url( $url ) . '" controls autoplay playsinline></video>';
		return $data;
	}
}

$btb_align   = $attributes['align'] ?? 'wide';
$btb_c_id    = $attributes['cId'] ?? '';
$btb_extra   = $attributes['className'] ?? '';
$btb_items   = isset( $attributes['items'] ) && is_array( $attributes['items'] ) ? $attributes['items'] : [];
$btb_columns = isset( $attributes['columns'] ) && is_array( $attributes['columns'] ) ? $attributes['columns'] : [];
$btb_accent  = $attributes['accentColor'] ?? '#0575e6';

$btb_classes = trim( 'bVideoTestimonials wp-block-bptmb-video-testimonials ' . $btb_extra . ' align' . $btb_align );

$btb_style = sprintf(
	'--cols-d:%d;--cols-t:%d;--cols-m:%d;--col-gap:%s;--row-gap:%s;--accent:%s;',
	(int) ( $btb_columns['desktop'] ?? 3 ),
	(int) ( $btb_columns['tablet'] ?? 2 ),
	(int) ( $btb_columns['mobile'] ?? 1 ),
	preg_replace( '/[^0-9a-z%.\s]/i', '', $attributes['columnGap'] ?? '30px' ),
	preg_replace( '/[^0-9a-z%.\s]/i', '', $attributes['rowGap'] ?? '30px' ),
	sanitize_hex_color( $btb_accent ) ? $btb_accent : '#0575e6'
);
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbVideoTestimonials-<?php echo esc_attr( $btb_c_id ); ?>">
	<div class="videos-grid" style="<?php echo esc_attr( $btb_style ); ?>">
		<?php
		foreach ( $btb_items as $btb_item ) {
			$btb_vd     = bpbtb_video_data( $btb_item['videoUrl'] ?? '' );
			$btb_poster = $btb_item['poster']['url'] ?? '';
			if ( '' === $btb_poster ) {
				$btb_poster = $btb_vd['thumb'];
			}
			$btb_name    = $btb_item['name'] ?? '';
			$btb_meta    = array_filter( [ $btb_item['deg'] ?? '', $btb_item['company'] ?? '' ] );
			$btb_pstyle  = $btb_poster ? 'background-image:url(' . esc_url( $btb_poster ) . ');' : '';
			?>
			<div class="video-item">
				<div class="video-frame" data-embed="<?php echo esc_attr( $btb_vd['embed'] ); ?>" style="<?php echo esc_attr( $btb_pstyle ); ?>" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Play video', 'b-testimonials-block' ); ?>">
					<span class="video-play" style="color:<?php echo esc_attr( $btb_accent ); ?>;">
						<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
					</span>
				</div>
				<?php if ( $btb_name || $btb_meta ) : ?>
					<div class="video-meta">
						<?php if ( $btb_name ) : ?>
							<h3 class="name"><?php echo esc_html( $btb_name ); ?></h3>
						<?php endif; ?>
						<?php if ( $btb_meta ) : ?>
							<p class="deg"><?php echo esc_html( implode( ', ', $btb_meta ) ); ?></p>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
			<?php
		}
		?>
	</div>
</div>
