# Walkthrough: FoodShare - Smart Surplus Food Redistribution System

## Overview
We have designed and built **FoodShare**, a modern, responsive, environmental-themed web application designed for a 3-hour hackathon MVP. It connects surplus food donors (restaurants, hotels, caterers, colleges, individuals) with local NGOs and volunteer couriers to eliminate food waste and address community hunger.

---

## 🚀 Key Features Implemented

### 1. Landing Page
- **Tagline**: *“Share Food. Reduce Waste. Feed Communities.”*
- **Call-to-Action**: Dual primary buttons (*"Donate Surplus Food"* & *"Find Nearby Food"*).
- **Food Waste Crisis Statistics**: High-impact cards highlighting $1.3\text{ Billion Tonnes}$ wasted annually, $828\text{ Million}$ facing hunger, and $8\text{--}10\%$ global greenhouse gas emissions.
- **How It Works**: 4-step progressive lifecycle (*Post Surplus $\to$ Smart NGO Matching $\to$ Volunteer Courier $\to$ Impact Measured*).
- **Live Counter**: Dynamic summary counters showing real-time kilograms of food saved, meals distributed, and carbon averted.

### 2. Multi-Role Authentication & Demo Control Bar
- **Demo Switcher Bar** at the top header for hackathon evaluators to toggle between **Donor**, **NGO Receiver**, **Volunteer Courier**, and **Admin** in a single click.
- **Interactive 1-Click Simulation Button**: Automates the entire end-to-end redistribution lifecycle in ~8 seconds with toast feedback.
- **Login / Register Form**: Role selector, fast-login shortcut buttons, and password recovery modal.

### 3. Food Donor Dashboard
- **Quick Action**: Prominent *"Donate Surplus Food"* button with leaf green gradient.
- **Metrics Grid**: Total donations, meals donated, people helped, and active pipelines.
- **Active Listings**: Real-time cards displaying countdown to consumption, quantity, and current status pill.
- **Donation History**: Searchable table showing completed deliveries and beneficiary NGOs.

### 4. Add Food Donation Form
- **Fields**: Food item name, category (Cooked Meals, Baked Goods, Groceries, Produce, Dairy, Packaged), quantity display & kilograms, dietary toggle (Vegetarian / Non-Vegetarian), preparation time, consume-before expiry timer, pickup address, and contact number.
- **Instant Photo Presets**: 4 high-resolution presets (Biryani & Rice, Artisan Bakery, Hot Curries, Fresh Produce) + custom device file upload.
- **Auto-Fill Sample Data**: 1-click helper button for instant form population during hackathon demos.
- **Confirmation Screen**: Animated checkmark, unique donation ID (`#FS-XXX`), and instant shortcut to live tracking.

### 5. NGO Dashboard
- **Dual Display Modes**: Toggle between **Card Grid View** and **Interactive Proximity Radar Map**.
- **Card Elements**: Distance indicator (e.g. `1.4 km away`), countdown timer (color-coded: urgent $< 2.5\text{h}$ in red, normal in green), quantity, pickup venue, and single-click **“Accept Donation”** button.
- **Filters**: Vegetarian Only, Urgent Expiry ($< 3\text{h}$ remaining), and All Nearby.
- **Claimed Deliveries Drawer**: Displays inbound donations awaiting courier arrival.

### 6. Volunteer Dashboard
- **Available Pickups**: Route cards with Pickup Venue (Donor) $\to$ Drop-off Location (NGO), transit distance, and **“Accept Pickup Request”** button.
- **Active Deliveries Tray**: Live stage progression:
  - Step 1: **Mark Picked Up**
  - Step 2: **Mark Delivered** (safely delivered to shelter, triggers impact calculation)

### 7. Real-Time Food Tracker
- **5-Step Visual Progress Stepper**:
  $$\mathbf{Available} \longrightarrow \mathbf{Accepted} \longrightarrow \mathbf{Volunteer\ Assigned} \longrightarrow \mathbf{Picked\ Up} \longrightarrow \mathbf{Delivered}$$
