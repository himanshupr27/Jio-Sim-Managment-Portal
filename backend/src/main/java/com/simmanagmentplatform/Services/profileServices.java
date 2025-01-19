package com.simmanagmentplatform.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import com.simmanagmentplatform.Dto.ProfileDTO;
import com.simmanagmentplatform.Response.ApiResponse;

public interface profileServices {

    public ResponseEntity<ApiResponse> createProfile(ProfileDTO profileDTO,Long id);
   
    public List<ProfileDTO> getAllProfile();

    public ProfileDTO getProfileById(Long id);
    
    public ResponseEntity<?> deleteProfile(Long id);
    
    public ResponseEntity<ApiResponse> updateProfile(ProfileDTO profileDTO, Long id);

    
}
