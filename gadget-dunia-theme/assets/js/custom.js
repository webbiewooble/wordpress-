document.addEventListener('DOMContentLoaded', function() {
	// Mobile Menu
	const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
	const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
	const mobileMenuPanel = document.getElementById('mobile-menu-panel');

	if (mobileMenuBtn) {
		mobileMenuBtn.addEventListener('click', () => {
			mobileMenuOverlay.classList.remove('hidden');
			// Small delay to allow the element to be rendered before transitioning
			setTimeout(() => {
				mobileMenuOverlay.classList.remove('opacity-0');
				mobileMenuPanel.classList.remove('-translate-x-full');
			}, 10);
			document.body.style.overflow = 'hidden';
		});
	}

	function closeMobileMenu() {
		mobileMenuOverlay.classList.add('opacity-0');
		mobileMenuPanel.classList.add('-translate-x-full');
		setTimeout(() => {
			mobileMenuOverlay.classList.add('hidden');
		}, 300);
		document.body.style.overflow = '';
	}

	if (closeMobileMenuBtn) {
		closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
	}
	if (mobileMenuOverlay) {
		mobileMenuOverlay.addEventListener('click', closeMobileMenu);
	}
	
	lucide.createIcons();
});

// Search Modal
function openSearchModal() {
	// Will be custom logic if we implement WordPress native search using this modal
	const modalContent = `
	<div id="search-modal" class="fixed inset-0 z-[70] bg-white text-black p-4 md:p-8 overflow-y-auto">
		<div class="max-w-4xl mx-auto pt-10">
			<div class="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
				<form action="/" method="GET" class="w-full flex items-center pr-4">
					<input type="text" name="s" placeholder="Search for products..." class="w-full text-2xl md:text-5xl font-extrabold tracking-tighter placeholder-gray-300 border-none outline-none focus:ring-0 bg-transparent" autofocus>
					<input type="hidden" name="post_type" value="product" />
					<button type="submit" class="text-black"><i data-lucide="search" class="w-8 h-8"></i></button>
				</form>
				<button onclick="document.getElementById('search-modal').remove(); document.body.style.overflow='';" class="text-gray-400 hover:text-black transition-colors pl-4 border-l border-gray-200">
					<i data-lucide="x" class="w-8 h-8 md:w-12 md:h-12"></i>
				</button>
			</div>
			<!-- Search results container could be ajax based, but here we just submit the form. -->
		</div>
	</div>
	`;
	document.body.insertAdjacentHTML('beforeend', modalContent);
	document.body.style.overflow = 'hidden';
	lucide.createIcons();
}

// About Us Modal
function openAboutModal(tab = 'about') {
	const modalHTML = `
	<div id="about-us-modal" class="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4">
		<div class="bg-white max-w-2xl w-full p-8 rounded-lg overflow-y-auto max-h-[90vh] text-black">
		<div class="flex justify-between items-center mb-6">
			<h2 id="modal-title" class="text-xl font-bold uppercase tracking-tight">About Gadget Dunia</h2>
			<button onclick="closeAboutModal()" class="text-gray-500 hover:text-black">
			<i data-lucide="x" class="w-6 h-6"></i>
			</button>
		</div>

		<!-- Tabs -->
		<div class="flex space-x-4 mb-6 border-b border-gray-200 overflow-x-auto whitespace-nowrap hide-scrollbar">
			<button onclick="showModalTab('about')" class="pb-2 text-sm font-semibold uppercase tracking-widest text-black border-b-2 border-black tab-btn" id="tab-btn-about">About</button>
			<button onclick="showModalTab('faq')" class="pb-2 text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-black tab-btn" id="tab-btn-faq">FAQ</button>
			<button onclick="showModalTab('contact')" class="pb-2 text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-black tab-btn" id="tab-btn-contact">Contact Us</button>
			<button onclick="showModalTab('earn')" class="pb-2 text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-black tab-btn" id="tab-btn-earn">Earn with Us</button>
		</div>

		<!-- Tab Contents -->
		<div id="modal-content-about" class="text-gray-800 space-y-4 text-sm leading-relaxed tab-content">
			<p>Welcome to Gadget Dunia, your one-stop destination for the latest, trending, and most innovative products in tech and lifestyle.</p>
		</div>
		<div id="modal-content-faq" class="text-gray-800 space-y-6 text-sm leading-relaxed hidden tab-content">
			<div>
				<h3 class="font-bold mb-1">When will I get my delivery?</h3>
				<p class="text-gray-600">Standard delivery takes 2 to 4 business days depending on your location.</p>
			</div>
			<div>
				<h3 class="font-bold mb-1">What is your refund policy?</h3>
				<p class="text-gray-600">We offer a 7-day hassle-free return and exchange policy for defective or completely unused items in original packaging.</p>
			</div>
			<div>
				<h3 class="font-bold mb-1">How can I track my order?</h3>
				<p class="text-gray-600">You will receive a tracking link via email once your order is processed.</p>
			</div>
		</div>
		<div id="modal-content-contact" class="text-gray-800 space-y-4 text-sm leading-relaxed hidden tab-content">
			<p><strong>Customer Support:</strong> support@gadgetduniya.com</p>
			<p><strong>Phone:</strong> +91 98765 43210 (Mon-Sat, 10 AM - 6 PM)</p>
		</div>
		<div id="modal-content-earn" class="text-gray-800 space-y-4 text-sm leading-relaxed hidden tab-content">
			<h3 class="font-bold text-base">Affiliate Program</h3>
			<p>Join the Gadget Dunia affiliate program and start earning commissions by referring customers to our store.</p>
		</div>

		</div>
	</div>
	`;
	
	const existing = document.getElementById('about-us-modal');
	if (existing) existing.remove();
	
	document.body.insertAdjacentHTML('beforeend', modalHTML);
	document.body.style.overflow = "hidden";
	lucide.createIcons();
	showModalTab(tab);
}

function closeAboutModal() {
	const modal = document.getElementById("about-us-modal");
	if (modal) modal.remove();
	document.body.style.overflow = "";
}

function showModalTab(tab) {
	document.querySelectorAll(".tab-content").forEach((el) => {
		el.classList.add("hidden");
	});
	const contentEl = document.getElementById("modal-content-" + tab);
	if (contentEl) contentEl.classList.remove("hidden");

	document.querySelectorAll(".tab-btn").forEach((btn) => {
		btn.classList.add("text-gray-500", "hover:text-black");
		btn.classList.remove("text-black", "border-b-2", "border-black");
	});

	const btnEl = document.getElementById("tab-btn-" + tab);
	if (btnEl) {
		btnEl.classList.add("text-black", "border-b-2", "border-black");
		btnEl.classList.remove("text-gray-500", "hover:text-black");
	}

	const titles = {
		about: "About Gadget Dunia",
		faq: "FAQ",
		contact: "Contact Us",
		earn: "Earn with Us",
	};
	const titleEl = document.getElementById("modal-title");
	if (titleEl) titleEl.innerText = titles[tab];
}
