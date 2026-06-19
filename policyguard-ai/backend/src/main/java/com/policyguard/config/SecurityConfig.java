package com.policyguard.config;
import com.policyguard.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*; import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List;
@Configuration
public class SecurityConfig {
  @Value("${app.cors.allowed-origins}") private String origins;
  @Bean PasswordEncoder passwordEncoder(){ return new BCryptPasswordEncoder(); }
  @Bean SecurityFilterChain chain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {
    http.cors(c->c.configurationSource(cors()))
      .csrf(c->c.disable())
      .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(a->a
        .requestMatchers("/api/auth/**","/actuator/**").permitAll()
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .anyRequest().permitAll())
      .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
  @Bean CorsConfigurationSource cors(){
    var c = new CorsConfiguration();
    c.setAllowedOrigins(List.of(origins.split(",")));
    c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    c.setAllowedHeaders(List.of("*")); c.setAllowCredentials(true);
    var src = new UrlBasedCorsConfigurationSource(); src.registerCorsConfiguration("/**",c);
    return src;
  }
}
