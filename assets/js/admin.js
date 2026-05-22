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

// Global Data Storage for searching
let reservationsData = [];
let menuData = [];
let contactsData = [];
let newsletterData = [];
let ordersData = [];       // all orders from /api/orders/all
let ordersFilteredData = []; // current filter+search view
let currentOrderFilter = 'all';

// DOM Elements
const tabButtons = document.querySelectorAll(".sidebar-nav .nav-item");
const tabViews = document.querySelectorAll(".tab-view");
const tabTitle = document.getElementById("tab-title");

// Toast Notification System
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

// Tab Switching Logic
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.tab;
    
    // Update active button
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    
    // Update active view
    tabViews.forEach(view => view.classList.remove("active"));
    const activeView = document.getElementById(`view-${tabName}`);
    if (activeView) activeView.classList.add("active");
    
    // Update title
    tabTitle.textContent = button.querySelector("span").textContent;
    
    // Load fresh data
    loadTabData(tabName);
  });
});

const loadTabData = (tabName) => {
  switch (tabName) {
    case "reservations":
      fetchReservations();
      break;
    case "orders":
      fetchOrders();
      break;
    case "menu":
      fetchMenu();
      break;
    case "contacts":
      fetchContacts();
      break;
    case "newsletter":
      fetchNewsletter();
      break;
  }
};

// --- RESERVATIONS TAB ---
const tableReservationsBody = document.getElementById("table-reservations-body");

async function fetchReservations() {
  try {
    const response = await fetch("/api/reservations");
    if (response.ok) {
      const result = await response.json();
      reservationsData = result.data;
      renderReservations(reservationsData);
    } else {
      showToast("Failed to fetch reservations.", "error");
    }
  } catch (err) {
    showToast("Error connecting to server.", "error");
  }
}

