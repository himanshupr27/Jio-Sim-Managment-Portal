package com.simmanagmentplatform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simmanagmentplatform.Dto.ServicePlanDTO;
import com.simmanagmentplatform.Services.servicePlanServices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;






@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/service/plan")
public class servicePlanController {

    @Autowired
    servicePlanServices servicePlanService;
    
    @GetMapping("/get/{id}")
    public ServicePlanDTO getAllServicePlanById(@PathVariable Long id) {
        
        return this.servicePlanService.getServicePlaneById(id);
    }
    
    @GetMapping("/get/price")
    public ServicePlanDTO getAllServicePlanById(@RequestParam String price) {
        
        return this.servicePlanService.getServicePlaneByPrice(price);
    }

    @GetMapping("/get/all")
    public List<ServicePlanDTO> getMethodName() {
        return this.servicePlanService.getAllServicePlans();
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> postMethodName(@RequestBody ServicePlanDTO servicePlanDTO) {
        
        return this.servicePlanService.createServicePlane(servicePlanDTO);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> putMethodName(@PathVariable Long id, @RequestBody ServicePlanDTO servicePlanDTO) {

        return this.servicePlanService.updateServicePlane(servicePlanDTO, id);
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id)
    {
        return this.servicePlanService.deleteServicePlane(id);
    }
    
}
