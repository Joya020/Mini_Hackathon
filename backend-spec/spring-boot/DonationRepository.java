package org.foodshare.api.repository;

import org.foodshare.api.model.Donation;
import org.foodshare.api.model.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {
    List<Donation> findByStatus(DonationStatus status);
    List<Donation> findByDonorId(Long donorId);
    List<Donation> findByClaimedNgoId(Long claimedNgoId);
    List<Donation> findByVolunteerId(Long volunteerId);
}
