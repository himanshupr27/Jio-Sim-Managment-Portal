package com.simmanagmentplatform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.simmanagmentplatform.Dto.ProfileDTO;
import com.simmanagmentplatform.Services.profileServices;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user/profile")
public class profileController {

    @Autowired
    profileServices profileServices;

     @GetMapping("/get/{id}")
    public ProfileDTO getAllServicePlanById(@PathVariable Long id) {
        
        return this.profileServices.getProfileById(id);
    }
    
    @GetMapping("/get/all")
    public List<ProfileDTO> getAllProfileDTOs() {
        return this.profileServices.getAllProfile();
    }
    
    @PostMapping("/user/{id}/create")
    public ResponseEntity<?> createProfileEntity(@RequestBody ProfileDTO profileDTO,@PathVariable Long id) {
        
        return this.profileServices.createProfile(profileDTO,id);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateProfiles(@PathVariable Long id, @RequestBody ProfileDTO profileDTO) {

        return this.profileServices.updateProfile(profileDTO, id);
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteProfiles(@PathVariable Long id)
    {
        return this.profileServices.deleteProfile(id);
    }
}
