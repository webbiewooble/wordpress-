# Gadget Duniya WordPress Theme

Thank you for porting your custom HTML template into building a WordPress WooCommerce theme.

## 1: Install the Theme

1. In Google AI Studio, click on the **Cloud Run** deploy drop-down in the top right corner and select **Export as ZIP**.
2. Unzip the downloaded file. Locate the `gadget-dunia-theme` folder inside it. 
3. Zip the `gadget-dunia-theme` folder itself (`gadget-dunia-theme.zip`).
4. Go to your WordPress Admin dashboard.
5. Go to **Appearance > Themes > Add New > Upload Theme**.
6. Select your `gadget-dunia-theme.zip` file, click **Install Now**, and then **Activate**.

## 2: Setup WooCommerce

1. If you haven't already, install and activate the **WooCommerce** plugin from Plugins > Add New.
2. Complete the WooCommerce setup wizard.
3. Your site automatically hooks into WooCommerce loops because it registers theme support in `functions.php`. It will use `front-page.php` for your Home layout as seen in your index.html and `woocommerce/` overrides for Shop, Product Cards, and Single Product pages.

## 3: Import Products

> **DO NOT hardcode products in HTML. WooCommerce now handles it!**

1. Go to **Products > All Products**.
2. Click **Import** at the top.
3. Upload your CSV file (you can generate one from your own products or using sample data).
4. Map the columns during import (ensure Name, Price, Description, Images, Categories are mapped).
5. After import, the products will dynamically fill the layout grid using the exact same Tailwind styling specified in `content-product.php` and `single-product.php`!

## 4: Editing Layouts & Styles

- **To edit the Homepage (Hero banner, Category banners):** Edit `front-page.php`.
- **To edit the Header / Navbar:** Edit `header.php`.
- **To edit the Footer:** Edit `footer.php`.
- **To edit the Product Grids:** Edit `woocommerce/content-product.php`.
- **To edit the Single Product Page:** Edit `woocommerce/single-product.php`.
- **JavaScript & Modals:** Edit `assets/js/custom.js`.

The theme utilizes **Tailwind CSS via CDN**, meaning any standard Tailwind utility class you type directly into the PHP files will instantly work without recompiling!

## 5: Common Issues
- **Missing Categories Header:** Update your Categories within WooCommerce. The header dynamic loop uses standard WordPress `product_cat` taxonomy terms.
- **Grids misaligned?** Verify your image sizes under Appearance > Customize > WooCommerce > Product Images. Set uniform cropping if they aren't matching the square aspect ratio.
- **Mobile Menu not working?** Check that `custom.js` is loading in your network panel.
