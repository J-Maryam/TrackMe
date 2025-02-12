package org.youcode.trackme.common.controllers;

import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.ApiResponse;
import org.youcode.trackme.common.PagedResponse;

public interface GenericController<ID, RequestDto, ResponseDto> {
    @GetMapping
    ResponseEntity<ApiResponse<PagedResponse<ResponseDto>>> getAll(Pageable pageable);

    @GetMapping("/{id}")
    ResponseEntity<ApiResponse<ResponseDto>> getById(@PathVariable ID id);

    @PostMapping
    ResponseEntity<ApiResponse<ResponseDto>> create(@RequestBody @Valid RequestDto requestDto);

    @PutMapping("/{id}")
    ResponseEntity<ApiResponse<ResponseDto>> update(@PathVariable ID id, @RequestBody @Valid RequestDto requestDto);

    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<Void>> delete(@PathVariable ID id);
}
