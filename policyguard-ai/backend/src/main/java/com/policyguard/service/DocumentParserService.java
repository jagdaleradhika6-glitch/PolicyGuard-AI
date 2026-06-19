package com.policyguard.service;
import org.apache.pdfbox.Loader; import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor; import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import java.io.*; import java.nio.file.*;
@Service
public class DocumentParserService {
  public String extractText(String path, String fileType) throws IOException {
    byte[] bytes = Files.readAllBytes(Path.of(path));
    if ("pdf".equalsIgnoreCase(fileType)) {
      try (PDDocument doc = Loader.loadPDF(bytes)) { return new PDFTextStripper().getText(doc); }
    } else if ("docx".equalsIgnoreCase(fileType)) {
      try (XWPFDocument d = new XWPFDocument(new ByteArrayInputStream(bytes));
           XWPFWordExtractor ex = new XWPFWordExtractor(d)) { return ex.getText(); }
    }
    throw new IllegalArgumentException("Unsupported file type: " + fileType);
  }
}
