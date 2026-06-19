package com.policyguard.entity;
import jakarta.persistence.*; import lombok.*; import java.time.Instant;
@Entity @Table(name="documents") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Document {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(name="user_id",nullable=false) private Long userId;
  @Column(name="original_name",nullable=false) private String originalName;
  @Column(name="stored_path",nullable=false) private String storedPath;
  @Column(name="file_type",nullable=false) private String fileType;
  @Column(name="file_size",nullable=false) private Long fileSize;
  @Column(name="doc_category") private String docCategory;
  @Enumerated(EnumType.STRING) private Status status = Status.UPLOADED;
  @Column(name="uploaded_at") private Instant uploadedAt = Instant.now();
  public enum Status { UPLOADED, PROCESSING, ANALYZED, FAILED }
}
