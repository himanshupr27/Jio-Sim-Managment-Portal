package com.simmanagmentplatform.Entity;


import com.simmanagmentplatform.Dto.UsersDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

public class JwtResponse {
   private String jwtToken;
   private UsersDTO usersDTO;
}
