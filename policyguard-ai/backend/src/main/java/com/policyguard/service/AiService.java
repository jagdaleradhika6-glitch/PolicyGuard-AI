package com.policyguard.service;
import com.fasterxml.jackson.databind.*; import com.fasterxml.jackson.databind.node.*;
import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service;
import java.net.URI; import java.net.http.*; import java.time.Duration; import java.util.*;
@Service
public class AiService {
  @Value("${app.ai.provider}") private String provider;
  @Value("${app.ai.openai.key}") private String openaiKey;
  @Value("${app.ai.openai.model}") private String openaiModel;
  @Value("${app.ai.groq.key}") private String groqKey;
  @Value("${app.ai.groq.model}") private String groqModel;
  private final ObjectMapper om = new ObjectMapper();
  private final HttpClient http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(20)).build();

  public String chat(String system, String user) {
    boolean groq = "groq".equalsIgnoreCase(provider);
    String url = groq ? "https://api.groq.com/openai/v1/chat/completions"
                      : "https://api.openai.com/v1/chat/completions";
    String key = groq ? groqKey : openaiKey;
    String model = groq ? groqModel : openaiModel;
    if (key == null || key.isBlank()) return "[AI key not configured — set OPENAI_API_KEY or GROQ_API_KEY]";
    ObjectNode body = om.createObjectNode();
    body.put("model", model); body.put("temperature", 0.2);
    ArrayNode msgs = body.putArray("messages");
    msgs.addObject().put("role","system").put("content",system);
    msgs.addObject().put("role","user").put("content",user);
    try {
      HttpRequest req = HttpRequest.newBuilder(URI.create(url))
        .header("Authorization","Bearer "+key).header("Content-Type","application/json")
        .POST(HttpRequest.BodyPublishers.ofString(body.toString())).timeout(Duration.ofSeconds(60)).build();
      HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
      if (res.statusCode() >= 300) return "[AI error "+res.statusCode()+"] "+res.body();
      JsonNode n = om.readTree(res.body());
      return n.at("/choices/0/message/content").asText();
    } catch (Exception e) { return "[AI exception] "+e.getMessage(); }
  }

  public String summarize(String text){
    return chat("You are a legal-document analyst. Summarize in clear plain language for non-lawyers in 6-10 bullet points.",
      truncate(text,12000));
  }
  public String extractClauses(String text){
    return chat("Extract the most important clauses (e.g., termination, liability, data sharing, auto-renewal, arbitration). Return as JSON array of {clause,quote,explanation}.",
      truncate(text,12000));
  }
  public String detectRisks(String text){
    return chat("Identify risky/unfavorable terms for the user. Return JSON: {riskScore:1-100, risks:[{level:'low|medium|high', title, why}]}.",
      truncate(text,12000));
  }
  public String answer(String docText, String question){
    return chat("Answer the user's question using ONLY the document context. Be concise and cite the relevant clause.",
      "Document:\n"+truncate(docText,10000)+"\n\nQuestion: "+question);
  }
  private String truncate(String s, int n){ return s==null?"":(s.length()<=n?s:s.substring(0,n)); }
}
