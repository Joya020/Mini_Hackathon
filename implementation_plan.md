# FoodShare - Smart Surplus Food Redistribution Platform Implementation Plan

## Overview
FoodShare is a modern, responsive web application connecting food donors (restaurants, hotels, colleges, events, individuals) with verified local NGOs and volunteer delivery drivers to rescue surplus food and feed communities.

This plan details the design and architecture for a **hackathon-winning MVP** that delivers:
1. A complete, interactive, zero-friction single-page web application that runs directly in any browser or local server with full live state persistence.
2. The complete user journey: **Register → Add Surplus Food → Find Nearby NGO → NGO Accepts → Volunteer Pickup → Delivery → Impact Updated**.
3. All 9 required pages/views with role-based access (Donor, NGO, Volunteer, Admin).
4. Interactive visual food tracker with 5 stages (Available → Accepted → Volunteer Assigned → Picked Up → Delivered).
5. Interactive Map & Card toggle for NGOs and Volunteers with distance, urgency badges, and live countdown timers.
6. Real-time notification system with simulated events and alert drawer.
7. Impact Dashboard with live calculating sustainability metrics (CO₂ prevented, meals served, kg rescued) and charts.
8. Backend Integration Blueprint: Ready-to-use MySQL schema (`schema.sql`), Spring Boot REST API controllers/entities, and Node.js/Express API specifications for immediate backend connection.

---

## User Roles & Capabilities

| Role | Core Capabilities |
| :--- | :--- |
| **Donor** | Add surplus food listings, manage active listings, view donation history, track donation status live, view personal impact. |
| **NGO / Receiver** | Browse nearby food listings via list or interactive radar map, filter by dietary requirements & urgency, accept donations, track inbound deliveries. |
| **Volunteer** | View available pickup tasks with distance and route details, accept pickup, mark "Picked Up", mark "Delivered" with delivery notes. |
| **Admin** | System-wide overview, verify NGOs, manage all donations, oversee platform health and aggregate impact statistics. |

---

## Architecture & File Structure

We will structure the project cleanly under `D:\Mini_Hackathon\`:

```
D:\Mini_Hackathon\
│
├── index.html                   # Main entry point with Tailwind CSS, Lucide icons, responsive layout
├── app.js                       # Core React / Reactive UI application logic, state machine, router
├── styles.css                   # Custom theme tokens, micro-interactions, animations, map styling
│
├── assets/                      # Sample food images, icons, illustrations
│
├── backend-spec/                # Ready-to-deploy backend templates
│   ├── database/
│   │   └── schema.sql           # Production-ready MySQL schema (users, donations, claims, deliveries, notifications, impact)
│   ├── spring-boot/
│   │   ├── DonationController.java
│   │   ├── Donation.java
│   │   └── application.properties
│   └── nodejs-express/
│       ├── server.js
│       └── routes/donations.js
│
└── README.md                    # Quickstart guide, hackathon pitch notes, API endpoints documentation
```

---

## Detailed Page & Feature Breakdown

### 1. Landing Page
- **Hero Section**: Tagline *"Share Food. Reduce Waste. Feed Communities."*, high-impact call to actions ("Donate Surplus Food" & "Find Food Nearby"), dynamic live platform counter.
- **Key Statistics Bar**: "1.3B tonnes of food wasted annually", "828M people go hungry", "Food waste causes 8-10% of global greenhouse emissions".
- **Interactive "How It Works"**: 4-step visual flow:
  1. *Post Surplus*: Donor logs food quantity, expiry & pickup window.
  2. *Smart Match*: Nearby NGOs receive immediate alerts based on proximity.
  3. *Volunteer Dispatch*: Verified community drivers accept pickup & drop-off.
  4. *Track & Verify*: Real-time status update until safe delivery.
- **Community Impact Preview**: Teaser metrics and partner testimonials.

### 2. Authentication & Role Switcher
- Clean modal & standalone view for **Login** and **Register**.
- Role selector tabs: `Donor`, `NGO / Receiver`, `Volunteer`, `Admin`.
- Instant "Quick Demo Switcher" pill on the header for hackathon judges to toggle roles with 1 click without re-logging in.
- Forgot Password flow with instant mock reset link.

### 3. Food Donor Dashboard
- **Quick Action Bar**: Prominent Emerald *"Donate Surplus Food"* button with icon.
- **Metrics Grid**: Total Donations (Count), Meals Donated, People Helped, Active Listings.
- **Active Donations List**: Live cards with active tracking status pill, countdown to expiry, and cancel/edit actions.
- **Donation History**: Searchable and filterable table of past completed donations with impact ratings.

### 4. Add Food Donation Form
- **Form Fields**:
  - Food Name (e.g., "50 Servings Dal Makhani & Jeera Rice")
  - Food Category (Cooked Meals, Raw Groceries, Baked Goods, Packaged Foods, Dairy, Produce)
  - Quantity (e.g., "15 kg / 45 meals")
  - Dietary Tag (Vegetarian / Non-Vegetarian / Vegan)
  - Preparation Time & Consume-Before Expiry Time
  - Pickup Location (with auto-suggest and coordinates pin)
  - Contact Person & Phone Number
  - Image Upload with live preview (includes quick sample presets for easy testing: Curry & Rice, Fresh Bakery, Fruit Baskets)
  - Special Handling Notes (Keep refrigerated, Hot pack, Fragile containers)
- **Confirmation Screen**: Animated checkmark, donation ID (e.g., `#FS-8492`), and instant CTA to track donation in real time.

