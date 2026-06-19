package com.policyguard.controller;
import com.policyguard.repository.*;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/admin")
public class AdminController {
  private final UserRepository users; private final DocumentRepository docs;
  public AdminController(UserRepository u, DocumentRepository d){ users=u; docs=d; }
  @GetMapping("/users") public Object listUsers(){ var l = users.findAll(); l.forEach(x->x.setPasswordHash(null)); return l; }
  @GetMapping("/documents") public Object listDocs(){ return docs.findAll(); }
  @GetMapping("/stats") public Object stats(){ return java.util.Map.of("users",users.count(),"documents",docs.count()); }
}
