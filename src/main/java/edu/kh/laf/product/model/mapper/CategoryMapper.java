package edu.kh.laf.product.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface CategoryMapper {

	/** Navigation 카테고리 조회
	 * @return
	 */
	List<Category> selectNavCategoryList();
	
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
	List<Map<String, Object>> selectCategoryListByProductList(List<Product> productList);
	
	/**
	 * 카테고리 이름 조회
	 * @param category
	 * @return categoryName
	 */
	String selectCategoryName(int categoryNo);

	/**
	 * 상품번호로 카테고리 목록 조회
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

	/**
	 * 부모 카테고리 순서 업데이트
	 * @param category
	 * @return result
	 */
//	int updateParentCategory(List<Category> updateParentList);
	int updateParentCategory(Category category);

	/**
	 * 부모 카테고리 신규 추가
	 * @param insertParentList
	 * @return result
	 */
	int insertParentCategory(List<Category> insertParentList);

	/**
	 * 자식 카테고리 순서 업데이트
	 * @param category
	 * @return result
	 */
	int updateChildCategory(Category category);

	/**
	 * 자식 카테고리 신규 추가
	 * @param insertChildList
	 * @return result
	 */
	int insertChildCategory(List<Category> insertChildList);


}
