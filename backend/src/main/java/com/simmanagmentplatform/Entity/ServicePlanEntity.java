package com.simmanagmentplatform.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "services_plan")
public class ServicePlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long service_id;

    @Column(nullable = false)
    private String calls;
    
    @Column(nullable = false)
    private String sms;

    @Column(nullable = false)
    private String data;

    @Column(nullable = false)
    private String price;

    
}
