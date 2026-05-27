<?php get_header(); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
	<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
	<?php
		if ( have_posts() ) {
			while ( have_posts() ) : the_post();
				if ( class_exists( 'WooCommerce' ) && is_woocommerce() ) {
					wc_get_template_part( 'content', 'product' );
				} else {
					// Fallback
					the_title('<h2>','</h2>');
					the_content();
				}
			endwhile;
		}
	?>
	</div>
</div>

<?php get_footer(); ?>
