package com.policyguard.entity;
import jakarta.persistence.*; import lombok.*; import java.time.Instant;
@Entity @Table(name="policy_analysis") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PolicyAnalysis {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(name="document_id",nullable=false,unique=true) private Long documentId;
  @Lob private String summary;
  @Lob @Column(name="key_clauses") private String keyClauses;
  @Lob private String risks;
  @Column(name="risk_score") private Integer riskScore;
  @Lob @Column(name="raw_text") private String rawText;
  @Column(name="created_at") private Instant createdAt = Instant.now();
}
