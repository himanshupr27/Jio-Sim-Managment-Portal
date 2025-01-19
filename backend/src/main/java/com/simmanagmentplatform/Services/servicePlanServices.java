package com.simmanagmentplatform.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.simmanagmentplatform.Dto.ServicePlanDTO;

public interface servicePlanServices {

    List<ServicePlanDTO> getAllServicePlans();
    
    ServicePlanDTO getServicePlaneById(Long id);
    
    ServicePlanDTO getServicePlaneByPrice(String price);

    ResponseEntity<?> createServicePlane(ServicePlanDTO servicePlaneDTO);

    ResponseEntity<?> updateServicePlane(ServicePlanDTO servicePlaneDTO, Long id);

    ResponseEntity<?> deleteServicePlane(Long id);
}
