-- ============================================================
-- FoodShare: Smart Surplus Food Redistribution System
-- Production MySQL Database Schema
-- Compatible with MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS foodshare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE foodshare_db;

-- 1. Users Table (Multi-Role Authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('DONOR', 'NGO', 'VOLUNTEER', 'ADMIN') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_verified BOOLEAN DEFAULT FALSE,
    vehicle_details VARCHAR(100) NULL, -- For volunteers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role),
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- 2. Food Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id VARCHAR(36) PRIMARY KEY, -- e.g. 'FS-101' or UUID
    donor_id BIGINT NOT NULL,
    food_name VARCHAR(200) NOT NULL,
    category ENUM('Cooked Meals', 'Baked Goods', 'Raw Groceries', 'Produce', 'Dairy', 'Packaged') NOT NULL,
    quantity_display VARCHAR(100) NOT NULL, -- e.g. "15 kg (~45 meals)"
    quantity_kg DECIMAL(8, 2) NOT NULL DEFAULT 10.00,
    estimated_meals INT NOT NULL DEFAULT 30,
    dietary_type ENUM('VEG', 'NON_VEG') NOT NULL DEFAULT 'VEG',
    prepared_at VARCHAR(100) NOT NULL,
    consume_before VARCHAR(100) NOT NULL,
    expiry_timestamp TIMESTAMP NULL,
    pickup_address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_phone VARCHAR(25) NOT NULL,
    image_url VARCHAR(500),
    handling_notes TEXT,
    status ENUM('AVAILABLE', 'ACCEPTED', 'VOLUNTEER_ASSIGNED', 'PICKED_UP', 'DELIVERED', 'EXPIRED', 'CANCELLED') 
        NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_donation_status (status),
    INDEX idx_donation_expiry (expiry_timestamp)
) ENGINE=InnoDB;

-- 3. Donation Claims (NGO Claims)
CREATE TABLE IF NOT EXISTS claims (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    donation_id VARCHAR(36) NOT NULL,
    ngo_id BIGINT NOT NULL,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dropoff_address TEXT NOT NULL,
    status ENUM('PENDING_DISPATCH', 'IN_TRANSIT', 'FULFILLED', 'REJECTED') DEFAULT 'PENDING_DISPATCH',
    notes TEXT,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    FOREIGN KEY (ngo_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_donation_claim (donation_id)
) ENGINE=InnoDB;

-- 4. Deliveries Table (Volunteer Runs)
CREATE TABLE IF NOT EXISTS deliveries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    donation_id VARCHAR(36) NOT NULL,
    volunteer_id BIGINT NOT NULL,
    status ENUM('ASSIGNED', 'PICKED_UP', 'DELIVERED', 'FAILED') DEFAULT 'ASSIGNED',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picked_up_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    proof_image_url VARCHAR(500),
    delivery_notes TEXT,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    FOREIGN KEY (volunteer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_delivery_status (status)
) ENGINE=InnoDB;

-- 5. Notifications Table (Firebase / In-App Alerts)
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('NEW_FOOD', 'ACCEPTED', 'VOLUNTEER', 'PICKED_UP', 'DELIVERED', 'EXPIRY_WARNING', 'SYSTEM') NOT NULL,
    reference_donation_id VARCHAR(36) NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user_read (user_id, is_read)
) ENGINE=InnoDB;

-- 6. Aggregate Impact Metrics Table
CREATE TABLE IF NOT EXISTS impact_metrics (
    id INT PRIMARY KEY DEFAULT 1,
    total_food_rescued_kg DECIMAL(12, 2) DEFAULT 1420.00,
    total_meals_distributed INT DEFAULT 4260,
    people_helped INT DEFAULT 3850,
    co2_averted_kg DECIMAL(12, 2) DEFAULT 3550.00,
    water_saved_liters DECIMAL(14, 2) DEFAULT 1420000.00,
    successful_deliveries INT DEFAULT 142,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Initial Seed Data for Instant Hackathon Testing
INSERT INTO impact_metrics (id, total_food_rescued_kg, total_meals_distributed, people_helped, co2_averted_kg, water_saved_liters, successful_deliveries)
VALUES (1, 1420.00, 4260, 3850, 3550.00, 1420000.00, 142)
ON DUPLICATE KEY UPDATE id=1;

INSERT INTO users (id, name, email, password_hash, role, phone, address, is_verified) VALUES
(1, 'Grand Emerald Banquets', 'donor@foodshare.org', '$2a$12$e8Yn5f5...demoHash', 'DONOR', '+91 98765 43210', 'Central Avenue, Cyber City', TRUE),
(2, 'Hope Shelter Foundation', 'ngo@foodshare.org', '$2a$12$e8Yn5f5...demoHash', 'NGO', '+91 98220 55667', '4th Cross, Indiranagar', TRUE),
(3, 'Alex Rivera', 'volunteer@foodshare.org', '$2a$12$e8Yn5f5...demoHash', 'VOLUNTEER', '+91 98112 33445', 'Koramangala 5th Block', TRUE),
(4, 'FoodShare Admin', 'admin@foodshare.org', '$2a$12$e8Yn5f5...demoHash', 'ADMIN', '+91 99000 00000', 'FoodShare HQ', TRUE)
ON DUPLICATE KEY UPDATE id=id;
