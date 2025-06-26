package com.simmanagmentplatform.Entity;

import java.util.Date;

import jakarta.persistence.Column;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class OrdersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Address deliveryAddress;

    @Column(name="razor_Pay_Id", unique = true)
    private String razorpayId;

    private int amount;

    private String orderStatus ="REQUESTED";

    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Temporal(TemporalType.DATE)
    private Date deliveryDate;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="profile_id")
    private ProfileEntity profileEntity;
}