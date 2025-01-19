// package com.simmanagmentplatform.Security;

// import java.io.IOException;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.MalformedJwtException;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Component
// public class JwtAunthenticationFilter extends OncePerRequestFilter {

//     private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

//     @Autowired
//     private JwtTokenHelper jwtHelper;

//     @Autowired
//     private UserDetailsService userDetailsService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
//         //geting token from header
//         if (request.getServletPath().equals("/api/auth/login")) {
//             filterChain.doFilter(request, response);
//             return;
//         }

//         String requestHeader = request.getHeader("Authorization");
//         // Bearer 2345tfdcdsds
//         if (requestHeader == null) {
//             logger.info("Header: null");
//             logger.info("Invalid Header Value !!");
//         }
//         logger.info(" Header :  {}", requestHeader);
//         String username = null;
//         String token = null;

//         if (requestHeader != null && requestHeader.startsWith("Bearer")) {

//             token = requestHeader.substring(7);
//             try {

//                 username = this.jwtHelper.getUsernameFromToken(token);

//             } catch (IllegalArgumentException e) {

//                 logger.info("Illegal Argument while fetching the username !!");
//                 e.printStackTrace();

//             } catch (ExpiredJwtException e) {

//                 logger.info("Given jwt token is expired !!");
//                 e.printStackTrace();

//             } catch (MalformedJwtException e) {

//                 logger.info("Some changed has done in token !! Invalid Token");
//                 e.printStackTrace();

//             } catch (Exception e) {

//                 e.printStackTrace();
//             }
//         } else {
//             logger.info("Invalid Header Value !! ");
//         }

//         //
//         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

//             // fetch user detail from username
//             UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//             Boolean validateToken = this.jwtHelper.validateJwtToken(token, userDetails);
//             if (validateToken) {

//                 // set the authentication
//                 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
//                 authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

//                 SecurityContextHolder.getContext().setAuthentication(authentication);

//             } else {
//                 logger.info("Validation fails !!");
//             }

//         }

//         filterChain.doFilter(request, response);

//     }

// }
