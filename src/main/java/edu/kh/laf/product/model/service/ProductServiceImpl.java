package edu.kh.laf.product.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.common.utility.S3Uploader;
import edu.kh.laf.common.utility.Util;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.dto.ProductImage;
import edu.kh.laf.product.model.mapper.ProductMapper;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private S3Uploader uploader;
	@Autowired
	private ProductMapper mapper;
	
	@Value("${product.webpath}")
	private String webPath;
	@Value("${product.location}")
	private String filePath;

	// 모든 상품 목록 조회
	@Override
	public Map<String, Object> selectProductList(Map<String, Object> paramMap) {

		int listCount = mapper.getProductCount(paramMap);
		int cp = (paramMap.get("cp") == null) ? 1 : Integer.parseInt((String) paramMap.get("cp"));
		Pagination pagination = new Pagination(listCount, cp, 10);

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.selectProductList(paramMap, rowBounds);

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);

		return resultMap;
	}

	// 상품 번호로 상품 정보 조회
	@Override
	public Product selectProduct(long productNo) {
		return mapper.selectProduct(productNo);
	}
	
	// 상품 번호로 상품 정보 조회(관리자)
	@Override
	public Product adminSelectProduct(long productNo) {
		return mapper.adminSelectProduct(productNo);
	}

	// 카테고리별 위클리 베스트 상품 목록 조회(갯수제한)
	@Override
	public List<Product> selectWeeklyBest(int categoryNo, int limit) {
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);

		return mapper.selectWeeklyBest(map);
	}

	// 카테고리 상품 목록 조회
	@Override
	public Map<String, Object> selectCategoryProductList(Map<String, Object> paramMap) {

		int listCount = mapper.getListCount(paramMap);
		Pagination pagination = new Pagination(listCount, (int) paramMap.get("cp"), 16);

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.selectCategoryProductList(paramMap, rowBounds);

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);

		return resultMap;
	}

	// 카테고리 상품 목록 조회(갯수제한)
	@Override
	public List<Product> selectCategoryProductList(int categoryNo, int limit) {
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);

		return mapper.selectCategoryProductList(map);
	}

	// 상품 검색
	@Override
	public Map<String, Object> search(Map<String, Object> paramMap) {
		int listCount = mapper.getSearchListCount(paramMap);
		Pagination pagination = new Pagination(listCount, (int) paramMap.get("cp"), 16);

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.search(paramMap, rowBounds);

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);

		return resultMap;
	}

	// 신규 등록 상품 목록 조회(20개)
	@Override
	public List<Product> selectNewArrivalProductList() {
		return mapper.selectNewArrivalProductList();
	}

	// 개인별 맞춤 상품 추천
	@Override
	public List<Product> selectPersonalProductList(long memberNo) {
		return mapper.selectPersonalProductList(memberNo);
	}

	// 상품별 추천 상품
	@Override
	public List<Product> selectRecommendList(long productNo) {
		return mapper.selectRecommendList(productNo);
	}

	// 키 목록으로 상품 조회
	@Override
	public Map<String, Object> selectProductBySeveralKeys(Map<String, Object> paramMap) {
		int listCount = ((List<Long>) paramMap.get("likeList")).size();
		Pagination pagination = new Pagination(listCount, (int) paramMap.get("cp"), 10);

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = null;
		if (listCount != 0)
			productList = mapper.selectProductBySeveralKeys(paramMap, rowBounds);

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);

		return resultMap;
	}

	// 상품 정보 변경
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateState(long productNo, String state) {
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("state", state);

		return mapper.updateState(map);
	}

	// 선택 상품 상태 일괄 변경
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateAllState(String data, String state) {
		String[] tmp = data.split("-");
		List<Long> productNoList = new ArrayList<>();
		for (String str : tmp) {
			productNoList.add(Long.parseLong(str));
		}

		Map<String, Object> map = new HashMap<>();
		map.put("productNoList", productNoList);
		map.put("state", state);
		return mapper.updateStateList(map);
	}

	// 상품 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public long insertProduct(Map<String, Object> paramMap) {

		// Product 등록 및 productNo 키 발급
		Product product = new Product();
		product.setProductName((String) paramMap.get("productName"));
		product.setProductPrice(Long.parseLong(((String) paramMap.get("productPrice")).replaceAll(",", "")));
		product.setProductSale(Integer.parseInt((String) paramMap.get("productSale")));
		product.setProductSalePrice(Long.parseLong(((String) paramMap.get("productSalePrice")).replaceAll(",", "")));
		product.setProductPoint(Integer.parseInt(((String) paramMap.get("productPoint")).replaceAll(",", "")));

		int result = mapper.insertProduct(product);
		if (result > 0)
			return product.getProductNo();
		return -1;
	}

	// 상품 이미지 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertProductImage(
			Map<String, Object> paramMap, 
			MultipartFile thumbnail, 
			List<MultipartFile> images
			) throws IllegalStateException, IOException {

		long productNo = Long.parseLong(String.valueOf(paramMap.get("productNo")));
		
		List<ProductImage> uploadList = new ArrayList<>();

		/* 썸네일 */
		int result = 1;
		ProductImage thumbnailImg = new ProductImage();
		if (thumbnail.getSize() > 0) {
			String filename = thumbnail.getOriginalFilename();
			String rename = Util.fileRename(filename);
			
			thumbnailImg.setRename(rename);
			thumbnailImg.setImgPath(webPath + rename);
			thumbnailImg.setProductNo(productNo);
			
			// DB에 정보 저장
			result *= mapper.insertThumbnailImage(thumbnailImg);
			
			// 서버에 파일 저장
			uploader.upload(thumbnail, thumbnailImg.getImgPath());
		}
		
		/* 상세 이미지 */
		
		// images에 담겨있는 파일 중 실제 업로드된 파일만 분류
		for (int i = 0; i < images.size(); i++) {
			if (images.get(i).getSize() == 0) continue;
			
			String filename = images.get(i).getOriginalFilename();
			String rename = Util.fileRename(filename);

			ProductImage img = new ProductImage();
			img.setRename(rename);
			img.setImgPath(webPath + rename);
			img.setProductNo(productNo);
			img.setThumbFl("N");
			img.setImgOrder(i + 1);
			uploadList.add(img);
		}

		// 업로드 할 파일이 없을 경우
		if (uploadList.isEmpty()) return result;

		// product_img 테이블 삽입
		result *= mapper.insertImageList(uploadList);
		if (result < uploadList.size()) {
			throw new FileUploadException();
		}
		
		// 서버에 파일 저장
		for (int i = 0; i < uploadList.size(); i++) {
			uploader.upload(images.get(i), uploadList.get(i).getImgPath());
		}
		return result;
	}

	// 특정 상품에 대한 상세 이미지 조회
	@Override
	public List<ProductImage> selectProductImage(long productNo) {
		return mapper.selectProductImage(productNo);
	}

	// 상품 정보 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateProduct(Map<String, Object> paramMap) {
		
		Product product = new Product();
		product.setProductNo(Long.parseLong(String.valueOf(paramMap.get("productNo"))));
		product.setProductName((String)paramMap.get("productName"));
		
		return mapper.updateProduct(product);
	}

	// 이미지 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateProductImage(
			Map<String, Object> paramMap, 
			MultipartFile thumbnail, 
			List<MultipartFile> images
			) throws IllegalStateException, IOException {
		
		long productNo = Long.parseLong(String.valueOf(paramMap.get("productNo")));
		
		/* 썸네일 */
		int result = 1;
		ProductImage thumbnailImg = new ProductImage();
		if (thumbnail.getSize() > 0) {
			String filename = thumbnail.getOriginalFilename();
			String rename = Util.fileRename(filename);
			
			thumbnailImg.setRename(rename);
			thumbnailImg.setImgPath(webPath + rename);
			thumbnailImg.setProductNo(productNo);
			
			// DB에 정보 저장
			result *= mapper.updateThumbnailImage(thumbnailImg);
			
			// 서버에 파일 저장
			uploader.upload(thumbnail, thumbnailImg.getImgPath());
		}
		
		
		/* 상세 이미지 */		
		String[] imgOrder = (String[])paramMap.get("imgOrder");
		List<ProductImage> uploadList = new ArrayList<>();
		
		// 이미지가 없으면 함수 종료
		if(imgOrder == null || imgOrder.length == 0) return 1;
		
		// images에 담겨있는 파일 중 실제 업로드된 파일만 분류
		for (int i = 0; i < images.size(); i++) {
			if (images.get(i).getSize() == 0) continue;
			
			String filename = images.get(i).getOriginalFilename();
			String rename = Util.fileRename(filename);

			ProductImage img = new ProductImage();
			img.setRename(rename);
			img.setImgPath(webPath + rename);
			img.setProductNo(productNo);
			img.setThumbFl("N");
			
			uploadList.add(img);
		}

		// 기존 + 신규 이미지 순서 세팅
		int ulIndex = 0, ilIndex = 0;
		List<ProductImage> imageList = mapper.selectProductImage(productNo);
		for(int i=0; i<imgOrder.length; i++) { // i == order
			
			// 신규 이미지일 때
			if(imgOrder[i].equals("-1")) {
				uploadList.get(ulIndex++).setImgOrder(i+1);
			
			// 순서 변동 없을 때	
			} else if(imgOrder[i].equals(imageList.get(ilIndex).getImgNo())) {
				ilIndex++;
				continue;
			
			// 기존 이미지 순서 변동
			} else { 
				ProductImage productImage = imageList.get(ilIndex++);
				productImage.setImgOrder(i+1);
				mapper.updateImageOrder(productImage);
			}
		}

		// 업로드 할 파일이 없을 경우
		if (uploadList.isEmpty()) return 1;

		// product_img 테이블 삽입
		result *= mapper.insertImageList(uploadList);
		if (result < uploadList.size()) {
			throw new FileUploadException();
		}
		
		// 서버에 파일 저장
		for (int i = 0; i < uploadList.size(); i++) {
			uploader.upload(images.get(i), uploadList.get(i).getImgPath());
		}		
		return 1;
	}

	// 상품 상세 이미지 삭제
	@Override
	public int removeProductImage(Map<String, Object> paramMap) {
		String[] arr = ((String)paramMap.get("removedImages")).split(",");
		if(arr[0].length() > 0)
			return mapper.removeProductImage(arr);
		return 1;
	}

	// 이미지 전체 목록 조회
	@Override
	public List<String> selectProductPathList() {
		return mapper.selectProductPathList();
	}

	// 카테고리별 상품 갯수 조회(관리자)
	@Override
	public int adminGetListCount(long pcno, long ccno) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", pcno);
		map.put("cc", ccno);
		
		return mapper.adminGetListCount(map);
	}

	// 장바구니 상품 기반 추천상품 리스트
	@Override
	public List<Product> selectRecommendProductList(List<Product> productList) {
		if(productList.isEmpty())
			return mapper.selectRecommendList(0);
		return mapper.selectRecommendList(productList.get(0).getProductNo());
	}

}
