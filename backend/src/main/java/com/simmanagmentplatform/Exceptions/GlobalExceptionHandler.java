package com.simmanagmentplatform.Exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.simmanagmentplatform.Response.ApiResponse;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourseNotFoundException.class)
    public ResponseEntity<ApiResponse> ResourseNotFoundExceptionHandler(ResourseNotFoundException ex){
      String message= ex.getMessage();
      ApiResponse apiResponse = new ApiResponse(message,false);
      return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity <Map<String,String>> handleMethodArgsNotValidException(MethodArgumentNotValidException ex){
      Map<String,String> respons = new HashMap<>();
      ex.getBindingResult().getAllErrors().forEach((errors)->{
        String fliedName=((FieldError) errors ).getField();
        String message = errors.getDefaultMessage();
        respons.put(fliedName, message);
      });

      return new ResponseEntity<Map<String, String>>(respons, HttpStatus.BAD_REQUEST);
    } 
}
