package com.policyguard.entity;
import jakarta.persistence.*; import lombok.*; import java.time.Instant;
@Entity @Table(name="questions") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Question {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(name="document_id",nullable=false) private Long documentId;
  @Column(name="user_id",nullable=false) private Long userId;
  @Lob @Column(nullable=false) private String question;
  @Lob private String answer;
  @Column(name="asked_at") private Instant askedAt = Instant.now();
}
