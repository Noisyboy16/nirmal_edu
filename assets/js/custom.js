(function ($) {
	"use strict";

	$(document).ready(function () {
		$(window).on("load", function () {
		  // Add loaded class for CSS transitions
		  $("#js-preloader").addClass("loaded");
	  
		  // Optional: hide the preloader completely after transition
		  setTimeout(function () {
			$("#js-preloader").css("display", "none");
		  }, 500); // Wait for CSS transition (0.25s) to finish
	  
		  // Parallax effect (if any)
		  var $cover = $(".cover");
		  if ($cover.length && $.fn.parallax) {
			$cover.parallax({
			  imageSrc: $cover.data("image"),
			  zIndex: 1,
			});
		  }
	  
		  // In case you're using #preloader elsewhere
		  $("#preloader").fadeOut(300, function () {
			$(this).css("visibility", "hidden");
		  });
		});
	  });
	  
		// -----------------------------------------
		// 📌 NEW CODE: Counter Animation
		// -----------------------------------------
		function animateCounters() {
			$('.count-number').each(function () {
				var $this = $(this);
				var countTo = $this.attr('data-to');
				var speed = parseInt($this.attr('data-speed'), 10);

				$({ countNum: 0 }).animate(
					{ countNum: countTo },
					{
						duration: speed,
						easing: 'swing',
						step: function () {
							$this.text(Math.floor(this.countNum));
						},
						complete: function () {
							$this.text(this.countNum);
						}
					}
				);
			});
		}

		// Run counter only when the section is visible
		let countersAnimated = false;
		$(window).on('scroll', function () {
			const offsetTop = $('.fun-facts').offset()?.top;
			const scrollTop = $(window).scrollTop();
			const windowHeight = $(window).height();

			if (!countersAnimated && offsetTop && scrollTop + windowHeight > offsetTop + 100) {
				animateCounters();
				countersAnimated = true;
			}
		});

		// -----------------------------------------
		// Auto Sliding for Slider
		// -----------------------------------------
		function startAutoSlide() {
			const slider = document.querySelector(".slider");
			const slides = document.querySelectorAll(".slide");
			let index = 0;
			const totalSlides = slides.length;

			function slideNext() {
				index = (index + 1) % totalSlides;
				slider.style.transform = `translateX(-${index * 100}%)`;
			}

			setInterval(slideNext, 3000);
		}
		startAutoSlide();

		// Auto Sliding for Second Slider (After About Us Section)
		function startSecondAutoSlide() {
			const secondSlider = document.querySelector(".second-slider");
			const secondSlides = document.querySelectorAll(".second-slide");
			const prevBtn = document.querySelector(".second-slider-btn.prev");
			const nextBtn = document.querySelector(".second-slider-btn.next");
		  
			let index = 0;
			const totalSlides = secondSlides.length;
		  
			function showSlide(i) {
			  index = (i + totalSlides) % totalSlides; // Wrap around
			  secondSlider.style.transform = `translateX(-${index * 100}%)`;
			}
		  
			function slideNext() {
			  showSlide(index + 1);
			}
		  
			function slidePrev() {
			  showSlide(index - 1);
			}
		  
			let autoSlideInterval = setInterval(slideNext, 3000);
		  
			// Add button click listeners
			nextBtn?.addEventListener("click", () => {
			  clearInterval(autoSlideInterval);
			  slideNext();
			  autoSlideInterval = setInterval(slideNext, 3000); // restart auto slide
			});
		  
			prevBtn?.addEventListener("click", () => {
			  clearInterval(autoSlideInterval);
			  slidePrev();
			  autoSlideInterval = setInterval(slideNext, 3000); // restart auto slide
			});
		  }
		  
		startSecondAutoSlide();

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

		// Resize Refresh
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

		// Owl Carousel
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

		// Smooth scroll
		$(".scroll-to-section a[href^='#']").on("click", function (e) {
			e.preventDefault();
			var target = $(this.hash);
			if (target.length) {
				if ($(window).width() < 767) {
					$(".menu-trigger").removeClass("active");
					$(".header-area .nav").slideUp(200);
				}
				$("html, body").animate({
					scrollTop: target.offset().top - 80
				}, 700);
			}
		});

		// Active Menu on Scroll
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

		// Mobile Dropdowns
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

		// Google Sheets Form Submit
		$("#contact-form").on("submit", function (e) {
			e.preventDefault();
			const formData = {
				name: $("#name").val(),
				school: $("#school").val(),
				standard: $("#standard").val(),
				phone: $("#phone").val(),
				email: $("#email").val(),
				message: $("#message").val(),
			};

			fetch("https://script.google.com/macros/s/AKfycbyaBzyyF1wpVot3ZPA616Dh1dUPFgGHBb5QlS6XbMg27yhaMNm5_dTFAHm-spVINpWLSQ/exec", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					alert("Form submitted successfully!");
				})
				.catch((error) => {
					console.error("Error:", error);
					alert("There was an error submitting the form.");
				});
		});

	});
})(jQuery);