### 5. NGO Dashboard
- **Map & Card Toggle**: Switch seamlessly between interactive visual map and card grid.
- **Nearby Food Cards**:
  - Distance indicator (e.g., `1.2 km away`)
  - Expiry countdown timer (e.g., `Expiring in 2h 15m` with color warnings: Red < 2h, Amber < 4h, Green > 4h)
  - Veg / Non-Veg badge
  - Quantity & estimated meals
  - Donor organization name and pickup address
  - Single-click **"Accept Donation"** button
- **Filters**: By Dietary (Veg only), Max Distance (5km, 10km, 25km), and Food Category.
- **Claimed Donations Tab**: View accepted donations awaiting volunteer assignment and arrival.

### 6. Volunteer Dashboard
- **Available Pickup Requests**:
  - Pickup address (Donor) → Drop-off address (Assigned NGO)
  - Distance & estimated transit time
  - Food quantity & package handling instructions
  - Accept Pickup button
- **My Active Runs**:
  - Step 1: Click **"Accept Pickup"**
  - Step 2: Click **"Mark Picked Up"** (with optional pickup photo or OTP verification)
  - Step 3: Click **"Mark Delivered"** (marks order complete, triggers impact recalculation)

### 7. Real-Time Food Tracker
- Interactive stepper for any active order:
  1. `Available` (Posted by donor, waiting for NGO)
  2. `Accepted` (Claimed by NGO, awaiting courier)
  3. `Volunteer Assigned` (Courier en-route to pickup)
  4. `Picked Up` (Courier transporting food)
  5. `Delivered` (Safely handed over to NGO)
- Live status timestamps, estimated time of arrival (ETA), courier contact info, and route progress bar.

### 8. Notification Center
- Dropdown drawer with unread count badge.
- Simulated real-time alerts:
  - *New Food Available* (NGO alert)
  - *Donation Accepted* (Donor alert)
  - *Volunteer Assigned* (Donor & NGO alert)
  - *Food Expiring Soon* (Urgent warning alert)
  - *Delivery Completed* (All parties alert)
- "Send Test Notification" helper button for hackathon live demos.

### 9. Impact Dashboard
- **Impact Metrics**:
  - Total Food Rescued (kg)
  - Total Meals Distributed
  - People Fed
  - CO₂ Emissions Averted (calculated at $2.5\text{ kg CO}_2\text{e}$ per kg food saved)
  - Water Footprint Saved (calculated at $1000\text{ Liters}$ per kg)
- **Interactive Visualizations**:
  - Category Breakdown (Cooked Food vs Groceries vs Bakery)
  - Monthly / Weekly Redistribution Trend Chart
  - Top Donors Leaderboard
  - Downloadable "Impact Certificate" preview for donors

---

## Technical Stack & Design Highlights

- **Visual Style**: Clean, modern white canvas (`#FFFFFF` / `#F8FAFC`) with vibrant emerald (`#10B981` / `#059669`) and forest green accents, dark slate text (`#0F172A`) for optimal accessibility, rounded corners (`rounded-2xl`), subtle card drop-shadows.
- **UI Architecture**:
  - Fully reactive frontend written in clean modern JavaScript/React, styled with Tailwind CSS and custom micro-animations.
  - In-browser reactive state store backed by `localStorage` so changes persist across refreshes while also supporting a 1-click "Reset Demo Data" option.
  - Responsive mobile drawer and navigation bar for tablet/phone testing.
- **Backend Blueprint**:
  - Standardized REST API endpoints (`GET /api/donations`, `POST /api/donations`, `POST /api/donations/{id}/claim`, `POST /api/deliveries/{id}/status`, `GET /api/impact/stats`).
  - Included production-ready SQL script and Spring Boot / Express code files to showcase enterprise readiness to hackathon evaluators.

---

## Verification Plan

### Manual Verification Flow:
1. **Landing Page**: Check responsive header, hero CTA buttons, stats, and how-it-works section.
2. **Role Switching**: Test switching between Donor, NGO, Volunteer, and Admin via the top demo bar.
3. **Core Cycle Verification**:
   - As **Donor**: Fill and submit the "Add Food Donation" form. Confirm confirmation screen and new card created.
   - As **NGO**: Switch to NGO view, verify the new food item shows with accurate distance and countdown. Click "Accept Donation".
   - As **Volunteer**: Switch to Volunteer view, observe the task in "Available Pickups". Click "Accept Pickup", then "Mark Picked Up", then "Mark Delivered".
   - As **Any Role / Donor**: View the **Food Tracking** progress bar reflecting all 5 states smoothly.
   - View the **Impact Dashboard**: Verify all impact counters (food saved, meals, CO₂ prevented) increment automatically upon delivery.
4. **Notifications**: Verify notification badge increments and toasts appear at each stage transition.
5. **Backend Files**: Review `backend-spec/` for MySQL schema and Spring Boot/Node.js compatibility.
