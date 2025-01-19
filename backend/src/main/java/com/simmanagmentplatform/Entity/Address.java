package com.simmanagmentplatform.Entity;

import lombok.*;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class Address {
    private String street;
    private String city;
    private String state;
    private String country;
    @Column(name="postal_code")
    private String postalCode;
}
