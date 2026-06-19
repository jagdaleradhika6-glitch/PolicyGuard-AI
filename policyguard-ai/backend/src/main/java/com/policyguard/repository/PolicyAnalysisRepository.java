package com.policyguard.repository;
import com.policyguard.entity.PolicyAnalysis; import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface PolicyAnalysisRepository extends JpaRepository<PolicyAnalysis,Long> {
  Optional<PolicyAnalysis> findByDocumentId(Long documentId);
}
