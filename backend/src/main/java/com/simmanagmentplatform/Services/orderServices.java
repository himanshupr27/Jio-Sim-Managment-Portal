package com.simmanagmentplatform.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.simmanagmentplatform.Dto.OrdersDTO;
import com.simmanagmentplatform.Response.ApiResponse;

public interface orderServices {

    public ResponseEntity<ApiResponse> createOrder(OrdersDTO ordersDTO,Long profile_id);
    public ResponseEntity<ApiResponse> updateOrder(Long id,OrdersDTO ordersDTO);
    public OrdersDTO getOrderById(Long id);
    public OrdersDTO getOrderByProfileId(Long profile_id);
    public OrdersDTO getOrderBtRazorpayId(String raz_id);
    public List<OrdersDTO> getAllOrders();
    public List<OrdersDTO> getOrdersByStatus(String status);
    public ResponseEntity<ApiResponse> deleteOrder(Long id);
}
     