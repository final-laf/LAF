package edu.kh.laf.admin.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.CategoryService;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;

@Service
public class AdminProductServiceImpl implements AdminProductService {

	@Autowired
	private ProductService productService;
	@Autowired
	private OptionService optionService;
	@Autowired
	private CategoryService categoryService;
	
	// 상품 등록 서비스
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int enrollProduct(
			Map<String, Object> paramMap, 
			MultipartFile thumbnail, 
			List<MultipartFile> images
			) throws IllegalStateException, IOException {
			
		// Product 테이블 삽입 및 key 반환
		long productNo = productService.insertProduct(paramMap);
		if(productNo <= 0) return -1;

		// Option 정보 삽입
		paramMap.put("productNo", productNo);
		int result = optionService.insertOptionList(paramMap);
		
		// 카테고리 정보 삽입
		result *= categoryService.insertProductCategory(paramMap);

		// 이미지 정보 삽입
		result *= productService.insertProductImage(paramMap, thumbnail, images);

		return result;
	}

	// 상품 수정 서비스
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateProduct(
			Map<String, Object> paramMap, 
			MultipartFile thumbnail, 
			List<MultipartFile> images) throws IllegalStateException, IOException {
		
		long productNo = Long.parseLong(String.valueOf(paramMap.get("productNo")));
		
		// Product 정보 갱신
		int result = productService.updateProduct(paramMap);

		// Option 정보 갱신
		result *= optionService.updateOption(paramMap);
		
		// 카테고리 정보 갱신	
		result *= categoryService.deleteProductCategory(productNo);
		result *= categoryService.insertProductCategory(paramMap);

		// 이미지 갱신
		result *= productService.updateProductImage(paramMap, thumbnail, images);
		result *= productService.removeProductImage(paramMap);

		return result;
	}
	
}