function renderReservations(data) {
  if (!tableReservationsBody) return;
  
  if (data.length === 0) {
    tableReservationsBody.innerHTML = `<tr><td colspan="6" class="text-center">No reservations found.</td></tr>`;
    return;
  }
  
  tableReservationsBody.innerHTML = data.map(res => {
    const resDate = new Date(res.date).toLocaleDateString(undefined, { 
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
    });
    
    return `
      <tr>
        <td>
          <div class="cell-name">${res.name}</div>
        </td>
        <td>${res.phone}</td>
        <td>${res.person.split("-")[0]}</td>
        <td>
          <div>${resDate}</div>
          <small style="color: var(--gold-crayola);">${res.time}</small>
        </td>
        <td><small>${res.message || '-'}</small></td>
        <td>
          <div class="action-btns">
            <button class="action-btn delete-btn" onclick="deleteReservation('${res.id}')" title="Cancel Reservation">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

async function deleteReservation(id) {
  if (!confirm("Are you sure you want to cancel this reservation?")) return;
  
  try {
    const response = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    if (response.ok) {
      showToast("Reservation cancelled.", "success");
      fetchReservations();
    } else {
      showToast("Failed to cancel reservation.", "error");
    }
  } catch (err) {
    showToast("Error communicating with server.", "error");
  }
}

// --- MENU TAB ---
const tableMenuBody = document.getElementById("table-menu-body");

async function fetchMenu() {
  try {
    const response = await fetch("/api/menu");
    if (response.ok) {
      const result = await response.json();
      menuData = result.data;
      renderMenu(menuData);
    } else {
      showToast("Failed to fetch menu items.", "error");
    }
  } catch (err) {
    showToast("Error connecting to server.", "error");
  }
}

function renderMenu(data) {
  if (!tableMenuBody) return;
  
  if (data.length === 0) {
    tableMenuBody.innerHTML = `<tr><td colspan="7" class="text-center">No menu items found.</td></tr>`;
    return;
  }
  
  tableMenuBody.innerHTML = data.map(item => `
    <tr>
      <td>
        <img src="${normalizeAssetPath(item.image)}" alt="${item.name}" width="50" height="50" class="menu-img" onerror="this.onerror=null;this.src='./assets/images/menu-1.jpg';">
      </td>
      <td>
        <div class="cell-name">${item.name}</div>
      </td>
      <td style="text-transform: capitalize;">${item.category.replace("-", " ")}</td>
      <td style="color: var(--gold-crayola); font-weight: bold;">${formatCurrency(item.price)}</td>
      <td>${item.badge ? `<span class="cell-badge">${item.badge}</span>` : '-'}</td>
      <td><small>${item.description}</small></td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit-btn" onclick="openEditMenuModal('${item.id}')" title="Edit Item">
            <ion-icon name="create-outline"></ion-icon>
          </button>
          <button class="action-btn delete-btn" onclick="deleteMenuItem('${item.id}')" title="Delete Item">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

async function deleteMenuItem(id) {
  if (!confirm("Are you sure you want to delete this menu item?")) return;
  
  try {
    const response = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (response.ok) {
      showToast("Menu item deleted.", "success");
      fetchMenu();
    } else {
      showToast("Failed to delete item.", "error");
    }
  } catch (err) {
    showToast("Error communicating with server.", "error");
  }
}

// --- CONTACTS TAB ---
const tableContactsBody = document.getElementById("table-contacts-body");

async function fetchContacts() {
  try {
    const response = await fetch("/api/contact");
    if (response.ok) {
      const result = await response.json();
      contactsData = result.data;
      renderContacts(contactsData);
    } else {
      showToast("Failed to fetch messages.", "error");
    }
  } catch (err) {
    showToast("Error connecting to server.", "error");
  }
}

function renderContacts(data) {
  if (!tableContactsBody) return;
  
  if (data.length === 0) {
    tableContactsBody.innerHTML = `<tr><td colspan="6" class="text-center">No messages found.</td></tr>`;
    return;
  }
  
  tableContactsBody.innerHTML = data.map(msg => {
    const msgDate = new Date(msg.createdAt).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    return `
      <tr>
        <td>
          <div class="cell-name">${msg.name}</div>
        </td>
        <td>${msg.email}</td>
        <td><strong>${msg.subject}</strong></td>
        <td><small>${msg.message}</small></td>
        <td>${msgDate}</td>
        <td>
          <div class="action-btns">
            <a href="mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}" class="action-btn reply-btn" title="Reply Email">
              <ion-icon name="mail-outline"></ion-icon>
            </a>
            <button class="action-btn delete-btn" onclick="deleteContact('${msg.id}')" title="Delete Message">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

async function deleteContact(id) {
  if (!confirm("Are you sure you want to delete this message?")) return;
  
  try {
    const response = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (response.ok) {
      showToast("Message deleted.", "success");
      fetchContacts();
    } else {
      showToast("Failed to delete message.", "error");
    }
  } catch (err) {
    showToast("Error communicating with server.", "error");
  }
}

// --- NEWSLETTER TAB ---
const tableNewsletterBody = document.getElementById("table-newsletter-body");

async function fetchNewsletter() {
  try {
    const response = await fetch("/api/newsletter");
    if (response.ok) {
      const result = await response.json();
      newsletterData = result.data;
      renderNewsletter(newsletterData);
    } else {
      showToast("Failed to fetch subscribers.", "error");
    }
  } catch (err) {
    showToast("Error connecting to server.", "error");
  }
}

function renderNewsletter(data) {
  if (!tableNewsletterBody) return;
  
  if (data.length === 0) {
    tableNewsletterBody.innerHTML = `<tr><td colspan="3" class="text-center">No subscribers found.</td></tr>`;
    return;
  }
  
  tableNewsletterBody.innerHTML = data.map(sub => {
    const subDate = new Date(sub.subscribedAt).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
    
    return `
      <tr>
        <td><small>${sub.id.substring(0, 8)}...</small></td>
        <td class="cell-name">${sub.email}</td>
        <td>${subDate}</td>
        <td>
          <div class="action-btns">
            <button class="action-btn delete-btn" onclick="deleteSubscriber('${sub.id}')" title="Unsubscribe">
              <ion-icon name="person-remove-outline"></ion-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

async function deleteSubscriber(id) {
  if (!confirm("Are you sure you want to remove this subscriber?")) return;
  
  try {
    const response = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
    if (response.ok) {
      showToast("Subscriber removed.", "success");
      fetchNewsletter();
    } else {
      showToast("Failed to remove subscriber.", "error");
    }
  } catch (err) {
    showToast("Error communicating with server.", "error");
  }
}

// --- MODAL & FORM MANAGEMENT ---
const menuModal = document.getElementById("menu-modal");
const btnAddMenu = document.getElementById("btn-add-menu");
const modalClose = document.getElementById("modal-close");
const menuForm = document.getElementById("menu-form");
const modalTitle = document.getElementById("modal-title");
const modalSubmitText = document.getElementById("modal-submit-text");
const modalSubmitText2 = document.getElementById("modal-submit-text-2");

// Fields
const inputMenuId = document.getElementById("menu-item-id");
const inputMenuName = document.getElementById("menu-name");
const inputMenuCategory = document.getElementById("menu-category");
const inputMenuPrice = document.getElementById("menu-price");
const inputMenuBadge = document.getElementById("menu-badge");
const inputMenuImage = document.getElementById("menu-image");
const inputMenuDescription = document.getElementById("menu-description");

const openModal = (isEdit = false) => {
  if (menuModal) menuModal.classList.add("active");
  if (isEdit) {
    modalTitle.textContent = "Edit Menu Item";
    modalSubmitText.textContent = "Update Item";
    modalSubmitText2.textContent = "Update Item";
  } else {
    modalTitle.textContent = "Add Menu Item";
    modalSubmitText.textContent = "Save Item";
    modalSubmitText2.textContent = "Save Item";
    menuForm.reset();
    inputMenuId.value = "";
  }
};

const closeModal = () => {
  if (menuModal) menuModal.classList.remove("active");
};

if (btnAddMenu) btnAddMenu.addEventListener("click", () => openModal(false));
if (modalClose) modalClose.addEventListener("click", closeModal);

if (menuModal) {
  menuModal.addEventListener("click", (e) => {
    if (e.target === menuModal) closeModal();
  });
}

function openEditMenuModal(id) {
  const item = menuData.find(m => m.id === id);
  if (!item) return;
  
  inputMenuId.value = item.id;
  inputMenuName.value = item.name;
  inputMenuCategory.value = item.category;
  inputMenuPrice.value = item.price;
  inputMenuBadge.value = item.badge || "";
  inputMenuImage.value = item.image;
  inputMenuDescription.value = item.description;
  
  openModal(true);
}

if (menuForm) {
  menuForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = inputMenuId.value;
    const data = {
      name: inputMenuName.value.trim(),
      category: inputMenuCategory.value,
      price: parseFloat(inputMenuPrice.value),
      badge: inputMenuBadge.value.trim() || null,
      image: inputMenuImage.value.trim() || undefined,
      description: inputMenuDescription.value.trim()
    };
    
    const method = id ? "PUT" : "POST";
    const endpoint = id ? `/api/menu/${id}` : "/api/menu";
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        showToast(id ? "Menu item updated successfully!" : "Menu item added successfully!", "success");
        closeModal();
        fetchMenu();
      } else {
        showToast(result.error || "Failed to save menu item.", "error");
      }
    } catch (err) {
      showToast("Server error. Please try again.", "error");
    }
  });
}

// --- SEARCH FILTERING ---
const setupSearch = (inputId, dataKey, renderFunc) => {
  const searchInput = document.getElementById(inputId);
  if (!searchInput) return;
  
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    let filtered = [];
    
    if (dataKey === "reservations") {
      filtered = reservationsData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.phone.includes(query) ||
        item.date.includes(query)
      );
    } else if (dataKey === "menu") {
      filtered = menuData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query))
      );
    } else if (dataKey === "contacts") {
      filtered = contactsData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.email.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query)
      );
    } else if (dataKey === "newsletter") {
      filtered = newsletterData.filter(item => 
        item.email.toLowerCase().includes(query)
      );
    }
    
    renderFunc(filtered);
  });
};

