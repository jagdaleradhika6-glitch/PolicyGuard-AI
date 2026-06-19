package com.policyguard.security;
import com.policyguard.repository.UserRepository; import com.policyguard.entity.User;
import io.jsonwebtoken.Claims; import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain; import jakarta.servlet.ServletException;
import jakarta.servlet.http.*; import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component; import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException; import java.util.List; import java.util.Optional;
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtUtil jwt; private final UserRepository users;
  public JwtAuthFilter(JwtUtil jwt, UserRepository users){ this.jwt=jwt; this.users=users; }
  @Override protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
    String h = req.getHeader("Authorization");
    if (h != null && h.startsWith("Bearer ")) {
      try {
        Jws<Claims> c = jwt.parse(h.substring(7));
        String email = c.getPayload().getSubject();
        String role = (String) c.getPayload().get("role");
        Optional<User> u = users.findByEmail(email);
        if (u.isPresent()) {
          var auth = new UsernamePasswordAuthenticationToken(u.get(), null, List.of(new SimpleGrantedAuthority("ROLE_"+role)));
          SecurityContextHolder.getContext().setAuthentication(auth);
        }
      } catch (Exception ignored) {}
    }
    chain.doFilter(req,res);
  }
}
