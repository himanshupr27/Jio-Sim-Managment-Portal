package com.simmanagmentplatform.ServiceIMP;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.GetAllResponse;
import com.simmanagmentplatform.Dto.ProfileDTO;
import com.simmanagmentplatform.Dto.UsersDTO;
import com.simmanagmentplatform.Entity.Roles;
import com.simmanagmentplatform.Entity.UsersEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.roleRepo;
import com.simmanagmentplatform.Reposiotry.userRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Response.ApiResponseWithData;
import com.simmanagmentplatform.Services.userServices;

@Service
public class userServiceIMP implements userServices {

    @Autowired
    private userRepo userRepo;

    @Autowired
    private roleRepo roleRepo;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;




    // Create a new User 
  
    @Override
    public ResponseEntity<ApiResponse> createUser(UsersDTO usersDTO) {

    Optional<UsersEntity> userByAadhar = this.userRepo.findByaadharNumber(usersDTO.getAadharNumber());
    Optional<UsersEntity> userByPhone = this.userRepo.findByPhoneNumber(usersDTO.getPhoneNumber());

    if (userByAadhar.isPresent()) {
        return new ResponseEntity<>(new ApiResponse("Aadhar Number Already Exists", false), HttpStatus.BAD_REQUEST);
    }

    if (userByPhone.isPresent()) {
        return new ResponseEntity<>(new ApiResponse("Phone Number Already Exists", false), HttpStatus.BAD_REQUEST);
    }

    UsersDTO savedUsersDTO = entityToDto(this.userRepo.save(dtoToEntity(usersDTO)));

    ApiResponseWithData<UsersDTO> apiResponseWithData =
            new ApiResponseWithData<>("User Created", true, savedUsersDTO);

    return new ResponseEntity<>(apiResponseWithData, HttpStatus.CREATED);
}



    // Get all users with pagination
    @Override
    public GetAllResponse<UsersDTO> getAllUsers(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<UsersEntity> userPage = this.userRepo.findAll(pageable);

        if (userPage.isEmpty()) {
            throw new ResourseNotFoundException("User ", null, null);
        }

        List<UsersDTO> usersDTOs = userPage.getContent()
            .stream()
            .map(this::entityToDto)
            .collect(Collectors.toList());

        GetAllResponse<UsersDTO> response = new GetAllResponse<>();
        response.setContent(usersDTOs);
        response.setTotalElements(userPage.getTotalElements());
        response.setTotalpages(userPage.getTotalPages());
        response.setPageNumber(userPage.getNumber());
        response.setPageSize(userPage.getSize());
        response.setLastPage(userPage.isLast());

        return response;
    }

    // Get a single user by ID
    @Override
    public UsersDTO getUserById(Long id) {
        UsersEntity userEntity = this.userRepo.findById(id)
            .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));

        
        return entityToDto(userEntity);
    }

    @Override
    public UsersDTO getUserByAadharNumber(String aadharNumber)
    {
        UsersEntity userEntity = this.userRepo.findByaadharNumber(aadharNumber)
        .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", aadharNumber));
    return entityToDto(userEntity);
    }

    @Override
    public UsersDTO getUserByPhoneNumber(String phoneNumber)
    {
        UsersEntity userEntity = this.userRepo.findByPhoneNumber(phoneNumber)
        .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", phoneNumber));
    return entityToDto(userEntity);
    }

    // Delete a user by ID
    @Override
    public ResponseEntity<ApiResponse> deleteUser(Long id) {
        UsersEntity userEntity = this.userRepo.findById(id)
            .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));

        this.userRepo.delete(userEntity);

        ApiResponse apiResponse = new ApiResponse("User  Deleted Successfully", true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // Update a user's details
    @Override
    public ResponseEntity<ApiResponse> updateUser(UsersDTO usersDTO, Long id) {
        UsersEntity userEntity = this.userRepo.findById(id)
            .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));

        // Update user fields
        userEntity.setAadharNumber(usersDTO.getAadharNumber());
        userEntity.setPhoneNumber(usersDTO.getPhoneNumber());

        this.userRepo.save(userEntity);

        ApiResponse apiResponse = new ApiResponse("User  Updated Successfully", true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // --------------------------------------------------------------------------------------------------
    // Helper Methods

    // Convert from Entity to DTO
    private UsersDTO entityToDto(UsersEntity userEntity) {
    UsersDTO usersDTO = modelMapper.map(userEntity, UsersDTO.class);

    if (userEntity.getProfile() != null) {
        ProfileDTO profileDTO = modelMapper.map(userEntity.getProfile(), ProfileDTO.class);
        usersDTO.setProfile(profileDTO);
    }

    if (userEntity.getRole() != null) {
        usersDTO.setRole_id(userEntity.getRole().getId());
    }

    return usersDTO;
}


    // Convert from DTO to Entity
    private UsersEntity dtoToEntity(UsersDTO usersDTO) {
        UsersEntity usersEntity = modelMapper.map(usersDTO, UsersEntity.class);
      
        Roles role = this.roleRepo.findById(usersDTO.getRole_id()) .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(usersDTO.getRole_id())));
        
        usersEntity.setRole(role);

        return usersEntity;
    }
}
