// package com.simmanagmentplatform.Security;

// import java.security.Key;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.stream.Collectors;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.io.Decoders;
// import io.jsonwebtoken.security.Keys;

// @Component
// public class JwtTokenHelper {
//     public static final long TOKEN_VALIDITY = 5 * 60 * 60;

//     private String jwtSecret = "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf";


//    public String generateJwtToken(UserDetails userDetails) { 
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("roles", userDetails.getAuthorities().stream()
//         .map(GrantedAuthority::getAuthority)
//         .collect(Collectors.toList())); // Add roles to claims
       
//       //   System.out.println(claims);
//     return Jwts
//         .builder()
//         .setClaims(claims)
//         .setSubject(userDetails.getUsername())
//         .setIssuedAt(new Date(System.currentTimeMillis()))
//         .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
//         .signWith(getKey(), SignatureAlgorithm.HS256)
//         .compact();
//    }

//    public Boolean validateJwtToken(String token, UserDetails userDetails) { 
//       final String username = getUsernameFromToken(token);
//       final Claims claims = Jwts
//          .parserBuilder()
//          .setSigningKey(getKey())
//          .build()
//          .parseClaimsJws(token).getBody(); 
//       Boolean isTokenExpired = claims.getExpiration().before(new Date());
//       return (username.equals(userDetails.getUsername())) && !isTokenExpired;
//    }

//    // get the username by checking subject of JWT Token
//    public String getUsernameFromToken(String token) {
//       final Claims claims = Jwts
//          .parserBuilder()
//          .setSigningKey(getKey())
//          .build()
//          .parseClaimsJws(token).getBody(); 
//       return claims.getSubject(); 
//    }

//    // create a signing key based on secret
//    private Key getKey() {
//       byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);		
//       Key key = Keys.hmacShaKeyFor(keyBytes);
//       return key;
//    }
// }

