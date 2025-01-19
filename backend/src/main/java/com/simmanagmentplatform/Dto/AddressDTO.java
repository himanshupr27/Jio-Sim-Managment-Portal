package com.simmanagmentplatform.Dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
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

public class AddressDTO {
    @NotEmpty(message = "Street cannot be empty")
    private String street;

    @NotEmpty(message = "City cannot be empty")
    private String city;

    @NotEmpty(message = "State cannot be empty")
    private String state;

    @NotEmpty(message = "Country cannot be empty")
    private String country;

    @NotEmpty
    @Size(min = 6, max = 6, message = "PIN must be 6 digits")
    @Pattern(regexp = "^[0-9]{6}$", message = "Invalid PIN format")
    private String postalCode;
}
