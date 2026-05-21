'use strict';

/**
 * PRELOAD
 */
const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
  if (preloader) {
    preloader.classList.add("loaded");
  }
  document.body.classList.add("loaded");
});

/**
 * Event listener utility
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}
addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    if (header) {
      header.classList.add("active");
      hideHeader();
    }
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    if (header) header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

/**
 * Typing text animation for hero subtitles
 */
const typeSubtitle = (activeSlide) => {
  const subtitleEl = activeSlide.querySelector(".section-subtitle");
  if (!subtitleEl) return;
  
  const originalText = subtitleEl.getAttribute("data-original-text") || subtitleEl.textContent.trim();
  if (!subtitleEl.getAttribute("data-original-text")) {
    subtitleEl.setAttribute("data-original-text", originalText);
  }
  
  if (subtitleEl.typingTimeout) {
    clearTimeout(subtitleEl.typingTimeout);
  }
  
  subtitleEl.innerHTML = `<span class="typing-text"></span>`;
  const typingSpan = subtitleEl.querySelector(".typing-text");
  
  let i = 0;
  typingSpan.textContent = "";
  const type = () => {
    if (i < originalText.length) {
      typingSpan.textContent += originalText.charAt(i);
      i++;
      subtitleEl.typingTimeout = setTimeout(type, 100);
    }
  };
  type();
};

/**
 * HERO SLIDER
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
const progressFill = document.getElementById("slider-progress-bar");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
  resetProgress();
  typeSubtitle(heroSliderItems[currentSlidePos]);
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}

if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);
if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoSlideInterval;
const startAutoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
  if (progressFill) {
    progressFill.classList.add("animating");
  }
}
const stopAutoSlide = function () {
  clearInterval(autoSlideInterval);
  if (progressFill) {
    progressFill.classList.remove("animating");
  }
}
const resetProgress = function () {
  if (progressFill) {
    progressFill.classList.remove("animating");
    void progressFill.offsetWidth; // force reflow
    progressFill.classList.add("animating");
  }
}

if (heroSliderNextBtn && heroSliderPrevBtn) {
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", stopAutoSlide);
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", startAutoSlide);
}

window.addEventListener("load", () => {
  if (heroSliderItems.length > 0) {
    startAutoSlide();
    typeSubtitle(heroSliderItems[0]);
  }
});

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speedX = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    const speedY = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${speedX}px, ${speedY}px, 0px)`;
  }
});

/**
 * SCROLL REVEAL ANIMATIONS (Intersection Observer)
 */
const revealElements = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

/**
 * TESTIMONIALS CAROUSEL
 */
const testiTrack = document.getElementById("testi-track");
const testiDots = document.querySelectorAll("[data-testi-dot]");
const testiCarousel = document.getElementById("testi-carousel");
let currentTestiSlide = 0;
let testiInterval;

const updateTestiSlide = (index) => {
  currentTestiSlide = index;
  if (testiTrack) {
    testiTrack.style.transform = `translateX(-${index * 100}%)`;
  }
  testiDots.forEach((dot, idx) => {
    if (idx === index) dot.classList.add("active");
    else dot.classList.remove("active");
  });
};

const nextTestiSlide = () => {
  let nextSlide = currentTestiSlide + 1;
  if (nextSlide >= testiDots.length) nextSlide = 0;
  updateTestiSlide(nextSlide);
};

const startTestiAuto = () => {
  testiInterval = setInterval(nextTestiSlide, 5000);
};
const stopTestiAuto = () => {
  clearInterval(testiInterval);
};

testiDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.testiDot, 10);
    updateTestiSlide(index);
    stopTestiAuto();
    startTestiAuto();
  });
});

if (testiCarousel) {
  testiCarousel.addEventListener("mouseenter", stopTestiAuto);
  testiCarousel.addEventListener("mouseleave", startTestiAuto);
  startTestiAuto();
}

/**
 * STATS COUNTER ANIMATION
 */
const counterElements = document.querySelectorAll("[data-counter]");
const startCounter = (element) => {
  const target = parseInt(element.dataset.counter, 10);
  const duration = 2000;
  const startTime = performance.now();
  
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing out quadratic
    const easeProgress = progress * (2 - progress);
    const currentValue = Math.floor(easeProgress * target);
    
    if (target === 10000) {
      element.textContent = (currentValue / 1000).toFixed(0) + "k+";
    } else if (target === 15 || target === 200) {
      element.textContent = currentValue + "+";
    } else {
      element.textContent = currentValue;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (target === 10000) {
        element.textContent = "10k+";
      } else if (target === 15 || target === 200) {
        element.textContent = target + "+";
      } else {
        element.textContent = target;
      }
    }
  };
  
  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(element => counterObserver.observe(element));

/**
 * IMAGE GALLERY LIGHTBOX
 */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const galleryItems = document.querySelectorAll("[data-gallery-item]");
let currentGalleryIdx = 0;

const galleryImages = Array.from(galleryItems).map(item => item.querySelector("img").src);

const openLightbox = (index) => {
  currentGalleryIdx = index;
  if (lightboxImg) lightboxImg.src = galleryImages[index];
  if (lightbox) lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (lightbox) lightbox.classList.remove("active");
  if (navbar && !navbar.classList.contains("active")) {
    document.body.style.overflow = "overlay";
  }
};

