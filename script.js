
      // Initialize Lucide icons
      lucide.createIcons();

      // Cart Logic
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      let currentProductId = null;
      function addToCart(productId) {
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showToast();
      }

      function showToast() {
        const toast = document.getElementById("toast-notification");
        if(toast) {
          toast.classList.remove("translate-y-20", "opacity-0", "pointer-events-none");
          toast.classList.add("translate-y-0", "opacity-100");
          setTimeout(() => {
            toast.classList.remove("translate-y-0", "opacity-100");
            toast.classList.add("translate-y-20", "opacity-0", "pointer-events-none");
          }, 3000);
        }
      }

      function updateCartCount() {
        const cartCountEl = document.getElementById("cart-count");
        if (cartCountEl) {
          cartCountEl.innerText = cart.length;
        }
      }

      function showCart(e) {
        if (e) e.preventDefault();
        window.location.href = '/cart.html';
      }

      function renderCart() {
        const cartItemsEl = document.getElementById("cart-items");
        const cartSummaryEl = document.getElementById("cart-summary");
        const emptyCartMsg = document.getElementById("empty-cart-msg");
        const cartTotalEl = document.getElementById("cart-total");

        if (cart.length === 0) {
          cartItemsEl.innerHTML = "";
          cartSummaryEl.classList.add("hidden");
          emptyCartMsg.classList.remove("hidden");
          return;
        }

        emptyCartMsg.classList.add("hidden");
        cartSummaryEl.classList.remove("hidden");

        let html = "";
        let total = 0;

        const itemCounts = {};
        cart.forEach((id) => {
          itemCounts[id] = (itemCounts[id] || 0) + 1;
        });

        for (const [id, count] of Object.entries(itemCounts)) {
          if (!PRODUCT_DB[id]) continue;
          const p = PRODUCT_DB[id];
          const priceNum = parseInt(p.price.replace(/[^\d]/g, ""), 10);
          total += priceNum * count;

          html += `
          <div class="flex items-center gap-6 border-b border-gray-200 pb-6">
            <img src="${p.image}" alt="${p.title}" class="w-24 h-24 object-cover object-center bg-gray-50" referrerpolicy="no-referrer" />
            <div class="flex-1">
              <h3 class="font-bold text-base uppercase tracking-tight">${p.title}</h3>
              <p class="text-gray-500 text-sm mt-1 mb-2">${p.price}</p>
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium">Qty: ${count}</span>
                <button onclick="removeFromCart('${id}')" class="text-xs text-red-500 hover:text-red-700 uppercase tracking-widest font-semibold ml-4">Remove</button>
              </div>
            </div>
          </div>
        `;
        }

        cartItemsEl.innerHTML = html;
        cartTotalEl.innerText = "₹ " + total.toLocaleString("en-IN");
      }

      function removeFromCart(productId) {
        cart = cart.filter((id) => id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
      }

      // Announcement Bar Logic
      const announcements = [
        "Limited Stock Available",
        "Fast Shipping Across India",
        "Free Shipping on Orders above ₹999",
      ];
      let currentIndex = 0;
      const bar = document.getElementById("announcement-bar");
      setInterval(() => {
        currentIndex = (currentIndex + 1) % announcements.length;
        bar.innerText = announcements[currentIndex];
      }, 3000);

      // Mobile Menu Logic
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const closeMenuBtn = document.getElementById("close-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileSidebar = document.getElementById("mobile-sidebar");

      function openMobileMenu() {
        mobileMenu.classList.remove("hidden");
        // small delay to allow display to apply before opacity transition
        setTimeout(() => {
          mobileMenu.classList.remove("opacity-0");
          mobileSidebar.classList.remove("-translate-x-full");
        }, 10);
        document.body.style.overflow = "hidden";
      }

      function closeMobileMenu() {
        mobileMenu.classList.add("opacity-0");
        mobileSidebar.classList.add("-translate-x-full");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300); // match duration
        document.body.style.overflow = "";
      }

      mobileMenuBtn.addEventListener("click", openMobileMenu);
      closeMenuBtn.addEventListener("click", closeMobileMenu);

      // Close when clicking outside sidebar
      mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
          closeMobileMenu();
        }
      });

      // Mobile Dropdowns
      const dropdownBtns = document.querySelectorAll(".mobile-dropdown-btn");
      dropdownBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const content = btn.nextElementSibling;
          const icon = btn.querySelector(".chevron-icon");
          content.classList.toggle("hidden");
          if (!content.classList.contains("hidden")) {
            icon.classList.add("rotate-180");
          } else {
            icon.classList.remove("rotate-180");
          }
        });
      });

      // SPA Routing
      
      document.addEventListener("DOMContentLoaded", () => {
        updateCartCount();
        const urlPath = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        
        if (urlPath.includes('shop.html')) {
          const cat = params.get('category') || 'All Products';
          const titleEl = document.getElementById("collection-title");
          if(titleEl) {
             titleEl.innerText = cat;
             renderCollection(cat);
          }
        } else if (urlPath.includes('product.html')) {
          const id = params.get('id');
          if(id) renderProduct(id);
        } else if (urlPath.includes('cart.html')) {
          renderCart();
        } else {
          // home page - auto scroll starts if running
          if(typeof startAutoScroll === 'function') startAutoScroll();
        }
      });

      function showHome(e) {
        if (e) e.preventDefault();
        window.location.href = '/index.html';
      }

      const PRODUCT_DB = {
        humidifier: {
          title: "Smooth Anti Gravity Humidifier",
          price: "₹ 1,499",
          oldPrice: "₹ 2,999",
          desc: "Upgrade your space with the stylish and futuristic Smooth Anti Gravity Humidifier. Designed to combine beauty, relaxation, and functionality, this premium humidifier creates a stunning visual effect of water droplets flowing upward using advanced LED strobe lighting.\n\nThis ultrasonic humidifier helps add moisture to the air, improving air quality and creating a more comfortable environment for your home, office, or bedroom. It also supports aromatherapy with essential oils.\n\nKey Features:\n✔ Unique Anti-Gravity Water Droplet Effect\n✔ Ultrasonic Humidification Technology\n✔ Supports Aromatherapy with Essential Oils\n✔ Improves Air Moisture & Air Quality\n✔ Built-in Digital LED Clock\n✔ Large Water Tank Capacity",
          category: "Smart Home",
          image:
            "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?auto=format&fit=crop&q=80&w=800",
        },
        gamestick: {
          title: "M15 Game Stick",
          price: "₹ 1,999",
          oldPrice: "₹ 3,999",
          desc: "Bring back the golden era of gaming with the M15 Game Stick. This plug-and-play retro gaming console is designed for classic game lovers who want instant fun without complicated setup.\n\nPacked with 20,000+ to 22,000+ pre-installed classic games, the M15 Game Stick supports multiple popular emulators including PS1, GB, GBA, and many more. Enjoy endless nostalgia with your favorite childhood games right on your TV.\n\nKey Features:\n✔ 20,000+ Built-in Classic Games\n✔ Supports PS1, GB, GBA & Multiple Emulators\n✔ HDMI Plug-and-Play Setup\n✔ 4K Display Support\n✔ 64GB SD Card Included\n✔ 2.4G Wireless Game Controllers",
          category: "Gaming",
          image:
            "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
        },
        magiccar: {
          title: "Magic Induction Line Follower Car",
          price: "₹ 699",
          oldPrice: "₹ 1,399",
          desc: "Make playtime smarter and more exciting with the Magic Induction Line Follower Car. This fun and educational toy is designed to entertain kids while boosting creativity and imagination.\n\nFeaturing Automatic Line Following Technology, simply draw a black line on paper and watch the car magically follow the path! It creates a unique interactive play experience that keeps children engaged for hours.\n\nKey Features:\n✔ Automatic Line Following Technology\n✔ Cute Cartoon Car Design\n✔ Bright Attractive Colors (Pink & Yellow)\n✔ Battery Operated for Easy Use\n✔ Safe & Kid-Friendly Material",
          category: "Toys",
          image:
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800",
        },
        rccar: {
          title: "Little Monster Rock Crawler RC",
          price: "₹ 1,899",
          oldPrice: "₹ 3,799",
          desc: "Unleash the power of adventure with the Little Monster Rock Crawler RC. Built for speed, drifting, and off-road action, this powerful RC car is perfect for kids, hobby lovers, and remote-control car enthusiasts.\n\nDesigned with a strong Metal Body and Double Suspension System, it offers better durability, smooth movement, and stable performance on rough surfaces. Whether you're racing indoors or exploring outdoor tracks, this rock crawler delivers exciting drifting and off-roading fun.\n\nKey Features:\n✔ Powerful Single Remote Control\n✔ Smooth Drifting Performance\n✔ Strong Off-Roading Capability\n✔ Realistic Light & Smoke Spray Effect\n✔ Premium Durable Metal Body",
          category: "Toys",
          image:
            "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800",
        },
        airpodspro2: {
          title: "AirPods Pro 2",
          price: "₹ 2,499",
          oldPrice: "₹ 4,999",
          desc: "Experience the Daddy of All AirPods 👑 with the powerful AirPods Pro 2 (2nd Gen Type-C). Designed for premium sound lovers, these earbuds deliver top-level performance, deep bass, crystal-clear vocals, and a luxury listening experience just like the original.\n\nFeaturing Apple Care+ 2-Year Serial Number Working, Double China Pack Box, and the Topmost Premium Quality, this version offers unmatched finishing and performance. Enjoy Adaptive Noise Cancellation, Spatial Audio, and Conversation Awareness, giving you an immersive and smart audio experience for music, calls, travel, and daily use.\n\nBuilt with Wireless Charging Support, Volume Up/Down Controls, Beep Sound Function, and Same Original Ear Tips, these earbuds are made for comfort, convenience, and all-day use.\n\nAvailable Features:\n✔ Apple AirPods Pro 2nd Gen Type-C Version\n✔ Apple Care+ 2-Year Serial Number Working\n✔ Double China Premium Pack Box\n✔ Topmost Premium Quality Finish\n✔ Heavy Bass & Crystal Clear Sound\n✔ Adaptive Noise Cancellation Working\n✔ Spatial Audio Support\n✔ Conversation Awareness Feature\n✔ Same Original Soft Ear Tips\n✔ Wireless Charging Working\n✔ Volume Up / Down Control\n✔ Beep Sound Function\n✔ Perfect for Music, Calls, Travel & Gaming\n\n👑 Once you buy this quality, you’ll always ask for the same quality!",
          category: "Audio",
          image:
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800",
        },
        mousekeyboard: {
          title: "Multi-Purpose Wireless Mouse and Keyboard Kit",
          price: "₹ 1,199",
          oldPrice: "₹ 2,399",
          desc: "Boost your productivity with the Multi-Purpose Wireless Mouse and Keyboard Kit. Designed for work, study, and daily use, this premium combo offers smooth performance, stylish design, and wide compatibility for all your devices.\n\nFeaturing a Dual Mode Rechargeable Mouse & Keyboard, this set provides seamless wireless connectivity and hassle-free usage without the need for constant battery replacement. The included Type-C charging support ensures fast and convenient recharging for uninterrupted performance.\n\nCompatible with Android phones, iPhone, PC, and Mac, this versatile combo is perfect for office work, online classes, business use, gaming, and travel. Its compact design and mix color options add both style and convenience to your setup.\n\nKey Features:\n✔ Dual Mode Wireless Keyboard & Mouse\n✔ Rechargeable Design – No Extra Batteries Needed\n✔ Fast Type-C Charging Support\n✔ Smooth & Silent Performance\n✔ Compatible with Android Phone\n✔ Compatible with iPhone\n✔ Compatible with PC & Mac\n✔ Stylish Mix Colour Options\n✔ Lightweight & Portable Design\n✔ Perfect for Work, Study & Daily Use\n\nA smart and stylish wireless combo built for comfort, convenience, and maximum productivity",
          category: "Computer Accessories",
          image:
            "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
        },
        combokit: {
          title:
            "Multifunctional Combo Kit – Flashlight, Cigarette Lighter, Cable Set & Type-C Earphones",
          price: "₹ 899",
          oldPrice: "₹ 1,799",
          desc: "Get everyday convenience in one smart package with the Multifunctional Combo Kit. This premium combo is designed for users who want useful gadgets combined in one practical set for daily life, travel, office, and personal use.\n\nThe combo includes a powerful flashlight with an inbuilt cigarette lighter, making it perfect for emergency use and outdoor convenience. It also comes with a multiple cable set featuring a built-in phone stand, allowing easy charging and comfortable mobile viewing anytime, anywhere.\n\nTo complete the package, high-quality Type-C earphones are included for clear music, smooth calling, and daily entertainment. Stylish, practical, and highly useful—this combo kit is perfect for gifting or personal use.\n\nKey Features:\n✔ Powerful Flashlight with Bright Light Output\n✔ Inbuilt Cigarette Lighter Function\n✔ Multiple Charging Cable Set\n✔ Built-in Mobile Phone Stand\n✔ Premium Type-C Earphones Included\n✔ Perfect for Travel, Office & Daily Use\n✔ Compact, Stylish & Useful Combo Set\n✔ Ideal for Personal Use or Gift Purpose\n\nA smart all-in-one combo designed for convenience, utility, and everyday lifestyle needs.",
          category: "Gadgets",
          image:
            "https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?auto=format&fit=crop&q=80&w=800",
        },
        applewatchultra: {
          title:
            "Apple Watch Ultra - Premium Smartwatch with Bluetooth Calling & Fitness Tracking",
          price: "₹ 2,999",
          oldPrice: "₹ 5,999",
          desc: "Upgrade your style and smart lifestyle with the Apple Watch Ultra  – 7 in 1 Strap (49MM). Designed with a premium ultra look and powerful smart features, this watch is perfect for daily wear, fitness tracking, and business use.\n\nThis model comes with 7 interchangeable straps—change your style every day of the week! The box includes 7 straps, watch protector, wireless fast charging cable, and manual book for a complete premium package.\n\nBuilt with backside real screws, secure strap locking system, ultra original wallpapers, and new watch faces, it gives the authentic luxury feel. The triple button design with working scroll ensures smooth operation and connectivity with all devices.\n\nEnjoy Bluetooth calling with call making and answering directly from your wrist, along with powerful features like phonebook, call log, dialer, calculator, notifications, calendar, alarms, and more.\n\nKey Features:\n✔ 7 in 1 Strap Series 8 Ultra (49MM)\n✔ 7 Changeable Straps Included\n✔ Watch Protector + Wireless Fast Charging Cable\n✔ Bluetooth Calling (Make & Answer Calls)\n✔ Triple Button with Working Scroll\n✔ Real Backside Screws & Secure Strap Lock\n✔ Original Ultra Wallpapers & New Faces\n✔ Heart Rate / BP / ECG + PPG Monitor\n✔ Fitness Modes with Multiple Sports Categories\n✔ Compatible with All Devices",
          category: "Smart Watches",
          image:
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800",
        },
        airpodspro3: {
          title:
            "AirPods Pro 3 – Premium ANC Wireless Earbuds with H2 Chip & USB-C Charging",
          price: "₹ 2,799",
          oldPrice: "₹ 5,599",
          desc: "Feel the power of crystal-clear music with the AirPods Pro 3. Designed for premium sound lovers, these earbuds deliver rich bass, sharp vocals, and an immersive listening experience in every beat.\n\nEquipped with the advanced H2 chip, Active Noise Cancellation (ANC), and Adaptive EQ, AirPods Pro 3 automatically optimize sound according to your ears for a truly personalized audio experience. Whether you're listening to music, taking calls, traveling, or working out, these earbuds provide smooth performance and all-day comfort.\n\nWith up to 8 hours of playtime, IP57 water resistance, and ultra-fast USB-C charging, they are built to keep up with your daily lifestyle. Stylish, lightweight, and powerful—your perfect audio companion for every moment.\n\nKey Features:\n✔ Advanced H2 Chip for Faster Performance\n✔ Active Noise Cancellation (ANC)\n✔ Adaptive EQ for Personalized Sound\n✔ Crystal Clear Audio with Deep Bass\n✔ Up to 8 Hours Playtime\n✔ IP57 Water & Sweat Resistance\n✔ Fast USB-C Charging Support\n✔ Premium Comfort Fit Design\n✔ Perfect for Music, Calls, Travel & Workouts",
          category: "Audio",
          image:
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800",
        },
        jblflip6: {
          title: "JBL Flip 6+ Wireless Speaker",
          price: "₹ 2,199",
          oldPrice: "₹ 4,399",
          desc: "Enjoy powerful sound and premium build quality with the JBL Flip 6+ Wireless Speaker. Designed for music lovers who want deep bass, clear vocals, and strong wireless performance, this speaker delivers an impressive audio experience for indoor and outdoor use.\n\nBuilt with high premium quality materials and featuring Original China Packing (not local sticker packing), it offers a more authentic premium feel. The Original Dual Speakers provide louder sound output with enhanced bass and balanced stereo performance, making it perfect for parties, travel, gaming, and daily entertainment.\n\nThis Master Replica version is crafted with attention to detail, giving you the premium look, feel, and performance similar to the original at a great value.\n\nKey Features:\n✔ Original China Packing (Not Local Sticker Version)\n✔ High Premium Build Quality\n✔ Original Dual Speaker System\n✔ Powerful Bass & Clear Sound Output\n✔ Strong Wireless Bluetooth Connectivity\n✔ Portable & Stylish Design\n✔ Perfect for Indoor & Outdoor Use\n✔ Master Replica Premium Version\n\nIdeal for music, travel, parties, office, and daily entertainment—premium sound with premium style.",
          category: "Audio",
          image:
            "https://images.unsplash.com/photo-1608223652613-2dfc6fc2e389?auto=format&fit=crop&q=80&w=800",
        },
        earpods: {
          title: "Apple Type-C / Lightning Wired EarPods",
          price: "₹ 999",
          oldPrice: "₹ 1,999",
          desc: "Experience crystal-clear sound and premium comfort with the Apple Type-C / Lightning Wired EarPods. Designed with superb quality and powerful audio output, these earphones deliver a rich listening experience just like original handsfree.\n\nUnlike traditional round earbuds, the unique EarPods design is shaped according to ear geometry, making them more comfortable and secure for long-time use. The high-quality built-in speakers maximize sound output, giving you deep bass, clear vocals, and balanced sound for music, videos, and calls.\n\nAvailable with both Type-C Connector and Lightning Connector, these earphones are perfect for modern smartphones and devices. It also features a built-in remote and microphone, allowing you to adjust volume, control music playback, and answer or end calls easily.\n\nKey Features:\n✔ Apple OG Style Premium Packing\n✔ Superb Sound Quality with Deep Bass\n✔ Comfortable Ergonomic EarPods Design\n✔ Type-C / Lightning Connector Options\n✔ Built-in Mic for Clear Calling\n✔ Volume & Music Control Remote\n✔ Smooth Calling, Music & Video Experience\n✔ Same Like Original Handsfree Quality",
          category: "Audio",
          image:
            "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&q=80&w=800",
        },
      };

      function renderProduct(productId) {
        if (productId && PRODUCT_DB[productId]) {
          currentProductId = productId;
          const p = PRODUCT_DB[productId];
          document.getElementById("product-title").innerText = p.title;
          document.getElementById("product-title-crumb").innerText = p.title;
          document.getElementById("product-category-crumb").innerText =
            p.category;
          document.getElementById("product-price").innerText = p.price;
          document.getElementById("product-old-price").innerText = p.oldPrice;
          document.getElementById("product-desc").innerHTML = p.desc.replace(
            /\n/g,
            "<br/>",
          );
          document.getElementById("main-image").src = p.image;

          // Optionally update the thumbnails or color selections based on the product.
          // For now just update the visible thumbnails to the same image.
          document
            .querySelectorAll(".aspect-square.cursor-pointer img")
            .forEach((img) => (img.src = p.image));
        }
      }

      function showProduct(e, productId) {
        if (e) e.preventDefault();
        window.location.href = '/product.html?id=' + encodeURIComponent(productId);
      }

      function renderCollection(category) {
        const grid = document.getElementById("collection-grid");
        if(!grid) return;
        const heading = document.getElementById("collection-heading");
        const titleCrumb = document.getElementById("collection-title");
        if(heading) heading.innerText = category;
        if(titleCrumb) titleCrumb.innerText = category;
        
        let html = '';
        for (const id in PRODUCT_DB) {
          const p = PRODUCT_DB[id];
          if (category === 'All Products' || p.category === category) {
             html += `
              <a href="#" onclick="showProduct(event, '${id}')" class="group flex flex-col cursor-pointer block">
                <div class="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 h-full md:h-auto object-cover">
                  <button class="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white" onclick="event.preventDefault()">
                    <i data-lucide="heart" class="w-4 h-4 text-black"></i>
                  </button>
                  <img src="${p.image}" alt="${p.title}" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" referrerpolicy="no-referrer" />
                  <img src="${p.image}" alt="${p.title}" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" referrerpolicy="no-referrer" />
                  <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button class="w-full bg-white text-black font-semibold text-xs py-3.5 uppercase tracking-widest hover:bg-black hover:text-white hover:scale-[1.02] transition-all duration-300" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${id}')">ADD TO CART</button>
                  </div>
                </div>
                <div class="flex flex-col mt-2">
                  <h3 class="text-sm md:text-base font-medium text-gray-700 truncate mb-1.5">${p.title}</h3>
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="text-sm md:text-base font-semibold text-black">${p.price}</span>
                    <span class="text-xs md:text-sm text-gray-400 line-through">${p.oldPrice}</span>
                    <span class="text-[0.65rem] font-semibold tracking-widest text-red-600 uppercase">50% OFF</span>
                  </div>
                </div>
              </a>
             `;
          }
        }
        grid.innerHTML = html;
        if(window.lucide) window.lucide.createIcons();
      }

      function showCollection(e, category) {
        if (e) e.preventDefault();
        window.location.href = '/shop.html' + (category && category !== 'All Products' ? '?category=' + encodeURIComponent(category) : '');
      }

      // About Us Modal
      function openAboutModal(tab = "about") {
        // Reset to default
        showModalTab(tab);
        document.getElementById("about-us-modal").classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }

      function closeAboutModal() {
        document.getElementById("about-us-modal").classList.add("hidden");
        document.body.style.overflow = "";
      }

      // Search Modal
      function openSearchModal() {
        document.getElementById("search-modal").classList.remove("hidden");
        document.body.style.overflow = "hidden";
        setTimeout(() => {
          document.getElementById("search-input").focus();
        }, 100);
        document.getElementById("search-input").value = "";
        document.getElementById("search-results").innerHTML =
          '<p class="text-gray-500 text-center mt-10">Start typing to search...</p>';
      }

      function closeSearchModal() {
        document.getElementById("search-modal").classList.add("hidden");
        document.body.style.overflow = "";
      }

      function performSearch(query) {
        const resultsContainer = document.getElementById("search-results");
        if (query.trim().length === 0) {
          resultsContainer.innerHTML =
            '<p class="text-gray-500 text-center mt-10">Start typing to search...</p>';
          return;
        }

        const q = query.toLowerCase();
        const matches = Object.keys(PRODUCT_DB).filter((id) => {
          const p = PRODUCT_DB[id];
          return (
            p.title.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
          );
        });

        if (matches.length === 0) {
          resultsContainer.innerHTML =
            '<p class="text-gray-500 text-center mt-10">No products found for "' +
            query +
            '"</p>';
          return;
        }

        resultsContainer.innerHTML = matches
          .map((id) => {
            const p = PRODUCT_DB[id];
            return `
          <a href="#" onclick="closeSearchModal(); showProduct(event, '${id}')" class="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
            <div class="h-20 w-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <h4 class="text-base font-bold text-gray-900 truncate">${p.title}</h4>
              <p class="text-sm text-gray-500 truncate mb-1">${p.category}</p>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-black">${p.price}</span>
                <span class="text-xs text-gray-400 line-through">${p.oldPrice}</span>
              </div>
            </div>
          </a>
        `;
          })
          .join("");
      }

      function showModalTab(tab) {
        // Hide all contents
        document
          .querySelectorAll('[id^="modal-content-"]')
          .forEach((el) => el.classList.add("hidden"));
        document.querySelectorAll('[id^="tab-btn-"]').forEach((el) => {
          el.classList.remove("border-b-2", "border-black", "text-black");
          el.classList.add("text-gray-500");
        });

        // Show selected
        document
          .getElementById("modal-content-" + tab)
          .classList.remove("hidden");
        document
          .getElementById("tab-btn-" + tab)
          .classList.add("border-b-2", "border-black", "text-black");
        document
          .getElementById("tab-btn-" + tab)
          .classList.remove("text-gray-500");

        const titles = {
          about: "About Gadget Dunia",
          faq: "FAQ",
          contact: "Contact Us",
          earn: "Earn with Us",
        };
        document.getElementById("modal-title").innerText = titles[tab];
      }

      // Product Page Specific Logic

      // Main Image Updater
      function updateMainImage(thumbElement) {
        // Remove selected styling from all thumbnails
        document
          .querySelectorAll(".aspect-square.cursor-pointer")
          .forEach((el) => {
            el.classList.remove("border-black");
            el.classList.add("border-transparent");
          });

        // Add selected styling to clicked thumbnail
        thumbElement.classList.remove("border-transparent");
        thumbElement.classList.add("border-black");

        // Update main image source
        const newSrc = thumbElement.querySelector("img").src;
        document.getElementById("main-image").src = newSrc;
      }

      // Color Selector
      function selectColor(btnElement, colorName) {
        // Update text
        document.getElementById("selected-color").innerText = colorName;

        // Reset all buttons ring
        document.querySelectorAll(".flex.gap-3 button").forEach((el) => {
          el.classList.remove("ring-black", "ring-2");
          el.classList.add("ring-1", "ring-transparent");
        });

        // Set active button ring
        btnElement.classList.remove("ring-1", "ring-transparent");
        btnElement.classList.add("ring-2", "ring-black");
      }

      // Quantity Counter
      function updateQuantity(change) {
        const input = document.getElementById("qty");
        let currentVal = parseInt(input.value);
        if (isNaN(currentVal)) currentVal = 1;

        let newVal = currentVal + change;
        if (newVal < 1) newVal = 1;

        input.value = newVal;
      }

      // Accordion
      function toggleAccordion(btnElement) {
        const content = btnElement.nextElementSibling;
        const icon = btnElement.querySelector(".accordion-icon");

        if (content.classList.contains("hidden")) {
          content.classList.remove("hidden");
          icon.classList.add("rotate-180");
        } else {
          content.classList.add("hidden");
          icon.classList.remove("rotate-180");
        }
      }

      // Auto-scroll logic for category carousel
      const carouselContainer = document.getElementById(
        "category-carousel-container",
      );
      let autoScrollInterval;
      let isHoveredOrTouched = false;

      function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          if (!isHoveredOrTouched && carouselContainer) {
            carouselContainer.scrollLeft += 1;
            // If we scrolled to the middle (where exactly the duplicated set starts), reset to 0
            if (
              carouselContainer.scrollLeft >=
              carouselContainer.scrollWidth / 2
            ) {
              carouselContainer.scrollLeft = 0;
            }
          }
        }, 20); // adjustable speed
      }

      function stopAutoScroll() {
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
          autoScrollInterval = null;
        }
      }

      if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", () => {
          isHoveredOrTouched = true;
        });
        carouselContainer.addEventListener("mouseleave", () => {
          isHoveredOrTouched = false;
        });
        carouselContainer.addEventListener(
          "touchstart",
          () => {
            isHoveredOrTouched = true;
          },
          { passive: true },
        );
        carouselContainer.addEventListener(
          "touchend",
          () => {
            // slight delay before resuming auto-scroll to let swipe momentum finish
            setTimeout(() => {
              isHoveredOrTouched = false;
            }, 1000);
          },
          { passive: true },
        );

        startAutoScroll();
      }
    