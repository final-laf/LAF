package edu.kh.laf.admin.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

public interface AdminProductService {

	/**
	 * 상품 등록 서비스
	 * @param paramMap
	 * @param thumbnail
	 * @param images
	 * @return result
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int enrollProduct(Map<String, Object> paramMap, MultipartFile thumbnail, List<MultipartFile> images) throws IllegalStateException, IOException;

	/**
	 * 상품 수정 서비스
	 * @param paramMap
	 * @param thumbnail
	 * @param images
	 * @return reuslt
	 * @throws IOException 
	 * @throws IllegalStateException
	 */
	int updateProduct(Map<String, Object> paramMap, MultipartFile thumbnail, List<MultipartFile> images) throws IllegalStateException, IOException;

}
