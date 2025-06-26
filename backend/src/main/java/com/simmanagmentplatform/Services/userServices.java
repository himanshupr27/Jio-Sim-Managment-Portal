package com.simmanagmentplatform.Services;


import org.springframework.http.ResponseEntity;


import com.simmanagmentplatform.Dto.GetAllResponse;
import com.simmanagmentplatform.Dto.UsersDTO;
import com.simmanagmentplatform.Response.ApiResponse;





public interface userServices {

    
    public ResponseEntity<ApiResponse> createUser(UsersDTO usersDTO);
   
    public GetAllResponse<UsersDTO> getAllUsers( Integer PageNumber,Integer PageSize);

    public UsersDTO getUserById(Long id);

    public UsersDTO getUserByAadharNumber(String aadharNumber);
    
    public UsersDTO getUserByPhoneNumber(String phoneNumber);
    
    public ResponseEntity<?> deleteUser(Long id);
    
    public ResponseEntity<ApiResponse> updateUser(UsersDTO usersDTO, Long id);
    
}
