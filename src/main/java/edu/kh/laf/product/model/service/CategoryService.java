package edu.kh.laf.product.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;

public interface CategoryService {
	
	/**
	 * 모든 카테고리 목록 조회
	 * @return categoryList
	 */
	List<Category> selectAllCategoryList();
	
	/**
	 * 부모 카테고리 조회
	 * @param category
	 * @return categoryList
	 */
	List<Category> selectCategoryList();

	/**
	 * 부모 카테고리 이름 조회
	 * @param categoryNo
	 * @return
	 */
	String selectCategoryName(int categoryNo);

	/**
	 * 자식카테고리 조회
	 * @param categoryNo
	 * @return childCategoryList
	 */
	List<Category> selectChildCategoryList(int categoryNo);

	/**
	 * 상품목록으로 카테고리 조회
	 * @param productList
	 * @return categoryList
	 */
	List<Map<String, Object>> selectCategoryListByProductList(List<Product> productList);
	
	/**
	 * 상품 등록 중 카테고리 정보 등록
	 * @param paramMap
	 * @return result
	 */
	int insertProductCategory(Map<String, Object> paramMap);

	/**
	 * 상품번호로 카테고리 조회
	 * @param productNo
	 * @return categoryList
	 */
	List<Category> selectCategoryListByProductNo(long productNo);

	/**
	 * 상품번호로 카테고리 삭제
	 * @param productNo
	 * @return result
	 */
	int deleteProductCategory(long productNo);
}
