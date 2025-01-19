package com.simmanagmentplatform.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.simmanagmentplatform.Dto.GetAllResponse;
import com.simmanagmentplatform.Dto.UsersDTO;
import com.simmanagmentplatform.Services.userServices;

import jakarta.validation.Valid;

// import jakarta.websocket.server.PathParam;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class userControllers {
    @Autowired
    userServices userservices;

    @GetMapping(value="/getallDetails")
    public GetAllResponse<UsersDTO> getAllUsers(
        @RequestParam (value="PageSize" , defaultValue = "10", required = false) Integer PageSize,
        @RequestParam (value="PageNumber" , defaultValue = "0", required = false) Integer PageNumber) {
        
        return this.userservices.getAllUsers(PageNumber,PageSize);
    }
    @GetMapping("/{id}")
    public UsersDTO  getUserById(@PathVariable long id) {
        
        return this.userservices.getUserById(id);
    }
    @GetMapping("/emailId")
    public UsersDTO  getMethodName(@RequestParam String emailId) {
        return this.userservices.getUserByEmailId(emailId);
    }
    

    @PostMapping("/signup")
    public ResponseEntity<?> createUsers(@Valid @RequestBody UsersDTO users) {
        
        return this.userservices.createUser(users);
    }


    @PutMapping("update/{id}")
    public ResponseEntity<?> updateUsers(@PathVariable long id,@Valid @RequestBody UsersDTO usersDTO) {
    
        return this.userservices.updateUser(usersDTO, id);
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUsers(@PathVariable long id) {

        return this.userservices.deleteUser(id);
    }
    

    
}
