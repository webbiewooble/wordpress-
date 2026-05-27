<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>

<body <?php body_class("bg-white font-sans text-gray-900 antialiased"); ?>>
<?php wp_body_open(); ?>

<!-- Announcement Bar -->
<div id="announcement-bar" class="bg-black text-white text-[0.65rem] font-semibold py-2.5 text-center tracking-widest uppercase transition-all duration-500">
	Limited Stock Available
</div>

<!-- Navbar -->
<nav class="sticky top-0 z-50 bg-white border-b border-gray-200">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="flex justify-between items-center h-20">
		<!-- Left Section: Menu (Mobile) & User -->
		<div class="flex items-center space-x-1 sm:space-x-2">
		<button id="mobile-menu-btn" class="lg:hidden p-2 -ml-2 text-gray-600 hover:text-black">
			<i data-lucide="menu" class="h-5 w-5 sm:h-6 sm:w-6"></i>
		</button>
		<button class="hidden sm:block p-2 text-gray-600 hover:text-black">
			<i data-lucide="user" class="h-5 w-5 sm:h-6 sm:w-6"></i>
		</button>
		</div>

		<!-- Logo -->
		<div class="flex-shrink-0 flex items-center justify-center mx-2 text-center overflow-hidden">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-black truncate flex items-center h-full">
			<img src="https://raw.githubusercontent.com/webbiewooble/test2/main/Banner%20and%20Logo/logo.svg" alt="<?php bloginfo('name'); ?>" class="h-20 w-auto" />
		</a>
		</div>

		<!-- Icons (Right of Logo) -->
		<div class="flex items-center space-x-1 sm:space-x-4">
		<button aria-label="Search" class="p-2 text-gray-600 hover:text-black" onclick="openSearchModal()">
			<i data-lucide="search" class="h-5 w-5 sm:h-6 sm:w-6"></i>
		</button>
		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
		<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="p-2 -mr-2 sm:mr-0 text-gray-600 hover:text-black relative inline-block">
			<i data-lucide="shopping-bag" class="h-5 w-5 sm:h-6 sm:w-6"></i>
			<span id="cart-count" class="absolute top-0 right-0 sm:top-1 sm:right-1 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
			<?php echo WC()->cart ? WC()->cart->get_cart_contents_count() : '0'; ?>
			</span>
		</a>
		<?php endif; ?>
		</div>
	</div>
	<!-- Navbar Links (Below Logo) -->
	<div class="hidden lg:flex justify-center items-center h-12 space-x-10 border-t border-gray-200">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-[11px] font-semibold text-black hover:text-gray-600 tracking-wide uppercase transition-colors">Home</a>
		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
		<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="text-[11px] font-semibold text-black hover:text-gray-600 tracking-wide uppercase transition-colors">Shop</a>
		<?php endif; ?>
		<div class="relative group">
			<a href="#" class="text-[11px] font-semibold text-black hover:text-gray-600 tracking-wide uppercase transition-colors flex items-center gap-1">Categories <i data-lucide="chevron-down" class="h-3 w-3"></i></a>
			<!-- Dropdown (Simple Categories) -->
			<div class="absolute left-0 top-full pt-2 hidden group-hover:block w-48 bg-white border border-gray-100 shadow-xl z-50 rounded-b-md">
				<div class="py-2">
				<?php
				$product_categories = get_terms( 'product_cat', array('hide_empty' => false) );
				if ( ! empty( $product_categories ) ) {
					foreach ( $product_categories as $category ) {
						if($category->slug == 'uncategorized') continue;
						echo '<a href="' . esc_url( get_term_link( $category ) ) . '" class="block px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 uppercase tracking-wide">' . esc_html( $category->name ) . '</a>';
					}
				}
				?>
				</div>
			</div>
		</div>
		<a href="#" onclick="openAboutModal('faq')" class="text-[11px] font-semibold text-black hover:text-gray-600 tracking-wide uppercase transition-colors">FAQ</a>
		<a href="#" onclick="openAboutModal('contact')" class="text-[11px] font-semibold text-black hover:text-gray-600 tracking-wide uppercase transition-colors">Contact Us</a>
		<a href="#" onclick="openAboutModal('earn')" class="text-[11px] font-semibold text-black hover:text-gray-600 tracking-wide uppercase transition-colors">Earn with Us</a>
	</div>
	</div>
</nav>

<!-- Mobile Menu Sidebar skeleton structure -->
<div id="mobile-menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden transition-opacity opacity-0"></div>
<div id="mobile-menu-panel" class="fixed inset-y-0 left-0 bg-white w-4/5 max-w-sm z-50 transform -translate-x-full transition-transform duration-300 ease-in-out flex flex-col shadow-2xl">
	<div class="flex items-center justify-between p-4 border-b border-gray-100">
	<span class="text-xs font-bold uppercase tracking-widest text-black">Menu</span>
	<button id="close-mobile-menu-btn" class="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
		<i data-lucide="x" class="h-5 w-5"></i>
	</button>
	</div>
	<div class="flex-1 overflow-y-auto hide-scrollbar">
	<div class="p-6 space-y-6">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="block text-sm font-semibold text-black uppercase tracking-wide">Home</a>
		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
		<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="block text-sm font-semibold text-black uppercase tracking-wide">Shop</a>
		<?php endif; ?>
		<div class="space-y-4">
			<span class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</span>
			<div class="pl-4 border-l border-gray-100 space-y-4">
			<?php
			if ( ! empty( $product_categories ) ) {
				foreach ( $product_categories as $category ) {
					if($category->slug == 'uncategorized') continue;
					echo '<a href="' . esc_url( get_term_link( $category ) ) . '" class="block text-sm text-gray-600 hover:text-black transition-colors uppercase tracking-wide">' . esc_html( $category->name ) . '</a>';
				}
			}
			?>
			</div>
		</div>
		<div class="pt-6 border-t border-gray-100 space-y-6">
		<span class="block text-xs font-bold text-gray-400 uppercase tracking-widest">More Links</span>
		<a href="#" onclick="openAboutModal('faq');" class="block text-sm font-semibold text-black uppercase tracking-wide">FAQ</a>
		<a href="#" onclick="openAboutModal('contact');" class="block text-sm font-semibold text-black uppercase tracking-wide">Contact Us</a>
		<a href="#" onclick="openAboutModal('earn');" class="block text-sm font-semibold text-black uppercase tracking-wide">Earn with Us</a>
		</div>
	</div>
	</div>
</div>
