package com.simmanagmentplatform.Entity;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String role;
    @OneToMany(mappedBy = "role")
    Set<UsersEntity> users;
}
