package edu.kh.laf.main.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.product.model.dto.ProductImage;

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
}
