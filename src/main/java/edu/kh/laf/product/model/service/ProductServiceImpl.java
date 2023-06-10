package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.mapper.ProductMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductMapper mapper;

    public ProductServiceImpl(ProductMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * 상품 번호로 상품 정보 조회
     * @param productNo
     * @return product
     */
    @Override
    public Product selectProduct(long productNo) {
        return mapper.selectProduct(productNo);
    }

    /**
     * 상품 전체 목록 조회
     * @return productList
     */
    @Override
    public List<Product> selectProductList() {
        return mapper.selectProductList();
    }

}
