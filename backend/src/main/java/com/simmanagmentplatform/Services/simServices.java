package com.simmanagmentplatform.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.simmanagmentplatform.Dto.SimDetailsDTO;

public interface simServices {
    
    ResponseEntity<?> createSimData(SimDetailsDTO simDetailsDTO);

    ResponseEntity<?> deleteSimData(Long id);

    ResponseEntity<?> allocateSimToProfile(Long sim_id,Long profile_id);
    
    SimDetailsDTO updateSimData(SimDetailsDTO simDetailsDTO, Long id);
    
    SimDetailsDTO getSimsDataById(Long id);

    List<SimDetailsDTO> getAllSimsData();

    List<SimDetailsDTO> getAllSimsDataByStatus(String status);
    
    List<SimDetailsDTO> getAllSimsDataByAvailablity(Boolean available);


}
