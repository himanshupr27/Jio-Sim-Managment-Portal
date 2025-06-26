// package com.simmanagmentplatform.Controller;

// import java.io.FileNotFoundException;
// import java.io.IOException;
// import java.io.InputStream;
// import java.util.List;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.util.StreamUtils;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// import com.simmanagmentplatform.Dto.EkycDTO;
// import com.simmanagmentplatform.Response.ApiResponse;
// import com.simmanagmentplatform.Services.FileServices;
// import com.simmanagmentplatform.Services.eKycServices;

// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;




// @RestController
// // @CrossOrigin("http://localhost:5173")
// @CrossOrigin(origins = "*")
// @RequestMapping("/api/kyc_record")
// public class eKycController {

//     @Autowired
//     eKycServices eKycServices;

//     @Autowired
//     FileServices fileServices;

//     @PostMapping("/create/profile/{id}")
//     public ResponseEntity<ApiResponse> createRecord(@RequestBody EkycDTO ekycDTO,@PathVariable Long id) {
        
//         return this.eKycServices.createEkycRecord(ekycDTO,id);
//     }

//     @PutMapping("update/{id}")
//     public ResponseEntity<ApiResponse> updateRecord(@PathVariable Long id, @RequestBody EkycDTO ekycDTO) {
    
//         return this.eKycServices.UpdateEkycRecord(ekycDTO, id);
//     }

//     @DeleteMapping("delete/{id}")
//     public ResponseEntity<?> deleteRecord(@PathVariable Long id)
//     {
//         return this.eKycServices.deleteEkycRecord(id);
//     }

//     @GetMapping("/get_all")
//     public List<EkycDTO> getAllRecord() {
//         return this.eKycServices.getAllEkycRecord();
//     }

//     @GetMapping("/get/{id}")
//     public EkycDTO getRecordById(@PathVariable Long id) {
//         return this.eKycServices.getEkycRecordById(id);
//     }

//     @GetMapping("/get_by_status")
//     public List<EkycDTO> getMethodName(@RequestParam String status) {
//         return this.eKycServices.getEkycRecordByStatus(status);
//     }
    
//     @PostMapping("profile/{id}/upload_images")
//     public ResponseEntity<ApiResponse> uploadImages(@PathVariable Long id,
//     @RequestParam MultipartFile profilepic,@RequestParam MultipartFile panpic,@RequestParam MultipartFile addresspic
//     ) throws IOException {
//         EkycDTO ekycDTO = this.eKycServices.getEkycRecordByProfileId(id);
//         ekycDTO.setProfilepic(this.fileServices.uploadResourse(profilepic));
//         ekycDTO.setPanpic(this.fileServices.uploadResourse(panpic));
//         ekycDTO.setAddressproofpic(this.fileServices.uploadResourse(addresspic));
//         return this.updateRecord(ekycDTO.getId(), ekycDTO);
//     }

//     @PutMapping("profile/{id}/upload_video")
//     public ResponseEntity<ApiResponse> putMethodName(@PathVariable Long id, @RequestParam MultipartFile video) throws IOException {
//         EkycDTO ekycDTO = this.eKycServices.getEkycRecordByProfileId(id);
//         ekycDTO.setVideo(this.fileServices.uploadResourse(video));
//         ekycDTO.setKycstatus("APROVAL PENDING");
//         return this.updateRecord(ekycDTO.getId(), ekycDTO);
//     }
//     // @GetMapping("/get_files")
//     // public byte[] postMethodName(@RequestParam String fileName, HttpServletResponse Response) throws FileNotFoundException, IOException {
//     //     InputStream resourse=this.fileServices.getResources(fileName);
//     //     Response.setContentType(MediaType.IMAGE_JPEG_VALUE);
//     //     return StreamUtils.copyToByteArray(resourse);
//     // }
//     @GetMapping("/get_files")
//     public ResponseEntity<byte[]> postMethodName(@RequestParam String fileName, HttpServletResponse Response) throws FileNotFoundException, IOException {
//         InputStream resource=this.fileServices.getResources(fileName);
//         byte[] bytes = StreamUtils.copyToByteArray(resource);
//             return ResponseEntity.ok()
//                     .contentType(MediaType.parseMediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE))
//                     .body(bytes);
//     }
    
    
// }
