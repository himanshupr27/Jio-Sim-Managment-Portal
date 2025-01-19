package com.simmanagmentplatform.Entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.Getter;
import lombok.Setter;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="ekyc_details")
public class EkycEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pan;

    private String aadhar;

    @Column(name="status")
    private String kycstatus;

    private String panpic;

    private String profilepic;

    @Column(name = "addresspic")
    private String addressproofpic;
    
    private String video;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private ProfileEntity profileEntity;
    
}
