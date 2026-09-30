# FoodShare 🍲🌱
### *“Share Food. Reduce Waste. Feed Communities.”*

> **Smart Surplus Food Redistribution System** — Built for Mini Hackathon 2026.  
> Connecting restaurants, hotels, colleges, events, and individuals with local NGOs and volunteers to eliminate hunger and cut carbon emissions in real time.

---

## 🌟 Table of Contents
1. [Executive Summary & Problem Statement](#-executive-summary--problem-statement)
2. [End-to-End User Flow](#-end-to-end-user-flow)
3. [User Roles & Capabilities](#-user-roles--capabilities)
4. [Page-by-Page Feature Breakdown](#-page-by-page-feature-breakdown)
5. [Technical Architecture & Integrations](#-technical-architecture--integrations)
6. [How to Run the Application (Zero-Setup)](#-how-to-run-the-application-zero-setup)
7. [Hackathon Demo Cheat Sheet](#-hackathon-demo-cheat-sheet)

---

## 🚀 Executive Summary & Problem Statement

* **The Paradox**: Worldwide, **1.3 billion tonnes of food** is discarded each year, responsible for **8–10% of global greenhouse gas emissions**. Simultaneously, over **828 million people** face chronic food insecurity.
* **The Logistical Bottleneck**: Food donations from banquet halls, corporate cafeterias, and restaurants spoil rapidly (within 3–6 hours). Traditional charity pickup models lack real-time geo-matching and automated crowdsourced dispatch.
* **The Solution**: **FoodShare** provides a hyper-local, reactive platform that bridges donors, verified shelters, and volunteer couriers within a 90-minute closed loop.

---

## 🔄 End-to-End User Flow

$$\mathbf{Register} \longrightarrow \mathbf{Add\ Surplus\ Food} \longrightarrow \mathbf{Find\ Nearby\ NGO} \longrightarrow \mathbf{NGO\ Accepts} \longrightarrow \mathbf{Volunteer\ Pickup} \longrightarrow \mathbf{Delivery} \longrightarrow \mathbf{Impact\ Updated}$$

1. **Food Donor** logs excess cooked meals, quantity (kg / portions), expiry countdown, and pickup location.
2. Nearby **NGOs** receive real-time proximity alerts and view donations on an interactive proximity radar.
3. The **NGO** clicks **“Accept Donation”** to reserve the food.
4. An automated request is dispatched to nearby **Volunteer Couriers**.
5. A **Volunteer** accepts the pickup, navigates to the donor venue, and marks **“Food Picked Up”**.
6. The courier drops the food at the shelter and marks **“Delivered”**.
7. The platform immediately updates sustainability impact: **Food Saved (kg)**, **Meals Distributed**, and **$\text{CO}_2\text{e}$ Emissions Prevented**.

---

## 👥 User Roles & Capabilities

| Role | Core Capabilities |
| :--- | :--- |
| **1. Food Donor** *(Hotels, Caterers, Colleges, Homes)* | • Post surplus food with images, expiry timers, and dietary tags (Veg/Non-Veg)<br>• View real-time active donation pipelines<br>• Access donation history & ESG carbon reduction reports |
| **2. NGO / Food Receiver** *(Shelters, Care Homes)* | • View nearby surplus food on **Card Grid** or **Interactive Radar Map**<br>• Filter by dietary tags (Veg only) or urgent expiry (< 3 hours)<br>• 1-click **“Accept Donation”** |
| **3. Volunteer Courier** *(Crowdsourced Delivery Fleet)* | • Browse available pickup tasks with distance & route maps<br>• Accept pickup runs<br>• Progress pipeline: **Mark Picked Up** $\to$ **Mark Delivered** |
| **4. Administrator** | • Monitor network health, total active donations, and verification status<br>• Real-time system activity stream |

---

## 🖥️ Page-by-Page Feature Breakdown

### 1. Landing Page (`landing`)
* **Hero Section**: Tagline, value proposition, and dual primary CTAs (*"Donate Food"* & *"Find Food"*).
* **Live Counter**: Total kg rescued, meals served, people helped, and $\text{CO}_2\text{e}$ averted.
* **The Food Waste Crisis**: UN FAO & IPCC climate facts on food waste.
* **How It Works**: 4 clean step cards (*Post Surplus $\to$ Smart Match $\to$ Courier Dispatch $\to$ Impact Measured*).

### 2. Authentication (`auth`)
* Single-pane sign-in and registration with role switcher tabs (*Donor / NGO / Volunteer*).
* Interactive **"Hackathon Fast-Login Shortcuts"** for 1-click evaluation without typing.
* Forgot password recovery modal.

### 3. Donor Dashboard (`donor-dashboard`)
* Prominent green **“Donate Surplus Food”** CTA.
* Metric cards: Total Donations, Meals Donated, People Helped, Active Pipelines.
* Active surplus listings with live status pills and quick link to live tracking.
* Comprehensive donation history table.

### 4. Add Food Donation (`add-donation`)
* Form inputs: Food Item Name, Category (Cooked Meals, Baked Goods, Groceries, Produce), Quantity in kg/portions, Dietary toggle (Veg/Non-Veg), Preparation time, Consume-before expiry window, Pickup address, and Contact phone.
* **Quick Photo Picker**: 4 instant high-resolution presets (Biryani & Rice, Fresh Bakery, Hot Curries, Fresh Fruits) + Custom device upload.
* **Auto-Fill Sample Data**: 1-click button for lightning-fast demo entry.
* **Submission Confirmation Screen**: Displays confirmation badge, donation ID (`#FS-XXX`), and quick actions.

### 5. NGO Dashboard (`ngo-dashboard`)
* **Card Grid vs. Interactive Radar Map toggle**:
  * **Card View**: Food name, donor organization, portions, distance (e.g. `1.4 km`), countdown badge (color-coded: Red $< 2\text{h}$, Green $> 4\text{h}$), and **“Accept Donation”** button.
  * **Radar Map**: Visual radial layout placing donor pins relative to NGO center with live pulse animation and click-to-claim tooltip.
* Filters: All, Vegetarian Only, Urgent Expiry ($< 3\text{h}$).
* Claimed / Inbound donations tray.

### 6. Volunteer Dashboard (`volunteer-dashboard`)
* Available pickup requests showing donor pickup point $\to$ NGO drop point, distance, and quantity.
* **Action Pipeline**:
  * Step 1: Click **“Accept Pickup”**
  * Step 2: Click **“Mark Picked Up”**
  * Step 3: Click **“Mark Delivered”** (triggers live impact recalculation)
* Completed deliveries record.

### 7. Food Tracking (`tracking`)
* Visual 5-step progress stepper:
  $$\mathbf{Surplus\ Available} \longrightarrow \mathbf{NGO\ Accepted} \longrightarrow \mathbf{Volunteer\ Assigned} \longrightarrow \mathbf{Food\ Picked\ Up} \longrightarrow \mathbf{Safely\ Delivered}$$
* Live details card with Donor Venue, Receiving NGO, and Volunteer Driver contact info.
* Manual state advance controls for instant demo presentations.

### 8. Notification Center (`notification-drawer`)
* Slide-out notification drawer with live unread badge count.
* Alerts for: *New nearby food*, *Donation claimed*, *Volunteer assigned*, *Food picked up*, *Delivered*, and *Expiry warnings*.
* Single-click **"Test Alert"** simulator button.

### 9. Impact Dashboard (`impact`)
* Live-updating ESG sustainability counters:
  * **Total Food Rescued**: In kg
  * **Total Meals Distributed**: $1\text{ kg} \approx 3\text{ meals}$
  * **People Fed**: Verified beneficiaries
  * **$\text{CO}_2\text{e}$ Emissions Averted**: $2.5\text{ kg } \text{CO}_2\text{e}$ per kg food saved
  * **Water Footprint Saved**: $1,000\text{ Liters}$ per kg food saved
* **Interactive Chart.js Visualizations**:
  * Monthly Redistribution Trend (Bar/Line chart)
  * Rescue by Category (Donut chart)
* Top Donors Leaderboard.
* Downloadable Verified Impact Certificate.

---

## 🛠️ Technical Architecture & Integrations

```
D:\Mini_Hackathon\
│
├── index.html                   # Responsive shell, Tailwind CSS, Lucide Icons, Chart.js
├── app.js                       # Single-page application logic, reactive state machine, router
├── styles.css                   # Custom theme tokens, micro-interactions, radar pulse animations
│
├── backend-spec/                # Ready-to-deploy backend templates
│   ├── database/
│   │   └── schema.sql           # Production MySQL 8.0 schema with 6 relational tables & seeds
│   ├── spring-boot/
│   │   ├── DonationController.java  # Spring Boot REST Controller
│   │   ├── Donation.java            # JPA Entity
│   │   ├── DonationStatus.java      # Status Enum
│   │   ├── DonationRepository.java  # Spring Data JPA Repository
│   │   └── application.properties   # DB, JWT, Firebase, and Google Maps configs
│   └── nodejs-express/
│       ├── server.js                # Express REST Server
│       ├── package.json             # NPM dependencies
│       └── routes/donations.js      # REST API route handlers
│
└── README.md                    # Project documentation & pitch guide
```

### Backend & API Readiness
* **REST APIs**: Standard JSON payload contract matching `/api/donations`, `/api/donations/:id/claim`, and `/api/donations/:id/status`.
* **Database**: MySQL schema ready in `backend-spec/database/schema.sql` with foreign keys, status ENUMs, and spatial coordinates.
* **Maps API**: Geo-coordinate data structures (`lat`, `lng`, `distance`) configured for instant drop-in Google Maps JavaScript API integration.
* **Notifications**: Structured payload ready for Firebase Cloud Messaging (FCM).

---

## 🏃 How to Run the Application (Zero-Setup)

The application has been engineered to run **instantly without complex build configurations**:

### Option 1: Direct File Launch (Easiest)
Simply double-click or open `index.html` in **Google Chrome**, **Microsoft Edge**, or **Mozilla Firefox**:
```
file:///D:/Mini_Hackathon/index.html
```

### Option 2: Using VS Code Live Server
1. Open folder `D:\Mini_Hackathon` in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python HTTP Server (if installed)
Open terminal in `D:\Mini_Hackathon` and run:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 🏆 Hackathon Demo Cheat Sheet (30-Second Winning Pitch)

1. **Start on Landing Page**: Show the tagline *"Share Food. Reduce Waste. Feed Communities."* and the live counter.
2. **Click "Run 1-Click Simulation"** (Top black bar):
   * Watch the system automatically create a donation $\to$ switch to NGO $\to$ claim the food $\to$ assign volunteer $\to$ mark picked up $\to$ mark delivered $\to$ open the Impact Dashboard with animated celebration toast in under 8 seconds!
3. **Showcase the Proximity Radar**: Switch to NGO mode and toggle **"Interactive Radar Map"** to display real-time donor pins.
4. **Showcase the 5-Step Food Tracker**: Open **Live Tracker** to show the real-time pipeline (*Available $\to$ Accepted $\to$ Volunteer Assigned $\to$ Picked Up $\to$ Delivered*).
5. **Showcase Backend Architecture**: Open `backend-spec/` folder to show judges the production MySQL schema and Spring Boot / Express REST endpoints.