setupSearch("search-reservations", "reservations", renderReservations);
setupSearch("search-menu", "menu", renderMenu);
setupSearch("search-contacts", "contacts", renderContacts);
setupSearch("search-newsletter", "newsletter", renderNewsletter);

// Initialize Dashboard
window.addEventListener("DOMContentLoaded", () => {
  initAdminGuard();
});

// Bind functions to window so HTML onclick event handlers work
window.deleteReservation = deleteReservation;
window.deleteMenuItem = deleteMenuItem;
window.deleteContact = deleteContact;
window.deleteSubscriber = deleteSubscriber;
window.openEditMenuModal = openEditMenuModal;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;

// ============================================================
//  ADMIN AUTH GUARD
// ============================================================

function getAdminToken() {
  return localStorage.getItem('feastflow_token');
}

function getAdminUser() {
  try {
    const u = localStorage.getItem('feastflow_user');
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
}

function initAdminGuard() {
  const token = getAdminToken();
  const user  = getAdminUser();

  if (!token || !user || user.role !== 'admin') {
    showAdminLoginModal();
    return;
  }

  // Update the profile display with admin name
  const usernameEl = document.querySelector('.admin-profile .username');
  if (usernameEl && user.name) usernameEl.textContent = user.name;

  // Load default tab
  fetchReservations();
}

function showAdminLoginModal() {
  // Blur / disable the main dashboard visually
  const wrapper = document.querySelector('.admin-wrapper');
  if (wrapper) wrapper.style.filter = 'blur(4px) brightness(0.4)';

  const modal = document.getElementById('admin-login-modal');
  if (modal) modal.classList.add('active');
}

function hideAdminLoginModal() {
  const wrapper = document.querySelector('.admin-wrapper');
  if (wrapper) wrapper.style.filter = '';

  const modal = document.getElementById('admin-login-modal');
  if (modal) modal.classList.remove('active');
}

// Wire admin login form
const adminLoginForm = document.getElementById('admin-login-form');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.classList.add('loading');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        if (result.user.role !== 'admin') {
          showToast('Access denied. Administrator account required.', 'error');
          return;
        }
        localStorage.setItem('feastflow_token', result.token);
        localStorage.setItem('feastflow_user', JSON.stringify(result.user));
        showToast('Welcome back, ' + result.user.name + '!', 'success');
        adminLoginForm.reset();
        hideAdminLoginModal();

        const usernameEl = document.querySelector('.admin-profile .username');
        if (usernameEl) usernameEl.textContent = result.user.name;

        fetchReservations();
      } else {
        showToast(result.error || 'Login failed.', 'error');
      }
    } catch (err) {
      showToast('Server error. Please try again.', 'error');
    } finally {
      if (submitBtn) submitBtn.classList.remove('loading');
    }
  });
}

