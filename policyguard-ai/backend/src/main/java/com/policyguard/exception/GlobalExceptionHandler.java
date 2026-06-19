package com.policyguard.exception;
import org.springframework.http.*; import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*; import java.util.*;
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> validation(MethodArgumentNotValidException e){
    Map<String,String> errs = new HashMap<>();
    e.getBindingResult().getFieldErrors().forEach(f->errs.put(f.getField(),f.getDefaultMessage()));
    return ResponseEntity.badRequest().body(Map.of("errors",errs));
  }
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<?> runtime(RuntimeException e){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error",e.getMessage()));
  }
}
