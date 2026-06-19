package com.policyguard.service;
import com.policyguard.dto.AuthDtos.*; import com.policyguard.entity.User;
import com.policyguard.repository.UserRepository; import com.policyguard.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service;
@Service
public class AuthService {
  private final UserRepository users; private final PasswordEncoder enc; private final JwtUtil jwt;
  public AuthService(UserRepository u, PasswordEncoder e, JwtUtil j){ users=u; enc=e; jwt=j; }
  public AuthResponse register(RegisterRequest r){
    if (users.existsByEmail(r.email())) throw new RuntimeException("Email already registered");
    User u = User.builder().fullName(r.fullName()).email(r.email())
      .passwordHash(enc.encode(r.password())).role(User.Role.USER).build();
    users.save(u);
    return new AuthResponse(jwt.generate(u.getEmail(),u.getRole().name(),u.getId()), u.getFullName(), u.getEmail(), u.getRole().name());
  }
  public AuthResponse login(LoginRequest r){
    User u = users.findByEmail(r.email()).orElseThrow(()->new RuntimeException("Invalid credentials"));
    if (!enc.matches(r.password(), u.getPasswordHash())) throw new RuntimeException("Invalid credentials");
    return new AuthResponse(jwt.generate(u.getEmail(),u.getRole().name(),u.getId()), u.getFullName(), u.getEmail(), u.getRole().name());
  }
}
