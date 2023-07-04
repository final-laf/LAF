package edu.kh.laf.product.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.dto.ProductImage;

public interface ProductService {
	
	/**
	 * 모든 상품 목록 조회
	 * @param map
     * @return productList
	 */
	 Map<String, Object> selectProductList(Map<String, Object> map);
	
	/**
     * 상품 번호로 상품 정보 조회
     * @param productNo
     * @return product
     */
    Product selectProduct(long productNo);
    
    /**
	 * 상품 번호로 상품 정보 조회(관리자)
	 * (관리자 : 비공개, 품절상품, 썸네일 없는 상품도 모두 조회)
	 * @param productNo
	 * @return product
	 */
	Product adminSelectProduct(long productNo);
    
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
	 * 키 목록으로 상품 조회
	 * @param paramMap
	 * @return resultMap
	 */
	Map<String, Object> selectProductBySeveralKeys(Map<String, Object> paramMap);

	/**
	 * 상품 상태 변경
	 * @param productNo
	 * @param state
	 * @return result
	 */
	int updateState(long productNo, String state);

	/**
	 * 선택 상품 상태 일괄 변경
	 * @param productNo
	 * @param state
	 * @param data
	 * @return result
	 */
	int updateAllState(String data, String state);

	/**
	 * 상품 등록
	 * @param paramMap
	 * @return productNo
	 */
	long insertProduct(Map<String, Object> paramMap);

	/**
	 * 상품 이미지 등록
	 * @param paramMap
	 * @return result
	 * @throws FileUploadException 
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int insertProductImage(Map<String, Object> paramMap, MultipartFile thumbnail, List<MultipartFile> images) throws IllegalStateException, IOException;

	/**
	 * 특정 상품에 대한 상세 이미지 조회
	 * @param productNo
	 * @return productImageList
	 */
	List<ProductImage> selectProductImage(long productNo);

	/**
	 * 상품 정보 업데이트
	 * @param paramMap
	 */
	int updateProduct(Map<String, Object> paramMap);

	/**
	 * 이미지 업데이트
	 * @param paramMap
	 * @param thumbnail
	 * @param images
	 * @return result
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int updateProductImage(Map<String, Object> paramMap, MultipartFile thumbnail, List<MultipartFile> images) throws IllegalStateException, IOException;

	/**
	 * 상품 상세 이미지 삭제
	 * @param paramMap
	 * @return result
	 */
	int removeProductImage(Map<String, Object> paramMap);

	/**
	 * 이미지 전체 목록 조회
	 * @return imageList
	 */
	List<String> selectProductPathList();

	/**
	 * 카테고리별 상품 갯수 조회(관리자)
	 * @param pcno
	 * @param ccno
	 * @return count
	 */
	int adminGetListCount(long pcno, long ccno);
}