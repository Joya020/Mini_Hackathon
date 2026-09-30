/**
 * FoodShare - Smart Surplus Food Redistribution System
 * Core Application Engine & State Machine
 */

// ==========================================
// 1. INITIAL SEED DATA & CONSTANTS
// ==========================================
const DEFAULT_DONATIONS = [
  {
    id: "FS-101",
    foodName: "50 Packed Meals - Veg Biryani & Cucumber Raita",
    category: "Cooked Meals",
    quantity: "18 kg (~50 meals)",
    quantityKg: 18,
    mealsCount: 50,
    vegNonVeg: "veg",
    prepTime: "Today, 1:00 PM",
    consumeBefore: "Today, 6:00 PM",
    hoursRemaining: 3.5,
    donorName: "Grand Emerald Banquet & Caterers",
    pickupLocation: "Central Avenue, Near Cyber City, Block 4",
    coordinates: { x: 38, y: 45, lat: 12.9716, lng: 77.5946 },
    contact: "+91 98765 43210 (Manager Rakesh)",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    status: "available", // available -> accepted -> volunteer_assigned -> picked_up -> delivered
    claimedBy: null,
    volunteer: null,
    dropLocation: "To be determined by accepting NGO",
    distance: "1.4 km away",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    handlingNotes: "Keep covered. Steam warm boxes."
  },
  {
    id: "FS-102",
    foodName: "Artisan Breads, Bagels & Croissants (Fresh Bake)",
    category: "Baked Goods",
    quantity: "12 kg (~35 portions)",
    quantityKg: 12,
    mealsCount: 35,
    vegNonVeg: "veg",
    prepTime: "Today, 11:30 AM",
    consumeBefore: "Tonight, 9:00 PM",
    hoursRemaining: 6.0,
    donorName: "Golden Crust Artisan Bakery",
    pickupLocation: "Shop 12, High Street Galleria",
    coordinates: { x: 62, y: 30, lat: 12.9816, lng: 77.6046 },
    contact: "+91 98451 22334 (Chef Priya)",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    status: "accepted",
    claimedBy: {
      ngoName: "Hope Shelter & Community Kitchen",
      contact: "+91 98220 55667",
      acceptedAt: "30 mins ago"
    },
    volunteer: null,
    dropLocation: "Hope Shelter, 4th Cross, Indiranagar",
    distance: "2.1 km away",
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    handlingNotes: "Packed in moisture-proof bakery crates."
  },
  {
    id: "FS-103",
    foodName: "30 Trays of Paneer Butter Masala & Roti",
    category: "Cooked Meals",
    quantity: "15 kg (~45 meals)",
    quantityKg: 15,
    mealsCount: 45,
    vegNonVeg: "veg",
    prepTime: "Today, 12:45 PM",
    consumeBefore: "Today, 5:30 PM",
    hoursRemaining: 2.0,
    donorName: "Spice Symphony Restaurant",
    pickupLocation: "Sector 14 Market, Gate 2",
    coordinates: { x: 25, y: 65, lat: 12.9616, lng: 77.5846 },
    contact: "+91 97110 99887 (Manager Anil)",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    status: "volunteer_assigned",
    claimedBy: {
      ngoName: "Annapurna Care Center",
      contact: "+91 99001 44332",
      acceptedAt: "1 hour ago"
    },
    volunteer: {
      name: "Alex Rivera",
      phone: "+91 98112 33445",
      vehicle: "Honda Activa (KA-03-EF-2022)",
      assignedAt: "20 mins ago"
    },
    dropLocation: "Annapurna Care, Ring Road Junction",
    distance: "3.2 km away",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    handlingNotes: "Insulated food containers included."
  },
  {
    id: "FS-104",
    foodName: "Fresh Seasonal Fruits & Vegetable Crates",
    category: "Produce",
    quantity: "25 kg (~70 portions)",
    quantityKg: 25,
    mealsCount: 70,
    vegNonVeg: "veg",
    prepTime: "Harvested Today, 8:00 AM",
    consumeBefore: "Tomorrow, 8:00 PM",
    hoursRemaining: 28.0,
    donorName: "Green Valley Organic Mart",
    pickupLocation: "Green Valley Warehouse, Dock 3",
    coordinates: { x: 75, y: 70, lat: 12.9916, lng: 77.6146 },
    contact: "+91 98334 11220 (Supervisor Suresh)",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80",
    status: "delivered",
    claimedBy: {
      ngoName: "Vidyodaya Children Home",
      contact: "+91 98450 99881",
      acceptedAt: "3 hours ago"
    },
    volunteer: {
      name: "Deepak Sharma",
      phone: "+91 98770 12345",
      vehicle: "Eco Van (KA-01-MJ-8890)",
      assignedAt: "2.5 hours ago",
      pickedUpAt: "2 hours ago",
      deliveredAt: "45 mins ago"
    },
    dropLocation: "Vidyodaya Home, 8th Main, Malleshwaram",
    distance: "4.5 km",
    createdAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    handlingNotes: "Delivered safely. Received by Sister Mary."
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: "N-1",
    title: "Urgent Food Available",
    message: "Grand Emerald Banquet posted 18 kg (~50 meals) of Veg Biryani expiring in 3.5 hrs.",
    type: "new_food",
    time: "15 mins ago",
    read: false,
    donationId: "FS-101"
  },
  {
    id: "N-2",
    title: "Donation Accepted",
    message: "Hope Shelter accepted your Bakery Bread donation. Volunteer matching in progress.",
    type: "accepted",
    time: "30 mins ago",
    read: false,
    donationId: "FS-102"
  },
  {
    id: "N-3",
    title: "Volunteer Assigned",
    message: "Alex Rivera (KA-03-EF-2022) is en route to pickup Paneer Butter Masala.",
    type: "volunteer",
    time: "45 mins ago",
    read: true,
    donationId: "FS-103"
  },
  {
    id: "N-4",
    title: "Delivery Completed! 🎉",
    message: "25 kg Fresh Produce safely delivered to Vidyodaya Children Home. +70 people helped!",
    type: "delivered",
    time: "1 hour ago",
    read: true,
    donationId: "FS-104"
  }
];

// Sample photo presets for quick donation creation in demo
const SAMPLE_IMAGE_PRESETS = [
  {
    name: "Biryani & Rice Bowls",
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Curry & Indian Breads",
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Fresh Bakery & Rolls",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Fresh Fruits & Veggies",
    url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80"
  }
];

// ==========================================
// 2. STATE MANAGER
// ==========================================
class Store {
  constructor() {
    this.load();
  }

  load() {
    try {
      const storedDonations = localStorage.getItem("fs_donations");
      this.donations = storedDonations ? JSON.parse(storedDonations) : DEFAULT_DONATIONS;

      const storedNotifs = localStorage.getItem("fs_notifications");
      this.notifications = storedNotifs ? JSON.parse(storedNotifs) : DEFAULT_NOTIFICATIONS;

      const storedRole = localStorage.getItem("fs_role");
      this.currentRole = storedRole || "donor"; // donor | ngo | volunteer | admin | guest

      const storedUser = localStorage.getItem("fs_user");
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      } else {
        this.currentUser = this.getDefaultUserForRole(this.currentRole);
      }

      const storedPage = localStorage.getItem("fs_page");
      this.currentPage = storedPage || "landing";

      this.activeTrackId = localStorage.getItem("fs_track_id") || "FS-103";
    } catch (e) {
      console.warn("Error reading localStorage, reverting to defaults", e);
      this.donations = [...DEFAULT_DONATIONS];
      this.notifications = [...DEFAULT_NOTIFICATIONS];
      this.currentRole = "donor";
      this.currentUser = this.getDefaultUserForRole("donor");
      this.currentPage = "landing";
      this.activeTrackId = "FS-103";
    }
  }

  getDefaultUserForRole(role) {
    const avatars = {
      donor: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80",
      ngo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80",
      volunteer: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      admin: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      guest: ""
    };
    const names = {
      donor: "Grand Emerald Bistro",
      ngo: "Hope Shelter Foundation",
      volunteer: "Alex Rivera",
      admin: "Platform Admin",
      guest: "Guest Visitor"
    };
    return {
      name: names[role] || "FoodShare Member",
      email: `${role}@foodshare.org`,
      role: role,
      avatar: avatars[role] || avatars.donor,
      isLoggedIn: role !== "guest"
    };
  }

  save() {
    try {
      localStorage.setItem("fs_donations", JSON.stringify(this.donations));
      localStorage.setItem("fs_notifications", JSON.stringify(this.notifications));
      localStorage.setItem("fs_role", this.currentRole);
      localStorage.setItem("fs_user", JSON.stringify(this.currentUser));
      localStorage.setItem("fs_page", this.currentPage);
      localStorage.setItem("fs_track_id", this.activeTrackId);
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }

  resetDefaults() {
    localStorage.removeItem("fs_donations");
    localStorage.removeItem("fs_notifications");
    localStorage.removeItem("fs_role");
    localStorage.removeItem("fs_user");
    localStorage.removeItem("fs_page");
    localStorage.removeItem("fs_track_id");
    this.load();
    renderApp();
    showToast("Demo data reset to original state", "success");
  }

  setRole(role) {
    this.currentRole = role;
    this.currentUser = this.getDefaultUserForRole(role);
    this.save();
    renderApp();
  }

  loginUser(userData) {
    const role = userData.role || "donor";
    this.currentRole = role;
    this.currentUser = {
      name: userData.name || this.getDefaultUserForRole(role).name,
      email: userData.email || `${role}@foodshare.org`,
      phone: userData.phone || "+91 98765 43210",
      role: role,
      avatar: this.getDefaultUserForRole(role).avatar,
      isLoggedIn: true
    };
    this.save();
    renderApp();
  }

  logoutUser() {
    this.currentUser = {
      name: "Guest",
      role: "guest",
      isLoggedIn: false
    };
    this.currentRole = "guest";
    this.currentPage = "landing";
    this.save();
    renderApp();
    showToast("Signed out successfully", "info");
  }

  setPage(page, meta = {}) {
    this.currentPage = page;
    if (meta.trackId) {
      this.activeTrackId = meta.trackId;
    }
    this.save();
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderApp();
  }

  addDonation(data) {
    const id = "FS-" + Math.floor(100 + Math.random() * 900);
    const newDonation = {
      id,
      foodName: data.foodName,
      category: data.category || "Cooked Meals",
      quantity: data.quantity,
      quantityKg: parseFloat(data.quantityKg) || 10,
      mealsCount: parseInt(data.mealsCount) || 30,
      vegNonVeg: data.vegNonVeg || "veg",
      prepTime: data.prepTime || "Just now",
      consumeBefore: data.consumeBefore || "In 4 hours",
      hoursRemaining: parseFloat(data.hoursRemaining) || 4,
      donorName: data.donorName || (this.currentRole === "donor" ? "Green Garden Bistro" : "Community Donor"),
      pickupLocation: data.pickupLocation || "Indiranagar 100ft Road",
      coordinates: {
        x: Math.floor(20 + Math.random() * 60),
        y: Math.floor(25 + Math.random() * 50),
        lat: 12.9716,
        lng: 77.5946
      },
      contact: data.contact || "+91 98450 12345",
      imageUrl: data.imageUrl || SAMPLE_IMAGE_PRESETS[0].url,
      status: "available",
      claimedBy: null,
      volunteer: null,
      dropLocation: "To be determined upon claim",
      distance: (1.0 + Math.random() * 3.5).toFixed(1) + " km away",
      createdAt: new Date().toISOString(),
      handlingNotes: data.handlingNotes || "Freshly prepared. Stored safely."
    };

    this.donations.unshift(newDonation);

    // Add alert
    this.addNotification({
      title: "New Surplus Food Listed!",
      message: `${newDonation.donorName} listed ${newDonation.quantity} of ${newDonation.foodName}.`,
      type: "new_food",
      donationId: id
    });

    this.activeTrackId = id;
    this.save();
    return newDonation;
  }

  claimDonation(donationId, ngoName = "Hope Shelter & Community Kitchen") {
    const d = this.donations.find(item => item.id === donationId);
    if (!d) return false;

    d.status = "accepted";
    d.claimedBy = {
      ngoName: ngoName,
      contact: "+91 98220 55667",
      acceptedAt: "Just now"
    };
    d.dropLocation = "Hope Care Center, 5th Cross, Indiranagar";

    this.addNotification({
      title: "Donation Claimed! 🤝",
      message: `${ngoName} accepted ${d.foodName}. Awaiting volunteer driver.`,
      type: "accepted",
      donationId: d.id
    });

    this.save();
    return true;
  }

  assignVolunteer(donationId, volunteerName = "Alex Rivera") {
    const d = this.donations.find(item => item.id === donationId);
    if (!d) return false;

    d.status = "volunteer_assigned";
    d.volunteer = {
      name: volunteerName,
      phone: "+91 98112 33445",
      vehicle: "Honda Activa (KA-03-EF-2022)",
      assignedAt: "Just now"
    };

    this.addNotification({
      title: "Volunteer Assigned 🛵",
      message: `${volunteerName} is en route to pick up ${d.foodName} from ${d.donorName}.`,
      type: "volunteer",
      donationId: d.id
    });

    this.save();
    return true;
  }

  markPickedUp(donationId) {
    const d = this.donations.find(item => item.id === donationId);
    if (!d || !d.volunteer) return false;

    d.status = "picked_up";
    d.volunteer.pickedUpAt = "Just now";

    this.addNotification({
      title: "Food Picked Up! 📦",
      message: `${d.volunteer.name} picked up the food and is en route to ${d.claimedBy?.ngoName || "NGO"}.`,
      type: "picked_up",
      donationId: d.id
    });

    this.save();
    return true;
  }

  markDelivered(donationId) {
    const d = this.donations.find(item => item.id === donationId);
    if (!d || !d.volunteer) return false;

    d.status = "delivered";
    d.volunteer.deliveredAt = "Just now";

    this.addNotification({
      title: "Food Delivered Successfully! 🎉",
      message: `${d.quantity} safely delivered to ${d.claimedBy?.ngoName || "NGO"}. Meals distributed: ${d.mealsCount || 30}!`,
      type: "delivered",
      donationId: d.id
    });

    this.save();
    return true;
  }

  addNotification(notif) {
    const item = {
      id: "N-" + Date.now(),
      title: notif.title,
      message: notif.message,
      type: notif.type || "info",
      time: "Just now",
      read: false,
      donationId: notif.donationId || null
    };
    this.notifications.unshift(item);
    showToast(notif.title + ": " + notif.message, "success");
    updateNotificationPill();
  }

  getImpactMetrics() {
    const delivered = this.donations.filter(d => d.status === "delivered");
    // Aggregate completed
    const baseKg = 1420;
    const baseMeals = 4260;
    const basePeople = 3850;

    const dynamicKg = delivered.reduce((acc, curr) => acc + (curr.quantityKg || 15), 0);
    const dynamicMeals = delivered.reduce((acc, curr) => acc + (curr.mealsCount || 45), 0);

    const totalKg = baseKg + dynamicKg;
    const totalMeals = baseMeals + dynamicMeals;
    const peopleHelped = basePeople + Math.round(dynamicMeals * 0.9);
    const co2Kg = Math.round(totalKg * 2.5); // 2.5 kg CO2e per kg food saved
    const waterLiters = Math.round(totalKg * 1000); // 1000L water per kg

    return {
      totalKg,
      totalMeals,
      peopleHelped,
      co2Kg,
      waterLiters,
      successfulDeliveries: 142 + delivered.length,
      activeDonationsCount: this.donations.filter(d => d.status !== "delivered").length
    };
  }
}

