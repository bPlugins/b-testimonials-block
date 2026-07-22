<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$btb_align   = $attributes['align'] ?? 'wide';
$btb_c_id    = $attributes['cId'] ?? '';
$btb_extra   = $attributes['className'] ?? '';
$btb_logos   = isset( $attributes['logos'] ) && is_array( $attributes['logos'] ) ? $attributes['logos'] : [];
$btb_columns = isset( $attributes['columns'] ) && is_array( $attributes['columns'] ) ? $attributes['columns'] : [];
$btb_gray    = ! empty( $attributes['grayscale'] );

$btb_classes = trim( 'bClientLogos wp-block-bptmb-client-logos ' . $btb_extra . ' align' . $btb_align );

$btb_style = sprintf(
	'--cols-d:%d;--cols-t:%d;--cols-m:%d;--col-gap:%s;--row-gap:%s;--logo-h:%dpx;',
	(int) ( $btb_columns['desktop'] ?? 4 ),
	(int) ( $btb_columns['tablet'] ?? 3 ),
	(int) ( $btb_columns['mobile'] ?? 2 ),
	preg_replace( '/[^0-9a-z%.\s]/i', '', $attributes['columnGap'] ?? '30px' ),
	preg_replace( '/[^0-9a-z%.\s]/i', '', $attributes['rowGap'] ?? '30px' ),
	(int) ( $attributes['logoHeight'] ?? 60 )
);
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbClientLogos-<?php echo esc_attr( $btb_c_id ); ?>">
	<div class="logos-grid <?php echo $btb_gray ? 'is-grayscale' : ''; ?>" style="<?php echo esc_attr( $btb_style ); ?>">
		<?php
		foreach ( $btb_logos as $btb_logo ) {
			$btb_url = $btb_logo['img']['url'] ?? '';
			if ( '' === $btb_url ) {
				continue;
			}
			$btb_alt  = $btb_logo['img']['alt'] ?? '';
			$btb_link = $btb_logo['link'] ?? '';
			?>
			<div class="logo-item">
				<?php if ( $btb_link ) : ?>
					<a href="<?php echo esc_url( $btb_link ); ?>" target="_blank" rel="noopener noreferrer">
						<img src="<?php echo esc_url( $btb_url ); ?>" alt="<?php echo esc_attr( $btb_alt ); ?>" loading="lazy" />
					</a>
				<?php else : ?>
					<img src="<?php echo esc_url( $btb_url ); ?>" alt="<?php echo esc_attr( $btb_alt ); ?>" loading="lazy" />
				<?php endif; ?>
			</div>
			<?php
		}
		?>
	</div>
</div>
