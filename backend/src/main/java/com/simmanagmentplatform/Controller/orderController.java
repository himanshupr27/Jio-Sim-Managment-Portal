package com.simmanagmentplatform.Controller;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.*;
import com.simmanagmentplatform.Dto.OrdersDTO;
import com.simmanagmentplatform.Services.orderServices;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
// @CrossOrigin("http://localhost:5173")
@CrossOrigin(origins = "*")
@RequestMapping("/api/order")
public class orderController {

    @Autowired
    orderServices orderServices;

    @PostMapping("/create_order")
    public String createOrder(@RequestBody Map<String, Object> data) throws Exception {
        int amount = (int) data.get("amount");
        System.out.println(data);
        // System.out.println("payment initiated");
        var client = new RazorpayClient("rzp_test_VtabkGRGa9SEhd", "675RezP9uZy5Acc8BP2TPNeE");
        JSONObject ob = new JSONObject();
        ob.put("amount",amount*100);
        ob.put("currency","INR");
        ob.put("receipt","txn_235425");
        Order order = client.orders.create(ob);
        System.out.println(order);
        System.out.println(order.toString());
        return order.toString();
    }

    @PostMapping("/create_order/profile/{id}")
    public ResponseEntity<?> createOrderForUser(@RequestBody OrdersDTO ordersDTO,@PathVariable Long id) {
        return this.orderServices.createOrder(ordersDTO, id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> UpdateOrders(@RequestBody OrdersDTO ordersDTO,@PathVariable Long id) {

        return this.orderServices.updateOrder(id, ordersDTO);
    }

    @GetMapping("/get_all_ordes")
    public List<OrdersDTO> getAllOrders() {
        return this.orderServices.getAllOrders();
    }

    @GetMapping("/get_By_Id/{id}")
    public OrdersDTO getOrdersById(@PathVariable Long id) {
        return this.orderServices.getOrderById(id);
    }

    @GetMapping("/get_By_status")
    public List<OrdersDTO> getOrdersByStatus(@RequestParam String status) {
        return this.orderServices.getOrdersByStatus(status);
    }
    @GetMapping("/get_By_razorpayId")
    public OrdersDTO getOrderBypaymentId(@RequestParam String razorpayId) {
        return this.orderServices.getOrderBtRazorpayId(razorpayId);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id)
    {
        return this.orderServices.deleteOrder(id);
    }
}
