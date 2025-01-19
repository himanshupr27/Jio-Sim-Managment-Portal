package com.simmanagmentplatform.ServiceIMP;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.simmanagmentplatform.Services.FileServices;

@Service
public class FileServicesIMP implements FileServices {

    @Value("${project.images}")
    private String path;

    @Override
    public String uploadResourse(MultipartFile file) throws IOException {
        //File name
        String name=file.getOriginalFilename();

        //random name generate file
        String randomID= UUID.randomUUID().toString();
        String fileName1=randomID.concat(name.substring(name.lastIndexOf(".")));
        
        //Fullpath
        String filePath = path + File.separator + fileName1;

        //create folder if not created
        File f= new File(path);
        if (!f.exists()) {
            f.mkdir();
        }
        //file copy
        Files.copy(file.getInputStream(), Paths.get(filePath));
        return fileName1;

    }

    @Override
    public InputStream getResources(String filename) throws FileNotFoundException {
        
        String fullPath = path + File.separator + filename;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
    
}
