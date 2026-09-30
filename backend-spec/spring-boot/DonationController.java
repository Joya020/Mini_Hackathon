package org.foodshare.api.controller;

import org.foodshare.api.model.Donation;
import org.foodshare.api.model.DonationStatus;
import org.foodshare.api.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    @Autowired
    private DonationRepository donationRepository;

    /**
     * Get all donations, optionally filtered by status (e.g. AVAILABLE)
     */
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations(@RequestParam(required = false) DonationStatus status) {
        if (status != null) {
            return ResponseEntity.ok(donationRepository.findByStatus(status));
        }
        return ResponseEntity.ok(donationRepository.findAll());
    }

    /**
     * Get a single donation by ID with tracking steps
     */
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable String id) {
        return donationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create surplus food donation (Donor)
     */
    @PostMapping
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) {
        donation.setId("FS-" + System.currentTimeMillis() % 100000);
        donation.setStatus(DonationStatus.AVAILABLE);
        donation.setCreatedAt(LocalDateTime.now());
        Donation saved = donationRepository.save(donation);
        return ResponseEntity.ok(saved);
    }

    /**
     * NGO accepts/claims a donation
     */
    @PostMapping("/{id}/claim")
    public ResponseEntity<Donation> claimDonation(@PathVariable String id, @RequestParam Long ngoId) {
        Optional<Donation> opt = donationRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Donation donation = opt.get();
        donation.setStatus(DonationStatus.ACCEPTED);
        donation.setClaimedNgoId(ngoId);
        donation.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(donationRepository.save(donation));
    }

    /**
     * Volunteer accepts pickup task
     */
    @PostMapping("/{id}/assign-volunteer")
    public ResponseEntity<Donation> assignVolunteer(@PathVariable String id, @RequestParam Long volunteerId) {
        Optional<Donation> opt = donationRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Donation donation = opt.get();
        donation.setStatus(DonationStatus.VOLUNTEER_ASSIGNED);
        donation.setVolunteerId(volunteerId);
        donation.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(donationRepository.save(donation));
    }

    /**
     * Volunteer updates delivery state (PICKED_UP or DELIVERED)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<Donation> updateStatus(@PathVariable String id, @RequestParam DonationStatus status) {
        Optional<Donation> opt = donationRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Donation donation = opt.get();
        donation.setStatus(status);
        donation.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(donationRepository.save(donation));
    }
}
