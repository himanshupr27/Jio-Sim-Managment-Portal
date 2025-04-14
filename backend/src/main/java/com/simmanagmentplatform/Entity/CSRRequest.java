package com.simmanagmentplatform.Entity;

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
public class CSRRequest {
    private String country;
    private String state;
    private String location;
    private String organization;
    private String orgUnit;
    private String commonName;
    private String email;
}

