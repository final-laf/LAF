package edu.kh.laf.main.model.mapper;

import java.util.List;

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
}
