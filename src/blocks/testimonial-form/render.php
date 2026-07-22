<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$btb_align   = $attributes['align'] ?? 'wide';
$btb_c_id    = $attributes['cId'] ?? '';
$btb_extra   = $attributes['className'] ?? '';
$btb_title   = $attributes['formTitle'] ?? '';
$btb_button  = $attributes['buttonText'] ?? __( 'Submit', 'b-testimonials-block' );
$btb_success = $attributes['successMessage'] ?? '';
$btb_accent  = $attributes['accentColor'] ?? '#0575e6';
$btb_fields  = isset( $attributes['fields'] ) && is_array( $attributes['fields'] ) ? $attributes['fields'] : [];

$btb_classes  = trim( 'bTestimonialForm wp-block-bptmb-testimonial-form ' . $btb_extra . ' align' . $btb_align );
$btb_endpoint = esc_url_raw( rest_url( 'bptmb/v1/submit' ) );
$btb_nonce    = wp_create_nonce( function_exists( 'bpbtb_form_nonce_action' ) ? bpbtb_form_nonce_action() : 'bpbtb_testimonial_submit' );
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbTestimonialForm-<?php echo esc_attr( $btb_c_id ); ?>">
	<form class="btb-tform" data-endpoint="<?php echo esc_url( $btb_endpoint ); ?>" data-nonce="<?php echo esc_attr( $btb_nonce ); ?>" data-success="<?php echo esc_attr( $btb_success ); ?>">
		<?php if ( $btb_title ) : ?>
			<h3 class="btb-tform-title"><?php echo esc_html( $btb_title ); ?></h3>
		<?php endif; ?>

		<div class="btb-tform-msg" role="status" aria-live="polite"></div>

		<div class="btb-tform-field">
			<label for="btb-name-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Name', 'b-testimonials-block' ); ?> *</label>
			<input type="text" id="btb-name-<?php echo esc_attr( $btb_c_id ); ?>" name="name" required />
		</div>

		<?php if ( ! empty( $btb_fields['email'] ) ) : ?>
			<div class="btb-tform-field">
				<label for="btb-email-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Email', 'b-testimonials-block' ); ?></label>
				<input type="email" id="btb-email-<?php echo esc_attr( $btb_c_id ); ?>" name="email" />
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $btb_fields['designation'] ) ) : ?>
			<div class="btb-tform-field">
				<label for="btb-deg-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Designation', 'b-testimonials-block' ); ?></label>
				<input type="text" id="btb-deg-<?php echo esc_attr( $btb_c_id ); ?>" name="designation" />
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $btb_fields['company'] ) ) : ?>
			<div class="btb-tform-field">
				<label for="btb-company-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Company', 'b-testimonials-block' ); ?></label>
				<input type="text" id="btb-company-<?php echo esc_attr( $btb_c_id ); ?>" name="company" />
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $btb_fields['rating'] ) ) : ?>
			<div class="btb-tform-field">
				<label for="btb-rating-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Rating', 'b-testimonials-block' ); ?></label>
				<select id="btb-rating-<?php echo esc_attr( $btb_c_id ); ?>" name="rating">
					<?php foreach ( [ 5, 4, 3, 2, 1 ] as $btb_n ) : ?>
						<option value="<?php echo esc_attr( $btb_n ); ?>"><?php echo esc_html( $btb_n ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $btb_fields['image'] ) ) : ?>
			<div class="btb-tform-field">
				<label for="btb-image-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Photo', 'b-testimonials-block' ); ?></label>
				<input type="file" id="btb-image-<?php echo esc_attr( $btb_c_id ); ?>" name="image" accept="image/jpeg,image/png,image/gif,image/webp" />
			</div>
		<?php endif; ?>

		<div class="btb-tform-field">
			<label for="btb-review-<?php echo esc_attr( $btb_c_id ); ?>"><?php esc_html_e( 'Review', 'b-testimonials-block' ); ?> *</label>
			<textarea id="btb-review-<?php echo esc_attr( $btb_c_id ); ?>" name="review" required></textarea>
		</div>

		<button type="submit" class="btb-tform-submit" style="background-color: <?php echo esc_attr( $btb_accent ); ?>;">
			<?php echo esc_html( $btb_button ); ?>
		</button>
	</form>
</div>
