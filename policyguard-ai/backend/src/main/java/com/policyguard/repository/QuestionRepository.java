package com.policyguard.repository;
import com.policyguard.entity.Question; import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface QuestionRepository extends JpaRepository<Question,Long> {
  List<Question> findByDocumentIdOrderByAskedAtAsc(Long documentId);
}
