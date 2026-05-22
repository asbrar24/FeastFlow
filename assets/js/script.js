'use strict';

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const formatCurrency = (amount) => CURRENCY_FORMATTER.format(Number(amount) || 0);
const normalizeAssetPath = (path) => {
  if (!path) return "./assets/images/menu-1.jpg";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith("/")) return `.${path}`;
  return path;
};

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
          const imagePath = normalizeAssetPath(item.image);
          const li = document.createElement("li");
          li.setAttribute("data-reveal", "fade-up");
          li.style.animationDelay = `${index * 50}ms`;
          
          li.innerHTML = `
            <div class="menu-card hover:card">
              <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
                <img src="${imagePath}" width="100" height="100" loading="lazy" alt="${item.name}" class="img-cover" onerror="this.onerror=null;this.src='./assets/images/menu-1.jpg';">
              </figure>
              <div>
                <div class="title-wrapper">
                  <h3 class="title-3">
                    <a href="#menu" class="card-title">${item.name}</a>
                  </h3>
                  ${item.badge ? `<span class="badge label-1">${item.badge}</span>` : ""}
                  <span class="span title-2">${formatCurrency(item.price)}</span>
                </div>
                <p class="card-text label-1" style="margin-bottom: 15px;">
                  ${item.description}
                </p>
                <button class="btn btn-secondary add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${imagePath}" style="width: 100%; justify-content: center; padding: 6px 16px; margin-top: auto;">
                  <span class="text text-1">Add to Cart</span>
                  <span class="text text-2" aria-hidden="true">Add to Cart</span>
                </button>
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

/**
 * ---------------------------------------------
 * E-COMMERCE & CLIENT AUTH MANAGEMENT SYSTEM
 * ---------------------------------------------
 */

// Global Modals State Management
const openAuthModal = () => {
  const authModal = document.getElementById("auth-modal");
  if (authModal) authModal.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeAuthModal = () => {
  const authModal = document.getElementById("auth-modal");
  if (authModal) authModal.classList.remove("active");
  document.body.style.overflow = "overlay";
};

const openCheckoutModal = () => {
  const checkoutModal = document.getElementById("checkout-modal");
  if (checkoutModal) {
    checkoutModal.classList.add("active");
    
    // Update summary values
    const itemsCount = getCartItemCount();
    const orderTotal = getCartTotal();
    document.getElementById("checkout-items-count").textContent = itemsCount;
    document.getElementById("checkout-order-total").textContent = formatCurrency(orderTotal);
  }
  document.body.style.overflow = "hidden";
};

const closeCheckoutModal = () => {
  const checkoutModal = document.getElementById("checkout-modal");
  if (checkoutModal) checkoutModal.classList.remove("active");
  document.body.style.overflow = "overlay";
};

const openOrdersModal = () => {
  const ordersModal = document.getElementById("orders-modal");
  if (ordersModal) {
    ordersModal.classList.add("active");
    loadOrderHistory();
  }
  document.body.style.overflow = "hidden";
};

const closeOrdersModal = () => {
  const ordersModal = document.getElementById("orders-modal");
  if (ordersModal) ordersModal.classList.remove("active");
  document.body.style.overflow = "overlay";
};

const toggleCartDrawer = () => {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  
  if (drawer && overlay) {
    drawer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

const closeCartDrawer = () => {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  
  if (drawer && overlay) {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }
};

// Cart Data Layer
const getCart = () => {
  try {
    const cart = localStorage.getItem("feastflow_cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem("feastflow_cart", JSON.stringify(cart));
  updateCartUI();
};

const getCartItemCount = () => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

const getCartTotal = () => {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const addToCart = (id, name, price, image) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price: Number(price),
      image,
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(`Added ${name} to cart!`, "success");
};

const updateCartQuantity = (id, amount) => {
  let cart = getCart();
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart(cart);
};

const removeCartItem = (id) => {
  let cart = getCart();
  const item = cart.find(item => item.id === id);
  const name = item ? item.name : "Item";
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  showToast(`Removed ${name} from cart.`, "info");
};

const clearCart = () => {
  saveCart([]);
};

// Cart UI Synchronizer
const updateCartUI = () => {
  const cart = getCart();
  
  // Update badge count
  const count = getCartItemCount();
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = count;
  }

  const drawerBody = document.getElementById("cart-drawer-body");
  const drawerFooter = document.getElementById("cart-drawer-footer");
  const subtotalText = document.getElementById("cart-subtotal");

  if (!drawerBody) return;

  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="cart-empty-message">
        <ion-icon name="bag-handle-outline" style="font-size: 48px; color: var(--gold-color); margin-bottom: 15px;"></ion-icon>
        <p class="body-3" style="color: var(--white-40); margin-bottom: 20px;">Your cart is empty.</p>
        <a href="#menu" class="btn btn-secondary" id="cart-drawer-shop-btn">
          <span class="text text-1">Order Food</span>
          <span class="text text-2" aria-hidden="true">Order Food</span>
        </a>
      </div>
    `;
    if (drawerFooter) drawerFooter.style.display = "none";
  } else {
    drawerBody.innerHTML = "";
    
    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${normalizeAssetPath(item.image)}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null;this.src='./assets/images/menu-1.jpg';">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
      <p class="cart-item-price">${formatCurrency(item.price)}</p>
          <div class="cart-item-controls">
            <button class="cart-qty-btn decrease-qty" data-id="${item.id}">-</button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="cart-qty-btn increase-qty" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      `;
      drawerBody.appendChild(itemEl);
    });

    if (drawerFooter) drawerFooter.style.display = "block";
    if (subtotalText) {
      subtotalText.textContent = formatCurrency(getCartTotal());
    }

    // Attach button listeners inside drawer
    drawerBody.querySelectorAll(".decrease-qty").forEach(btn => {
      btn.addEventListener("click", () => {
        updateCartQuantity(btn.dataset.id, -1);
      });
    });

    drawerBody.querySelectorAll(".increase-qty").forEach(btn => {
      btn.addEventListener("click", () => {
        updateCartQuantity(btn.dataset.id, 1);
      });
    });

    drawerBody.querySelectorAll(".cart-item-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        removeCartItem(btn.dataset.id);
      });
    });
  }
};

// Client Authentication Manager
const updateAuthUI = () => {
  const authWrapper = document.getElementById("auth-wrapper");
  if (!authWrapper) return;

  const token = localStorage.getItem("feastflow_token");
  const userStr = localStorage.getItem("feastflow_user");

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      authWrapper.innerHTML = `
        <button class="user-profile-btn" id="user-profile-btn">
          <ion-icon name="person-outline"></ion-icon>
          <span>${user.name}</span>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
        <div class="profile-dropdown" id="profile-dropdown">
          ${user.role === 'admin' ? `
            <a href="./admin.html" class="dropdown-item">
              <ion-icon name="speedometer-outline"></ion-icon>
              <span>Dashboard</span>
            </a>
          ` : ''}
          <button class="dropdown-item" id="btn-order-history">
            <ion-icon name="receipt-outline"></ion-icon>
            <span>Order History</span>
          </button>
          <button class="dropdown-item" id="btn-logout" style="border-top: 1px solid var(--white-alpha-10);">
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Logout</span>
          </button>
        </div>
      `;

      // Toggle dropdown menu
      const profileBtn = document.getElementById("user-profile-btn");
      const dropdown = document.getElementById("profile-dropdown");
      
      profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileBtn.classList.toggle("active");
        dropdown.classList.toggle("active");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        if (profileBtn && dropdown) {
          profileBtn.classList.remove("active");
          dropdown.classList.remove("active");
        }
      });

      // Logout handler
      document.getElementById("btn-logout").addEventListener("click", () => {
        localStorage.removeItem("feastflow_token");
        localStorage.removeItem("feastflow_user");
        showToast("Logged out successfully.", "info");
        updateAuthUI();
      });

      // Order History handler
      document.getElementById("btn-order-history").addEventListener("click", () => {
        openOrdersModal();
      });

    } catch (err) {
      console.error("Failed to parse user details:", err);
      renderLoggedOutUI();
    }
  } else {
    renderLoggedOutUI();
  }
};

const renderLoggedOutUI = () => {
  const authWrapper = document.getElementById("auth-wrapper");
  if (!authWrapper) return;
  
  authWrapper.innerHTML = `
    <button class="btn btn-primary" id="btn-signin">
      <span class="text text-1">Sign In</span>
      <span class="text text-2" aria-hidden="true">Sign In</span>
    </button>
  `;
  
  // Wire sign in button to modal
  document.getElementById("btn-signin").addEventListener("click", () => {
    openAuthModal();
  });
};

// Customer Order History Loader
const loadOrderHistory = async () => {
  const ordersBody = document.getElementById("orders-modal-body");
  if (!ordersBody) return;

  const token = localStorage.getItem("feastflow_token");
  if (!token) {
    ordersBody.innerHTML = `<p class="text-center" style="color: var(--white-40); padding: 20px;">Please sign in to view your orders.</p>`;
    return;
  }

  ordersBody.innerHTML = `<p class="text-center" style="color: var(--white-40); padding: 20px;">Loading your orders...</p>`;

  try {
    const response = await fetch("/api/orders", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const result = await response.json();

    if (response.ok && result.success) {
      const orders = result.data;
      
      if (orders.length === 0) {
        ordersBody.innerHTML = `<p class="text-center" style="color: var(--white-40); padding: 20px;">You have not placed any orders yet.</p>`;
      } else {
        ordersBody.innerHTML = "";
        
        orders.forEach(order => {
          const formattedDate = new Date(order.createdAt).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          });
          
          const itemsListHtml = order.items.map(item => `
            <div class="order-item-row">
              <span>${item.name} x ${item.quantity}</span>
              <span>${formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('');

          const orderCard = document.createElement("div");
          orderCard.className = "order-history-card";
          orderCard.innerHTML = `
            <div class="order-history-header">
              <span class="order-id">ID: #${order.id.slice(0, 8)}</span>
              <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            <div class="order-items-container">
              ${itemsListHtml}
            </div>
            <div class="order-history-footer">
              <span style="color: var(--white-40); font-size: 1.2rem;">${formattedDate}</span>
              <span class="title-3" style="color: var(--gold-color);">${formatCurrency(order.totalPrice)}</span>
            </div>
            ${order.notes ? `
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dotted var(--white-alpha-10); font-size: 1.2rem; color: var(--white-40);">
                <strong>Instructions:</strong> ${order.notes}
              </div>
            ` : ''}
          `;
          
          ordersBody.appendChild(orderCard);
        });
      }
    } else {
      ordersBody.innerHTML = `<p class="text-center" style="color: var(--white-40); padding: 20px;">Failed to load order history: ${result.error || 'unknown error'}</p>`;
    }
  } catch (err) {
    ordersBody.innerHTML = `<p class="text-center" style="color: var(--white-40); padding: 20px;">Server error while loading orders.</p>`;
  }
};

