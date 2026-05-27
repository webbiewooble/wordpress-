<?php
/**
 * The template for displaying product content within loops
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}
?>
<div class="group cursor-pointer">
	<div class="relative bg-gray-100 aspect-square overflow-hidden mb-4 sm:mb-6">
		<div class="absolute top-2 sm:top-4 left-2 sm:top-4 z-10 flex flex-col gap-2">
			<?php if ( $product->is_on_sale() ) : ?>
			<span class="bg-black text-white text-[10px] font-bold px-2 sm:px-3 py-1 uppercase tracking-wider">Sale</span>
			<?php endif; ?>
		</div>
		<button class="absolute top-2 sm:top-4 right-2 sm:top-4 z-10 p-2 sm:p-2.5 bg-white/90 backdrop-blur shadow-sm hover:bg-black hover:text-white transition-all duration-300 opacity-100 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:-translate-y-2 group-hover:translate-y-0">
			<i data-lucide="heart" class="w-3 h-3 sm:w-4 sm:h-4 text-current"></i>
		</button>
		
		<a href="<?php echo esc_url( $product->get_permalink() ); ?>">
			<?php 
			// Main Image
			echo $product->get_image( 'woocommerce_thumbnail', array( 'class' => 'absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0' ) );
			
			// Hover image (using gallery image if available)
			$attachment_ids = $product->get_gallery_image_ids();
			if ( $attachment_ids ) {
				echo wp_get_attachment_image( $attachment_ids[0], 'woocommerce_thumbnail', false, array( 'class' => 'absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100' ) );
			} else {
				echo $product->get_image( 'woocommerce_thumbnail', array( 'class' => 'absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100' ) );
			}
			?>
		</a>
		
		<div class="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
			<!-- Add to cart logic -->
			<a href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" data-quantity="1" class="w-full bg-white text-black font-semibold text-xs py-3 uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 <?php echo esc_attr( isset( $args['class'] ) ? $args['class'] : 'button' ); ?>" <?php echo isset( $args['attributes'] ) ? wc_implode_html_attributes( $args['attributes'] ) : ''; ?>>
				<i data-lucide="shopping-bag" class="w-4 h-4 text-current"></i> Add To Cart
			</a>
		</div>
	</div>
	
	<div class="flex flex-col mt-2">
		<h3 class="text-xs sm:text-sm md:text-base font-medium text-gray-700 truncate mb-1 sm:mb-1.5"><a href="<?php echo esc_url( $product->get_permalink() ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h3>
		<div class="flex items-center gap-2 flex-wrap">
			<span class="text-xs sm:text-sm md:text-base font-semibold text-black"><?php echo $product->get_price_html(); ?></span>
		</div>
		<!-- Show add to cart button on mobile only under the text -->
		<a href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" class="sm:hidden mt-3 w-full bg-black text-white font-semibold text-[10px] py-2 uppercase tracking-widest text-center">Add To Cart</a>
	</div>
</div>
