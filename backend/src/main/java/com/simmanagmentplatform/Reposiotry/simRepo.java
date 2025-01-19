package com.simmanagmentplatform.Reposiotry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.SimDetailsEntity;

public interface simRepo extends JpaRepository<SimDetailsEntity,Long> {
     
     List<SimDetailsEntity> findByStatus(String status);

     List<SimDetailsEntity> findByAvailable(Boolean available);

}
