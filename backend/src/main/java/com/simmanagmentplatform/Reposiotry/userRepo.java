package com.simmanagmentplatform.Reposiotry;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.UsersEntity;


public interface userRepo extends JpaRepository<UsersEntity,Long>{

 Optional<UsersEntity> findByaadharNumber(String aadharNumber);
 Optional<UsersEntity> findByPhoneNumber(String phoneNumber);

}
