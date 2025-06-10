package com.simmanagmentplatform.Entity;

import java.util.List;
// import java.util.Collection;
// import java.util.HashSet;
// import java.util.Set;
// import java.util.stream.Collectors;

// import com.fasterxml.jackson.annotation.JsonManagedReference;

// import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String emailId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Roles role;

    @OneToMany(mappedBy = "usersEntity",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProfileEntity> profiles;


    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     return this.roles.stream()
    //         .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
    //         .collect(Collectors.toSet());
    // }

    // @Override
    // public String getUsername() {
    //     return this.emailId;
    // }

    // @Override
    // public boolean isAccountNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isAccountNonLocked() {
    //     return true;
    // }

    // @Override
    // public boolean isCredentialsNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isEnabled() {
    //     return true;
    // }

}
