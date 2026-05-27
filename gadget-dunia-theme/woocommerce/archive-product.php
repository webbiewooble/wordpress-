<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 */

defined( 'ABSPATH' ) || exit;

get_header(); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 sm:mb-12">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-black transition-colors">Home</a>
		<i data-lucide="chevron-right" class="w-3 h-3 mx-2"></i>
		<span class="text-black truncate"><?php woocommerce_page_title(); ?></span>
	</div>

	<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
		<h1 class="text-3xl font-extrabold tracking-tight text-black uppercase"><?php woocommerce_page_title(); ?></h1>
		
		<div class="w-full md:w-auto">
			<?php
			if ( woocommerce_product_loop() ) {
				woocommerce_catalog_ordering();
			}
			?>
		</div>
	</div>

	<?php if ( woocommerce_product_loop() ) : ?>
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
			<?php
			if ( wc_get_loop_prop( 'total' ) ) {
				while ( have_posts() ) {
					the_post();
					wc_get_template_part( 'content', 'product' );
				}
			}
			?>
		</div>

		<?php
		$total_pages = wc_get_loop_prop( 'total_pages' );
		if ( $total_pages > 1 ) {
			echo '<div class="mt-12 flex justify-center">';
			echo paginate_links( array(
				'base'      => esc_url_raw( str_replace( 999999999, '%#%', remove_query_arg( 'add-to-cart', get_pagenum_link( 999999999, false ) ) ) ),
				'format'    => '',
				'add_args'  => false,
				'current'   => max( 1, get_query_var( 'paged' ) ),
				'total'     => $total_pages,
				'prev_text' => '&larr;',
				'next_text' => '&rarr;',
				'type'      => 'list',
				'end_size'  => 3,
				'mid_size'  => 3,
			) );
			echo '</div>';
		}
		?>
	<?php else : ?>
		<?php wc_get_template( 'loop/no-products-found.php' ); ?>
	<?php endif; ?>

</div>

<?php get_footer(); ?>
