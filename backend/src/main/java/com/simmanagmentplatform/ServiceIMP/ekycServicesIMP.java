package com.simmanagmentplatform.ServiceIMP;

// import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.EkycDTO;
import com.simmanagmentplatform.Entity.EkycEntity;
import com.simmanagmentplatform.Entity.ProfileEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.eKycRepo;
import com.simmanagmentplatform.Reposiotry.profileRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.eKycServices;


@Service
public class ekycServicesIMP implements eKycServices {

    @Autowired
    private eKycRepo ekycRepo;

    @Autowired
    private profileRepo profileRepo;

     @Autowired
    private ModelMapper modelMapper;



    @Override
    public ResponseEntity<ApiResponse> createEkycRecord(EkycDTO ekycDTO,Long profile_id) {
        ekycDTO.setProfile_id(profile_id);
        EkycEntity entity = convertToEntity(ekycDTO);
        ekycRepo.save(entity);
        ApiResponse apiResponse =new ApiResponse("KYC Record CREATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse> UpdateEkycRecord(EkycDTO ekycDTO, Long id) {

        EkycEntity entity = ekycRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("KYC RECORD", "id", Long.toString(id)));

        Optional.ofNullable(ekycDTO.getPan()).ifPresent(entity::setPan);
        Optional.ofNullable(ekycDTO.getAadhar()).ifPresent(entity::setAadhar);
        Optional.ofNullable(ekycDTO.getProfilepic()).ifPresent(entity::setProfilepic);
        Optional.ofNullable(ekycDTO.getPanpic()).ifPresent(entity::setPanpic);
        Optional.ofNullable(ekycDTO.getAddressproofpic()).ifPresent(entity::setAddressproofpic);
        Optional.ofNullable(ekycDTO.getKycstatus()).ifPresent(entity::setKycstatus);
        Optional.ofNullable(ekycDTO.getVideo()).ifPresent(entity::setVideo);
        Optional.ofNullable(ekycDTO.getProfile_id()).ifPresent(profile_id->{
            ProfileEntity profileEntity =this.profileRepo.findById(profile_id).orElseThrow(()-> new ResourseNotFoundException("PROFILE", "id", Long.toString(profile_id)));
            entity.setProfileEntity(profileEntity);
        });

        ekycRepo.save(entity);

        ApiResponse apiResponse =new ApiResponse("KYC Record UPDATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse> deleteEkycRecord(Long id) {
        EkycEntity entity = ekycRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("KYC RECORD", "id", Long.toString(id)));

        ekycRepo.delete(entity);

        ApiResponse apiResponse =new ApiResponse("KYC Record DELETED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public EkycDTO getEkycRecordById(Long id) {

        EkycEntity entity = ekycRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("KYC RECORD", "id", Long.toString(id)));

        return convertToDto(entity);
    }
    @Override
    public EkycDTO getEkycRecordByProfileId(Long id){
        ProfileEntity profileEntity =this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("PROFILE", "id", Long.toString(id)));
        EkycEntity ekycEntity = this.ekycRepo.findByProfileEntity(profileEntity);
        return this.convertToDto(ekycEntity);
    }

    @Override
    public List<EkycDTO> getEkycRecordByStatus(String status) {
        List<EkycEntity> entities = ekycRepo.findByKycstatus(status);
        if (entities.isEmpty()) {
            throw new ResourseNotFoundException("KYC RECORD", null, null);
        }
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<EkycDTO> getAllEkycRecord() {
        List<EkycEntity> entities = this.ekycRepo.findAll();

        if (entities.isEmpty()) {
            throw new ResourseNotFoundException("KYC RECORD", null, null);
        }
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }



    //..............................................................................................

private EkycDTO convertToDto(EkycEntity entity) {
    EkycDTO ekycDTO =this.modelMapper.map(entity,EkycDTO.class);
    Long profileEntityId = entity.getProfileEntity() != null ? entity.getProfileEntity().getId() : null;
    ekycDTO.setProfile_id(profileEntityId);

    return ekycDTO;
}

    private EkycEntity convertToEntity(EkycDTO dto) {
        EkycEntity entity = this.modelMapper.map(dto,EkycEntity.class);

        if(dto.getProfile_id()!=null)
        {
            ProfileEntity profileEntity =this.profileRepo.findById(dto.getProfile_id()).orElseThrow(()-> new ResourseNotFoundException("PROFILE", "id", Long.toString(dto.getProfile_id())));
            entity.setProfileEntity(profileEntity);
        }
        return entity;
    }



}
