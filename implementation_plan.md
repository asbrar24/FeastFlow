# Grilli Restaurant — Frontend Enhancement & Backend Addition

## Current State Analysis

The project is a **static HTML/CSS/JS restaurant website** ("Grilli") with:
- **1 HTML file** (1224 lines) — all sections in a single page
- **1 CSS file** (2143 lines) — well-organized with CSS custom properties, responsive media queries
- **1 JS file** (170 lines) — preloader, navbar toggle, hero slider, parallax effect
- **45 image assets** — hero sliders, menu items, event images, shapes, icons
- Dark luxury theme with gold (`hsl(38, 61%, 73%)`) + black color palette
- Font pairing: Forum (headings) + DM Sans (body)
- Fully responsive (575px → 1400px breakpoints)

### Issues Found
- Reservation form has no backend — `action=""` does nothing
- Newsletter subscription has no backend — `action=""` does nothing
- Static testimonial — only one review, no carousel
- Placeholder text (Lorem Ipsum) throughout
- Preloader shows "Grilli" but title says "FeastFlow" — branding inconsistency
- Static menu — hardcoded items, no dynamic loading
- No contact form submission handling
- No admin panel for managing content
- Missing accessibility improvements (ARIA labels incomplete)
- Hero slider auto-plays but has no progress indicator

---

## Proposed Changes

### Phase 1: Frontend Polish & Enhanced Animations

#### [MODIFY] [index.html](file:///d:/Res%20web%20zip/grilli-master/grilli-master/index.html)
- Fix branding: Change preloader text from "Grilli" → "FeastFlow" (or vice-versa — consistent brand)
- Replace all Lorem Ipsum placeholder text with real restaurant copy
- Add `id` attributes to all interactive elements for testing
- Add scroll-triggered animation classes (`data-reveal`) to all sections
- Add a **testimonials carousel** with 3 customer reviews instead of 1 static review
- Add a **hero slider progress bar** indicator
- Add an **interactive image gallery/lightbox** section
- Add a **"Our Chefs"** section (currently links to `#` with no content)
- Add a **Contact section** with Google Maps embed placeholder and contact form
- Add a **stats counter section** (Years of Experience, Happy Customers, Dishes, Awards)
- Add toast/notification container for form submission feedback
- Add dark/light mode toggle button in header

#### [MODIFY] [style.css](file:///d:/Res%20web%20zip/grilli-master/grilli-master/assets/css/style.css)
- Add **scroll-reveal animations** (fade-up, fade-left, fade-right, scale-up)
- Add **glassmorphism** effect for cards and overlays
- Add **hero slider progress bar** styles
- Add **testimonials carousel** styles with slide transitions
- Add **stats counter** section styles with animated number counting
- Add **chefs section** grid layout with hover card-flip effect
- Add **image gallery/lightbox** overlay styles
- Add **contact section** styles with map and form layout
- Add **toast notification** styles with slide-in animation
- Add **dark/light mode** CSS custom property overrides
- Add **smooth parallax scrolling** for background sections
- Add **button ripple effect** micro-animation
- Enhance existing hover effects with scale + glow transitions
- Add **floating particles** ambient animation in hero section
- Add **typing text effect** CSS for hero subtitle

#### [MODIFY] [script.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/assets/js/script.js)
- Add **Intersection Observer** for scroll-triggered reveal animations
- Add **testimonials carousel** with auto-rotate and swipe support
- Add **counter animation** (count-up effect on stats section)
- Add **hero slider progress indicator** logic
- Add **image gallery lightbox** open/close/navigate
- Add **dark/light mode toggle** with localStorage persistence
- Add **smooth scrolling** enhancement for nav links
- Add **form validation** with inline error messages
- Add **toast notification system** for user feedback
- Add **button ripple effect** on click
- Add **typing text animation** for hero

---

### Phase 2: Backend — Node.js/Express Server

#### [NEW] [package.json](file:///d:/Res%20web%20zip/grilli-master/grilli-master/package.json)
- Project metadata, scripts (`start`, `dev`), dependencies:
  - `express` — HTTP server
  - `cors` — Cross-origin support
  - `helmet` — Security headers
  - `express-rate-limit` — Rate limiting for API
  - `uuid` — Unique ID generation

#### [NEW] [server.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/server.js)
- Express server serving static files from current directory
- API routes mounted at `/api`
- CORS, Helmet security, JSON body parsing
- Rate limiting (100 requests/15 min per IP)
- Error handling middleware
- Listen on port `3000` (configurable via `PORT` env var)

#### [NEW] [routes/reservations.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/routes/reservations.js)
- `POST /api/reservations` — Create a new table reservation
  - Validates: name, phone, person count, date, time
  - Stores in `data/reservations.json`
  - Returns confirmation with reservation ID
- `GET /api/reservations` — List all reservations (admin)
- `DELETE /api/reservations/:id` — Cancel a reservation

#### [NEW] [routes/newsletter.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/routes/newsletter.js)
- `POST /api/newsletter` — Subscribe to newsletter
  - Validates email format
  - Prevents duplicate subscriptions
  - Stores in `data/newsletter.json`
- `GET /api/newsletter` — List subscribers (admin)

#### [NEW] [routes/contact.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/routes/contact.js)
- `POST /api/contact` — Submit a contact message
  - Validates: name, email, subject, message
  - Stores in `data/contacts.json`
- `GET /api/contact` — List messages (admin)

#### [NEW] [routes/menu.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/routes/menu.js)
- `GET /api/menu` — Get all menu items
  - Serves from `data/menu.json`
  - Supports `?category=` filter
