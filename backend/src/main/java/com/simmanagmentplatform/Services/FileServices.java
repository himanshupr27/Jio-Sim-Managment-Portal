package com.simmanagmentplatform.Services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileServices {
    
    public String uploadResourse(MultipartFile file) throws IOException;
    public InputStream getResources(String filename) throws FileNotFoundException, IOException;
}
