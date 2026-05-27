<?php
/**
 * Gadget Duniya functions and definitions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Theme Setup
 */
function gadget_dunia_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// WooCommerce support
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 800,
		'gallery_thumbnail_image_width' => 150,
		'single_image_width'    => 800,
	) );
	
	// Add WooCommerce gallery support
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	// Register Menus
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'gadget-dunia' ),
			'mobile'  => esc_html__( 'Mobile Menu', 'gadget-dunia' ),
			'footer'  => esc_html__( 'Footer Menu', 'gadget-dunia' ),
		)
	);

	// HTML5 support
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
}
add_action( 'after_setup_theme', 'gadget_dunia_setup' );

/**
 * Enqueue scripts and styles.
 */
function gadget_dunia_scripts() {
	// Main Stylesheet
	wp_enqueue_style( 'gadget-dunia-style', get_stylesheet_uri(), array(), '1.0.0' );

	// Tailwind CSS directly from CDN (as per HTML spec)
	wp_enqueue_script( 'tailwindcss', 'https://cdn.tailwindcss.com', array(), null, false );

	// Pass Tailwind config via inline script
	$tailwind_config = "
		tailwind.config = {
			theme: {
				extend: {
					fontFamily: {
						sans: ['-apple-system', 'BlinkMacSystemFont', '\"Segoe UI\"', 'Helvetica', 'Arial', 'sans-serif'],
					},
					letterSpacing: {
						tighter: '-0.05em',
						tight: '-0.03em',
						normal: '0',
						wide: '0.05em',
						wider: '0.1em',
						widest: '0.15em',
					},
				},
			},
		};
	";
	wp_add_inline_script( 'tailwindcss', $tailwind_config, 'after' );

	// Lucide Icons
	wp_enqueue_script( 'lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, false );

	// Inline CSS for hide-scrollbar
	$custom_css = "
		.hide-scrollbar::-webkit-scrollbar { display: none; }
		.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
	";
	wp_add_inline_style( 'gadget-dunia-style', $custom_css );
	
	// Custom Theme Scripts
	wp_enqueue_script( 'gadget-dunia-custom-js', get_template_directory_uri() . '/assets/js/custom.js', array('jquery'), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'gadget_dunia_scripts' );


/**
 * Remove standard WooCommerce styles if we want 100% custom styling, 
 * but usually it's better to keep some and override, or carefully dequeue.
 * By using our own templates (e.g., woo override), we control the classes.
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

/**
 * Modify main loop to show more products if needed
 */
add_filter( 'loop_shop_per_page', function( $cols ) { return 12; }, 20 );
