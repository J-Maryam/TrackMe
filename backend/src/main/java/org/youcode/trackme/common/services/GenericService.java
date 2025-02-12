package org.youcode.youquiz.common.services;

import org.springframework.data.domain.Pageable;
import org.youcode.youquiz.common.PagedResponse;

public interface GenericService <T, ID, RequestDto, ResponseDto>{
    PagedResponse<ResponseDto> getAll(Pageable pageable);
    ResponseDto getById(ID id);
    ResponseDto create(RequestDto requestDto);
    ResponseDto update(ID id, RequestDto requestDto);
    void delete(ID id);
}