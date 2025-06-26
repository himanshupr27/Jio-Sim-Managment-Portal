package com.simmanagmentplatform.Dto;


// import java.util.Set;

// import javax.management.relation.Role;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonProperty;
// import com.simmanagmentplatform.Entity.OrdersEntity;
// import com.simmanagmentplatform.Entity.SimDetailsEntity;

// import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;
// import jakarta.validation.constraints.Size;
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

    // @NotEmpty(message = "Aadhar number cannot be empty")
    // @Size(min = 12, max = 12, message = "Aadhar number must be 12 digits")
    private String aadharNumber;

    // @NotEmpty(message = "Phonenumber cannot be empty")
    private String phoneNumber;

    private Long role_id = 2L;

    private ProfileDTO profile;

    // @JsonIgnore
    // public String getEncryptedPin() {
    //     return this.encryptedPin;
    // }

    // @JsonProperty
    // public String setEncryptedPin(String encryptedPin) {
    //     return this.encryptedPin = encryptedPin;
    // }
}
