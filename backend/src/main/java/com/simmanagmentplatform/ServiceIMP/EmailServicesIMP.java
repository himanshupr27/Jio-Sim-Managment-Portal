package com.simmanagmentplatform.ServiceIMP;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.ProfileDTO;
// import com.simmanagmentplatform.Dto.UsersDTO;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.EmialServices;

import jakarta.servlet.http.HttpSession;

@Service
public class EmailServicesIMP implements EmialServices {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private profileServicesIMP profileServicesIMP;

    // @Autowired
    // private userServiceIMP userServiceIMP;

    @Override
    public ResponseEntity<?> sendEmail(String email, HttpSession session) {
        ApiResponse apiResponse;
        try {

            Random random = new Random();
            int otp = 100000 + random.nextInt(900000);

            session.setAttribute("generatedOtp", otp);

            // System.out.println("Session all detials"+session.getId());
            String subject = "Your OTP Code";
            String message = "Your OTP for verification is: " + otp;

            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(message);
            simpleMailMessage.setFrom("demo.test.develop@gmail.com");

            javaMailSender.send(simpleMailMessage);

            apiResponse = new ApiResponse("OTP sent successfully", true);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);

        } catch (MailException e) {

            e.printStackTrace();
            apiResponse = new ApiResponse("Failed to send OTP", false);
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<?> verifyOtp(int userInputOtp, HttpSession session) {
        ApiResponse apiResponse;
        // System.out.println("Session all detials"+session);
        Integer generatedOtp = (Integer) session.getAttribute("generatedOtp");

        if (generatedOtp == null) {
            apiResponse = new ApiResponse("No OTP found in session", false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        if (generatedOtp == userInputOtp) {
            apiResponse = new ApiResponse("OTP verified successfully", true);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            apiResponse = new ApiResponse("Invalid OTP", false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> sendEmailkycUpdate(Long id) {
        ApiResponse apiResponse;
        try {

            ProfileDTO profileDTO = this.profileServicesIMP.getProfileById(id);
            // UsersDTO usersDTO = this.userServiceIMP.getUserById(profileDTO.getUser_id());

            String subject = "KYC Verification";
            String message = "Hi, " + profileDTO.getFirstName() + " " + profileDTO.getLastName()
                    + " your Kyc verification is done sucessfully by the excutive you be receving the PKI-SIM in & working days";

            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(profileDTO.getEmailId());
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(message);
            simpleMailMessage.setFrom("demo.test.develop@gmail.com");

            javaMailSender.send(simpleMailMessage);

            apiResponse = new ApiResponse("OTP sent successfully", true);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);

        } catch (MailException e) {

            e.printStackTrace();
            apiResponse = new ApiResponse("Failed to send OTP", false);
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Override
    public ResponseEntity<?> sendEmailSimOrderPlaced(Long id) {
        ApiResponse apiResponse;
        try {
            // Get profile info
            ProfileDTO profileDTO = this.profileServicesIMP.getProfileById(id);

            // Email content
            String subject = "SIM Order Placed Successfully";
            String message = "Hi " + profileDTO.getFirstName() + " " + profileDTO.getLastName() + ",\n\n"
                    + "Your order for the JIO PKI-SIM has been successfully placed.\n"
                    + "Once your KYC verification is completed by our executive, the SIM will be shipped to your address.\n\n"
                    + "Thank you for choosing JIO.\n\n"
                    + "Regards,\n"
                    + "JIO Team";

            // Create email
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(profileDTO.getEmailId());
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(message);
            simpleMailMessage.setFrom("demo.test.develop@gmail.com");

            // Send email
            javaMailSender.send(simpleMailMessage);

            // Prepare response
            apiResponse = new ApiResponse("SIM order confirmation email sent successfully", true);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);

        } catch (MailException e) {
            e.printStackTrace();
            apiResponse = new ApiResponse("Failed to send SIM order confirmation email", false);
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
