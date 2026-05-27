<?php get_header(); ?>

<!-- Hero Banner -->
<div class="relative bg-[#f4f4f4] overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-24 flex items-center min-h-[400px] sm:min-h-[500px]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
	<h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-black mb-4 sm:mb-6 uppercase">
		Next Gen<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Audio Experience</span>
	</h1>
	<p class="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 font-medium px-4">
		Discover our latest collection of premium wireless headphones.
		Engineered for pure sound.
	</p>
	<div class="flex justify-center gap-4">
		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
		<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-xs sm:text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
		Shop Now
		</a>
		<?php endif; ?>
	</div>
	</div>
</div>

<!-- Category Banner using WooCommerce categories -->
<div class="bg-black py-4 sm:py-6 overflow-hidden border-y border-gray-900">
	<div class="flex space-x-12 sm:space-x-16 items-center category-scroll" style="animation: scroll 30s linear infinite;">
		<div class="flex space-x-12 sm:space-x-16 items-center min-w-max">
			<?php
			$categories = get_terms( 'product_cat', array('hide_empty' => false) );
			if ( ! empty( $categories ) ) {
				foreach ( $categories as $category ) {
					if($category->slug == 'uncategorized') continue;
					echo '<span class="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap flex items-center gap-3 sm:gap-4"><span class="w-1.5 h-1.5 bg-white rounded-full"></span> ' . esc_html( $category->name ) . '</span>';
				}
			}
			?>
		</div>
		<div class="flex space-x-12 sm:space-x-16 items-center min-w-max" aria-hidden="true">
			<?php
			if ( ! empty( $categories ) ) {
				foreach ( $categories as $category ) {
					if($category->slug == 'uncategorized') continue;
					echo '<span class="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap flex items-center gap-3 sm:gap-4"><span class="w-1.5 h-1.5 bg-white rounded-full"></span> ' . esc_html( $category->name ) . '</span>';
				}
			}
			?>
		</div>
	</div>
</div>

<!-- Trending Now (Featured Products) -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
	<div class="flex justify-between items-end mb-8 sm:mb-12">
	<div>
		<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-black uppercase mb-2">Trending Now</h2>
		<p class="text-sm text-gray-500 font-medium">Most loved by our community</p>
	</div>
	<?php if ( class_exists( 'WooCommerce' ) ) : ?>
	<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="hidden sm:flex items-center text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors">
		View All <i data-lucide="arrow-right" class="ml-2 w-4 h-4"></i>
	</a>
	<?php endif; ?>
	</div>

	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
	<?php
		$args = array(
			'post_type' => 'product',
			'posts_per_page' => 4,
			'tax_query' => array(
				array(
					'taxonomy' => 'product_visibility',
					'field'    => 'name',
					'terms'    => 'featured',
				),
			),
		);
		$loop = new WP_Query( $args );
		if ( $loop->have_posts() ) {
			while ( $loop->have_posts() ) : $loop->the_post();
				wc_get_template_part( 'content', 'product' );
			endwhile;
		} else {
			echo __( 'No featured products found' );
		}
		wp_reset_postdata();
	?>
	</div>
	<?php if ( class_exists( 'WooCommerce' ) ) : ?>
	<div class="mt-8 text-center sm:hidden">
	<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="inline-flex items-center text-xs font-bold uppercase tracking-widest text-black">
		View All <i data-lucide="arrow-right" class="ml-2 w-4 h-4"></i>
	</a>
	</div>
	<?php endif; ?>
</div>

<!-- Promo Banner -->
<div class="py-16 md:py-24 bg-white">
	<div class="w-full">
	<div class="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-gray-900 flex items-center justify-center">
		<img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop" alt="Gadget Duniya Collab" class="absolute inset-0 w-full h-full object-cover opacity-60" referrerpolicy="no-referrer" />
		<div class="relative z-10 text-center px-4">
		<h2 class="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-white uppercase tracking-tighter leading-[1.05] mb-6">
			The Tech Edit
		</h2>
		<p class="text-gray-200 text-base md:text-lg max-w-xl mx-auto mb-10 font-normal leading-relaxed">
			Precision tuned for your lifestyle. Discover our latest
			collection of premium audio and wearables.
		</p>
		<a href="<?php echo class_exists('WooCommerce') ? esc_url( wc_get_page_permalink( 'shop' ) ) : '#'; ?>" class="inline-block bg-white text-black font-semibold text-xs md:text-sm px-10 py-4 uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300">EXPLORE COLLECTION</a>
		</div>
	</div>
	</div>
</div>

<!-- New Arrivals -->
<div class="py-16 md:py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="flex justify-between items-end mb-10">
		<h2 class="text-3xl md:text-4xl font-bold uppercase tracking-tight">New Arrivals</h2>
		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
		<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="text-xs font-semibold tracking-wider uppercase border-b border-black pb-0.5 hover:opacity-70 transition-opacity">VIEW ALL</a>
		<?php endif; ?>
	</div>
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
		<?php
		if ( class_exists( 'WooCommerce' ) ) {
			$new_args = array(
				'post_type'      => 'product',
				'posts_per_page' => 4,
				'orderby'        => 'date',
				'order'          => 'DESC',
			);
			$new_loop = new WP_Query( $new_args );
			if ( $new_loop->have_posts() ) {
				while ( $new_loop->have_posts() ) : $new_loop->the_post();
					wc_get_template_part( 'content', 'product' );
				endwhile;
			} else {
				echo __( 'No new products found' );
			}
			wp_reset_postdata();
		}
		?>
	</div>
	</div>
</div>

<?php get_footer(); ?>
