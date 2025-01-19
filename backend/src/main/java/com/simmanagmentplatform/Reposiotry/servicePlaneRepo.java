package com.simmanagmentplatform.Reposiotry;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.ServicePlanEntity;


public interface servicePlaneRepo extends JpaRepository<ServicePlanEntity,Long> {

    ServicePlanEntity findByPrice(String price);
    
}
