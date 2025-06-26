package com.simmanagmentplatform.Dto;

import com.simmanagmentplatform.Entity.Address;

import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfileDTO {
    private Long id;

    private String firstName;

    private String lastName;

    // @NotEmpty(message = "Date of Birth cannot be empty")
    private String dob;

    // @NotEmpty(message = "Gender cannot be empty")
    private String gender;

    @Email(message = "Email must be valid")
    private String emailId;

    private Address address;

    // private Long ekyc_id;

    private Long sim_id;
    
    private Long oreder_id;

    private Long user_id;
}
