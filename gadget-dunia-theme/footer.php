<footer class="bg-black text-white pt-20 pb-10 mt-auto">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
		<div class="lg:col-span-1">
		<h2 class="text-2xl font-extrabold tracking-tighter mb-6"><?php bloginfo('name'); ?></h2>
		<p class="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm font-normal">
			High-quality audio equipment and premium gadgets designed for the
			modern audiophile.
		</p>
		<div class="flex space-x-4">
			<i data-lucide="shield-check" class="w-8 h-8 text-gray-500"></i>
			<i data-lucide="truck" class="w-8 h-8 text-gray-500"></i>
			<i data-lucide="refresh-cw" class="w-8 h-8 text-gray-500"></i>
		</div>
		</div>

		<!-- Newsletter -->
		<div class="lg:col-span-2">
		<h3 class="text-lg font-bold tracking-tight mb-4">
			Join <?php bloginfo('name'); ?> Club
		</h3>
		<p class="text-gray-400 mb-8 max-w-md leading-relaxed font-normal">
			Subscribe to get special offers, free giveaways, and
			once-in-a-lifetime deals.
		</p>
		<form class="flex max-w-md">
			<input
			type="email"
			placeholder="Enter your email"
			class="flex-1 bg-transparent border border-gray-700 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-white transition-colors"
			required
			/>
			<button
			type="submit"
			class="bg-white text-black font-semibold text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300"
			>
			SUBSCRIBE
			</button>
		</form>
		</div>

		<!-- Links -->
		<div>
		<h4 class="text-[0.7rem] font-semibold uppercase tracking-widest mb-6 text-gray-300">
			Shop
		</h4>
		<ul class="space-y-4 text-gray-400 text-sm font-normal">
		<?php
			$product_categories = get_terms( 'product_cat', array('hide_empty' => false, 'number' => 5) );
			if ( ! empty( $product_categories ) ) {
				foreach ( $product_categories as $category ) {
					if($category->slug == 'uncategorized') continue;
					echo '<li><a href="' . esc_url( get_term_link( $category ) ) . '" class="hover:text-white transition-colors">' . esc_html( $category->name ) . '</a></li>';
				}
			}
		?>
		</ul>
		</div>

		<div>
		<h4 class="text-[0.7rem] font-semibold uppercase tracking-widest mb-6 text-gray-300">
			Help
		</h4>
		<ul class="space-y-4 text-gray-400 text-sm font-normal">
			<li>
			<a href="#" onclick="openAboutModal('faq'); event.preventDefault();" class="hover:text-white transition-colors">FAQs</a>
			</li>
			<li>
			<a href="#" onclick="openAboutModal('contact'); event.preventDefault();" class="hover:text-white transition-colors">Contact Us</a>
			</li>
			<li>
			<button onclick="openAboutModal('about')" class="hover:text-white transition-colors text-left w-full">
				About Us
			</button>
			</li>
		</ul>
		</div>
	</div>

	<div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
		<div class="flex items-center space-x-6">
		<a href="#" class="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><i data-lucide="instagram" class="w-5 h-5"></i></a>
		<a href="#" class="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><i data-lucide="facebook" class="w-5 h-5"></i></a>
		<a href="#" class="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><i data-lucide="twitter" class="w-5 h-5"></i></a>
		<a href="#" class="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><i data-lucide="youtube" class="w-5 h-5"></i></a>
		</div>
		<p class="text-gray-500 text-sm font-normal tracking-wide">
		© <?php echo date('Y') . " " . get_bloginfo('name'); ?>. All rights reserved.
		</p>
	</div>
	</div>
</footer>

<!-- Modals for About, FAQ, Search etc should go here ... for brevity they will be added in JS or loaded via footer templates -->

<?php wp_footer(); ?>
</body>
</html>
