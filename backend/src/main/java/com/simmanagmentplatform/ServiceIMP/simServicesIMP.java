package com.simmanagmentplatform.ServiceIMP;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.SimDetailsDTO;
import com.simmanagmentplatform.Entity.ProfileEntity;
import com.simmanagmentplatform.Entity.SimDetailsEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.profileRepo;
import com.simmanagmentplatform.Reposiotry.servicePlaneRepo;
import com.simmanagmentplatform.Reposiotry.simRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.simServices;

@Service
public class simServicesIMP implements simServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private simRepo simRepo;


    @Autowired
    profileRepo profileRepo;

    @Autowired
    servicePlaneRepo servicePlaneRepo;



    
    @Override
    public ResponseEntity<?> createSimData(SimDetailsDTO simDetailsDTO) {
        SimDetailsEntity simDetailsEntity = dtoToEntity(simDetailsDTO);
        simDetailsEntity.setAddDate(new Date());
        simDetailsEntity.setAvailable(true);
        simRepo.save(simDetailsEntity);
        ApiResponse apiResponse = new ApiResponse("SIM CREATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);

    }




    @Override
    public SimDetailsDTO updateSimData(SimDetailsDTO simDetailsDTO, Long id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(id)));

                Optional.ofNullable(simDetailsDTO.getCIID()).ifPresent(simDetailsEntity::setCIID);
                Optional.ofNullable(simDetailsDTO.getIMSI()).ifPresent(simDetailsEntity::setIMSI);
                Optional.ofNullable(simDetailsDTO.getSimNumber()).ifPresent(simDetailsEntity::setSimNumber);
                Optional.ofNullable(simDetailsDTO.getServicePlanEntity()).ifPresent(simDetailsEntity::setServicePlanEntity);
                Optional.ofNullable(simDetailsDTO.getStatus()).ifPresent(simDetailsEntity::setStatus);
                Optional.ofNullable(simDetailsDTO.getProfileName()).ifPresent(simDetailsEntity::setProfileName);
                Optional.ofNullable(simDetailsDTO.getAvailable()).ifPresent(simDetailsEntity::setAvailable);
                
                Optional.ofNullable(simDetailsDTO.getProfile_id()).ifPresent(profile_id -> {
                    ProfileEntity profileEntity = this.profileRepo.getReferenceById(profile_id);
                    simDetailsEntity.setProfileEntity(profileEntity);
                });

        this.simRepo.save(simDetailsEntity);

        return this.entityToDto(simDetailsEntity);
    }





    @Override
    public ResponseEntity<?> allocateSimToProfile(Long sim_id,Long profile_id){

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(sim_id).orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(sim_id)));
         
        ProfileEntity profileEntity = this.profileRepo.findById(profile_id).orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(profile_id)));

        simDetailsEntity.setIssueDate(new Date());
        simDetailsEntity.setAvailable(false);
        simDetailsEntity.setStatus("Active");
        simDetailsEntity.setProfileEntity(profileEntity);

        this.simRepo.save(simDetailsEntity);

        ApiResponse apiResponse = new ApiResponse("SIM ALLOTED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }



    @Override
    public ResponseEntity<?> deleteSimData(Long id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(id)));

        this.simRepo.delete(simDetailsEntity);

        ApiResponse apiResponse = new ApiResponse("SIM Deleted", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }




    @Override
    public List<SimDetailsDTO> getAllSimsData() {

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findAll();
        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", null, null);
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim)).collect(Collectors.toList());

        return simDetailsDTOs;
    }




    @Override
    public List<SimDetailsDTO> getAllSimsDataByStatus(String status) {

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findByStatus(status);
        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", "status", status);
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim))
                .collect(Collectors.toList());

        return simDetailsDTOs;
    }



    @Override
    public List<SimDetailsDTO> getAllSimsDataByAvailablity(Boolean available) {

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findByAvailable(available);
        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", null, null);
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim))
                .collect(Collectors.toList());

        return simDetailsDTOs;
    }
   


    @Override
    public SimDetailsDTO getSimsDataById(Long id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(id)));

        return this.entityToDto(simDetailsEntity);
    }






    // ................................................................................................

    private SimDetailsDTO entityToDto(SimDetailsEntity simDetailsEntity) {
        SimDetailsDTO simDetailsDTO = this.modelMapper.map(simDetailsEntity, SimDetailsDTO.class);

            Optional.ofNullable(simDetailsEntity.getProfileEntity()).ifPresent(profile-> simDetailsDTO.setProfile_id(profile.getId()));
        return simDetailsDTO;
    }
    
    private SimDetailsEntity dtoToEntity (SimDetailsDTO simDetailsDTO){
        SimDetailsEntity simDetailsEntity = this.modelMapper.map(simDetailsDTO, SimDetailsEntity.class);
        Optional.ofNullable(simDetailsDTO.getProfile_id()).ifPresent(profile_id -> {
            ProfileEntity profileEntity = this.profileRepo.getReferenceById(profile_id);
            simDetailsEntity.setProfileEntity(profileEntity);
        });

        return simDetailsEntity;
    }




}
