package com.policyguard.repository;
import com.policyguard.entity.Document; import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface DocumentRepository extends JpaRepository<Document,Long> {
  List<Document> findByUserIdOrderByUploadedAtDesc(Long userId);
  List<Document> findByUserIdAndOriginalNameContainingIgnoreCaseOrderByUploadedAtDesc(Long userId, String q);
}
