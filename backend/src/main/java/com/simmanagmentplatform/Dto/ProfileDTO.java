package com.simmanagmentplatform.Dto;

import com.simmanagmentplatform.Entity.Address;

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

    // @NotEmpty(message = "Date of Birth cannot be empty")
    private String dob;

    // @NotEmpty(message = "Gender cannot be empty")
    private String gender;

    // @NotEmpty
    // @Size(min = 10, max = 10, message = "Enter a valid Phone Number")
    private String phoneNumber;

    // @NotEmpty
    // @Size(min = 6, max = 6, message = "PIN must be 6 digits")
    // @Pattern(regexp = "^[0-9]{6}$", message = "Encrypted PIN must contain only numbers")
    private String encryptedPin;

    private String fullName;

    private Address address;

    private Long ekyc_id;

    private Long sim_id;
    
    private Long oreder_id;

    private Long user_id;
}
