package edu.kh.laf.product.model.mapper;

import edu.kh.laf.product.model.dto.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {

    /**
     * 상품 번호로 상품 정보 조회
     * @param productNo
     * @return product
     */
    Product selectProduct(Long productNo);

    /**
     * 상품 전체 목록 조회
     * @return productList
     */
    List<Product> selectProductList();

}
