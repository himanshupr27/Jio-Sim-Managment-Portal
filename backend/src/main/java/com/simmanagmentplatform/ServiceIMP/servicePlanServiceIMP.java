package com.simmanagmentplatform.ServiceIMP;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.ServicePlanDTO;
import com.simmanagmentplatform.Entity.ServicePlanEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.servicePlaneRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.servicePlanServices;

@Service
public class servicePlanServiceIMP implements servicePlanServices {


    @Autowired
    servicePlaneRepo servicePlaneRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ServicePlanDTO getServicePlaneById(Long id) {

        ServicePlanEntity serviceplane = this.servicePlaneRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Service Plan", "id", Long.toString(id)));

        return this.modelMapper.map(serviceplane, ServicePlanDTO.class);
    }



    @Override
    public ServicePlanDTO getServicePlaneByPrice(String price) {

            ServicePlanEntity serviceplane = this.servicePlaneRepo.findByPrice(price);

            if(serviceplane == null)
            {
                throw new ResourseNotFoundException("Service Plan", "Price",price);
            }

        return this.modelMapper.map(serviceplane, ServicePlanDTO.class);
    }



    @Override
    public ResponseEntity<?> createServicePlane(ServicePlanDTO servicePlaneDTO) {

        ServicePlanEntity servicePlanEntity = this.modelMapper.map(servicePlaneDTO, ServicePlanEntity.class);
        this.servicePlaneRepo.save(servicePlanEntity);

        ApiResponse apiResponse =new ApiResponse("Service Plan CREATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateServicePlane(ServicePlanDTO servicePlaneDTO, Long id) {
       
        ServicePlanEntity serviceplane = this.servicePlaneRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Service Plan", "id", Long.toString(id)));

        if(servicePlaneDTO.getCalls() != null)
        serviceplane.setCalls(servicePlaneDTO.getCalls());
        if(servicePlaneDTO.getPrice()!= null)
        serviceplane.setPrice(servicePlaneDTO.getPrice());
        if(servicePlaneDTO.getSms() != null)
        serviceplane.setSms(servicePlaneDTO.getSms());
        if(servicePlaneDTO.getData() != null)
        serviceplane.setData(servicePlaneDTO.getData());
         
        ApiResponse apiResponse =new ApiResponse("Service Plan UPDATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> deleteServicePlane(Long id) {

        ServicePlanEntity serviceplane = this.servicePlaneRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Service Plan", "id", Long.toString(id)));

        this.servicePlaneRepo.delete(serviceplane);

        ApiResponse apiResponse =new ApiResponse("Service Plan DELETED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }



    @Override
    public List<ServicePlanDTO> getAllServicePlans() {
        List<ServicePlanEntity> servicePlanEntities = this.servicePlaneRepo.findAll();

        List <ServicePlanDTO> servicePlanDTOs = servicePlanEntities.stream().map((plan)->this.modelMapper.map(plan, ServicePlanDTO.class)).collect(Collectors.toList());

        return servicePlanDTOs;
    }
    
}
