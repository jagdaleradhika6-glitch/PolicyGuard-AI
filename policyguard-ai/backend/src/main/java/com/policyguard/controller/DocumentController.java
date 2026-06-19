package com.policyguard.controller;
import com.policyguard.dto.AuthDtos.QuestionRequest; import com.policyguard.entity.User;
import com.policyguard.service.DocumentService;
import jakarta.validation.Valid; import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*; import org.springframework.web.multipart.MultipartFile;
import java.util.*;
@RestController @RequestMapping("/api/documents")
public class DocumentController {
  private final DocumentService svc;
  public DocumentController(DocumentService s){ svc=s; }
  @PostMapping("/upload") public Object upload(@AuthenticationPrincipal User u,
      @RequestParam("file") MultipartFile file, @RequestParam(required=false) String category) throws Exception {
    return svc.upload(u.getId(), file, category);
  }
  @GetMapping public Object list(@AuthenticationPrincipal User u, @RequestParam(required=false) String q){
    return svc.list(u.getId(), q);
  }
  @GetMapping("/{id}") public Map<String,Object> detail(@AuthenticationPrincipal User u, @PathVariable Long id){
    return svc.detail(u.getId(), id);
  }
  @DeleteMapping("/{id}") public void delete(@AuthenticationPrincipal User u, @PathVariable Long id){
    svc.delete(u.getId(), id);
  }
  @PostMapping("/{id}/ask") public Object ask(@AuthenticationPrincipal User u, @PathVariable Long id,
      @Valid @RequestBody QuestionRequest r){
    return svc.ask(u.getId(), id, r.question());
  }
}
