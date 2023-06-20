package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {

	/**
     * 상품 번호로 상품 정보 조회
     * @param productNo
     * @return product
     */
    Product selectProduct(long productNo);
    
    /**
     * 카테고리별 위클리 베스트 상품 목록 조회(갯수제한)
     * @return productList
     */
    List<Product> selectWeeklyBest(int categoryNo, int limit);
    
    /**
     * 카테고리 전체 상품 목록 조회
     * @param map
     * @return productList
     */
    Map<String, Object> selectCategoryProductList(Map<String, Object> map);
    
    /**
     * 카테고리 상품 목록 조회(갯수제한)
     * @return productList
     */
    List<Product> selectCategoryProductList(int categoryNo, int limit);
    
    /**
     * 신규 등록 상품 목록 조회(20개)
     * @return productList
     */
    List<Product> selectNewArrivalProductList();
    
    /**
	 * 개인별 맞춤 상품 추천
	 * @param memberNo
	 * @return productList
	 */
	List<Product> selectPersonalProductList(long memberNo);
	
	/**
	 * 상품별 추천 상품
	 * @param productNo
	 * @return productList
	 */
	List<Product> selectRecommendList(long productNo);
	
	/**
	 * 상품별 검색
	 * @param map 
	 * @return map
	 */
	Map<String, Object> search(Map<String, Object> map);

	/**
	 * 카테고리 이름 조회
	 * @param category
	 * @return categoryName
	 */
	String selectCategoryName(int category);
}