// ============================================================
//  ORDERS TAB
// ============================================================

const tableOrdersBody = document.getElementById('table-orders-body');

async function fetchOrders() {
  const token = getAdminToken();
  if (!token) { showAdminLoginModal(); return; }

  if (tableOrdersBody) {
    tableOrdersBody.innerHTML = '<tr><td colspan="8" class="text-center">Loading orders...</td></tr>';
  }

  try {
    const response = await fetch('/api/orders/all', {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (response.status === 401 || response.status === 403) {
      showAdminLoginModal();
      return;
    }

    if (response.ok) {
      const result = await response.json();
      ordersData = result.data;
      applyOrdersFilter();
      renderOrdersMetrics(ordersData);
    } else {
      showToast('Failed to fetch orders.', 'error');
    }
  } catch (err) {
    showToast('Error connecting to server.', 'error');
  }
}

function renderOrdersMetrics(data) {
  const total      = data.length;
  const pending    = data.filter(o => o.status === 'pending').length;
  const inProgress = data.filter(o => o.status === 'preparing' || o.status === 'out-for-delivery').length;
  const revenue    = data
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const el = (id) => document.getElementById(id);
  if (el('metric-total'))      el('metric-total').textContent      = total;
  if (el('metric-pending'))    el('metric-pending').textContent    = pending;
  if (el('metric-inprogress')) el('metric-inprogress').textContent = inProgress;
  if (el('metric-revenue'))    el('metric-revenue').textContent    = formatCurrency(revenue);
}

function applyOrdersFilter() {
  const searchInput = document.getElementById('search-orders');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  let filtered = ordersData;

  // Status filter
  if (currentOrderFilter !== 'all') {
    filtered = filtered.filter(o => o.status === currentOrderFilter);
  }

  // Text search
  if (query) {
    filtered = filtered.filter(o =>
      (o.customerName  && o.customerName.toLowerCase().includes(query)) ||
      (o.customerEmail && o.customerEmail.toLowerCase().includes(query)) ||
      (o.deliveryAddress && o.deliveryAddress.toLowerCase().includes(query)) ||
      (o.id && o.id.toLowerCase().includes(query))
    );
  }

  ordersFilteredData = filtered;
  renderOrders(filtered);
}

function renderOrders(data) {
  if (!tableOrdersBody) return;

  if (data.length === 0) {
    tableOrdersBody.innerHTML = '<tr><td colspan="8" class="text-center">No orders found.</td></tr>';
    return;
  }

  tableOrdersBody.innerHTML = data.map(order => {
    const orderDate = new Date(order.createdAt).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const itemsList = order.items.map(item =>
      `<span>${item.name} ×${item.quantity}</span>`
    ).join('');

    const statusOptions = ['pending','preparing','out-for-delivery','completed','cancelled']
      .map(s => `<option value="${s}" ${s === order.status ? 'selected' : ''}>${s.replace(/-/g,' ')}</option>`)
      .join('');

    return `
      <tr>
        <td><small style="color:var(--gold-crayola);font-weight:bold;">#${order.id.slice(0,8)}</small></td>
        <td>
          <div class="cell-name">${order.customerName}</div>
          <small>${order.customerEmail}</small><br>
          <small style="color:var(--quick-silver);">${order.deliveryAddress}</small>
        </td>
        <td>
          <div class="order-items-mini">${itemsList}</div>
        </td>
        <td style="color:var(--gold-crayola);font-weight:bold;">${formatCurrency(order.totalPrice)}</td>
        <td><small>${order.paymentMethod}</small></td>
        <td><small>${orderDate}</small></td>
        <td>
          <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
            ${statusOptions}
          </select>
        </td>
        <td>
          <div class="action-btns">
            <button class="action-btn delete-btn" onclick="deleteOrder('${order.id}')" title="Delete Order">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateOrderStatus(id, status) {
  const token = getAdminToken();
  if (!token) { showAdminLoginModal(); return; }

  try {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (response.ok) {
      showToast(`Order status updated to "${status}".`, 'success');
      // Update local data without full refetch for snappy UX
      const order = ordersData.find(o => o.id === id);
      if (order) order.status = status;
      renderOrdersMetrics(ordersData);
    } else {
      showToast(result.error || 'Failed to update status.', 'error');
      // Revert by re-rendering
      applyOrdersFilter();
    }
  } catch (err) {
    showToast('Error communicating with server.', 'error');
    applyOrdersFilter();
  }
}

async function deleteOrder(id) {
  if (!confirm('Are you sure you want to delete this order? This cannot be undone.')) return;

  const token = getAdminToken();
  if (!token) { showAdminLoginModal(); return; }

  try {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (response.ok) {
      showToast('Order deleted.', 'success');
      ordersData = ordersData.filter(o => o.id !== id);
      applyOrdersFilter();
      renderOrdersMetrics(ordersData);
    } else {
      const result = await response.json();
      showToast(result.error || 'Failed to delete order.', 'error');
    }
  } catch (err) {
    showToast('Error communicating with server.', 'error');
  }
}

// Wire filter pills
const filterGroup = document.getElementById('orders-filter-group');
if (filterGroup) {
  filterGroup.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    filterGroup.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentOrderFilter = pill.dataset.filter;
    applyOrdersFilter();
  });
}

// Wire orders search
const ordersSearch = document.getElementById('search-orders');
if (ordersSearch) {
  ordersSearch.addEventListener('input', applyOrdersFilter);
}
