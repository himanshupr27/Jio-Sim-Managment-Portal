package com.simmanagmentplatform.Entity;

import java.util.Date;

// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
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
@Entity
@Table(name = "sims")
public class SimDetailsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sim_id;

    @Column(nullable = false, length = 10)
    private String simNumber;

    @Column(nullable = false, unique = true, length = 20)
    private String CIID;

    @Column(nullable = false, unique = true, length = 20)
    private String IMSI;

    private String profileName;

    private String status;

    private Date addDate;

    private Boolean available;

    private Date issueDate;


    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "service_id")
    private ServicePlanEntity servicePlanEntity;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="profile_id")
    private ProfileEntity profileEntity;

}
