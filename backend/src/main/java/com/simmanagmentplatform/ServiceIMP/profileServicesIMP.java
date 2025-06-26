package com.simmanagmentplatform.ServiceIMP;


import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.ProfileDTO;
// import com.simmanagmentplatform.Entity.EkycEntity;
import com.simmanagmentplatform.Entity.OrdersEntity;
import com.simmanagmentplatform.Entity.ProfileEntity;
import com.simmanagmentplatform.Entity.SimDetailsEntity;
import com.simmanagmentplatform.Entity.UsersEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
// import com.simmanagmentplatform.Reposiotry.eKycRepo;
import com.simmanagmentplatform.Reposiotry.orderRepo;
import com.simmanagmentplatform.Reposiotry.profileRepo;
import com.simmanagmentplatform.Reposiotry.simRepo;
import com.simmanagmentplatform.Reposiotry.userRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Response.ApiResponseWithData;
import com.simmanagmentplatform.Services.profileServices;

@Service
public class profileServicesIMP implements profileServices {

    @Autowired
    profileRepo profileRepo;

    // @Autowired
    // eKycRepo eKycRepo;

    @Autowired
    userRepo userRepo;

    @Autowired
    orderRepo orderRepo;

    @Autowired
    simRepo simRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ResponseEntity<ApiResponse> createProfile(ProfileDTO profileDTO,Long id) {

        profileDTO.setUser_id(id);
        ProfileEntity profileEntity = this.dtoToEntity(profileDTO);
        profileEntity = this.profileRepo.save(profileEntity);
        ProfileDTO profileDTO2=this.entityToDto(profileEntity);

        ApiResponseWithData<ProfileDTO> apiResponseWithData =
            new ApiResponseWithData<>("Profile CREATED", true, profileDTO2);

        return new ResponseEntity<>(apiResponseWithData, HttpStatus.OK);
    }

    @Override
    public List<ProfileDTO> getAllProfile() {

        List<ProfileEntity> profileEntits = this.profileRepo.findAll();

        List<ProfileDTO> profileDTOs = profileEntits.stream().map(this::entityToDto).collect(Collectors.toList());

        return profileDTOs;
        
    }

    @Override
    public ProfileDTO getProfileById(Long id) {

        ProfileEntity profileEntity = this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(id)));

        return entityToDto(profileEntity);
    }

    @Override
    public ResponseEntity<?> deleteProfile(Long id) {
        ProfileEntity profileEntity = this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(id)));

        this.profileRepo.delete(profileEntity);

        ApiResponse apiResponse =new ApiResponse("Profile DELETED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse> updateProfile(ProfileDTO profileDTO, Long id) {

        ProfileEntity profileEntity = this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(id)));

        Optional.ofNullable(profileDTO.getFirstName()).ifPresent(profileEntity::setFirstName);
        Optional.ofNullable(profileDTO.getLastName()).ifPresent(profileEntity::setLastName);
        Optional.ofNullable(profileDTO.getEmailId()).ifPresent(profileEntity::setEmailId);
        Optional.ofNullable(profileDTO.getDob()).ifPresent(profileEntity::setDob);
        Optional.ofNullable(profileDTO.getGender()).ifPresent(profileEntity::setGender);
        Optional.ofNullable(profileDTO.getAddress()).ifPresent(profileEntity::setAddress);
        // Optional.ofNullable(profileDTO.getEkyc_id()).ifPresent(ekyc_id->{
        //     EkycEntity ekycEntity=this.eKycRepo.findById(ekyc_id).orElseThrow(()-> new ResourseNotFoundException("eKYC RECORD", "id", Long.toString(ekyc_id)));;
        //     profileEntity.setEkycEntity(ekycEntity);
        // });
        Optional.ofNullable(profileDTO.getSim_id()).ifPresent(sim_id->{
            SimDetailsEntity simDetailsEntity=this.simRepo.findById(sim_id).orElseThrow(()-> new ResourseNotFoundException("SIM", "id", Long.toString(sim_id)));;
             profileEntity.setSimDetailsEntity(simDetailsEntity);;
             
         });
        Optional.ofNullable(profileDTO.getUser_id()).ifPresent(user_id->{
            UsersEntity usersEntity = this.userRepo.getReferenceById(user_id);
            profileEntity.setUsersEntity(usersEntity);
        });
        Optional.ofNullable(profileDTO.getOreder_id()).ifPresent(order_id->{
            OrdersEntity ordersEntity = this.orderRepo.findById(order_id).orElseThrow(()-> new ResourseNotFoundException("Order", "id", Long.toString(order_id)));;
            profileEntity.setOrdersEntity(ordersEntity);
        });

        profileRepo.save(profileEntity);

        ApiResponse apiResponse =new ApiResponse("Profile UPDATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }



    //..............................................................................................
    
    private ProfileEntity dtoToEntity(ProfileDTO profileDTO){

        ProfileEntity profileEntity =this.modelMapper.map(profileDTO, ProfileEntity .class);
       
        // Optional.ofNullable(profileDTO.getEkyc_id()).ifPresent(ekyc_id->{
        //     EkycEntity ekycEntity=this.eKycRepo.findById(ekyc_id).orElseThrow(()-> new ResourseNotFoundException("eKYC RECORD", "id", Long.toString(ekyc_id)));;
        //     profileEntity.setEkycEntity(ekycEntity);
            
        // });
       
        Optional.ofNullable(profileDTO.getSim_id()).ifPresent(sim_id->{
           SimDetailsEntity simDetailsEntity=this.simRepo.findById(sim_id).orElseThrow(()-> new ResourseNotFoundException("SIM", "id", Long.toString(sim_id)));
            profileEntity.setSimDetailsEntity(simDetailsEntity);
            
        });
        
        Optional.ofNullable(profileDTO.getUser_id()).ifPresent(user_id->{
            UsersEntity usersEntity = this.userRepo.findById(user_id).orElseThrow(()-> new ResourseNotFoundException("User", "id", Long.toString(user_id)));;;
            profileEntity.setUsersEntity(usersEntity);
        });

        Optional.ofNullable(profileDTO.getOreder_id()).ifPresent(order_id->{
            OrdersEntity ordersEntity = this.orderRepo.findById(order_id).orElseThrow(()-> new ResourseNotFoundException("Order", "id", Long.toString(order_id)));;
            profileEntity.setOrdersEntity(ordersEntity);
        });

        return profileEntity;
    }
    
    private ProfileDTO entityToDto(ProfileEntity profileEntity){

        ProfileDTO profileDTO = this.modelMapper.map(profileEntity, ProfileDTO.class);

        // Optional.ofNullable(profileEntity.getEkycEntity()).ifPresent(ekycEntity->profileDTO.setEkyc_id(ekycEntity.getId()));

        Optional.ofNullable(profileEntity.getSimDetailsEntity()).ifPresent(simEntity->profileDTO.setSim_id(simEntity.getSim_id()));

        Optional.ofNullable(profileEntity.getUsersEntity()).ifPresent(userEntity -> profileDTO.setUser_id(userEntity.getId()));

        Optional.ofNullable(profileEntity.getOrdersEntity()).ifPresent(orderEntity-> profileDTO.setOreder_id(orderEntity.getId()));
        
        return profileDTO;
    }
}
