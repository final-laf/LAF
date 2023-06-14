package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {

    Product selectProduct(long productNo);
    List<Product> selectWeeklyBest(int categoryNo);
    List<Product> selectCategoryProductList(int categoryNo);
    List<Product> selectCategoryProductList(int categoryNo, int limit);
	List<Product> selectPersonalProductList(long memberNo);
	List<Product> selectRecommendList(long productNo);
	
	/**
	 * 찜 목록 추가
	 * @param map
	 * @return result
	 */
	int insertLike(Map<String, Object> map);
	
	/**
	 * 찜 목록 삭제
	 * @param productNo
	 * @return result
	 */
	int deleteLike(Map<String, Object> map);
	
	/**
	 * 찜 여부 확인
	 * @param map
	 * @return result ( 1: true, 0: false)
	 */
	int checkLike(Map<String, Object> map);    
}