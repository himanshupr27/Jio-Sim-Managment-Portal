package com.simmanagmentplatform.Dto;


import java.util.List;
// import java.util.Set;

// import javax.management.relation.Role;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonProperty;
// import com.simmanagmentplatform.Entity.OrdersEntity;
// import com.simmanagmentplatform.Entity.SimDetailsEntity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsersDTO {
    private Long id;

    @NotEmpty(message = "Full name cannot be empty")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    private String fullName;

    @Email(message = "Email must be valid")
    private String emailId;

    private Long role_id = 2L;

    private List<ProfileDTO> profiles;

    // @JsonIgnore
    // public String getEncryptedPin() {
    //     return this.encryptedPin;
    // }

    // @JsonProperty
    // public String setEncryptedPin(String encryptedPin) {
    //     return this.encryptedPin = encryptedPin;
    // }
}
