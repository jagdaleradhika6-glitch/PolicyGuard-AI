package com.policyguard.controller;
import com.policyguard.dto.AuthDtos.*; import com.policyguard.service.AuthService;
import jakarta.validation.Valid; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final AuthService auth;
  public AuthController(AuthService a){ auth=a; }
  @PostMapping("/register") public AuthResponse register(@Valid @RequestBody RegisterRequest r){ return auth.register(r); }
  @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest r){ return auth.login(r); }
}
