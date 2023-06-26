package edu.kh.laf.product.model.mapper;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {

	/**
	 * 모든 상품 목록 조회
	 * @param paramMap
	 * @return productList
	 */
	List<Product> selectProductList(Map<String, Object> map, RowBounds rowBounds);

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
    List<Product> selectWeeklyBest(Map<String, Object> map);
    
    /**
     * 카테고리별 상품 목록 조회(전체)
     * @return productList
     */
    List<Product> selectCategoryProductList(Map<String, Object> map, RowBounds rowBounds);
    
    /**
     * 카테고리별 상품 목록 조회(갯수제한)
     */
    List<Product> selectCategoryProductList(Map<String, Object> map);

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
     * 상품 검색 결과
	 * @param rowBounds 
     * @param query
     * @return productList
     */
	List<Product> search(Map<String, Object> map, RowBounds rowBounds);

	/**
	 * 카테고리 이름 조회
	 * @param category
	 * @return categoryName
	 */
	String selectCategoryName(int categoryNo);

	/**
	 * 부모 카테고리 상품 갯수 조회
	 * @param category
	 * @return count
	 */
	int getListCount(Map<String, Object> paramMap);
	
	/**
	 * 카테고리 상품 갯수 조회
	 * @param paramMap
	 * @return count
	 */
	int getSearchListCount(Map<String, Object> paramMap);

	/**
	 * 자식 카테고리 조회
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
	 * 키 목록으로 상품 목록 조회
	 * @param paramMap
	 * @param rowBounds 
	 * @return productList
	 */
	List<Product> selectProductBySeveralKeys(Map<String, Object> paramMap, RowBounds rowBounds);

	/**
	 * 전체 상품 갯수 조회
	 * @param paramMap 
	 * @return count
	 */
	int getProductCount(Map<String, Object> paramMap);

	/**
	 * 상품이 포함된 카테고리 조회
	 * @param productList
	 * @return categoryList
	 */
	List<Map<String, Object>> selectCategoryListByProductNo(List<Product> productList);

	/**
	 * 상품 상태 변경
	 * @param map
	 * @return result
	 */
	int updateState(Map<String, Object> map);

	/**
	 * 모든 카테고리 정보 조회
	 * @return categoryList
	 */
	List<Category> selectAllCategoryList();

	/**
	 * 선택 상품의 상태 일괄 변경
	 * @param map
	 * @return result
	 */
	int updateStateList(Map<String, Object> map);

	/**
	 * 상품 등록
	 * @param product
	 * @return result
	 */
	int insertProduct(Product product);

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
	
}
