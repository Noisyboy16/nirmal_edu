(function ($) {
	"use strict";

	$(document).ready(function () {

		// Preloader Animation
		$(window).on("load", function () {
			$("#js-preloader").addClass("loaded");

			if ($(".cover").length) {
				$(".cover").parallax({
					imageSrc: $(".cover").data("image"),
					zIndex: "1",
				});
			}

			$("#preloader").fadeOut(600, function () {
				$(this).css("visibility", "hidden");
			});
		});

		// **Auto Sliding for Slider**
		function startAutoSlide() {
			const slider = document.querySelector(".slider");
			const slides = document.querySelectorAll(".slide");
			let index = 0;
			const totalSlides = slides.length;

			function slideNext() {
				index = (index + 1) % totalSlides;
				slider.style.transform = `translateX(-${index * 100}%)`;
			}

			setInterval(slideNext, 3000); // **Auto-slide every 3 seconds**
		}
		startAutoSlide(); // **Initialize the slider**

		// **Auto Sliding for Second Slider (After About Us Section)**
		function startSecondAutoSlide() {
			const secondSlider = document.querySelector(".second-slider"); // Second Slider
			const secondSlides = document.querySelectorAll(".second-slide"); // Slides of second slider
			let index = 0;
			const totalSecondSlides = secondSlides.length;

			function slideNext() {
				index = (index + 1) % totalSecondSlides;
				secondSlider.style.transform = `translateX(-${index * 100}%)`;
			}

			setInterval(slideNext, 3000); // **Auto-slide every 3 seconds**
		}
		startSecondAutoSlide(); // **Initialize the second slider**

		// Sticky Header on Scroll
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();
			var boxHeight = $(".header-text").outerHeight();
			var headerHeight = $("header").outerHeight();

			if (scroll >= boxHeight - headerHeight) {
				$("header").addClass("background-header");
			} else {
				$("header").removeClass("background-header");
			}
		});

		// Window Resize Handling (Refresh on Mobile/Desktop Breakpoint Change)
		let initialWidth = $(window).width();
		$(window).on("resize", function () {
			let newWidth = $(window).width();
			if ((initialWidth > 767 && newWidth < 767) || (initialWidth < 767 && newWidth > 767)) {
				location.reload();
			}
		});

		// Isotope Filtering for Events
		const eventContainer = document.querySelector(".event_box");
		const filters = document.querySelector(".event_filter");

		if (eventContainer && typeof Isotope === "function") {
			const isotopeInstance = new Isotope(eventContainer, {
				itemSelector: ".event_outer",
				layoutMode: "masonry",
			});

			if (filters) {
				filters.addEventListener("click", function (event) {
					if (!event.target.matches("a")) return;

					const filterValue = event.target.getAttribute("data-filter");
					isotopeInstance.arrange({ filter: filterValue });

					filters.querySelector(".is_active")?.classList.remove("is_active");
					event.target.classList.add("is_active");

					event.preventDefault();
				});
			}
		}

		// Owl Carousel for Banner & Testimonials
		$(".owl-banner, .owl-testimonials").owlCarousel({
			center: true,
			items: 1,
			loop: true,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left" aria-hidden="true"></i>',
				'<i class="fa fa-angle-right" aria-hidden="true"></i>',
			],
			margin: 30,
			responsive: {
				992: { items: 1 },
				1200: { items: 1 },
			},
		});

		// Mobile Menu Toggle
		$(".menu-trigger").on("click", function () {
			$(this).toggleClass("active");
			$(".header-area .nav").slideToggle(200);
		});

		// Smooth Scroll for Anchor Links
		$(".scroll-to-section a[href^='#']").on("click", function (e) {
			e.preventDefault();

			let target = $(this.hash);
			if (target.length) {
				let width = $(window).width();
				if (width < 767) {
					$(".menu-trigger").removeClass("active");
					$(".header-area .nav").slideUp(200);
				}
				$("html, body").animate(
					{ scrollTop: target.offset().top - 80 },
					700
				);
			}
		});

		// Active Menu Item on Scroll
		function onScroll() {
			let scrollPos = $(document).scrollTop();
			$(".nav a").each(function () {
				let currLink = $(this);
				let refElement = $(currLink.attr("href"));

				if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$(".nav ul li a").removeClass("active");
					currLink.addClass("active");
				} else {
					currLink.removeClass("active");
				}
			});
		}

		$(document).on("scroll", onScroll);

		// Mobile Dropdown Menu Handling
		$(".main-nav ul.nav .has-sub > a").on("click", function (e) {
			e.preventDefault();

			let thisItemParent = $(this).parent("li");
			let thisItemParentSiblings = thisItemParent.siblings(".has-sub");
			let submenu = thisItemParent.find("> ul.sub-menu");

			if (submenu.is(":visible")) {
				submenu.slideUp(250, "easeInOutQuad");
				thisItemParent.removeClass("is-open-sub");
			} else {
				thisItemParent.addClass("is-open-sub");
				thisItemParentSiblings.removeClass("is-open-sub").find(".sub-menu").slideUp(250, "easeInOutQuad");
				submenu.slideDown(250, "easeInOutQuad");
			}
		});

	});

})(jQuery);