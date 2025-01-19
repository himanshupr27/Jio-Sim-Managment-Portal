package com.simmanagmentplatform.Reposiotry;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.OrdersEntity;
import com.simmanagmentplatform.Entity.ProfileEntity;


public interface orderRepo extends JpaRepository<OrdersEntity,Long>{

    List<OrdersEntity> findByOrderStatus(String orderStatus);

    Optional<OrdersEntity> findOneByRazorpayId(String razorpayId);

    Optional<OrdersEntity> findByProfileEntity(ProfileEntity profileEntity);
}
