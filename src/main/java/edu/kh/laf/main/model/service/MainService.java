package edu.kh.laf.main.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.main.model.dto.Banner;

public interface MainService {
	List<Banner> selectBannerList();

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
}
