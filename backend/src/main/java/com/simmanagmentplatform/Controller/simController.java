package com.simmanagmentplatform.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simmanagmentplatform.Dto.SimDetailsDTO;
import com.simmanagmentplatform.Services.simServices;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
// @CrossOrigin("http://localhost:5173")
@CrossOrigin(origins = "*")
@RequestMapping("/api/sims")
public class simController {

    @Autowired
    private simServices simServices;

    @PostMapping("/create")
    public ResponseEntity<?> createNewSims(@RequestBody SimDetailsDTO simDetailsDTO) {

        return this.simServices.createSimData(simDetailsDTO);
    }


    @PutMapping("/update/{id}")
    public SimDetailsDTO updateSim(@PathVariable Long id, @Valid @RequestBody SimDetailsDTO simDetailsDTO) {
        
        return this.simServices.updateSimData(simDetailsDTO, id);

    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSim(@PathVariable Long id) {

        return this.simServices.deleteSimData(id);

    }

    @PostMapping("/allote/sim")
    public ResponseEntity<?> alloteSimToProfile(@RequestParam Long sim_id,@RequestParam Long profile_id) {

        return this.simServices.allocateSimToProfile(sim_id, profile_id);
    }
    


    @GetMapping("/get/all")
    public List<SimDetailsDTO> getAllSims() {

        return this.simServices.getAllSimsData();

    }



    @GetMapping("/get/sim/{id}")
    public SimDetailsDTO getSimById(@PathVariable Long id) {

        return this.simServices.getSimsDataById(id);

    }



    @GetMapping("/get/{status}")
    public List<SimDetailsDTO> getSimsByStatus(@PathVariable String status) {

        return this.simServices.getAllSimsDataByStatus(status);

    }
    
    @GetMapping("/get/availablity/{avail}")
    public List<SimDetailsDTO> getSimsByAvailablity(@PathVariable Boolean avail) {
        return this.simServices.getAllSimsDataByAvailablity(avail);

    }


}
