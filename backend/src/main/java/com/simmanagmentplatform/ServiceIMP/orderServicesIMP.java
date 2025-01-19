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

import com.simmanagmentplatform.Dto.OrdersDTO;
import com.simmanagmentplatform.Entity.OrdersEntity;
import com.simmanagmentplatform.Entity.ProfileEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.orderRepo;
import com.simmanagmentplatform.Reposiotry.profileRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Response.ApiResponseWithData;
import com.simmanagmentplatform.Services.orderServices;

@Service
public class orderServicesIMP implements orderServices {
    @Autowired
    orderRepo orderRepo;

    @Autowired
    profileRepo profileRepo;
    
    @Autowired
    ModelMapper modelMapper;

    @Override
    public ResponseEntity<ApiResponse> createOrder(OrdersDTO ordersDTO,Long profile_id) {

        ordersDTO.setProfile_id(profile_id);
        OrdersEntity ordersEntity = this.dtoToEntity(ordersDTO);

        ordersEntity.setOrderDate(new Date());
        ordersEntity.setOrderStatus("KYC PENDING");

        OrdersDTO savOrdersDTO =entityToDto(this.orderRepo.save(ordersEntity));
        ApiResponseWithData<OrdersDTO> apiResponseWithData =new ApiResponseWithData<>("Order CREATED", true, savOrdersDTO);

        return new ResponseEntity<>(apiResponseWithData, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<ApiResponse> updateOrder(Long id, OrdersDTO ordersDTO) {
        OrdersEntity ordersEntity = this.orderRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Order", "id", Long.toString(id)));

        Optional.ofNullable(ordersDTO.getDeliveryAddress()).ifPresent(ordersEntity::setDeliveryAddress);
        Optional.ofNullable(ordersDTO.getDeliveryDate()).ifPresent(ordersEntity::setDeliveryDate);
        Optional.ofNullable(ordersDTO.getOrderDate()).ifPresent(ordersEntity::setOrderDate);
        Optional.ofNullable(ordersDTO.getOrderStatus()).ifPresent(ordersEntity::setOrderStatus);
        Optional.ofNullable(ordersDTO.getAmount()).ifPresent(ordersEntity::setAmount);
        Optional.ofNullable(ordersDTO.getOrderStatus()).ifPresent(ordersEntity::setOrderStatus);
        Optional.ofNullable(ordersDTO.getRazorpayId()).ifPresent(ordersEntity::setRazorpayId);
        
        Optional.ofNullable(ordersDTO.getProfile_id()).ifPresent(profile_id->{
            ProfileEntity profileEntity = this.profileRepo.findById(profile_id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(profile_id)));
            ordersEntity.setProfileEntity(profileEntity);;
        });

        this.orderRepo.save(ordersEntity);

        ApiResponse apiResponse =new ApiResponse("Order Updated", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public OrdersDTO getOrderById(Long id) {
        OrdersEntity ordersEntity = this.orderRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Order", "id", Long.toString(id)));

        return this.entityToDto(ordersEntity);
    }

    @Override
    public OrdersDTO getOrderBtRazorpayId(String raz_id) {

        OrdersEntity ordersEntity = this.orderRepo.findOneByRazorpayId(raz_id).orElseThrow(()-> new ResourseNotFoundException("Order", "id", raz_id));

        return this.entityToDto(ordersEntity);
    }

    @Override
    public OrdersDTO getOrderByProfileId(Long profile_id){
        ProfileEntity profileEntity = this.profileRepo.findById(profile_id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(profile_id)));

        OrdersDTO ordersDTO =this.entityToDto(this.orderRepo.findByProfileEntity(profileEntity).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(profile_id))));
        
        return ordersDTO;
    }

    @Override
    public List<OrdersDTO> getAllOrders() {

        List<OrdersEntity> ordersEntities = this.orderRepo.findAll();
        if (ordersEntities.isEmpty()) {
         throw new ResourseNotFoundException("Orders", null, null);
        }
       List<OrdersDTO> ordersDTOs = ordersEntities.stream().map((order) -> this.entityToDto(order)).collect(Collectors.toList());

       return ordersDTOs;
    }

    @Override
    public List<OrdersDTO> getOrdersByStatus(String status) {
        List<OrdersEntity> ordersEntities = this.orderRepo.findByOrderStatus(status);
        if (ordersEntities.isEmpty()) {
         throw new ResourseNotFoundException("Orders", null, null);
        }
       List<OrdersDTO> ordersDTOs = ordersEntities.stream().map((order) -> this.entityToDto(order)).collect(Collectors.toList());
       
       return ordersDTOs;
    }

    @Override
    public ResponseEntity<ApiResponse> deleteOrder(Long id) {
        OrdersEntity ordersEntity = this.orderRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Order", "id", Long.toString(id)));

        this.orderRepo.delete(ordersEntity);
        ApiResponse apiResponse =new ApiResponse("Order Deleted", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);

    }

    //..............................................................................................

    private OrdersDTO entityToDto(OrdersEntity ordersEntity)
    {
        OrdersDTO ordersDTO = this.modelMapper.map(ordersEntity, OrdersDTO.class);

        Optional.ofNullable(ordersEntity.getProfileEntity()).ifPresent(profile->{
            ordersDTO.setProfile_id(profile.getId());
        });

        return ordersDTO;
    }
    
    private OrdersEntity dtoToEntity(OrdersDTO ordersDTO)
    {
        OrdersEntity ordersEntity = this.modelMapper.map(ordersDTO, OrdersEntity.class);

        Optional.ofNullable(ordersDTO.getProfile_id()).ifPresent(profile_id->{
            ProfileEntity profileEntity = this.profileRepo.findById(profile_id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(profile_id)));
            ordersEntity.setProfileEntity(profileEntity);;
        });

        return ordersEntity;
    }
    
}
