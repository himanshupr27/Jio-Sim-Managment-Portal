package com.simmanagmentplatform.Services;

import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpSession;

public interface EmialServices {

    public ResponseEntity<?> sendEmail(String email, HttpSession session);
    public ResponseEntity<?> sendEmailkycUpdate(Long id);
    public ResponseEntity<?> verifyOtp(int userInputOtp, HttpSession session);
    public ResponseEntity<?> sendEmailSimOrderPlaced(Long id);
    
}
