// package com.simmanagmentplatform.config;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// // import org.springframework.security.authentication.AuthenticationProvider;
// // import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.cors.CorsConfigurationSource;

// import com.simmanagmentplatform.Security.CustomeUserDetails;
// import com.simmanagmentplatform.Security.JwtAunthenticationFilter;
// import com.simmanagmentplatform.Security.JwtAuthenticationEntryPoint;

// @Configuration
// public class SecurityConfig {

//     @Autowired
//     private JwtAunthenticationFilter filter;
//     @Autowired
//     private JwtAuthenticationEntryPoint authenticationEntryPoint;
//     @Autowired
//     private CustomeUserDetails customeUserDetails;

//     @Bean
//     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf(AbstractHttpConfigurer::disable)
//                 .cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource()))
//                 .authorizeHttpRequests(request -> request
//                 .requestMatchers("/api/auth/login").permitAll()
//                 .requestMatchers("/api/user/**").permitAll()
//                 .requestMatchers("/email/**").permitAll()
//                 // .requestMatchers("/api/user/getallDetails").hasRole("ADMIN")
//                 .requestMatchers("/api/sims/**").permitAll()
//                 .requestMatchers("/api/order/**").permitAll()
//                 .requestMatchers("/api/service/plan/**").permitAll()
//                 .requestMatchers("/error").permitAll()
//                 .anyRequest().authenticated())
//                 .exceptionHandling(exception -> exception
//                         .authenticationEntryPoint(authenticationEntryPoint))
//                 .sessionManagement(session -> session
//                         .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                 .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
//                 .authenticationProvider(authenticationProvider());
//         return http.build();
//     }

//     @Bean
//     public AuthenticationProvider authenticationProvider() {
//         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//         authProvider.setUserDetailsService(customeUserDetails);
//         authProvider.setPasswordEncoder(passwordEncoder());
//         return authProvider;
//     }

//  @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowCredentials(true);
//         configuration.addAllowedOrigin("http://localhost:5173"); // Your frontend URL
//         configuration.addAllowedHeader("*"); // Allow all headers
//         configuration.addAllowedMethod("*"); // Allow all HTTP methods

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // @Bean
//     // AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
//     //         throws Exception {
//     //     return authenticationConfiguration.getAuthenticationManager();
//     // }
//     @Bean
// AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
//         throws Exception {
//     return authenticationConfiguration.getAuthenticationManager();
// }
// }
