package com.simmanagmentplatform.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
@Table(name="profiles")
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Temporal(TemporalType.DATE)
    private String dob;

    private String gender;

    private String phoneNumber;

    @Column(name="epin")
    private String encryptedPin;

    private Address address;
    
    @OneToOne(mappedBy = "profileEntity",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private EkycEntity ekycEntity;

    @OneToOne(mappedBy = "profileEntity",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private SimDetailsEntity simDetailsEntity;
    
    @OneToOne(mappedBy = "profileEntity",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private OrdersEntity ordersEntity;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @JsonIgnore
    private UsersEntity usersEntity;

}