- Active step indicator with pulsing glow, connector progress bar, and timestamps.
- Entity summary cards for Donor Venue, Receiving NGO, and Volunteer Driver.

### 8. Notification Center
- Slide-out drawer with live unread counter badge.
- Alerts for new surplus food, NGO claims, courier assignments, in-transit updates, and delivery confirmations.
- **"Test Alert"** simulator button.

### 9. Impact Dashboard & Analytics
- Dynamic sustainability calculations:
  - **Total Food Rescued**: in kilograms
  - **Meals Distributed**: $1\text{ kg} \approx 3\text{ meals}$
  - **People Fed**: based on meal portions
  - **$\text{CO}_2\text{e}$ Emissions Averted**: $2.5\text{ kg } \text{CO}_2\text{e}$ per kg food saved
  - **Water Saved**: $1,000\text{ Liters}$ per kg food
- **Interactive Chart.js Visualizations**:
  1. Monthly Redistribution Trend (Bar/Line chart)
  2. Rescue by Food Category (Donut chart)
- Top Donors Leaderboard & Verified Impact Certificate modal.

---

## 📁 Project Directory Map

| Path | Description |
| :--- | :--- |
| [index.html](file:///D:/Mini_Hackathon/index.html) | Responsive application shell with Tailwind CSS, Lucide Icons, and Chart.js |
| [app.js](file:///D:/Mini_Hackathon/app.js) | Core single-page application engine, reactive state store, routing, and simulation logic |
| [styles.css](file:///D:/Mini_Hackathon/styles.css) | Custom styling, glassmorphism, map radar pulse animations, and color tokens |
| [run_app.bat](file:///D:/Mini_Hackathon/run_app.bat) | 1-click Windows launcher to open the app directly in the default browser |
| [README.md](file:///D:/Mini_Hackathon/README.md) | Comprehensive hackathon documentation, architecture overview, and pitch script |
| [database/schema.sql](file:///D:/Mini_Hackathon/backend-spec/database/schema.sql) | Production MySQL schema with 6 relational tables, foreign keys, and seed records |
| [spring-boot/DonationController.java](file:///D:/Mini_Hackathon/backend-spec/spring-boot/DonationController.java) | Spring Boot REST controller for donation lifecycle endpoints |
| [spring-boot/Donation.java](file:///D:/Mini_Hackathon/backend-spec/spring-boot/Donation.java) | JPA Entity representing donations |
| [nodejs-express/server.js](file:///D:/Mini_Hackathon/backend-spec/nodejs-express/server.js) | Node.js Express REST server template |
| [nodejs-express/routes/donations.js](file:///D:/Mini_Hackathon/backend-spec/nodejs-express/routes/donations.js) | Express route handlers for donations |

---

## 🧪 Validation & Testing Checklist

- [x] **Zero-Setup Launch**: Verified that `index.html` loads cleanly in any modern web browser without requiring a Node build step.
- [x] **State Persistence**: Verified that donations, claims, deliveries, notifications, and impact stats persist in `localStorage` and support 1-click reset to defaults.
- [x] **End-to-End Workflow**:
  1. Donor posts surplus food $\to$ notification fired.
  2. NGO discovers donation on list or radar map $\to$ clicks *"Accept Donation"*.
  3. Volunteer views pickup task $\to$ clicks *"Accept Pickup"* $\to$ clicks *"Mark Picked Up"* $\to$ clicks *"Mark Delivered"*.
  4. Live Food Tracker reflects all 5 stages with active step highlights.
  5. Impact metrics automatically increment and charts update.
- [x] **1-Click Hackathon Demo**: Verified that clicking *"Run 1-Click Simulation"* in the demo bar runs the entire cycle automatically with toast messages.
- [x] **Backend Integration Pack**: Verified MySQL schema compatibility, Spring Boot controllers/entities, and Express.js REST routes.