const appStore = new Store();

// ==========================================
// 3. UI HELPERS & TOASTS
// ==========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `glass-panel pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border border-slate-200 animate-slide-down max-w-sm ${
    type === "success" ? "border-l-4 border-l-emerald-500 bg-white" : "border-l-4 border-l-blue-500 bg-white"
  }`;

  const iconName = type === "success" ? "check-circle" : "info";
  const iconColor = type === "success" ? "text-emerald-600" : "text-blue-600";

  toast.innerHTML = `
    <div class="mt-0.5 ${iconColor}">
      <i data-lucide="${iconName}" class="w-5 h-5"></i>
    </div>
    <div class="flex-1 text-xs">
      <p class="font-semibold text-slate-800">${escapeHtml(message)}</p>
    </div>
    <button class="text-slate-400 hover:text-slate-600" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }
  }, 4500);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toggleNotificationDrawer() {
  const drawer = document.getElementById("notification-drawer");
  const backdrop = document.getElementById("notification-backdrop");
  if (!drawer || !backdrop) return;

  const isHidden = drawer.classList.contains("translate-x-full");
  if (isHidden) {
    renderNotificationList();
    drawer.classList.remove("translate-x-full");
    backdrop.classList.remove("hidden");
  } else {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
  }
}

function renderNotificationList() {
  const listEl = document.getElementById("notification-list");
  if (!listEl) return;

  if (appStore.notifications.length === 0) {
    listEl.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="bell-off" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <p class="text-sm">No notifications yet</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  listEl.innerHTML = appStore.notifications.map(n => `
    <div class="p-3.5 hover:bg-slate-50 transition cursor-pointer ${!n.read ? 'bg-emerald-50/40' : ''}" onclick="handleNotifClick('${n.donationId}')">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          n.type === 'delivered' ? 'bg-emerald-100 text-emerald-600' :
          n.type === 'volunteer' ? 'bg-blue-100 text-blue-600' :
          n.type === 'accepted' ? 'bg-purple-100 text-purple-600' :
          'bg-amber-100 text-amber-600'
        }">
          <i data-lucide="${
            n.type === 'delivered' ? 'check-check' :
            n.type === 'volunteer' ? 'bike' :
            n.type === 'accepted' ? 'hand-heart' : 'sparkles'
          }" class="w-4 h-4"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <h4 class="text-xs font-bold text-slate-800 truncate">${escapeHtml(n.title)}</h4>
            <span class="text-[10px] text-slate-400 shrink-0">${n.time}</span>
          </div>
          <p class="text-xs text-slate-600 line-clamp-2">${escapeHtml(n.message)}</p>
          ${n.donationId ? `<span class="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">ID: ${n.donationId}</span>` : ''}
        </div>
        ${!n.read ? '<span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1"></span>' : ''}
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

function handleNotifClick(donationId) {
  if (donationId) {
    appStore.setPage("tracking", { trackId: donationId });
    toggleNotificationDrawer();
  }
}

function markAllNotificationsAsRead() {
  appStore.notifications.forEach(n => n.read = true);
  appStore.save();
  updateNotificationPill();
  renderNotificationList();
  showToast("All notifications marked as read", "info");
}

function updateNotificationPill() {
  const countPill = document.getElementById("notif-count-pill");
  const navBadge = document.getElementById("nav-notif-badge");
  const unreadCount = appStore.notifications.filter(n => !n.read).length;

  if (countPill) countPill.innerText = unreadCount;
  if (navBadge) {
    if (unreadCount > 0) {
      navBadge.innerText = unreadCount;
      navBadge.classList.remove("hidden");
    } else {
      navBadge.classList.add("hidden");
    }
  }
}

function simulateDemoNotification() {
  const alerts = [
    { title: "Expiry Warning ⚠️", message: "Curry portions at Spice Symphony expire in 45 minutes! Immediate pickup recommended.", type: "urgent" },
    { title: "New Food Alert 🥗", message: "Royal Orchid Hotel just listed 40 fresh breakfast buffet meal boxes.", type: "new_food" },
    { title: "Volunteer En Route 🛵", message: "Driver Priya is 2 mins away from Indiranagar NGO drop point.", type: "volunteer" }
  ];
  const chosen = alerts[Math.floor(Math.random() * alerts.length)];
  appStore.addNotification(chosen);
}

// 1-Click Interactive Full Workflow Simulation for Hackathon Judges
function simulateFullWorkflow() {
  showToast("Starting Live Redistribution Simulation...", "info");

  // Step 1: Donor Adds Food
  const newDonation = appStore.addDonation({
    foodName: "35 Meal Boxes - Pulao & Dal Makhani",
    category: "Cooked Meals",
    quantity: "14 kg (~35 meals)",
    quantityKg: 14,
    mealsCount: 35,
    vegNonVeg: "veg",
    prepTime: "Just now",
    consumeBefore: "In 3 hours",
    hoursRemaining: 3,
    donorName: "Grand Palace Hotel & Banquets",
    pickupLocation: "Grand Palace, Ball Room Entrance, MG Road",
    contact: "+91 99887 66554"
  });

  appStore.setRole("ngo");
  appStore.setPage("ngo-dashboard");
  showToast("Step 1: Donor created surplus food. Switched to NGO view.", "success");

  // Step 2: NGO Accepts after 2.5s
  setTimeout(() => {
    appStore.claimDonation(newDonation.id, "St. Jude Care Center");
    appStore.setRole("volunteer");
    appStore.setPage("volunteer-dashboard");
    showToast("Step 2: St. Jude NGO accepted food! Switched to Volunteer Dispatch.", "success");

    // Step 3: Volunteer Assigned & Picked Up after 2.5s
    setTimeout(() => {
      appStore.assignVolunteer(newDonation.id, "Kavya Menon");
      appStore.markPickedUp(newDonation.id);
      appStore.setPage("tracking", { trackId: newDonation.id });
      showToast("Step 3: Volunteer Kavya Menon picked up food! Tracking en route.", "success");

      // Step 4: Delivered after 3.0s
      setTimeout(() => {
        appStore.markDelivered(newDonation.id);
        appStore.setPage("impact");
        showToast("Step 4: Food safely delivered! Environmental impact updated!", "success");
      }, 3000);

    }, 2500);

  }, 2500);
}

function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById("profile-dropdown-menu");
  if (!dropdown) return;
  dropdown.classList.toggle("hidden");
}

function goToMyDashboard() {
  const role = appStore.currentUser?.role || appStore.currentRole || "donor";
  const destinationMap = {
    donor: "donor-dashboard",
    ngo: "ngo-dashboard",
    volunteer: "volunteer-dashboard",
    admin: "admin-dashboard",
    guest: "landing"
  };
  appStore.setPage(destinationMap[role] || "donor-dashboard");
  const dropdown = document.getElementById("profile-dropdown-menu");
  if (dropdown) dropdown.classList.add("hidden");
}

// Close profile dropdown when clicking anywhere outside
window.addEventListener("click", (e) => {
  const dropdown = document.getElementById("profile-dropdown-menu");
  if (dropdown && !dropdown.classList.contains("hidden")) {
    if (!e.target.closest("#profile-dropdown-container")) {
      dropdown.classList.add("hidden");
    }
  }
});

// ==========================================
// 4. HEADER COMPONENT
// ==========================================
function renderHeader() {
  const currentRole = appStore.currentRole;
  const currentPage = appStore.currentPage;
  const unreadCount = appStore.notifications.filter(n => !n.read).length;

  const roleLabels = {
    donor: { label: "Donor Mode", icon: "utensils", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    ngo: { label: "NGO Mode", icon: "building-2", color: "bg-blue-100 text-blue-800 border-blue-300" },
    volunteer: { label: "Volunteer Mode", icon: "bike", color: "bg-amber-100 text-amber-800 border-amber-300" },
    admin: { label: "Admin Mode", icon: "shield-check", color: "bg-purple-100 text-purple-800 border-purple-300" },
    guest: { label: "Public Visitor", icon: "globe", color: "bg-slate-100 text-slate-700 border-slate-300" }
  };

  const activeRoleBadge = roleLabels[currentRole] || roleLabels.donor;
  const user = appStore.currentUser || appStore.getDefaultUserForRole(currentRole);

  return `
    <!-- Main Navigation Bar -->
    <header class="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="appStore.setPage('landing')">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <i data-lucide="sprout" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-xl font-extrabold tracking-tight text-slate-900 font-heading">Food<span class="text-emerald-600">Share</span></span>
              <span class="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">PRO</span>
            </div>
            <p class="text-[10px] text-slate-500 hidden sm:block">Smart Surplus Food Redistribution</p>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button onclick="appStore.setPage('landing')" class="px-3 py-1.5 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition ${currentPage === 'landing' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''}">
            Home
          </button>
          <button onclick="appStore.setRole('donor'); appStore.setPage('donor-dashboard')" class="px-3 py-1.5 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition ${currentPage === 'donor-dashboard' || currentPage === 'add-donation' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''}">
            Donor Portal
          </button>
          <button onclick="appStore.setRole('ngo'); appStore.setPage('ngo-dashboard')" class="px-3 py-1.5 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition ${currentPage === 'ngo-dashboard' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''}">
            Find Food (NGO)
          </button>
          <button onclick="appStore.setRole('volunteer'); appStore.setPage('volunteer-dashboard')" class="px-3 py-1.5 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition ${currentPage === 'volunteer-dashboard' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''}">
            Volunteer Runs
          </button>
          <button onclick="appStore.setPage('tracking')" class="px-3 py-1.5 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition ${currentPage === 'tracking' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''}">
            Live Tracker
          </button>
          <button onclick="appStore.setPage('impact')" class="px-3 py-1.5 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition ${currentPage === 'impact' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''}">
            Impact
          </button>
        </nav>

        <!-- Right Action Items -->
        <div class="flex items-center gap-2.5">
          <!-- Notification Bell -->
          <button onclick="toggleNotificationDrawer()" class="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition" title="View Notifications">
            <i data-lucide="bell" class="w-5 h-5"></i>
            <span id="nav-notif-badge" class="${unreadCount > 0 ? '' : 'hidden'} absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              ${unreadCount}
            </span>
          </button>

          <!-- Current Persona Indicator & Donate Button -->
          <button onclick="appStore.setRole('donor'); appStore.setPage('add-donation')" class="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm shadow-emerald-600/30 transition">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Donate Food
          </button>

          <!-- User Profile Icon & Dropdown Menu -->
          ${user && user.isLoggedIn ? `
            <div id="profile-dropdown-container" class="relative">
              <button onclick="toggleProfileDropdown(event)" class="p-1 sm:px-3 sm:py-1.5 rounded-full sm:rounded-2xl border border-slate-200 hover:border-emerald-400 flex items-center gap-2.5 bg-white hover:bg-emerald-50/40 text-xs font-medium text-slate-700 shadow-sm transition" title="Account Menu">
                <div class="relative">
                  <img src="${user.avatar}" alt="${escapeHtml(user.name)}" class="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500">
                  <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div class="hidden sm:flex flex-col text-left">
                  <span class="font-bold text-slate-900 text-xs truncate max-w-[130px] leading-tight">${escapeHtml(user.name)}</span>
                  <span class="text-[10px] font-semibold text-emerald-600 capitalize">${user.role}</span>
                </div>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>

              <!-- Profile Dropdown Card -->
              <div id="profile-dropdown-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 animate-slide-down">
                <div class="p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/50">
                  <div class="flex items-center gap-3">
                    <img src="${user.avatar}" class="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500 shadow-sm">
                    <div class="min-w-0">
                      <p class="font-bold text-slate-900 text-xs truncate">${escapeHtml(user.name)}</p>
                      <p class="text-[11px] text-slate-500 truncate">${escapeHtml(user.email)}</p>
                      <span class="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">${user.role}</span>
                    </div>
                  </div>
                </div>

                <div class="py-1 text-xs">
                  <button onclick="goToMyDashboard()" class="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-slate-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium transition">
                    <i data-lucide="layout-dashboard" class="w-4 h-4 text-emerald-600"></i> My Role Dashboard
                  </button>
                  <button onclick="appStore.setPage('tracking')" class="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-slate-50 hover:text-blue-700 flex items-center gap-2.5 font-medium transition">
                    <i data-lucide="route" class="w-4 h-4 text-blue-600"></i> Live Order Tracker
                  </button>
                  <button onclick="appStore.setPage('impact')" class="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-slate-50 hover:text-teal-700 flex items-center gap-2.5 font-medium transition">
                    <i data-lucide="bar-chart-2" class="w-4 h-4 text-teal-600"></i> Impact & ESG Stats
                  </button>
                </div>

                <div class="py-1 text-xs bg-slate-50/80">
                  <button onclick="appStore.setPage('auth')" class="w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-100 flex items-center gap-2.5 transition">
                    <i data-lucide="repeat" class="w-3.5 h-3.5 text-slate-400"></i> Switch Persona / Role
                  </button>
                  <button onclick="appStore.logoutUser()" class="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-semibold transition">
                    <i data-lucide="log-out" class="w-3.5 h-3.5 text-rose-600"></i> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <button onclick="appStore.setPage('auth')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
              <i data-lucide="user" class="w-4 h-4"></i> Sign In / Register
            </button>
          `}
        </div>

      </div>

      <!-- Mobile Navigation Bar -->
      <div class="flex md:hidden border-t border-slate-100 px-3 py-2 justify-around text-xs bg-slate-50/80">
        <button onclick="appStore.setPage('landing')" class="flex flex-col items-center gap-1 text-slate-600 ${currentPage === 'landing' ? 'text-emerald-600 font-bold' : ''}">
          <i data-lucide="home" class="w-4 h-4"></i>
          <span>Home</span>
        </button>
        <button onclick="appStore.setRole('donor'); appStore.setPage('donor-dashboard')" class="flex flex-col items-center gap-1 text-slate-600 ${currentPage === 'donor-dashboard' ? 'text-emerald-600 font-bold' : ''}">
          <i data-lucide="utensils" class="w-4 h-4"></i>
          <span>Donor</span>
        </button>
        <button onclick="appStore.setRole('ngo'); appStore.setPage('ngo-dashboard')" class="flex flex-col items-center gap-1 text-slate-600 ${currentPage === 'ngo-dashboard' ? 'text-emerald-600 font-bold' : ''}">
          <i data-lucide="building-2" class="w-4 h-4"></i>
          <span>NGO</span>
        </button>
        <button onclick="appStore.setRole('volunteer'); appStore.setPage('volunteer-dashboard')" class="flex flex-col items-center gap-1 text-slate-600 ${currentPage === 'volunteer-dashboard' ? 'text-emerald-600 font-bold' : ''}">
          <i data-lucide="bike" class="w-4 h-4"></i>
          <span>Courier</span>
        </button>
        <button onclick="appStore.setPage('tracking')" class="flex flex-col items-center gap-1 text-slate-600 ${currentPage === 'tracking' ? 'text-emerald-600 font-bold' : ''}">
          <i data-lucide="route" class="w-4 h-4"></i>
          <span>Track</span>
        </button>
        <button onclick="appStore.setPage('impact')" class="flex flex-col items-center gap-1 text-slate-600 ${currentPage === 'impact' ? 'text-emerald-600 font-bold' : ''}">
          <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
          <span>Impact</span>
        </button>
      </div>
    </header>
  `;
}

// ==========================================
// 5. LANDING PAGE COMPONENT
// ==========================================
function renderLandingPage() {
  const metrics = appStore.getImpactMetrics();

  return `
    <div class="flex-1">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-12 pb-20 border-b border-slate-100">
        <!-- Background decorative blobs -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
          <div class="absolute -top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div class="absolute top-10 right-10 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold mb-6 border border-emerald-300/60 shadow-sm">
            <i data-lucide="leaf" class="w-4 h-4 text-emerald-600"></i>
            <span>Smart Surplus Food Redistribution Platform</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-heading max-w-4xl mx-auto leading-tight">
            Share Food. <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Reduce Waste.</span> Feed Communities.
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connecting restaurants, hotels, colleges, and event venues with local NGOs and volunteers in real time to rescue edible surplus food before it spoils.
          </p>

          <!-- Primary CTA Buttons -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button onclick="appStore.setRole('donor'); appStore.setPage('add-donation')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transform hover:-translate-y-0.5 transition">
              <i data-lucide="heart-handshake" class="w-5 h-5"></i> Donate Surplus Food
            </button>
            <button onclick="appStore.setRole('ngo'); appStore.setPage('ngo-dashboard')" class="bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-3.5 rounded-xl border border-slate-300 shadow-sm flex items-center gap-2 transform hover:-translate-y-0.5 transition">
              <i data-lucide="search" class="w-5 h-5 text-emerald-600"></i> Find Nearby Food (NGO)
            </button>
            <button onclick="document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })" class="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow flex items-center gap-2 transition">
              <i data-lucide="compass" class="w-4 h-4 text-emerald-400"></i> How It Works
            </button>
          </div>

          <!-- Fast Live Stats Pill Bar -->
          <div class="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div class="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading">${metrics.totalKg.toLocaleString()} kg</div>
              <p class="text-xs text-slate-500 font-medium mt-1">Food Rescued</p>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">${metrics.totalMeals.toLocaleString()}</div>
              <p class="text-xs text-slate-500 font-medium mt-1">Meals Distributed</p>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div class="text-2xl sm:text-3xl font-extrabold text-teal-600 font-heading">${metrics.peopleHelped.toLocaleString()}</div>
              <p class="text-xs text-slate-500 font-medium mt-1">People Fed</p>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div class="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-heading">${metrics.co2Kg.toLocaleString()} kg</div>
              <p class="text-xs text-slate-500 font-medium mt-1">CO₂e Emissions Averted</p>
            </div>
          </div>

        </div>
      </section>

      <!-- The Food Waste Problem Context Section -->
      <section class="py-14 bg-white border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10">
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">Why FoodShare Matters</h2>
            <p class="text-slate-600 text-sm mt-2">Millions of tons of perfectly edible food are dumped while millions sleep hungry. We bridge this critical logistics gap with technology.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-rose-50/70 border border-rose-100 flex flex-col justify-between">
              <div>
                <span class="text-3xl font-black text-rose-600 font-heading">1.3 Billion</span>
                <span class="text-sm font-semibold text-rose-800 block">Tonnes Wasted Annually</span>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                  Roughly one-third of all food produced for human consumption is lost or wasted globally every single year.
                </p>
              </div>
              <div class="mt-4 flex items-center gap-1.5 text-xs text-rose-700 font-medium">
                <i data-lucide="alert-triangle" class="w-4 h-4"></i> UN Food & Agriculture Org
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
              <div>
                <span class="text-3xl font-black text-amber-600 font-heading">828 Million</span>
                <span class="text-sm font-semibold text-amber-800 block">Facing Chronic Hunger</span>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                  Yet local charities struggle daily with inadequate supplies, high procurement costs, and logistical disconnects.
                </p>
              </div>
              <div class="mt-4 flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                <i data-lucide="users" class="w-4 h-4"></i> Global Hunger Index
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
              <div>
                <span class="text-3xl font-black text-emerald-600 font-heading">8 - 10%</span>
                <span class="text-sm font-semibold text-emerald-800 block">Global GHG Emissions</span>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                  Food rotting in landfills generates potent methane gas. Rescuing food directly combats climate change.
                </p>
              </div>
              <div class="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <i data-lucide="globe-2" class="w-4 h-4"></i> IPCC Climate Report
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works (4 Clear Steps) -->
      <section id="how-it-works-section" class="py-16 bg-slate-50 border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Simple 4-Step Cycle</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">How FoodShare Works</h2>
            <p class="text-slate-600 text-sm mt-2">From kitchen surplus to community table in under 90 minutes.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <!-- Step 1 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start relative hover:shadow-md transition">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 class="font-bold text-base text-slate-900 font-heading mb-1.5">Post Surplus Food</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Restaurants, caterers, and events specify meal quantity, dietary tags, pickup window, and location.
              </p>
              <span class="mt-4 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Takes &lt; 2 minutes</span>
            </div>

            <!-- Step 2 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start relative hover:shadow-md transition">
              <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 class="font-bold text-base text-slate-900 font-heading mb-1.5">Smart NGO Matching</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Nearby verified shelters and community kitchens receive instant proximity alerts and claim the food.
              </p>
              <span class="mt-4 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Proximity radar</span>
            </div>

            <!-- Step 3 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start relative hover:shadow-md transition">
              <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 class="font-bold text-base text-slate-900 font-heading mb-1.5">Volunteer Courier</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Crowdsourced volunteer riders accept pickup tasks, safely collect boxes, and transport them to the shelter.
              </p>
              <span class="mt-4 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Crowdsourced fleet</span>
            </div>

            <!-- Step 4 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start relative hover:shadow-md transition">
              <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg mb-4">
                4
              </div>
              <h3 class="font-bold text-base text-slate-900 font-heading mb-1.5">Impact Measured</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Donors receive live tracking, photo proof of delivery, and automated ESG carbon-saving impact metrics.
              </p>
              <span class="mt-4 text-[11px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Automated ESG data</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Role-Based CTA Quick Jump Section -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl mx-auto mb-10">
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">Get Involved Today</h2>
            <p class="text-slate-600 text-sm mt-1">Choose how you want to make an immediate difference.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <!-- Donor Card -->
            <div class="border border-emerald-200 rounded-2xl p-6 bg-gradient-to-br from-emerald-50/50 to-white hover:border-emerald-400 transition flex flex-col justify-between shadow-sm">
              <div>
                <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                  <i data-lucide="utensils" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-slate-900 font-heading">Food Donor</h3>
                <p class="text-xs text-slate-600 mt-2">
                  Restaurants, wedding halls, hotels, and college mess wanting to donate safe excess meals.
                </p>
              </div>
              <button onclick="appStore.setRole('donor'); appStore.setPage('donor-dashboard');" class="mt-6 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition">
                Enter Donor Portal &rarr;
              </button>
            </div>

            <!-- NGO Card -->
            <div class="border border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-blue-50/50 to-white hover:border-blue-400 transition flex flex-col justify-between shadow-sm">
              <div>
                <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                  <i data-lucide="building-2" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-slate-900 font-heading">NGO / Food Receiver</h3>
                <p class="text-xs text-slate-600 mt-2">
                  Verified shelters, orphanages, and community food drives looking for reliable meal sources.
                </p>
              </div>
              <button onclick="appStore.setRole('ngo'); appStore.setPage('ngo-dashboard');" class="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition">
                Browse Available Food &rarr;
              </button>
            </div>

            <!-- Volunteer Card -->
            <div class="border border-amber-200 rounded-2xl p-6 bg-gradient-to-br from-amber-50/50 to-white hover:border-amber-400 transition flex flex-col justify-between shadow-sm">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                  <i data-lucide="bike" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-slate-900 font-heading">Volunteer Courier</h3>
                <p class="text-xs text-slate-600 mt-2">
                  Have a bike, scooter, or car? Spend 30 minutes delivering food to community beneficiaries.
                </p>
              </div>
              <button onclick="appStore.setRole('volunteer'); appStore.setPage('volunteer-dashboard');" class="mt-6 w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-sm transition">
                Accept Pickup Runs &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <i data-lucide="sprout" class="w-3.5 h-3.5"></i>
            </div>
            <span class="text-white font-bold font-heading">FoodShare</span>
            <span class="text-slate-500">— Share Food. Reduce Waste. Feed Communities.</span>
          </div>
          <div>
            &copy; 2026 FoodShare Platform. All rights reserved. Zero-Waste Community Initiative.
          </div>
        </div>
      </footer>
    </div>
  `;
}

// ==========================================
// 6. AUTHENTICATION COMPONENT
// ==========================================
function renderAuthPage() {
  return `
    <div class="flex-1 max-w-md w-full mx-auto my-10 px-4">
      <div class="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8">
        
        <div class="text-center mb-6">
          <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center mb-3 shadow-md shadow-emerald-600/30">
            <i data-lucide="lock" class="w-6 h-6"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-900 font-heading">Welcome to FoodShare</h2>
          <p class="text-xs text-slate-500 mt-1">Sign in or register to join the surplus redistribution network</p>
        </div>

        <!-- Auth Tabs: Login vs Register -->
        <div class="flex bg-slate-100 p-1 rounded-xl mb-6 text-xs font-semibold">
          <button id="auth-tab-login" onclick="toggleAuthTab('login')" class="flex-1 py-2 rounded-lg bg-white text-slate-800 shadow-sm transition">
            Sign In
          </button>
          <button id="auth-tab-register" onclick="toggleAuthTab('register')" class="flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition">
            Register Account
          </button>
        </div>

        <form id="auth-form" onsubmit="handleAuthSubmit(event)" class="space-y-4">
          
          <!-- Role Selection (Always visible for clarity) -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Select Your Role</label>
            <div class="grid grid-cols-3 gap-2">
              <label class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-emerald-400 transition bg-slate-50/50 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                <input type="radio" name="auth_role" value="donor" checked class="hidden" onchange="updateAuthRoleUI('donor')">
                <i data-lucide="utensils" class="w-4 h-4 text-emerald-600 mb-1"></i>
                <span class="text-[11px] font-semibold text-slate-800">Donor</span>
              </label>

              <label class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-blue-400 transition bg-slate-50/50 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                <input type="radio" name="auth_role" value="ngo" class="hidden" onchange="updateAuthRoleUI('ngo')">
                <i data-lucide="building-2" class="w-4 h-4 text-blue-600 mb-1"></i>
                <span class="text-[11px] font-semibold text-slate-800">NGO</span>
              </label>

              <label class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-amber-400 transition bg-slate-50/50 has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                <input type="radio" name="auth_role" value="volunteer" class="hidden" onchange="updateAuthRoleUI('volunteer')">
                <i data-lucide="bike" class="w-4 h-4 text-amber-600 mb-1"></i>
                <span class="text-[11px] font-semibold text-slate-800">Volunteer</span>
              </label>
            </div>
          </div>

          <div id="register-fields" class="space-y-4 hidden">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Organization / Full Name</label>
              <input type="text" id="auth-name" placeholder="e.g. Green Garden Bistro or Alex Rivera" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input type="tel" id="auth-phone" placeholder="+91 98765 43210" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input type="email" id="auth-email" required value="donor@foodshare.org" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-xs font-semibold text-slate-700">Password</label>
              <button type="button" onclick="showForgotPasswordModal()" class="text-[11px] text-emerald-600 hover:underline">Forgot password?</button>
            </div>
            <input type="password" id="auth-password" required value="demo1234" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          </div>

          <button type="submit" id="auth-submit-btn" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition mt-2">
            Sign In to FoodShare
          </button>
        </form>

        <!-- Quick One-Click Demo Logins for Hackathon Evaluator -->
        <div class="mt-6 pt-5 border-t border-slate-100">
          <p class="text-[11px] text-slate-400 text-center font-medium mb-2.5">Hackathon Fast-Login Shortcuts:</p>
          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <button onclick="quickAuthAs('donor')" class="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200 hover:border-emerald-300 transition text-left flex items-center gap-1.5 font-medium">
              <span>👨‍🍳</span> Donor Login
            </button>
            <button onclick="quickAuthAs('ngo')" class="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 border border-slate-200 hover:border-blue-300 transition text-left flex items-center gap-1.5 font-medium">
              <span>🏢</span> NGO Login
            </button>
            <button onclick="quickAuthAs('volunteer')" class="p-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-700 border border-slate-200 hover:border-amber-300 transition text-left flex items-center gap-1.5 font-medium">
              <span>🛵</span> Volunteer Login
            </button>
            <button onclick="quickAuthAs('admin')" class="p-2 rounded-lg bg-slate-50 hover:bg-purple-50 text-slate-700 border border-slate-200 hover:border-purple-300 transition text-left flex items-center gap-1.5 font-medium">
              <span>🛡️</span> Admin Login
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

function toggleAuthTab(tab) {
  const loginTab = document.getElementById("auth-tab-login");
  const regTab = document.getElementById("auth-tab-register");
  const regFields = document.getElementById("register-fields");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (tab === "register") {
    loginTab.className = "flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition";
    regTab.className = "flex-1 py-2 rounded-lg bg-white text-slate-800 shadow-sm transition";
    regFields.classList.remove("hidden");
    submitBtn.innerText = "Create FoodShare Account";
  } else {
    regTab.className = "flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition";
    loginTab.className = "flex-1 py-2 rounded-lg bg-white text-slate-800 shadow-sm transition";
    regFields.classList.add("hidden");
    submitBtn.innerText = "Sign In to FoodShare";
  }
}

function updateAuthRoleUI(role) {
  const emailInput = document.getElementById("auth-email");
  if (emailInput) {
    emailInput.value = `${role}@foodshare.org`;
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const selectedRole = document.querySelector('input[name="auth_role"]:checked')?.value || "donor";
  const nameInput = document.getElementById("auth-name")?.value;
  const emailInput = document.getElementById("auth-email")?.value;
  const phoneInput = document.getElementById("auth-phone")?.value;

  appStore.loginUser({
    name: nameInput && nameInput.trim() ? nameInput.trim() : null,
    email: emailInput || `${selectedRole}@foodshare.org`,
    phone: phoneInput || "+91 98765 43210",
    role: selectedRole
  });

  const destinationMap = {
    donor: "donor-dashboard",
    ngo: "ngo-dashboard",
    volunteer: "volunteer-dashboard",
    admin: "admin-dashboard"
  };

  showToast(`Welcome ${appStore.currentUser.name}! Signed in as ${selectedRole.toUpperCase()}`, "success");
  appStore.setPage(destinationMap[selectedRole]);
}

function quickAuthAs(role) {
  appStore.setRole(role);
  const destinationMap = {
    donor: "donor-dashboard",
    ngo: "ngo-dashboard",
    volunteer: "volunteer-dashboard",
    admin: "admin-dashboard"
  };
  showToast(`Logged in as ${appStore.currentUser.name} (${role.toUpperCase()})`, "success");
  appStore.setPage(destinationMap[role]);
}

function showForgotPasswordModal() {
  const email = prompt("Enter your email address to receive password reset instructions:", "user@foodshare.org");
  if (email) {
    showToast(`Password reset link dispatched to ${email}`, "info");
  }
}

// ==========================================
// 7. DONOR DASHBOARD COMPONENT
// ==========================================
function renderDonorDashboard() {
  const myDonations = appStore.donations; // In realistic app filtered by donor ID
  const activeDonations = myDonations.filter(d => d.status !== "delivered");
  const pastDonations = myDonations.filter(d => d.status === "delivered");

  const totalMeals = myDonations.reduce((sum, d) => sum + (d.mealsCount || 40), 0);
  const peopleHelped = Math.round(totalMeals * 0.95);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      <!-- Top Welcome Banner & CTA -->
      <div class="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span class="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-2">Verified Food Donor</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading">Welcome Back, Grand Emerald Bistro</h1>
          <p class="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
            You have active surplus listings awaiting claim. Thank you for feeding your local community and eliminating food waste!
          </p>
        </div>

        <button onclick="appStore.setPage('add-donation')" class="shrink-0 bg-white hover:bg-emerald-50 text-emerald-800 font-bold px-6 py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition font-heading text-sm">
          <i data-lucide="plus-circle" class="w-5 h-5 text-emerald-600"></i> Donate Surplus Food
        </button>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500 font-medium">Total Donations</p>
            <h3 class="text-2xl font-bold text-slate-900 font-heading mt-0.5">${myDonations.length} Listed</h3>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <i data-lucide="utensils" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500 font-medium">Meals Donated</p>
            <h3 class="text-2xl font-bold text-emerald-600 font-heading mt-0.5">${totalMeals}</h3>
          </div>
          <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <i data-lucide="soup" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500 font-medium">People Helped</p>
            <h3 class="text-2xl font-bold text-blue-600 font-heading mt-0.5">${peopleHelped}</h3>
          </div>
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <i data-lucide="heart" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500 font-medium">Active Pipelines</p>
            <h3 class="text-2xl font-bold text-amber-600 font-heading mt-0.5">${activeDonations.length} Active</h3>
          </div>
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
        </div>
      </div>

      <!-- Active Donations Section -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-heading">Active Surplus Listings</h2>
            <p class="text-xs text-slate-500">Live listings being claimed or transported in real time</p>
          </div>
          <span class="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">${activeDonations.length} in progress</span>
        </div>

        ${activeDonations.length === 0 ? `
          <div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
            <i data-lucide="check-circle" class="w-10 h-10 mx-auto mb-2 text-emerald-500"></i>
            <p class="text-sm font-medium text-slate-600">All current donations have been delivered!</p>
            <button onclick="appStore.setPage('add-donation')" class="mt-3 text-xs bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-emerald-700">Add New Surplus Food</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${activeDonations.map(d => renderDonorActiveCard(d)).join("")}
          </div>
        `}
      </div>

      <!-- Donation History Table -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-heading">Donation History & Verified Deliveries</h2>
            <p class="text-xs text-slate-500">Archive of surplus food successfully saved and received by NGOs</p>
          </div>
          <button onclick="appStore.setPage('impact')" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">View ESG Impact &rarr;</button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th class="p-3.5">Donation ID & Food</th>
                  <th class="p-3.5">Quantity / Meals</th>
                  <th class="p-3.5">Beneficiary NGO</th>
                  <th class="p-3.5">Status</th>
                  <th class="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${myDonations.map(d => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-3.5">
                      <div class="font-bold text-slate-800 text-xs">${escapeHtml(d.foodName)}</div>
                      <div class="text-[11px] text-slate-400">ID: ${d.id} • ${d.category}</div>
                    </td>
                    <td class="p-3.5">
                      <span class="font-semibold text-slate-700">${escapeHtml(d.quantity)}</span>
                    </td>
                    <td class="p-3.5">
                      ${d.claimedBy ? `
                        <div class="font-medium text-slate-800">${escapeHtml(d.claimedBy.ngoName)}</div>
                        <div class="text-[10px] text-slate-400">${d.claimedBy.contact}</div>
                      ` : '<span class="text-slate-400 italic">Unclaimed</span>'}
                    </td>
                    <td class="p-3.5">
                      <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusBadgeClass(d.status)}">
                        <span class="w-1.5 h-1.5 rounded-full ${d.status === 'delivered' ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
                        ${formatStatusLabel(d.status)}
                      </span>
                    </td>
                    <td class="p-3.5 text-right">
                      <button onclick="appStore.setPage('tracking', { trackId: '${d.id}' })" class="text-emerald-600 hover:text-emerald-800 font-semibold text-xs hover:underline">
                        Track Live &rarr;
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderDonorActiveCard(d) {
  return `
    <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img src="${d.imageUrl}" alt="${escapeHtml(d.foodName)}" class="w-full h-full object-cover">
        <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${d.vegNonVeg === 'veg' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'} uppercase">
            ${d.vegNonVeg === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
          </span>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-sm">
            ${d.category}
          </span>
        </div>
        <div class="absolute top-2.5 right-2.5">
          <span class="text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${getStatusBadgeClass(d.status)}">
            ${formatStatusLabel(d.status)}
          </span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-slate-900 text-sm font-heading mb-1.5 line-clamp-1">${escapeHtml(d.foodName)}</h3>
          
          <div class="space-y-1.5 text-xs text-slate-600 mb-4">
            <div class="flex items-center gap-2">
              <i data-lucide="scale" class="w-4 h-4 text-emerald-600 shrink-0"></i>
              <span><strong>Quantity:</strong> ${escapeHtml(d.quantity)}</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-amber-500 shrink-0"></i>
              <span><strong>Consume Before:</strong> ${escapeHtml(d.consumeBefore)}</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 shrink-0"></i>
              <span class="truncate"><strong>Pickup:</strong> ${escapeHtml(d.pickupLocation)}</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="text-[11px] text-slate-500">
            ${d.claimedBy ? `<span class="text-blue-700 font-medium">Claimed by ${escapeHtml(d.claimedBy.ngoName)}</span>` : '<span class="text-amber-600 font-medium">Awaiting NGO Acceptance</span>'}
          </div>

          <button onclick="appStore.setPage('tracking', { trackId: '${d.id}' })" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl transition flex items-center gap-1">
            <i data-lucide="radar" class="w-3.5 h-3.5"></i> Track
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 8. ADD FOOD DONATION FORM & CONFIRMATION
// ==========================================
let newlyAddedDonation = null;

function renderAddDonationPage() {
  if (newlyAddedDonation) {
    return renderDonationConfirmationView(newlyAddedDonation);
  }

  return `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex-1">
      
      <div class="mb-6 flex items-center justify-between">
        <div>
          <button onclick="appStore.setPage('donor-dashboard')" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-1">
            &larr; Back to Donor Dashboard
          </button>
          <h1 class="text-2xl font-extrabold text-slate-900 font-heading">Donate Surplus Food</h1>
          <p class="text-xs text-slate-500">Log safe excess food for immediate nearby NGO redistribution</p>
        </div>

        <button type="button" onclick="quickFillSampleDonation()" class="text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-sm transition flex items-center gap-1">
          <i data-lucide="wand-2" class="w-3.5 h-3.5"></i> Auto-fill Sample Data
        </button>
      </div>

      <div class="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8">
        
        <form id="donation-form" onsubmit="handleAddDonationSubmit(event)" class="space-y-6">
          
          <!-- Basic Food Info -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
              <i data-lucide="info" class="w-4 h-4"></i> 1. Food Details
            </h3>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Food Item Name *</label>
                <input type="text" id="food-name" required placeholder="e.g. 45 Packed Meals - Vegetable Biryani & Raita" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select id="food-category" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="Cooked Meals">Cooked Meals (Warm / Packed)</option>
                    <option value="Baked Goods">Baked Goods & Breads</option>
                    <option value="Raw Groceries">Raw Groceries & Staples</option>
                    <option value="Produce">Fresh Fruits & Vegetables</option>
                    <option value="Dairy">Dairy Products</option>
                    <option value="Packaged">Packaged Snacks</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Dietary Preference *</label>
                  <div class="grid grid-cols-2 gap-2">
                    <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                      <input type="radio" name="food_dietary" value="veg" checked class="text-emerald-600 focus:ring-emerald-500">
                      <span>🌱 Vegetarian</span>
                    </label>
                    <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer has-[:checked]:border-rose-600 has-[:checked]:bg-rose-50">
                      <input type="radio" name="food_dietary" value="non-veg" class="text-rose-600 focus:ring-rose-500">
                      <span>🍗 Non-Vegetarian</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quantity & Timings -->
          <div class="pt-4 border-t border-slate-100">
            <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
              <i data-lucide="clock" class="w-4 h-4"></i> 2. Quantity & Safety Timings
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Quantity Display *</label>
                <input type="text" id="food-quantity" required placeholder="e.g. 15 kg (~40 meals)" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Preparation Time *</label>
                <input type="text" id="food-prep-time" required placeholder="e.g. Today, 1:30 PM" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Consume Before (Expiry) *</label>
                <input type="text" id="food-consume-before" required placeholder="e.g. Today, 6:00 PM (4 hrs)" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>
            </div>
          </div>

          <!-- Pickup Location & Contact -->
          <div class="pt-4 border-t border-slate-100">
            <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-4 h-4"></i> 3. Pickup Details & Contact
            </h3>

            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Donor Name / Facility *</label>
                  <input type="text" id="food-donor-name" required value="Grand Emerald Banquet Hall" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Contact Phone Number *</label>
                  <input type="tel" id="food-contact" required value="+91 98765 43210" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Detailed Pickup Address *</label>
                <input type="text" id="food-pickup-location" required value="Gate 2, Grand Emerald Complex, MG Road, Indiranagar" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Special Handling / Packaging Notes</label>
                <input type="text" id="food-handling" placeholder="e.g. Packed in hot insulated containers; handle with care." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>
            </div>
          </div>

          <!-- Food Image Selection / Upload -->
          <div class="pt-4 border-t border-slate-100">
            <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
              <i data-lucide="image" class="w-4 h-4"></i> 4. Food Image Preview
            </h3>
            <p class="text-xs text-slate-500 mb-3">Select one of our preset verified photos, or upload an image:</p>

            <!-- Image Presets -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              ${SAMPLE_IMAGE_PRESETS.map((preset, idx) => `
                <div onclick="selectImagePreset('${preset.url}', ${idx})" id="preset-img-${idx}" class="preset-img-card cursor-pointer rounded-xl border-2 ${idx === 0 ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-200'} overflow-hidden relative group">
                  <img src="${preset.url}" class="h-20 w-full object-cover group-hover:scale-105 transition">
                  <div class="p-1 bg-white text-[10px] font-semibold text-slate-700 truncate text-center">${preset.name}</div>
                </div>
              `).join("")}
            </div>

            <input type="hidden" id="selected-image-url" value="${SAMPLE_IMAGE_PRESETS[0].url}">

            <!-- Custom Upload alternative -->
            <div class="flex items-center gap-3">
              <label class="px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                <i data-lucide="upload" class="w-4 h-4 text-emerald-600"></i> Upload Device Photo
                <input type="file" accept="image/*" class="hidden" onchange="handleCustomPhotoUpload(event)">
              </label>
              <span id="custom-photo-status" class="text-xs text-slate-400">Optional custom photo</span>
            </div>
          </div>

          <div class="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
            <button type="button" onclick="appStore.setPage('donor-dashboard')" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" class="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2">
              <i data-lucide="check" class="w-4 h-4"></i> Submit Surplus Donation
            </button>
          </div>

        </form>

      </div>

    </div>
  `;
}

function selectImagePreset(url, idx) {
  document.getElementById("selected-image-url").value = url;
  document.querySelectorAll(".preset-img-card").forEach((el, i) => {
    if (i === idx) {
      el.className = "preset-img-card cursor-pointer rounded-xl border-2 border-emerald-600 ring-2 ring-emerald-200 overflow-hidden relative group";
    } else {
      el.className = "preset-img-card cursor-pointer rounded-xl border-2 border-slate-200 overflow-hidden relative group";
    }
  });
}

function handleCustomPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    document.getElementById("selected-image-url").value = evt.target.result;
    document.getElementById("custom-photo-status").innerText = "Custom image loaded: " + file.name;
    document.getElementById("custom-photo-status").className = "text-xs text-emerald-600 font-semibold";
  };
  reader.readAsDataURL(file);
}

function quickFillSampleDonation() {
  document.getElementById("food-name").value = "60 Trays Paneer Tikka Masala & Basmati Rice";
  document.getElementById("food-category").value = "Cooked Meals";
  document.getElementById("food-quantity").value = "20 kg (~60 servings)";
  document.getElementById("food-prep-time").value = "Today, 2:00 PM";
  document.getElementById("food-consume-before").value = "Today, 7:00 PM (5 hrs)";
  document.getElementById("food-donor-name").value = "Grand Palace Banquets";
  document.getElementById("food-contact").value = "+91 99001 22334";
  document.getElementById("food-pickup-location").value = "100ft Road, Opposite Metro Station, Indiranagar";
  document.getElementById("food-handling").value = "Stored in temperature-sealed aluminium caterers boxes.";
  showToast("Sample data filled in form!", "info");
}

function handleAddDonationSubmit(e) {
  e.preventDefault();

  const foodName = document.getElementById("food-name").value;
  const category = document.getElementById("food-category").value;
  const vegNonVeg = document.querySelector('input[name="food_dietary"]:checked')?.value || "veg";
  const quantity = document.getElementById("food-quantity").value;
  const prepTime = document.getElementById("food-prep-time").value;
  const consumeBefore = document.getElementById("food-consume-before").value;
  const donorName = document.getElementById("food-donor-name").value;
  const contact = document.getElementById("food-contact").value;
  const pickupLocation = document.getElementById("food-pickup-location").value;
  const handlingNotes = document.getElementById("food-handling").value;
  const imageUrl = document.getElementById("selected-image-url").value;

  const newDonation = appStore.addDonation({
    foodName,
    category,
    vegNonVeg,
    quantity,
    quantityKg: 16,
    mealsCount: 45,
    prepTime,
    consumeBefore,
    donorName,
    contact,
    pickupLocation,
    handlingNotes,
    imageUrl
  });

  newlyAddedDonation = newDonation;
  renderApp();
}

function renderDonationConfirmationView(donation) {
  return `
    <div class="max-w-2xl mx-auto px-4 py-12 flex-1 text-center">
      <div class="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
        
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50">
          <i data-lucide="check-circle-2" class="w-10 h-10"></i>
        </div>

        <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Donation Listed Successfully
        </span>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-3">
          Surplus Food Listed on Network!
        </h2>

        <p class="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
          Your donation ID <span class="font-bold text-slate-800">#${donation.id}</span> has been broadcasted to verified NGOs within a 10 km radius.
        </p>

        <!-- Summary card -->
        <div class="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-start gap-4">
          <img src="${donation.imageUrl}" class="w-20 h-20 rounded-xl object-cover shrink-0">
          <div class="text-xs space-y-1">
            <h4 class="font-bold text-slate-800 text-sm">${escapeHtml(donation.foodName)}</h4>
            <p class="text-slate-600"><strong>Quantity:</strong> ${escapeHtml(donation.quantity)}</p>
            <p class="text-slate-600"><strong>Pickup:</strong> ${escapeHtml(donation.pickupLocation)}</p>
            <p class="text-emerald-700 font-medium"><strong>Consume Before:</strong> ${escapeHtml(donation.consumeBefore)}</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="newlyAddedDonation = null; appStore.setPage('tracking', { trackId: '${donation.id}' })" class="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2">
            <i data-lucide="route" class="w-4 h-4"></i> Track Donation in Real Time
          </button>

          <button onclick="newlyAddedDonation = null; appStore.setRole('ngo'); appStore.setPage('ngo-dashboard')" class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2">
            <i data-lucide="building-2" class="w-4 h-4 text-blue-600"></i> View as NGO (To Accept)
          </button>
        </div>

      </div>
    </div>
  `;
}

// ==========================================
// 9. NGO DASHBOARD COMPONENT (CARDS + RADAR MAP)
// ==========================================
let ngoViewMode = "cards"; // 'cards' | 'map'
let ngoFilter = "all"; // 'all' | 'veg' | 'urgent'

function renderNgoDashboard() {
  let availableDonations = appStore.donations.filter(d => d.status === "available");
  const claimedByMe = appStore.donations.filter(d => d.claimedBy && d.claimedBy.ngoName.includes("Hope"));

  if (ngoFilter === "veg") {
    availableDonations = availableDonations.filter(d => d.vegNonVeg === "veg");
  } else if (ngoFilter === "urgent") {
    availableDonations = availableDonations.filter(d => (d.hoursRemaining || 4) <= 3);
  }

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      <!-- Top NGO Banner -->
      <div class="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span class="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-2">Verified Receiver Partner</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading">Hope Shelter & Community Kitchen</h1>
          <p class="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Surplus food available within your neighborhood radar. Click "Accept Donation" to dispatch community courier pickup.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
            <div class="text-2xl font-black">${availableDonations.length}</div>
            <div class="text-[10px] text-blue-100 uppercase">Available</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
            <div class="text-2xl font-black">${claimedByMe.length}</div>
            <div class="text-[10px] text-blue-100 uppercase">Inbound</div>
          </div>
        </div>
      </div>

      <!-- Controls, Filters, and View Toggle -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <button onclick="setNgoFilter('all')" class="px-3.5 py-2 rounded-xl font-semibold transition ${ngoFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            All Nearby (${appStore.donations.filter(d => d.status === 'available').length})
          </button>
          <button onclick="setNgoFilter('veg')" class="px-3.5 py-2 rounded-xl font-semibold transition ${ngoFilter === 'veg' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            🌱 Vegetarian Only
          </button>
          <button onclick="setNgoFilter('urgent')" class="px-3.5 py-2 rounded-xl font-semibold transition ${ngoFilter === 'urgent' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            ⚡ Urgent (&lt; 3h left)
          </button>
        </div>

        <!-- View Mode: Cards vs Map -->
        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-end">
          <button onclick="setNgoViewMode('cards')" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${ngoViewMode === 'cards' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}">
            <i data-lucide="layout-grid" class="w-4 h-4"></i> Cards View
          </button>
          <button onclick="setNgoViewMode('map')" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${ngoViewMode === 'map' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}">
            <i data-lucide="map" class="w-4 h-4 text-emerald-600"></i> Interactive Radar Map
          </button>
        </div>

      </div>

      <!-- Main Display: Card Grid or Interactive Radar Map -->
      ${ngoViewMode === "cards" ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          ${availableDonations.length === 0 ? `
            <div class="col-span-full bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
              <h3 class="font-bold text-slate-700 text-base">No available donations match this filter</h3>
              <p class="text-xs text-slate-500 mt-1">Check back in a few minutes or reset filters to see all available surplus food.</p>
              <button onclick="setNgoFilter('all')" class="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl">View All Listings</button>
            </div>
          ` : availableDonations.map(d => renderNgoDonationCard(d)).join("")}
        </div>
      ` : renderNgoRadarMap(availableDonations)}

      <!-- Inbound / Claimed Donations by this NGO -->
      <div class="mt-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-heading">Your Claimed Food Deliveries</h2>
            <p class="text-xs text-slate-500">Donations accepted by Hope Shelter, pending courier arrival</p>
          </div>
          <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">${claimedByMe.length} Incoming</span>
        </div>

        ${claimedByMe.length === 0 ? `
          <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-400">
            No incoming donations currently. Click "Accept Donation" on any active card above to claim food.
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${claimedByMe.map(d => `
              <div class="bg-white rounded-2xl border border-blue-200 p-4 shadow-sm flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 min-w-0">
                  <img src="${d.imageUrl}" class="w-14 h-14 rounded-xl object-cover shrink-0">
                  <div class="min-w-0">
                    <h4 class="font-bold text-xs text-slate-800 truncate">${escapeHtml(d.foodName)}</h4>
                    <p class="text-[11px] text-slate-500">${escapeHtml(d.quantity)} • From: ${escapeHtml(d.donorName)}</p>
                    <div class="flex items-center gap-2 mt-1 text-[11px]">
                      <span class="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">${formatStatusLabel(d.status)}</span>
                      <span class="text-slate-400">Courier: ${d.volunteer ? d.volunteer.name : 'Dispatching...'}</span>
                    </div>
                  </div>
                </div>

                <button onclick="appStore.setPage('tracking', { trackId: '${d.id}' })" class="shrink-0 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition">
                  Track Delivery
                </button>
              </div>
            `).join("")}
          </div>
        `}
      </div>

    </div>
  `;
}

function setNgoViewMode(mode) {
  ngoViewMode = mode;
  renderApp();
}

function setNgoFilter(filter) {
  ngoFilter = filter;
  renderApp();
}

function renderNgoDonationCard(d) {
  const isUrgent = (d.hoursRemaining || 4) <= 2.5;

  return `
    <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
      
      <div class="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img src="${d.imageUrl}" alt="${escapeHtml(d.foodName)}" class="w-full h-full object-cover">
        
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${d.vegNonVeg === 'veg' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'} uppercase">
            ${d.vegNonVeg === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-sm">
            ${d.category}
          </span>
        </div>

        <div class="absolute top-3 right-3">
          <span class="text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow backdrop-blur-sm ${
            isUrgent ? 'bg-rose-500/90 text-white' : 'bg-emerald-600/90 text-white'
          }">
            ⏱️ ${isUrgent ? 'Urgent: ' : ''}${escapeHtml(d.consumeBefore)}
          </span>
        </div>

        <!-- Distance pill at bottom of image -->
        <div class="absolute bottom-2.5 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
          <i data-lucide="navigation" class="w-3 h-3 text-emerald-600"></i> ${d.distance || '1.8 km away'}
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="text-[11px] text-emerald-700 font-semibold mb-0.5">${escapeHtml(d.donorName)}</div>
          <h3 class="font-bold text-slate-900 text-base font-heading mb-2 leading-snug">${escapeHtml(d.foodName)}</h3>
          
          <div class="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div class="flex items-center justify-between">
              <span class="text-slate-500">Portions / Weight:</span>
              <span class="font-bold text-slate-800">${escapeHtml(d.quantity)}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500">Prepared:</span>
              <span class="font-medium text-slate-700">${escapeHtml(d.prepTime)}</span>
            </div>
            <div class="flex items-start justify-between gap-2">
              <span class="text-slate-500 shrink-0">Pickup Point:</span>
              <span class="font-medium text-slate-700 text-right truncate">${escapeHtml(d.pickupLocation)}</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button onclick="handleNgoAccept('${d.id}')" class="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2">
            <i data-lucide="hand-heart" class="w-4 h-4"></i> Accept Donation
          </button>
          <button onclick="appStore.setPage('tracking', { trackId: '${d.id}' })" class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition" title="Preview details">
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

    </div>
  `;
}

function handleNgoAccept(id) {
  const success = appStore.claimDonation(id, "Hope Shelter & Community Kitchen");
  if (success) {
    showToast("Donation accepted! Order dispatched to volunteer couriers.", "success");
    renderApp();
  }
}

// Interactive SVG Proximity Radar Map
function renderNgoRadarMap(available) {
  return `
    <div class="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden p-6 mb-12">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 class="text-base font-bold text-slate-900 font-heading">Proximity Radar Map</h3>
          <p class="text-xs text-slate-500">Live locations of donor venues around Hope Shelter (Center Pin)</p>
        </div>
        <div class="flex items-center gap-4 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-600"></span> Hope Shelter (You)</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Surplus Available</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500"></span> Courier en route</span>
        </div>
      </div>

      <div class="relative w-full h-96 rounded-2xl map-grid-bg border border-slate-200 overflow-hidden flex items-center justify-center">
        
        <!-- Radar rings -->
        <div class="absolute w-80 h-80 rounded-full border border-emerald-500/20"></div>
        <div class="absolute w-60 h-60 rounded-full border border-emerald-500/30"></div>
        <div class="absolute w-40 h-40 rounded-full border border-emerald-500/40"></div>

        <!-- Center: NGO Base -->
        <div class="absolute z-20 flex flex-col items-center" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-100">
            <i data-lucide="building-2" class="w-4 h-4"></i>
          </div>
          <span class="mt-1 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold shadow">Hope Shelter</span>
        </div>

        <!-- Donor pins placed dynamically -->
        ${available.map((d, index) => {
          const x = d.coordinates ? d.coordinates.x : (20 + (index * 25) % 65);
          const y = d.coordinates ? d.coordinates.y : (25 + (index * 30) % 55);

          return `
            <div class="absolute z-30 cursor-pointer group" style="top: ${y}%; left: ${x}%; transform: translate(-50%, -50%);" onclick="handleNgoAccept('${d.id}')">
              <div class="relative flex items-center justify-center">
                <span class="absolute w-7 h-7 rounded-full bg-emerald-400 opacity-75 radar-pin"></span>
                <div class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                  <i data-lucide="utensils" class="w-3 h-3"></i>
                </div>
              </div>

              <!-- Tooltip on hover -->
              <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-slate-900 text-white p-2.5 rounded-xl text-xs w-48 shadow-xl z-40 pointer-events-none">
                <span class="font-bold text-[11px] truncate">${escapeHtml(d.foodName)}</span>
                <span class="text-[10px] text-emerald-300 font-semibold">${escapeHtml(d.quantity)}</span>
                <span class="text-[10px] text-slate-300 mt-1">📍 ${d.distance}</span>
                <span class="text-[10px] text-amber-300 font-medium">Click to accept</span>
              </div>
            </div>
          `;
        }).join("")}

      </div>
      <p class="text-[11px] text-slate-400 mt-2 text-center">Interactive map simulates Google Maps API integration with dynamic geo-fenced radar coordinates.</p>
    </div>
  `;
}

// ==========================================
// 10. VOLUNTEER DASHBOARD COMPONENT
// ==========================================
function renderVolunteerDashboard() {
  const availablePickups = appStore.donations.filter(d => d.status === "accepted");
  const myDeliveries = appStore.donations.filter(d => d.volunteer && d.volunteer.name.includes("Alex"));

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      <!-- Top Volunteer Banner -->
      <div class="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span class="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-2">Community Courier Fleet</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading">Volunteer Dispatch Hub</h1>
          <p class="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
            Logged in as <strong class="text-white">Alex Rivera</strong> (Active Courier • Hero Tier 3). Pick up surplus meals from local donors and hand them over to partner NGOs.
          </p>
        </div>

        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div class="w-10 h-10 rounded-xl bg-white text-amber-600 flex items-center justify-center font-bold">
            <i data-lucide="award" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="text-sm font-extrabold">18 Rescues Done</div>
            <div class="text-[11px] text-amber-100">Saved 420 kg Food</div>
          </div>
        </div>
      </div>

      <!-- Available Pickup Requests -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-heading">Available Pickup Requests</h2>
            <p class="text-xs text-slate-500">NGOs have accepted these donations. Couriers needed for pickup & drop-off.</p>
          </div>
          <span class="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">${availablePickups.length} awaiting couriers</span>
        </div>

        ${availablePickups.length === 0 ? `
          <div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
            <i data-lucide="check" class="w-10 h-10 mx-auto mb-2 text-emerald-500"></i>
            <p class="text-sm font-medium text-slate-700">No unassigned pickups right now.</p>
            <p class="text-xs text-slate-500 mt-0.5">Switch to NGO dashboard to accept a donation and create a courier request.</p>
            <button onclick="appStore.setRole('ngo'); appStore.setPage('ngo-dashboard');" class="mt-3 text-xs bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700">
              Go to NGO Dashboard
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${availablePickups.map(d => renderVolunteerPickupCard(d)).join("")}
          </div>
        `}
      </div>

      <!-- My Active & Past Runs -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-heading">My Active & Recent Deliveries</h2>
            <p class="text-xs text-slate-500">Deliveries assigned to you with stage actions (Pick Up / Mark Delivered)</p>
          </div>
          <span class="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">${myDeliveries.length} runs</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          ${myDeliveries.length === 0 ? `
            <div class="col-span-full bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
              No active runs assigned yet. Click "Accept Pickup" on any available request above.
            </div>
          ` : myDeliveries.map(d => renderVolunteerRunCard(d)).join("")}
        </div>
      </div>

    </div>
  `;
}

function renderVolunteerPickupCard(d) {
  return `
    <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Delivery Request #${d.id}
            </span>
            <h3 class="font-bold text-slate-900 text-base font-heading mt-1">${escapeHtml(d.foodName)}</h3>
          </div>
          <span class="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            ${d.distance || '2.4 km'}
          </span>
        </div>

        <!-- Route visual -->
        <div class="space-y-3 my-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
          <div class="flex items-start gap-2.5">
            <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="store" class="w-3 h-3"></i>
            </div>
            <div>
              <span class="text-[10px] font-semibold text-slate-400 uppercase">Pickup Location (Donor):</span>
              <p class="font-semibold text-slate-800">${escapeHtml(d.donorName)}</p>
              <p class="text-slate-500 text-[11px]">${escapeHtml(d.pickupLocation)}</p>
            </div>
          </div>

          <div class="border-l-2 border-dashed border-slate-300 ml-2.5 h-3"></div>

          <div class="flex items-start gap-2.5">
            <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="building-2" class="w-3 h-3"></i>
            </div>
            <div>
              <span class="text-[10px] font-semibold text-slate-400 uppercase">Drop-off Location (NGO):</span>
              <p class="font-semibold text-slate-800">${escapeHtml(d.claimedBy ? d.claimedBy.ngoName : "Designated Shelter")}</p>
              <p class="text-slate-500 text-[11px]">${escapeHtml(d.dropLocation)}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span><strong>Quantity:</strong> ${escapeHtml(d.quantity)}</span>
          <span class="text-amber-700 font-medium">Safe Handling: ${escapeHtml(d.handlingNotes || 'Standard')}</span>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100">
        <button onclick="handleVolunteerAccept('${d.id}')" class="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/30 transition flex items-center justify-center gap-2">
          <i data-lucide="bike" class="w-4 h-4"></i> Accept Pickup Request
        </button>
      </div>
    </div>
  `;
}

function renderVolunteerRunCard(d) {
  const isAssigned = d.status === "volunteer_assigned";
  const isPickedUp = d.status === "picked_up";
  const isDelivered = d.status === "delivered";

  return `
    <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-slate-800 font-heading">${escapeHtml(d.foodName)}</span>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusBadgeClass(d.status)}">
            ${formatStatusLabel(d.status)}
          </span>
        </div>

        <p class="text-xs text-slate-500 mb-3">
          From <strong>${escapeHtml(d.donorName)}</strong> to <strong>${escapeHtml(d.claimedBy ? d.claimedBy.ngoName : "NGO")}</strong>
        </p>

        <!-- Dynamic Action buttons depending on state -->
        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">Pickup Status:</span>
            <span class="font-semibold ${isPickedUp || isDelivered ? 'text-emerald-600' : 'text-amber-600'}">
              ${isPickedUp || isDelivered ? '✓ Collected' : 'Pending Pickup'}
            </span>
          </div>

          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">Delivery Status:</span>
            <span class="font-semibold ${isDelivered ? 'text-emerald-600' : 'text-slate-400'}">
              ${isDelivered ? '✓ Completed' : 'Pending Drop-off'}
            </span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
        ${isAssigned ? `
          <button onclick="handleMarkPickedUp('${d.id}')" class="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5">
            <i data-lucide="package-check" class="w-4 h-4"></i> Mark Picked Up
          </button>
        ` : ''}

        ${isPickedUp ? `
          <button onclick="handleMarkDelivered('${d.id}')" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5">
            <i data-lucide="check-check" class="w-4 h-4"></i> Mark Delivered 🎉
          </button>
        ` : ''}

        ${isDelivered ? `
          <div class="flex-1 py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
            ✓ Successfully Completed
          </div>
        ` : ''}

        <button onclick="appStore.setPage('tracking', { trackId: '${d.id}' })" class="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">
          View Map
        </button>
      </div>
    </div>
  `;
}

function handleVolunteerAccept(id) {
  const success = appStore.assignVolunteer(id, "Alex Rivera");
  if (success) {
    showToast("Assigned to you! Head to donor venue for collection.", "success");
    renderApp();
  }
}

function handleMarkPickedUp(id) {
  const success = appStore.markPickedUp(id);
  if (success) {
    showToast("Marked as Picked Up! Safe travels to the drop-off shelter.", "info");
    renderApp();
  }
}

function handleMarkDelivered(id) {
  const success = appStore.markDelivered(id);
  if (success) {
    showToast("Delivery confirmed! Environmental and hunger impact updated.", "success");
    renderApp();
  }
}

// ==========================================
// 11. FOOD TRACKING COMPONENT (5-STEP PIPELINE)
// ==========================================
function renderTrackingPage() {
  const donation = appStore.donations.find(d => d.id === appStore.activeTrackId) || appStore.donations[0];

  const steps = [
    { key: "available", label: "Surplus Available", desc: "Listed by donor, broadcasted to NGOs", icon: "megaphone" },
    { key: "accepted", label: "NGO Accepted", desc: "Claimed by nearby verified NGO", icon: "hand-heart" },
    { key: "volunteer_assigned", label: "Volunteer Assigned", desc: "Courier dispatched to pickup location", icon: "bike" },
    { key: "picked_up", label: "Food Picked Up", desc: "In transit to the community shelter", icon: "package" },
    { key: "delivered", label: "Safely Delivered", desc: "Received, verified & distributed", icon: "check-circle" }
  ];

  const statusOrder = ["available", "accepted", "volunteer_assigned", "picked_up", "delivered"];
  const currentStepIdx = statusOrder.indexOf(donation.status);

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      <!-- Top Order Selector & Info -->
      <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Real-Time Tracking
          </span>
          <h1 class="text-2xl font-extrabold text-slate-900 font-heading mt-1">Donation #${donation.id}</h1>
          <p class="text-xs text-slate-500">${escapeHtml(donation.foodName)} • ${escapeHtml(donation.quantity)}</p>
        </div>

        <!-- Order switcher dropdown -->
        <div class="flex items-center gap-2">
          <label class="text-xs font-semibold text-slate-500 shrink-0">Switch Item:</label>
          <select onchange="appStore.setPage('tracking', { trackId: this.value })" class="text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-emerald-500">
            ${appStore.donations.map(item => `
              <option value="${item.id}" ${item.id === donation.id ? 'selected' : ''}>
                #${item.id} - ${item.foodName.substring(0, 28)}... (${formatStatusLabel(item.status)})
              </option>
            `).join("")}
          </select>
        </div>
      </div>

      <!-- 5-Step Visual Progress Stepper -->
      <div class="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 mb-8">
        <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-8 text-center font-heading">
          Redistribution Progress Pipeline
        </h2>

        <div class="relative">
          <!-- Horizontal line for desktop -->
          <div class="hidden md:block absolute top-6 left-12 right-12 h-1 bg-slate-200 -z-0">
            <div class="h-1 bg-emerald-500 transition-all duration-500" style="width: ${(currentStepIdx / (steps.length - 1)) * 100}%"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
            ${steps.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              const isFuture = idx > currentStepIdx;

              let circleClass = "bg-slate-200 text-slate-400";
              if (isPast) circleClass = "bg-emerald-600 text-white shadow-md";
              if (isCurrent) circleClass = "bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-lg live-dot";

              return `
                <div class="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center">
                  <div class="w-12 h-12 rounded-2xl ${circleClass} flex items-center justify-center shrink-0 transition">
                    <i data-lucide="${step.icon}" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold ${isCurrent ? 'text-emerald-700 font-heading text-sm' : isPast ? 'text-slate-800' : 'text-slate-400'}">
                      ${step.label}
                    </h4>
                    <p class="text-[11px] text-slate-500 mt-0.5 leading-snug">${step.desc}</p>
                    ${isCurrent ? '<span class="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Current Phase</span>' : ''}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Quick Demo Transition Buttons to test workflow in 1-click -->
        <div class="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span class="text-slate-500 font-medium">Demo Simulator: Advance Status Manually &rarr;</span>
          <div class="flex items-center gap-2">
            <button onclick="appStore.claimDonation('${donation.id}'); renderApp();" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition">
              Accept (NGO)
            </button>
            <button onclick="appStore.assignVolunteer('${donation.id}'); renderApp();" class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold transition">
              Assign Courier
            </button>
            <button onclick="appStore.markPickedUp('${donation.id}'); renderApp();" class="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold transition">
              Mark Picked Up
            </button>
            <button onclick="appStore.markDelivered('${donation.id}'); renderApp();" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition">
              Mark Delivered
            </button>
          </div>
        </div>
      </div>

      <!-- Route & Parties Details Card -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Donor Information -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div class="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <i data-lucide="store" class="w-4 h-4"></i> Donor Venue
          </div>
          <h3 class="font-bold text-slate-800 text-sm font-heading">${escapeHtml(donation.donorName)}</h3>
          <p class="text-xs text-slate-600 mt-1">${escapeHtml(donation.pickupLocation)}</p>
          <div class="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <strong>Contact:</strong> ${escapeHtml(donation.contact)}
          </div>
        </div>

        <!-- Recipient NGO -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div class="flex items-center gap-2 mb-3 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <i data-lucide="building-2" class="w-4 h-4"></i> Receiving NGO
          </div>
          <h3 class="font-bold text-slate-800 text-sm font-heading">
            ${donation.claimedBy ? escapeHtml(donation.claimedBy.ngoName) : '<span class="text-slate-400 italic">Awaiting NGO Acceptance</span>'}
          </h3>
          <p class="text-xs text-slate-600 mt-1">${escapeHtml(donation.dropLocation)}</p>
          <div class="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <strong>Contact:</strong> ${donation.claimedBy ? donation.claimedBy.contact : 'Available upon claim'}
          </div>
        </div>

        <!-- Courier Driver -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div class="flex items-center gap-2 mb-3 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <i data-lucide="bike" class="w-4 h-4"></i> Volunteer Courier
          </div>
          <h3 class="font-bold text-slate-800 text-sm font-heading">
            ${donation.volunteer ? escapeHtml(donation.volunteer.name) : '<span class="text-slate-400 italic">Dispatching Volunteer...</span>'}
          </h3>
          <p class="text-xs text-slate-600 mt-1">
            ${donation.volunteer ? donation.volunteer.vehicle : 'Pending driver assignment'}
          </p>
          <div class="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <strong>Contact:</strong> ${donation.volunteer ? donation.volunteer.phone : 'Pending assignment'}
          </div>
        </div>

      </div>

    </div>
  `;
}

// ==========================================
// 12. IMPACT DASHBOARD WITH CHARTS
// ==========================================
let impactChartInstance = null;
let categoryChartInstance = null;

function renderImpactPage() {
  const metrics = appStore.getImpactMetrics();

  // Set timeout to render Chart.js once DOM nodes exist
  setTimeout(() => {
    initImpactCharts();
  }, 100);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      <!-- Top Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sustainability & ESG Analytics
          </span>
          <h1 class="text-3xl font-extrabold text-slate-900 font-heading mt-2">Community Impact Dashboard</h1>
          <p class="text-xs sm:text-sm text-slate-500">Quantifiable environmental savings and meals redistributed in real time</p>
        </div>

        <button onclick="downloadImpactCertificate()" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow transition flex items-center gap-2">
          <i data-lucide="download" class="w-4 h-4 text-emerald-400"></i> Download Impact Certificate
        </button>
      </div>

      <!-- High-Impact 4-Metric Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <div class="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 rounded-3xl shadow-lg shadow-emerald-600/20">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-emerald-100 font-medium">Total Food Rescued</span>
            <i data-lucide="scale" class="w-5 h-5 text-emerald-200"></i>
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold font-heading">${metrics.totalKg.toLocaleString()} kg</div>
          <p class="text-xs text-emerald-100 mt-2 font-medium">Prevented from rotting in landfills</p>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-medium">Meals Distributed</span>
            <i data-lucide="soup" class="w-5 h-5 text-emerald-600"></i>
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">${metrics.totalMeals.toLocaleString()}</div>
          <p class="text-xs text-emerald-600 font-medium mt-2">Served to hungry beneficiaries</p>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-medium">People Fed</span>
            <i data-lucide="users" class="w-5 h-5 text-blue-600"></i>
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold text-blue-600 font-heading">${metrics.peopleHelped.toLocaleString()}</div>
          <p class="text-xs text-slate-500 mt-2">Across 14 community shelters</p>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-medium">CO₂e Emissions Averted</span>
            <i data-lucide="cloud-off" class="w-5 h-5 text-teal-600"></i>
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold text-teal-700 font-heading">${metrics.co2Kg.toLocaleString()} kg</div>
          <p class="text-xs text-slate-500 mt-2">~${Math.round(metrics.co2Kg / 22)} trees annual absorption</p>
        </div>

      </div>

      <!-- Equivalence Metrics Bar -->
      <div class="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-emerald-900">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
            <i data-lucide="droplet" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="font-extrabold text-sm">${(metrics.waterLiters / 1000).toLocaleString()} kL Water Saved</div>
            <div class="text-emerald-700 text-[11px]">Virtual water used in food production</div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
            <i data-lucide="tree-pine" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="font-extrabold text-sm">${Math.round(metrics.totalKg * 0.12)} Trees Equivalent</div>
            <div class="text-emerald-700 text-[11px]">Carbon sequestration parity</div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
            <i data-lucide="check-check" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="font-extrabold text-sm">${metrics.successfulDeliveries} Successful Runs</div>
            <div class="text-emerald-700 text-[11px]">99.4% on-time delivery rate</div>
          </div>
        </div>
      </div>

      <!-- Visual Analytics: Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- Monthly Trend Line/Bar Chart -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-slate-800 text-sm font-heading">Redistribution Volume Trend</h3>
              <p class="text-xs text-slate-400">Kilograms of surplus food saved per month (2026)</p>
            </div>
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">+38% MoM Growth</span>
          </div>

          <div class="h-64 relative">
            <canvas id="impactMonthlyChart"></canvas>
          </div>
        </div>

        <!-- Food Category Donut Chart -->
        <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
          <div class="mb-4">
            <h3 class="font-bold text-slate-800 text-sm font-heading">Rescue by Category</h3>
            <p class="text-xs text-slate-400">Breakdown of surplus meal types</p>
          </div>

          <div class="h-64 relative flex items-center justify-center">
            <canvas id="impactCategoryChart"></canvas>
          </div>
        </div>

      </div>

      <!-- Top Donors Leaderboard -->
      <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
        <h3 class="font-bold text-slate-800 text-base font-heading mb-4">Top Food Donors Leaderboard</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">1</div>
            <div>
              <div class="font-bold text-xs text-slate-800">Grand Emerald Banquets</div>
              <div class="text-[11px] text-emerald-600 font-semibold">480 kg • 1,440 Meals</div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-black">2</div>
            <div>
              <div class="font-bold text-xs text-slate-800">Golden Crust Bakery</div>
              <div class="text-[11px] text-emerald-600 font-semibold">320 kg • 960 Meals</div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center font-black">3</div>
            <div>
              <div class="font-bold text-xs text-slate-800">Royal Orchid Convention</div>
              <div class="text-[11px] text-emerald-600 font-semibold">290 kg • 870 Meals</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

function initImpactCharts() {
  const lineCtx = document.getElementById("impactMonthlyChart");
  const donutCtx = document.getElementById("impactCategoryChart");

  if (!lineCtx || !donutCtx || typeof Chart === "undefined") return;

  if (impactChartInstance) impactChartInstance.destroy();
  if (categoryChartInstance) categoryChartInstance.destroy();

  impactChartInstance = new Chart(lineCtx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Food Rescued (kg)",
          data: [120, 190, 240, 310, 420, 560, 780, 1100, 1420],
          backgroundColor: "#10b981",
          borderRadius: 8
        },
        {
          label: "CO2 Averted (kg)",
          data: [300, 475, 600, 775, 1050, 1400, 1950, 2750, 3550],
          backgroundColor: "#0d9488",
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: "#f1f5f9" } },
        x: { grid: { display: false } }
      }
    }
  });

  categoryChartInstance = new Chart(donutCtx, {
    type: "doughnut",
    data: {
      labels: ["Cooked Meals", "Baked Goods", "Produce", "Dairy & Packaged"],
      datasets: [
        {
          data: [55, 20, 15, 10],
          backgroundColor: ["#059669", "#f59e0b", "#3b82f6", "#8b5cf6"]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } }
      }
    }
  });
}

