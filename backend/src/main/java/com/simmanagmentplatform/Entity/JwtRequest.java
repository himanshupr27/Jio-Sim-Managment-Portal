package com.simmanagmentplatform.Entity;

import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotNull;
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

public class JwtRequest {
    @Email
    private String email;
    private int otp;
}
