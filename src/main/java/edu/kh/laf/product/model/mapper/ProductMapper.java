package edu.kh.laf.product.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.dto.ProductImage;

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
     * 상품 번호로 상품 정보 조회(관리자)
     * (관리자 : 비공개, 품절상품, 썸네일 없는 상품도 모두 조회)
     * @param productNo
     * @return product
     */
    Product adminSelectProduct(Long productNo);
    
    

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
	 * 부모 카테고리 상품 갯수 조회
	 * @param category
	 * @return count
	 */
	int getListCount(Map<String, Object> paramMap);
	
	/**
	 * 카테고리 별 상품 갯수 조회
	 * @param paramMap
	 * @return count
	 */
	int getSearchListCount(Map<String, Object> paramMap);

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
	 * 상품 상태 변경
	 * @param map
	 * @return result
	 */
	int updateState(Map<String, Object> map);

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
	 * 상품 이미지 등록
	 * @param uploadList
	 * @return result
	 */
	int insertImageList(List<ProductImage> uploadList);

	/**
	 * 특정 상품에 대한 상세 이미지 조회
	 * @param productNo
	 * @return productImageList
	 */
	List<ProductImage> selectProductImage(long productNo);

	/**
	 * 상품 정보 업데이트
	 * @param product
	 * @return result
	 */
	int updateProduct(Product product);

	/**
	 * 이미지 정보 업데이트
	 * @param uploadList
	 * @return result
	 */
	int updateThumbnailImage(ProductImage uploadList);

	/**
	 * 이미지 삭제
	 * @param arr
	 * @return result
	 */
	int removeProductImage(String[] arr);

	/**
	 * 이미지 전체 목록 조회
	 * @return imageList
	 */
	List<String> selectImageList();
	
	/**
	 * 이미지 순서 업데이트
	 * @param productImage
	 * @return result
	 */
	int updateImageOrder(ProductImage productImage);

	/**
	 * 썸네일 이미지 삽입
	 * @param thumbnailImg
	 * @return result
	 */
	int insertThumbnailImage(ProductImage thumbnailImg);
}
