package com.policyguard.dto;
import jakarta.validation.constraints.*;
public class AuthDtos {
  public record RegisterRequest(@NotBlank String fullName,@Email @NotBlank String email,@Size(min=6) String password){}
  public record LoginRequest(@Email @NotBlank String email,@NotBlank String password){}
  public record AuthResponse(String token, String fullName, String email, String role){}
  public record UpdateProfileRequest(@NotBlank String fullName, String avatarUrl){}
  public record QuestionRequest(@NotBlank String question){}
}
