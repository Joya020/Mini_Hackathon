package org.foodshare.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
public class Donation {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "donor_id", nullable = false)
    private Long donorId;

    @Column(name = "food_name", nullable = false)
    private String foodName;

    @Column(nullable = false)
    private String category;

    @Column(name = "quantity_display", nullable = false)
    private String quantityDisplay;

    @Column(name = "quantity_kg")
    private Double quantityKg;

    @Column(name = "estimated_meals")
    private Integer estimatedMeals;

    @Column(name = "dietary_type")
    private String dietaryType; // VEG, NON_VEG

    @Column(name = "prepared_at")
    private String preparedAt;

    @Column(name = "consume_before")
    private String consumeBefore;

    @Column(name = "pickup_address", columnDefinition = "TEXT")
    private String pickupAddress;

    private Double latitude;
    private Double longitude;

    @Column(name = "contact_phone")
    private String contactPhone;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "handling_notes")
    private String handlingNotes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonationStatus status;

    @Column(name = "claimed_ngo_id")
    private Long claimedNgoId;

    @Column(name = "volunteer_id")
    private Long volunteerId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors, Getters & Setters
    public Donation() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Long getDonorId() { return donorId; }
    public void setDonorId(Long donorId) { this.donorId = donorId; }

    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuantityDisplay() { return quantityDisplay; }
    public void setQuantityDisplay(String quantityDisplay) { this.quantityDisplay = quantityDisplay; }

    public Double getQuantityKg() { return quantityKg; }
    public void setQuantityKg(Double quantityKg) { this.quantityKg = quantityKg; }

    public Integer getEstimatedMeals() { return estimatedMeals; }
    public void setEstimatedMeals(Integer estimatedMeals) { this.estimatedMeals = estimatedMeals; }

    public String getDietaryType() { return dietaryType; }
    public void setDietaryType(String dietaryType) { this.dietaryType = dietaryType; }

    public String getPreparedAt() { return preparedAt; }
    public void setPreparedAt(String preparedAt) { this.preparedAt = preparedAt; }

    public String getConsumeBefore() { return consumeBefore; }
    public void setConsumeBefore(String consumeBefore) { this.consumeBefore = consumeBefore; }

    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getHandlingNotes() { return handlingNotes; }
    public void setHandlingNotes(String handlingNotes) { this.handlingNotes = handlingNotes; }

    public DonationStatus getStatus() { return status; }
    public void setStatus(DonationStatus status) { this.status = status; }

    public Long getClaimedNgoId() { return claimedNgoId; }
    public void setClaimedNgoId(Long claimedNgoId) { this.claimedNgoId = claimedNgoId; }

    public Long getVolunteerId() { return volunteerId; }
    public void setVolunteerId(Long volunteerId) { this.volunteerId = volunteerId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
