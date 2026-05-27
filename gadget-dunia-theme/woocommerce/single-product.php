<?php
/**
 * The Template for displaying all single products
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header(); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	
	<!-- Breadcrumb -->
	<div class="flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 sm:mb-12">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-black transition-colors">Home</a>
		<i data-lucide="chevron-right" class="w-3 h-3 mx-2"></i>
		<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="hover:text-black transition-colors">Shop</a>
		<i data-lucide="chevron-right" class="w-3 h-3 mx-2"></i>
		<span class="text-black truncate"><?php the_title(); ?></span>
	</div>

	<?php while ( have_posts() ) : the_post(); global $product; ?>
	
	<!-- Product Layout -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20" id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>
		
		<!-- Product Images -->
		<div class="flex flex-col gap-4">
			<!-- Main Image -->
			<div class="aspect-square bg-gray-100 overflow-hidden relative flex items-center justify-center">
				<?php 
					if ( $product->get_image_id() ) {
						echo wp_get_attachment_image( $product->get_image_id(), 'full', false, array( 'class' => 'w-full h-full object-cover main-product-image', 'id' => 'main-image' ) );
					} else {
						echo sprintf( '<img src="%s" alt="%s" class="w-1/2 opacity-50 grayscale" id="main-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_html__( 'Awaiting product image', 'woocommerce' ) );
					}
				?>
			</div>
			
			<!-- Thumbnails -->
			<?php if ( $product->get_image_id() ) : ?>
			<div class="grid grid-cols-4 gap-4 product-thumbnails">
				<div class="aspect-square bg-gray-100 cursor-pointer overflow-hidden border-2 border-black thumb-item flex items-center justify-center">
					<?php echo wp_get_attachment_image( $product->get_image_id(), 'woocommerce_thumbnail', false, array('class' => 'w-full h-full object-cover', 'data-full-src' => wp_get_attachment_image_url( $product->get_image_id(), 'full' )) ); ?>
				</div>
				<?php 
				$attachment_ids = $product->get_gallery_image_ids();
				if ( $attachment_ids ) {
					foreach ( $attachment_ids as $attachment_id ) {
						echo '<div class="aspect-square bg-gray-100 cursor-pointer overflow-hidden border-2 border-transparent hover:border-gray-300 thumb-item flex items-center justify-center">';
						echo wp_get_attachment_image( $attachment_id, 'woocommerce_thumbnail', false, array('class' => 'w-full h-full object-cover', 'data-full-src' => wp_get_attachment_image_url($attachment_id, 'full')) );
						echo '</div>';
					}
				}
				?>
			</div>
			<script>
				document.querySelectorAll('.thumb-item img').forEach(img => {
					img.parentElement.addEventListener('click', () => {
						document.querySelectorAll('.thumb-item').forEach(el => {
							el.classList.remove('border-black');
							el.classList.add('border-transparent');
						});
						img.parentElement.classList.remove('border-transparent');
						img.parentElement.classList.add('border-black');
						document.getElementById('main-image').src = img.getAttribute('data-full-src');
					});
				});
			</script>
			<?php endif; ?>
		</div>

		<!-- Product Details -->
		<div class="flex flex-col">
			<h1 class="text-3xl md:text-4xl font-bold tracking-tight text-black mb-2"><?php the_title(); ?></h1>
			
			<div class="flex items-center gap-2 mb-6">
				<div class="flex text-yellow-400">
					<i data-lucide="star" class="h-4 w-4 fill-current"></i>
					<i data-lucide="star" class="h-4 w-4 fill-current"></i>
					<i data-lucide="star" class="h-4 w-4 fill-current"></i>
					<i data-lucide="star" class="h-4 w-4 fill-current"></i>
					<i data-lucide="star-half" class="h-4 w-4 fill-current"></i>
				</div>
				<span class="text-xs text-gray-500 underline uppercase tracking-wider ml-2"><?php echo $product->get_review_count() . ' Reviews'; ?></span>
			</div>

			<div class="flex items-end gap-3 mb-6">
				<span class="text-2xl font-semibold text-black"><?php echo $product->get_price_html(); ?></span>
			</div>

			<!-- Add to Cart Form -->
			<div class="mb-10">
				<?php do_action( 'woocommerce_' . $product->get_type() . '_add_to_cart' ); ?>
			</div>

			<div class="text-gray-600 text-sm leading-relaxed mb-8">
				<?php the_content(); ?>
			</div>

			<!-- Checkout Info -->
			<div class="grid grid-cols-2 gap-4 mb-10 border-t border-b border-gray-200 py-6">
				<div class="flex items-center gap-3">
					<i data-lucide="truck" class="w-6 h-6 text-gray-600"></i>
					<div>
						<p class="text-[10px] font-bold uppercase tracking-widest text-black">Free Shipping</p>
						<p class="text-[10px] text-gray-500">Items delivered in 2-4 days</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<i data-lucide="rotate-ccw" class="w-6 h-6 text-gray-600"></i>
					<div>
						<p class="text-[10px] font-bold uppercase tracking-widest text-black">7 Days Return</p>
						<p class="text-[10px] text-gray-500">No questions asked</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<i data-lucide="shield-check" class="w-6 h-6 text-gray-600"></i>
					<div>
						<p class="text-[10px] font-bold uppercase tracking-widest text-black">1 Year Warranty</p>
						<p class="text-[10px] text-gray-500">Official brand warranty</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<i data-lucide="credit-card" class="w-6 h-6 text-gray-600"></i>
					<div>
						<p class="text-[10px] font-bold uppercase tracking-widest text-black">Secure Checkout</p>
						<p class="text-[10px] text-gray-500">100% safe payment</p>
					</div>
				</div>
			</div>

		</div>
	</div>

	<?php endwhile; // end of the loop. ?>

</div>

<?php get_footer(); ?>
