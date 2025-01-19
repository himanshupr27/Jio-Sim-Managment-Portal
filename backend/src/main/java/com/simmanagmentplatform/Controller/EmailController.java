package com.simmanagmentplatform.Controller;

// import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.DisabledException;
// import org.springframework.security.authentication.InternalAuthenticationServiceException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.simmanagmentplatform.Dto.UsersDTO;
// import com.simmanagmentplatform.Entity.JwtRequest;
// import com.simmanagmentplatform.Entity.JwtResponse;
// import com.simmanagmentplatform.Reposiotry.userRepo;
// import com.simmanagmentplatform.Response.ApiResponse;
// import com.simmanagmentplatform.Security.JwtTokenHelper;
import com.simmanagmentplatform.Services.EmialServices;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;



@RestController
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmialServices emialServices;

    // @Autowired
    // private JwtTokenHelper jwtTokenHelper;

    // @Autowired
    // private AuthenticationManager authenticationManager;

    // @Autowired
    // private UserDetailsService userDetailsService;

    // @Autowired
    // private userRepo userRepo;

    // @Autowired
    // private ModelMapper modelMapper;

    @GetMapping("/send")
    public ResponseEntity<?> sendOtpEmail(@RequestParam String email, HttpSession session) {
        return emialServices.sendEmail(email, session);
    }
    @PostMapping("/kYC_verifyied/{id}")
    public ResponseEntity<?> sendEmail(@PathVariable Long id) {
        return emialServices.sendEmailkycUpdate(id);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestParam int otp, HttpSession session) {
        return emialServices.verifyOtp(otp, session);
    }

    // @PostMapping("/verify")
    //  public ResponseEntity<?> verifyOTP(@RequestBody JwtRequest
    //        request, HttpSession session) throws Exception {
    //         Integer storedOtp = (Integer) session.getAttribute("generatedOtp");
    //     if (storedOtp == null) {
    //         return ResponseEntity.status(400).body(new ApiResponse("No OTP found in session", false));
    //     }

    //     // OTP expiry logic
    //     // Long otpGeneratedTime = (Long) session.getAttribute("otpGeneratedTime");
    //     // if (otpGeneratedTime == null || System.currentTimeMillis() - otpGeneratedTime > 5 * 60 * 1000) {
    //     //     return ResponseEntity.status(401).body("OTP Expired");
    //     // }

    //     if (request.getOtp()!=storedOtp) {
    //         return ResponseEntity.status(401).body("Invalid OTP");
    //     }

    //     // try {
    //     //     authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), null));
    //     // } catch (DisabledException e) {
    //     //     throw new Exception("USER_DISABLED", e);
    //     // } catch (BadCredentialsException e) {
    //     //     throw new Exception("INVALID_CREDENTIALS", e);
    //     // } catch (InternalAuthenticationServiceException e) {
    //     //     throw new Exception("Internal authentication error", e);
    //     // }

    //     // Generate JWT token for the user
    //     UserDetails userDetails = (UserDetails) userRepo.findByEmailId(request.getEmail())
    //                                       .orElseThrow(() -> new Exception("User not found"));

    //     String jwtToken = jwtTokenHelper.generateJwtToken(userDetails);

    //     // Map user details to DTO
    //     UsersDTO usersDTO = modelMapper.map(userDetails, UsersDTO.class);

    //     // Clear OTP after successful verification
    //     session.removeAttribute("generatedOtp");
    //     session.removeAttribute("otpGeneratedTime");

    //     // Return response with JWT token and user data
    //     return ResponseEntity.ok(new JwtResponse(jwtToken, usersDTO));
    // }
}

