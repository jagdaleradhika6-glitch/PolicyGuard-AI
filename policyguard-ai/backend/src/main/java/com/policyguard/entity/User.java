package com.policyguard.entity;
import jakarta.persistence.*; import lombok.*; import java.time.Instant;
@Entity @Table(name="users") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(name="full_name",nullable=false) private String fullName;
  @Column(nullable=false,unique=true) private String email;
  @Column(name="password_hash",nullable=false) private String passwordHash;
  @Enumerated(EnumType.STRING) @Column(nullable=false) private Role role = Role.USER;
  @Column(name="avatar_url") private String avatarUrl;
  @Column(name="created_at") private Instant createdAt = Instant.now();
  public enum Role { USER, ADMIN }
}
