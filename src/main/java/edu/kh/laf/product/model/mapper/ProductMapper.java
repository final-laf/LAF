package edu.kh.laf.product.model.mapper;

import edu.kh.laf.product.model.dto.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {

    /**
     * 상품 번호로 상품 정보 조회
     * @param productNo
     * @return product
     */
    Product selectProduct(Long productNo);

    /**
     * 카테고리별 위클리 베스트 상품 목록 조회
     * @return weeklyBest
     */
    List<Product> selectWeeklyBest(int categoryNo);
    
    /**
     * 카테고리별 상품 목록 조회
     * @return productList
     */
    List<Product> selectCategoryProductList(Map<String, Object> map);

    /**
     * 개인별 맞춤 상품 추천
     * @param memberNo
     * @return productList
     */
	List<Product> selectPersonalProductList(long memberNo);
}