// Initializer Event Subscriptions
const initAuthAndCart = () => {
  // Toggle forms inside login modal
  const toSignupBtn = document.getElementById("switch-to-signup");
  const toLoginBtn = document.getElementById("switch-to-login");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const authTitle = document.getElementById("auth-modal-title");

  if (toSignupBtn && toLoginBtn && loginForm && registerForm) {
    toSignupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      if (authTitle) authTitle.textContent = "Sign Up";
    });

    toLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      registerForm.style.display = "none";
      loginForm.style.display = "block";
      if (authTitle) authTitle.textContent = "Sign In";
    });
  }

  // Close modals
  const authClose = document.getElementById("auth-modal-close");
  if (authClose) {
    authClose.addEventListener("click", closeAuthModal);
  }
  
  const checkoutClose = document.getElementById("checkout-modal-close");
  if (checkoutClose) {
    checkoutClose.addEventListener("click", closeCheckoutModal);
  }

  const ordersClose = document.getElementById("orders-modal-close");
  if (ordersClose) {
    ordersClose.addEventListener("click", closeOrdersModal);
  }

  // Cart Drawer Toggles
  const cartToggle = document.getElementById("cart-toggle-btn");
  if (cartToggle) {
    cartToggle.addEventListener("click", toggleCartDrawer);
  }

  const cartClose = document.getElementById("cart-drawer-close");
  if (cartClose) {
    cartClose.addEventListener("click", closeCartDrawer);
  }

  const cartOverlay = document.getElementById("cart-drawer-overlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartDrawer);
  }

  // Close modal on escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAuthModal();
      closeCheckoutModal();
      closeOrdersModal();
    }
  });

  // Login form submit
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const submitBtn = loginForm.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.classList.add("loading");

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          localStorage.setItem("feastflow_token", result.token);
          localStorage.setItem("feastflow_user", JSON.stringify(result.user));
          showToast("Signed in successfully!", "success");
          loginForm.reset();
          closeAuthModal();
          updateAuthUI();
        } else {
          showToast(result.error || "Authentication failed.", "error");
        }
      } catch (err) {
        showToast("Server error. Please check your connection.", "error");
      } finally {
        if (submitBtn) submitBtn.classList.remove("loading");
      }
    });
  }

  // Register form submit
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      const submitBtn = registerForm.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.classList.add("loading");

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          localStorage.setItem("feastflow_token", result.token);
          localStorage.setItem("feastflow_user", JSON.stringify(result.user));
          showToast("Account created successfully!", "success");
          registerForm.reset();
          closeAuthModal();
          updateAuthUI();
        } else {
          showToast(result.error || "Registration failed.", "error");
        }
      } catch (err) {
        showToast("Server error. Please check your connection.", "error");
      } finally {
        if (submitBtn) submitBtn.classList.remove("loading");
      }
    });
  }

  // Add to cart delegation on Menu Card Grid
  if (menuGrid) {
    menuGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-to-cart-btn");
      if (btn) {
        e.preventDefault();
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = btn.dataset.price;
        const image = btn.dataset.image;
        addToCart(id, name, price, image);
      }
    });
  }

  // Checkout modal trigger from drawer
  const checkoutBtn = document.getElementById("btn-cart-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const token = localStorage.getItem("feastflow_token");
      if (!token) {
        closeCartDrawer();
        openAuthModal();
        showToast("Please sign in or create an account to proceed to checkout.", "info");
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  // Checkout form submit
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const phone = document.getElementById("checkout-phone").value;
      const address = document.getElementById("checkout-address").value;
      const notes = document.getElementById("checkout-notes").value;
      const paymentMethod = document.getElementById("checkout-payment").value;
      
      const token = localStorage.getItem("feastflow_token");
      if (!token) {
        closeCheckoutModal();
        openAuthModal();
        showToast("Session expired. Please sign in.", "error");
        return;
      }

      const cart = getCart();
      if (cart.length === 0) {
        showToast("Your cart is empty.", "error");
        return;
      }

      const submitBtn = checkoutForm.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.classList.add("loading");

      // Format items payload for API
      const formattedItems = cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      }));

      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            phone,
            address,
            notes,
            paymentMethod,
            items: formattedItems
          })
        });

        const result = await response.json();

        if (response.ok) {
          showToast("Order placed successfully! Thank you.", "success");
          checkoutForm.reset();
          clearCart();
          closeCheckoutModal();
        } else {
          showToast(result.error || "Failed to place order.", "error");
        }
      } catch (err) {
        showToast("Server error. Failed to place order.", "error");
      } finally {
        if (submitBtn) submitBtn.classList.remove("loading");
      }
    });
  }
};

// Start system modules
window.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
  updateCartUI();
  initAuthAndCart();
});
