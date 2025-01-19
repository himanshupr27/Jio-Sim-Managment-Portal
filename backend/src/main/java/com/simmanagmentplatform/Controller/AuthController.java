// package com.simmanagmentplatform.Controller;

// import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.DisabledException;
// import org.springframework.security.authentication.InternalAuthenticationServiceException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.simmanagmentplatform.Dto.UsersDTO;
// import com.simmanagmentplatform.Entity.JwtRequest;
// import com.simmanagmentplatform.Entity.JwtResponse;
// import com.simmanagmentplatform.Security.JwtTokenHelper;

// import jakarta.validation.Valid;


// @RestController
// @CrossOrigin("http://localhost:5173")
// @RequestMapping("/api/auth")
// public class AuthController {


//     @Autowired
//     private UserDetailsService userDetailsService;

//     @Autowired
//     private AuthenticationManager authenticationManager;
    
//     @Autowired
//     private JwtTokenHelper helper;
    
//     @Autowired
//     private ModelMapper modelMapper;

//      @PostMapping("/login")
//    public ResponseEntity<JwtResponse> createToken(@Valid @RequestBody JwtRequest
//       request) throws Exception {
//       try {
//          authenticationManager.authenticate(
//             new UsernamePasswordAuthenticationToken(request.getEmail()));
//       } catch (DisabledException e) {
//          throw new Exception("USER_DISABLED", e);
//       } catch (BadCredentialsException e) {
//          throw new Exception("INVALID_CREDENTIALS", e);
//       } catch (InternalAuthenticationServiceException e) {
//         throw new Exception("Internal authentication error", e);
//       }
//       final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//       final String jwtToken = helper.generateJwtToken(userDetails);
//       // System.out.println(userDetails.getId());
//       UsersDTO usersDTO = this.modelMapper.map(userDetails,UsersDTO.class);
//       return ResponseEntity.ok(new JwtResponse(jwtToken,usersDTO));
//    }
// }
