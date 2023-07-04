package edu.kh.laf.main.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.main.model.dto.Banner;

@Mapper
public interface MainMapper {
	List<Banner> selectBannerList();

	/**
	 * 이미지 삭제
	 * @param removedImages
	 * @return result
	 */
	int deleteImages(String[] removedImages);

	/**
	 * 이미지 삽입
	 * @param uploadList
	 * @return result
	 */
	int insertImageList(List<Banner> uploadList); 
	
	/**
	 * 배너 이미지 목록 조회
	 * @return imageList
	 */
	List<String> selectBannerImageList();

	/**
	 * 배너 이름 조회
	 * @return imageNameList
	 */
	List<String> selectBannerPathList();

	/**
	 * 전체 이미지 경로 조회
	 */
	List<String> selectImagePathList();
	
	/** 같은 상품에 대한 이전 조회 기록 확인
	 * @param map
	 * @return result
	 */
	int checkClickedProduct(Map<String, Object> map);
	
	/** 조회한 상품 중복시 기존 조회 기록 삭제
	 * @param map
	 */
	void deleteClickedProduct(Map<String, Object> map);

	/** 조회 목록 누적
	 * @param map
	 * @return result
	 */
	int insertClick(Map<String, Object> map);

	/** 최근 조회 상품 목록(3개)
	 * @param object
	 * @return clickedProducts
	 */
	List<Object> selectClickedProducts(Long memberNo);



}
