package com.simmanagmentplatform.Reposiotry;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.ProfileEntity;

public interface profileRepo extends JpaRepository<ProfileEntity,Long> {
 
}
