package com.policyguard.service;
import com.policyguard.entity.*; import com.policyguard.repository.*;
import org.springframework.stereotype.Service; import org.springframework.web.multipart.MultipartFile;
import java.util.*;
@Service
public class DocumentService {
  private final DocumentRepository docs; private final PolicyAnalysisRepository analyses;
  private final QuestionRepository questions; private final FileStorageService storage;
  private final DocumentParserService parser; private final AiService ai;
  public DocumentService(DocumentRepository d, PolicyAnalysisRepository a, QuestionRepository q,
                         FileStorageService s, DocumentParserService p, AiService ai){
    docs=d; analyses=a; questions=q; storage=s; parser=p; this.ai=ai;
  }

  public Document upload(Long userId, MultipartFile file, String category) throws Exception {
    String name = Objects.requireNonNull(file.getOriginalFilename());
    String ext = name.contains(".") ? name.substring(name.lastIndexOf('.')+1).toLowerCase() : "";
    if (!List.of("pdf","docx").contains(ext)) throw new RuntimeException("Only PDF or DOCX allowed");
    String path = storage.store(file);
    Document d = Document.builder().userId(userId).originalName(name).storedPath(path)
      .fileType(ext).fileSize(file.getSize()).docCategory(category).status(Document.Status.PROCESSING).build();
    docs.save(d);
    try {
      String text = parser.extractText(path, ext);
      PolicyAnalysis a = PolicyAnalysis.builder().documentId(d.getId()).rawText(text)
        .summary(ai.summarize(text)).keyClauses(ai.extractClauses(text)).risks(ai.detectRisks(text)).build();
      analyses.save(a);
      d.setStatus(Document.Status.ANALYZED);
    } catch (Exception ex) { d.setStatus(Document.Status.FAILED); }
    return docs.save(d);
  }

  public List<Document> list(Long userId, String q){
    return (q==null||q.isBlank())
      ? docs.findByUserIdOrderByUploadedAtDesc(userId)
      : docs.findByUserIdAndOriginalNameContainingIgnoreCaseOrderByUploadedAtDesc(userId,q);
  }

  public Map<String,Object> detail(Long userId, Long id){
    Document d = docs.findById(id).orElseThrow();
    if (!d.getUserId().equals(userId)) throw new RuntimeException("Forbidden");
    Map<String,Object> r = new HashMap<>();
    r.put("document", d);
    r.put("analysis", analyses.findByDocumentId(id).orElse(null));
    r.put("questions", questions.findByDocumentIdOrderByAskedAtAsc(id));
    return r;
  }

  public Question ask(Long userId, Long docId, String question){
    Document d = docs.findById(docId).orElseThrow();
    if (!d.getUserId().equals(userId)) throw new RuntimeException("Forbidden");
    String text = analyses.findByDocumentId(docId).map(PolicyAnalysis::getRawText).orElse("");
    String answer = ai.answer(text, question);
    return questions.save(Question.builder().documentId(docId).userId(userId).question(question).answer(answer).build());
  }

  public void delete(Long userId, Long id){
    Document d = docs.findById(id).orElseThrow();
    if (!d.getUserId().equals(userId)) throw new RuntimeException("Forbidden");
    docs.delete(d);
  }
}
