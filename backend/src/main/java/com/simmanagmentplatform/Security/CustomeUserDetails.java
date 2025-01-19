// package com.simmanagmentplatform.Security;

// import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.security.core.GrantedAuthority;
// // import org.springframework.security.core.authority.SimpleGrantedAuthority;
// // import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.simmanagmentplatform.Reposiotry.userRepo;
// import com.simmanagmentplatform.Entity.UsersEntity;
// import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;

// // import java.util.Set;
// // import java.util.stream.Collectors;

// @Service
// public class CustomeUserDetails implements UserDetailsService {

//     @Autowired
//     private userRepo userRepo;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         // Fetch user from the database
//         UsersEntity user = userRepo.findByEmailId(username).orElseThrow(()-> new ResourseNotFoundException("User","UserID",username));
        
//         // geting the roles of the user login
//         // Set<GrantedAuthority> authorities = user.getRoles().stream()
//         //     .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
//         //     .collect(Collectors.toSet());

//         // return new User(user.getId(), user.getPassword(), authorities);
//         return (UserDetails) user;
//     }
// }
