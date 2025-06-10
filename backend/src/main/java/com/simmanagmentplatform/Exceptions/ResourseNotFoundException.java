package com.simmanagmentplatform.Exceptions;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourseNotFoundException extends RuntimeException {
    String resourceName;
    String fieldName;
    String fielfId;

    public ResourseNotFoundException(String resourceName,String fieldName,String fielfId)
    {
       super("%s not found with %s : %s".formatted(resourceName, fieldName, fielfId));
       this.resourceName=resourceName;
       this.fieldName=fieldName;
       this.fielfId=fielfId;
    }
}