function downloadImpactCertificate() {
  alert("FoodShare Verified Impact Certificate\n\nOrganization: Grand Emerald Bistro\nMeals Contributed: 1,420 Meals\nCO2 Averted: 3,550 kg CO2e\nStatus: Certified Zero-Waste Partner 2026");
}

// ==========================================
// 13. ADMIN DASHBOARD COMPONENT
// ==========================================
function renderAdminDashboard() {
  const metrics = appStore.getImpactMetrics();

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      <div class="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span class="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-2">Platform Administration</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading">System Governance & Health</h1>
          <p class="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            Real-time telemetry, user management, and compliance verification for FoodShare network.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald-400 live-dot"></span>
          <span class="text-xs font-semibold">REST APIs & DB: Connected</span>
        </div>
      </div>

      <!-- Quick Platform Overview Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-semibold">Total Donations Logged</div>
          <div class="text-2xl font-bold text-slate-900 mt-1">${appStore.donations.length}</div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-semibold">Verified NGOs</div>
          <div class="text-2xl font-bold text-blue-600 mt-1">24 Active</div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-semibold">Active Volunteers</div>
          <div class="text-2xl font-bold text-amber-600 mt-1">87 Couriers</div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-semibold">Delivery Success Rate</div>
          <div class="text-2xl font-bold text-emerald-600 mt-1">99.4%</div>
        </div>
      </div>

      <!-- System Activity Stream -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h3 class="text-base font-bold text-slate-900 font-heading mb-4">Live Platform Activity Stream</h3>
        
        <div class="divide-y divide-slate-100 text-xs">
          ${appStore.donations.map(d => `
            <div class="py-3 flex items-center justify-between gap-4">
              <div>
                <span class="font-bold text-slate-800">#${d.id}</span> — ${escapeHtml(d.foodName)}
                <div class="text-[11px] text-slate-400">Donor: ${escapeHtml(d.donorName)} | Claimed by: ${d.claimedBy ? escapeHtml(d.claimedBy.ngoName) : 'None'}</div>
              </div>
              <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusBadgeClass(d.status)}">
                ${formatStatusLabel(d.status)}
              </span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 14. GENERAL UTILITIES & ROUTER
// ==========================================
function getStatusBadgeClass(status) {
  switch (status) {
    case "available":
      return "badge-emerald";
    case "accepted":
      return "badge-blue";
    case "volunteer_assigned":
      return "badge-amber";
    case "picked_up":
      return "badge-amber";
    case "delivered":
      return "badge-emerald";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatStatusLabel(status) {
  switch (status) {
    case "available":
      return "Available";
    case "accepted":
      return "NGO Claimed";
    case "volunteer_assigned":
      return "Courier Dispatched";
    case "picked_up":
      return "In Transit";
    case "delivered":
      return "Delivered";
    default:
      return status;
  }
}

function renderApp() {
  const root = document.getElementById("app");
  if (!root) return;

  const headerHtml = renderHeader();
  let contentHtml = "";

  switch (appStore.currentPage) {
    case "landing":
      contentHtml = renderLandingPage();
      break;
    case "auth":
      contentHtml = renderAuthPage();
      break;
    case "donor-dashboard":
      contentHtml = renderDonorDashboard();
      break;
    case "add-donation":
      contentHtml = renderAddDonationPage();
      break;
    case "ngo-dashboard":
      contentHtml = renderNgoDashboard();
      break;
    case "volunteer-dashboard":
      contentHtml = renderVolunteerDashboard();
      break;
    case "tracking":
      contentHtml = renderTrackingPage();
      break;
    case "impact":
      contentHtml = renderImpactPage();
      break;
    case "admin-dashboard":
      contentHtml = renderAdminDashboard();
      break;
    default:
      contentHtml = renderLandingPage();
      break;
  }

  root.innerHTML = headerHtml + contentHtml;
  lucide.createIcons();
  updateNotificationPill();
}

// Initialization on DOM load
window.addEventListener("DOMContentLoaded", () => {
  renderApp();
});
