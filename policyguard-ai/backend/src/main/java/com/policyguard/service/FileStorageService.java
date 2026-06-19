package com.policyguard.service;
import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException; import java.nio.file.*; import java.util.UUID;
@Service
public class FileStorageService {
  @Value("${app.upload.dir}") private String uploadDir;
  public String store(MultipartFile file) throws IOException {
    Path dir = Paths.get(uploadDir); Files.createDirectories(dir);
    String ext = ""; String name = file.getOriginalFilename();
    if (name != null && name.contains(".")) ext = name.substring(name.lastIndexOf('.'));
    Path target = dir.resolve(UUID.randomUUID()+ext);
    Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
    return target.toAbsolutePath().toString();
  }
}
