package org.youcode.youquiz.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.youquiz.common.Mapper.GenericMapper;
import org.youcode.youquiz.common.PagedResponse;
import org.youcode.youquiz.common.exceptions.EntityNotFoundException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Validated
public class GenericServiceImpl<T, ID, RequestDto, ResponseDto> implements GenericService<T, ID, RequestDto, ResponseDto> {

    protected JpaRepository<T, ID> repository;
    protected GenericMapper<T, RequestDto, ResponseDto> mapper;

    public GenericServiceImpl(JpaRepository<T, ID> repository, GenericMapper<T, RequestDto, ResponseDto> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public PagedResponse<ResponseDto> getAll(Pageable pageable) {
        Page<T> dtoPage = repository.findAll(pageable);
        List<ResponseDto> dtoList = dtoPage.getContent().stream().map(mapper::toDto).toList();
        return new PagedResponse<>(
                dtoList,
                dtoPage.getNumber(),
                dtoPage.getSize(),
                dtoPage.getTotalElements(),
                dtoPage.getTotalPages(),
                dtoPage.isLast()
        );
    }

    @Override
    public ResponseDto getById(ID id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Entity with Id " + id + " not found"));
    }

    @Override
    public ResponseDto create(RequestDto requestDto) {
        T entity = mapper.toEntity(requestDto);
        T savedEntity = repository.save(entity);
        return mapper.toDto(savedEntity);
    }

    @Override
    public ResponseDto update(ID id, RequestDto requestDto) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Entity with Id " + id + " not found");
        }
        T entity = mapper.toEntity(requestDto);
        T updatedEntity = repository.save(entity);
        return mapper.toDto(updatedEntity);
    }

    @Override
    public void delete(ID id) {
        T entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity with Id " + id + " not found"));
        repository.delete(entity);
    }
}
