package com.simmanagmentplatform.Reposiotry;



import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.Roles;

public interface roleRepo extends JpaRepository<Roles,Long> {

}
