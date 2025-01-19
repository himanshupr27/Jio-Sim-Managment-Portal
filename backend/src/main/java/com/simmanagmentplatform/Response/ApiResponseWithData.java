package com.simmanagmentplatform.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ApiResponseWithData<T> extends ApiResponse {
    private T data;
    public ApiResponseWithData(String message, Boolean status, T data) {
        super(message, status);
        this.data = data;
    }
}
