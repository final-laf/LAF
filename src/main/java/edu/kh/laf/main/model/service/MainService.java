package edu.kh.laf.main.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.main.model.dto.Banner;

public interface MainService {
	
	List<Banner> selectBannerList();

	/**
	 * 배너 이름 조회
	 * @return bannerNameList
	 */
	List<String> selectBannerPathList();

	/**
	 * 이미지 삭제
	 * @param removedImages
	 * @return result
	 */
	int deleteImage(String[] removedImages);

	/**
	 * 이미지 삽입
	 * @param banner
	 * @return result
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int insertImage(List<MultipartFile> banner) throws IllegalStateException, IOException;

	/**
	 * 전체 이미지 파일 경로 조회
	 * @return imgPathList
	 */
	List<String> selectImagePathList();

	/** 조회 목록 누적
	 * @param map
	 */
	List<Object> checkClick(Map<String, Object> map);

	/**  상품 조회 목록 자정에 초기화
	 * 
	 */
	void cleanClickTable();

}
