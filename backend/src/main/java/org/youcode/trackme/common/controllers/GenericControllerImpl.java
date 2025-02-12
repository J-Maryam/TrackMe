package org.youcode.trackme.common.controllers;

import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.youcode.trackme.common.ApiResponse;
import org.youcode.trackme.common.PagedResponse;
import org.youcode.trackme.common.services.GenericService;

public abstract class GenericControllerImpl<T, ID, RequestDto, ResponseDto> implements GenericController<ID, RequestDto, ResponseDto> {

    protected GenericService<T, ID, RequestDto, ResponseDto> service;

    public GenericControllerImpl(GenericService<T, ID, RequestDto, ResponseDto> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<ApiResponse<PagedResponse<ResponseDto>>> getAll(Pageable pageable) {
        PagedResponse<ResponseDto> response = service.getAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(response, "Data retrieved successfully"));
    }

    @Override
    public ResponseEntity<ApiResponse<ResponseDto>> getById(ID id) {
        ResponseDto dto = service.getById(id);
        return ResponseEntity.ok(ApiResponse.success(dto, "Item retrieved successfully"));
    }

    @Override
    public ResponseEntity<ApiResponse<ResponseDto>> create(@RequestBody @Valid RequestDto requestDto) {
        ResponseDto createdDto = service.create(requestDto);
        return ResponseEntity.ok(ApiResponse.success(createdDto, "Item created successfully"));
    }

    @Override
    public ResponseEntity<ApiResponse<ResponseDto>> update(ID id, RequestDto requestDto) {
        ResponseDto updatedDto = service.update(id, requestDto);
        return ResponseEntity.ok(ApiResponse.success(updatedDto, "Item updated successfully"));
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> delete(ID id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Item deleted successfully"));
    }
}