package edu.kh.laf.product.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface CategoryMapper {
	
	/**
	 * 특정 부모의 자식 카테고리 조회
	 * @param categoryNo
	 * @return childCategoryList
	 */
	List<Category> selectChildCategoryList(int categoryNo);

	/**
	 * 부모 카테고리 조회
	 * @return categoryList
	 */
	List<Category> selectCategoryList();
	
	/**
	 * 모든 카테고리 정보 조회
	 * @return categoryList
	 */
	List<Category> selectAllCategoryList();
	
	/**
	 * 전체 자식 카테고리 조회
	 * @return childCategoryList
	 */
	List<Category> selectAllChildCategoryList();
	
	/**
	 * 상품 등록 중 카테고리 정보 등록
	 * @param productCategoryList
	 * @return
	 */
	int insertProductCategory(List<Map<String, Object>> productCategoryList);
	
	/**
	 * 상품 목록에 대한 카테고리 조회
	 * @param productList
	 * @return categoryList
	 */
	List<Map<String, Object>> selectCategoryListByProductNo(List<Product> productList);
	
	/**
	 * 카테고리 이름 조회
	 * @param category
	 * @return categoryName
	 */
	String selectCategoryName(int categoryNo);
}