- `POST /api/menu` — Add menu item (admin)
- `PUT /api/menu/:id` — Update menu item (admin)
- `DELETE /api/menu/:id` — Delete menu item (admin)

#### [NEW] [data/reservations.json](file:///d:/Res%20web%20zip/grilli-master/grilli-master/data/reservations.json)
- Initial empty array `[]`

#### [NEW] [data/newsletter.json](file:///d:/Res%20web%20zip/grilli-master/grilli-master/data/newsletter.json)
- Initial empty array `[]`

#### [NEW] [data/contacts.json](file:///d:/Res%20web%20zip/grilli-master/grilli-master/data/contacts.json)
- Initial empty array `[]`

#### [NEW] [data/menu.json](file:///d:/Res%20web%20zip/grilli-master/grilli-master/data/menu.json)
- Pre-populated with the 6 existing menu items (Greek Salad, Lasagne, etc.)
- Schema: `{ id, name, description, price, image, category, badge }`

---

### Phase 3: Frontend-Backend Integration

#### [MODIFY] [script.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/assets/js/script.js)
- Wire reservation form to `POST /api/reservations` via `fetch()`
- Wire newsletter form to `POST /api/newsletter` via `fetch()`
- Wire contact form to `POST /api/contact` via `fetch()`
- Load menu items dynamically from `GET /api/menu` (progressive enhancement — fall back to static HTML)
- Show toast notifications on success/error for all form submissions
- Add loading states to submit buttons during API calls

---

### Phase 4: New Sections — Chefs & Gallery & Stats

#### [MODIFY] [index.html](file:///d:/Res%20web%20zip/grilli-master/grilli-master/index.html)

**Stats Counter Section** (after Service section):
- 4 animated counters: 15+ Years Experience, 30 Skilled Chefs, 200+ Menu Items, 10K+ Happy Customers

**Our Chefs Section** (after Features section):
- 4 chef cards with photo, name, role, social links
- Card flip animation on hover revealing bio

**Gallery Section** (before Footer):
- Masonry grid of restaurant/food images
- Lightbox overlay for full-size viewing with navigation

---

### Phase 5: Admin Dashboard

#### [NEW] [admin.html](file:///d:/Res%20web%20zip/grilli-master/grilli-master/admin.html)
- Simple admin panel (accessible at `/admin.html`)
- Tabs for: Reservations, Newsletter Subscribers, Contact Messages, Menu Management
- View/delete reservations
- View subscriber list
- View/reply contact messages
- Add/edit/delete menu items
- Styled consistently with the main site's dark luxury theme

#### [NEW] [assets/css/admin.css](file:///d:/Res%20web%20zip/grilli-master/grilli-master/assets/css/admin.css)
- Admin dashboard styles — dark theme, glassmorphism cards, data tables

#### [NEW] [assets/js/admin.js](file:///d:/Res%20web%20zip/grilli-master/grilli-master/assets/js/admin.js)
- Fetch and display data from API endpoints
- CRUD operations for menu items
- Delete reservations, contacts
- Search/filter functionality

---

### Phase 6: Content & SEO Polish

#### [MODIFY] [index.html](file:///d:/Res%20web%20zip/grilli-master/grilli-master/index.html)
- Replace all Lorem Ipsum with compelling restaurant copy
- Add Open Graph meta tags for social sharing
- Add structured data (JSON-LD) for Restaurant schema
- Ensure proper heading hierarchy (single `<h1>`)
- Add `loading="lazy"` to all below-fold images
- Add `alt` text to all images with descriptive content

---

## User Review Required

> [!IMPORTANT]
> **Branding Decision**: The preloader says "Grilli" but the `<title>` says "FeastFlow". Which brand name should be used consistently throughout? I'll default to **"FeastFlow"** since the title already uses it.

> [!IMPORTANT]
> **Backend Storage**: I'm using JSON files for data persistence (no database needed). This is suitable for a portfolio/demo site. For production, you'd want a real database — is this acceptable?

> [!WARNING]
> **Admin Authentication**: The admin panel will be publicly accessible (no login required). For a real deployment, you'd want to add authentication. Should I add a simple password-based auth, or is this just for demo purposes?

## Open Questions

1. **Chef Photos**: Should I generate AI images for the 4 chef cards, or use placeholder stock photo-style images?
2. **Gallery Images**: Should I reuse existing food images for the gallery, or generate new ones?
3. **Color Theme**: Do you want to keep the current gold + dark theme, or would you prefer a different color scheme?

---

## Verification Plan

### Automated Tests
1. Run `npm start` and verify server starts on port 3000
2. Test all API endpoints with curl/browser:
   - `POST /api/reservations` with valid and invalid data
   - `POST /api/newsletter` with valid email and duplicate
   - `POST /api/contact` with complete data
   - `GET /api/menu` and `GET /api/menu?category=breakfast`
3. Verify static files are served correctly at `http://localhost:3000`
4. Open browser and test all interactive features:
   - Hero slider with progress bar
   - Scroll-triggered reveal animations
   - Testimonials carousel auto-rotation
   - Stats counter animation on scroll
   - Dark/light mode toggle persistence
   - Form submissions with toast notifications
   - Image gallery lightbox navigation
   - Admin dashboard CRUD operations

### Manual Verification
- Test responsive design at 375px, 768px, 992px, 1200px, 1400px breakpoints
- Verify all animations are smooth (60fps) with no layout shifts
- Check accessibility with keyboard navigation
- Verify form validation provides clear error feedback