const showNextGalleryImage = () => {
  if (galleryImages.length === 0) return;
  currentGalleryIdx = (currentGalleryIdx + 1) % galleryImages.length;
  if (lightboxImg) lightboxImg.src = galleryImages[currentGalleryIdx];
};

const showPrevGalleryImage = () => {
  if (galleryImages.length === 0) return;
  currentGalleryIdx = (currentGalleryIdx - 1 + galleryImages.length) % galleryImages.length;
  if (lightboxImg) lightboxImg.src = galleryImages[currentGalleryIdx];
};

galleryItems.forEach((item, idx) => {
  item.addEventListener("click", () => openLightbox(idx));
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxNext) lightboxNext.addEventListener("click", showNextGalleryImage);
if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevGalleryImage);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

window.addEventListener("keydown", (e) => {
  if (lightbox && lightbox.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextGalleryImage();
    if (e.key === "ArrowLeft") showPrevGalleryImage();
  }
});

/**
 * DARK/LIGHT MODE TOGGLE
 */
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

/**
 * TOAST NOTIFICATIONS SYSTEM
 */
const toastContainer = document.getElementById("toast-container");

const showToast = (message, type = "success") => {
  if (!toastContainer) return;
  
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconName = "checkmark-circle-outline";
  if (type === "error") iconName = "alert-circle-outline";
  if (type === "info") iconName = "information-circle-outline";
  
  toast.innerHTML = `
    <span class="toast-icon"><ion-icon name="${iconName}"></ion-icon></span>
    <span class="toast-text">${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add("toast-exit");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 4000);
};

/**
 * BUTTON RIPPLE EFFECT
 */
const btns = document.querySelectorAll(".btn");
btns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Set ripple dimensions
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.marginLeft = `-${size / 2}px`;
    ripple.style.marginTop = `-${size / 2}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/**
 * FORM VALIDATION
 */
const validateForm = (form) => {
  let isValid = true;
  const inputs = form.querySelectorAll("[required]");
  
  // Clear previous errors
  form.querySelectorAll(".input-error-msg").forEach(el => el.remove());
  form.querySelectorAll(".input-field.error").forEach(el => el.classList.remove("error"));
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
      const errorMsg = document.createElement("p");
      errorMsg.className = "input-error-msg";
      errorMsg.textContent = `${input.placeholder || input.name || 'This field'} is required.`;
      input.parentNode.insertBefore(errorMsg, input.nextSibling);
    } else if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        input.classList.add("error");
        const errorMsg = document.createElement("p");
        errorMsg.className = "input-error-msg";
        errorMsg.textContent = "Please enter a valid email address.";
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
      }
    }
  });
  
  return isValid;
};

/**
 * DYNAMIC FORM SUBMISSIONS (Fetch API Integration)
 */
const wireForm = (formId, endpoint, successMsg) => {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!validateForm(form)) return;
    
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.classList.add("loading");
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Normalization of names
    if (data["reservation-date"]) {
      data.date = data["reservation-date"];
      delete data["reservation-date"];
    }
    if (data["email_address"]) {
      data.email = data["email_address"];
      delete data["email_address"];
    }
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        showToast(result.message || successMsg, "success");
        form.reset();
      } else {
        showToast(result.error || "Failed to submit form.", "error");
      }
    } catch (err) {
      showToast("Server error. Please check your connection.", "error");
    } finally {
      if (submitBtn) submitBtn.classList.remove("loading");
    }
  });
};

wireForm("reservation-form", "/api/reservations", "Reservation created successfully!");
wireForm("newsletter-form", "/api/newsletter", "Subscribed to newsletter successfully!");
wireForm("contact-form", "/api/contact", "Message sent successfully!");

/**
 * DYNAMIC MENU LOADING
 */
const menuGrid = document.getElementById("menu-grid");
const loadMenu = async () => {
  if (!menuGrid) return;
  
  try {
    const response = await fetch("/api/menu");
    if (response.ok) {
      const result = await response.json();
      const menuItems = result.data;
      
      if (menuItems.length > 0) {
        menuGrid.innerHTML = ""; // Clear static items
        
        menuItems.forEach((item, index) => {
          const li = document.createElement("li");
          li.setAttribute("data-reveal", "fade-up");
          li.style.animationDelay = `${index * 50}ms`;
          
          li.innerHTML = `
            <div class="menu-card hover:card">
              <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
                <img src="${item.image}" width="100" height="100" loading="lazy" alt="${item.name}" class="img-cover">
              </figure>
              <div>
                <div class="title-wrapper">
                  <h3 class="title-3">
                    <a href="#" class="card-title">${item.name}</a>
                  </h3>
                  ${item.badge ? `<span class="badge label-1">${item.badge}</span>` : ""}
                  <span class="span title-2">$${Number(item.price).toFixed(2)}</span>
                </div>
                <p class="card-text label-1">
                  ${item.description}
                </p>
              </div>
            </div>
          `;
          
          menuGrid.appendChild(li);
          revealObserver.observe(li);
        });
      }
    }
  } catch (err) {
    console.warn("Failed to load dynamic menu, using static HTML fallback", err);
  }
};

window.addEventListener("load", loadMenu);