package com.policyguard.controller;
import com.policyguard.dto.AuthDtos.UpdateProfileRequest; import com.policyguard.entity.User;
import com.policyguard.repository.UserRepository;
import jakarta.validation.Valid; import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/users")
public class UserController {
  private final UserRepository users;
  public UserController(UserRepository u){ users=u; }
  @GetMapping("/me") public User me(@AuthenticationPrincipal User u){ u.setPasswordHash(null); return u; }
  @PutMapping("/me") public User update(@AuthenticationPrincipal User u, @Valid @RequestBody UpdateProfileRequest r){
    u.setFullName(r.fullName()); u.setAvatarUrl(r.avatarUrl()); users.save(u); u.setPasswordHash(null); return u;
  }
}
