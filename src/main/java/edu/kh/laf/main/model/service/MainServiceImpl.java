package edu.kh.laf.main.model.service;

import edu.kh.laf.main.model.mapper.MainMapper;
import edu.kh.laf.product.model.dto.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainServiceImpl implements MainService {

    private MainMapper mapper;

    public MainServiceImpl(MainMapper mapper) {
        this.mapper = mapper;
    }

//    @Override
//    public List<Product> selectProductList() {
//        return mapper.selectProductList();
//    }
}
