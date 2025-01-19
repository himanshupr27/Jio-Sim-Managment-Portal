package com.simmanagmentplatform.Dto;


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
public class ServicePlanDTO {

    private Long service_id;

    private String calls;
    
    private String sms;

    private String data;

    private String price;
    
}
