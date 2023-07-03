package edu.kh.laf.board.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.board.model.mapper.ReviewMapper;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.common.utility.S3Uploader;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Service
@PropertySource("classpath:/db.properties")
public class ReviewServiceImpl implements ReviewService{
	
	@Autowired
	private S3Uploader uploader;

	@Value("${my.review.webpath}")
	private String webPath;
	
	@Value("${my.review.location}")
	private String filePath;
	
	@Autowired
	private ReviewMapper mapper;
	
	/** 모든 리뷰 조회
	 *
	 */
	@Override
	public Map<String, Object> reviewList(int cp) {
		int listCount = mapper.reviewListCount();
		
		Pagination pagination = new Pagination(listCount, cp, 5);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Review> reviewList = mapper.reviewList(rowBounds);
		// reviewList에서 하나씩 옵션 및 상품 설정
		
		for(Review review : reviewList) {
			int num = review.getMemberId().length()/2;
			int uNum = review.getOrderUno().length()/2;
			
			String blind = "";
			for(int i=0; i<num; i++) {blind += "*";}
			review.setMemberId(review.getMemberId().substring(0, num) + blind);
			
			blind = "";
			for(int i=0; i<uNum; i++) {blind += "*";}
			review.setOrderUno(review.getOrderUno().substring(0, uNum) + blind);
			
			review.setOption(mapper.reviewOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(mapper.reviewProduct(review.getProductNo()));
			if (review.getReviewNo()!=0) {
				List<ReviewImg> imgList = new ArrayList<>();
				imgList=mapper.reviewImg(review.getReviewNo());
				review.setReviewImg(imgList);
			}// 상품 설정
		}
		
		
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("reviewList", reviewList);
		
		return resultMap;
	}
	
	/** 특정 상품에 대한 모든 리뷰 조회
	 *
	 */
	@Override
	public List<Review> reviewProductList(long productNo) {
//		int listCount = mapper.selectReviewProductCount(paramMap);
//		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 16);
//		
//		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
//		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
//		List<Product> productList = mapper.search(paramMap, rowBounds);
//		
//		Map<String, Object> resultMap = new HashMap<>();
//		resultMap.put("pagination", pagination);
//		resultMap.put("productList", productList);
		
		return mapper.reviewProductList(productNo);
	}
	
	/**
	 * 특정 상품에 대한 리뷰 개수 조회
	 */
	
	/** 리뷰 옵션 조회
	 *
	 */
	@Override
	public Option reviewOption(long optionNo) {
		return mapper.reviewOption(optionNo);
	}
	
	/** 리뷰 상품 조회
	 *
	 */
	@Override
	public Product reviewProduct(long productNo) {
		return mapper.reviewProduct(productNo);
	}
	
	/** 리뷰 개별 조회
	 *
	 */
	@Override
	public Review detailReview(String orderNo) {
		return mapper.detailReview(orderNo);
	}

	
	/** 리뷰 작성하기
	 * @throws IOException 
	 * @throws IllegalStateException 
	 *
	 */
	@Override
	public int insertReview(Review review, List<MultipartFile> images) throws IllegalStateException, IOException {
		int size = 0;
		String fileName = "";
		int result = mapper.updateReview(review);
		if(result==0) result = mapper.insertReview(review);
		if(result==0) return 0;
		result = mapper.setReviewNo(review);
		if(result==0) return 0;
		List<ReviewImg> uploadList = new ArrayList<ReviewImg>();
		for(int i = 0; i < images.size(); i++) {
			if(images.get(i).getSize()>0) {
				ReviewImg img = new ReviewImg();
				fileName = images.get(i).getOriginalFilename();
				img.setReviewPath(webPath +review.getReviewNo()+fileName);
				img.setReviewNo(review.getReviewNo());
				img.setReviewImgOrder(i);
				uploadList.add(img);
				result = mapper.updateImage(img);
				if(result==0) {
					result=mapper.insertImage(img);
				}
				size+=1;
			}
		}
		if(!uploadList.isEmpty()) {
			if(uploadList.size()==size) {
				for(int i=0; i<size; i++) {
					int index = uploadList.get(i).getReviewImgOrder();
					fileName = review.getReviewNo()+images.get(i).getOriginalFilename();
					uploader.upload(images.get(index), webPath+fileName);					
//					images.get(index).transferTo(new File(filePath+fileName));					
				}
			} else {
				throw new FileUploadException();
			}
		}
		return 1;
		
		
		
	}

	
	/** 리뷰 수정하기
	 * @throws Exception 
	 *
	 */
	@Override
	public int updateReview(Review review, List<MultipartFile> images, String deleteList) throws Exception  {
		int size = 0;
		String fileName = "";
		int result = mapper.updateReview(review);
		result = mapper.setReviewNo(review);
		List<ReviewImg> uploadList = new ArrayList<ReviewImg>();
		System.out.println("수정하기");
		System.out.println(deleteList);
		if (!deleteList.equals("")) { // 삭제할 이미지가 있다면

			//deleteList에 작성된 이미지 모두 삭제
			Map<String, Object> deleteMap = new HashMap<>();
			deleteMap.put("reviewNo", review.getReviewNo());
			deleteMap.put("deleteList", deleteList);

			int img = mapper.deleteImage(deleteMap);
			if (img == 0) { // 이미지 삭제 실패 시 전체 롤백
									// -> 예외 강제로 발생
				throw new Exception();

			}
		}
		
		
		for(int i = 0; i < images.size(); i++) {
			if(images.get(i).getSize()>0) {
				ReviewImg img = new ReviewImg();
				fileName = images.get(i).getOriginalFilename();
				img.setReviewPath(webPath +review.getReviewNo()+fileName);
				img.setReviewNo(review.getReviewNo());
				img.setReviewImgOrder(i);
				uploadList.add(img);
				result = mapper.updateImage(img);
				if(result==0) {
					result=mapper.insertImage(img);
				}
				size+=1;
			}
		}
		if(!uploadList.isEmpty()) {
			if(uploadList.size()==size) {
				for(int i=0; i<uploadList.size(); i++) {
					int index = uploadList.get(i).getReviewImgOrder();
					fileName = review.getReviewNo()+images.get(index).getOriginalFilename();
					uploader.upload(images.get(index), webPath+fileName);
//					images.get(index).transferTo(new File(filePath+ fileName));
				}
			} else {
				throw new FileUploadException();
			}
		}
		return 1;
				
		
	}

	/** 이미지 조회
	 *
	 */
	@Override
	public List<ReviewImg> reviewImg(long reviewNo) {
		return mapper.reviewImg(reviewNo);
	}

	/** 리뷰 삭제하기
	 *
	 */
	@Override
	public int deleteReview(long reviewNo) {
		int deleteReview = mapper.deleteReview(reviewNo);
		int deleteImg = mapper.deleteImg(reviewNo);
		return 1;
	}

	@Override
	public Map<String, Object> productReviewList(int cp, long productNo) {
		Map<String, Object> paramMap = new HashMap<>();
		
		int listCount = mapper.productReviewListCount(productNo);
		
		Pagination pagination = new Pagination(listCount, cp, 5);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Review> reviewList = mapper.reviewProductList(productNo, rowBounds);
		// reviewList에서 하나씩 옵션 및 상품 설정
		
		for(Review review : reviewList) {
			int num = review.getMemberId().length()/2;
			int uNum = review.getOrderUno().length()/2;
			
			String blind = "";
			for(int i=0; i<num; i++) {blind += "*";}
			review.setMemberId(review.getMemberId().substring(0, num) + blind);
			
			blind = "";
			for(int i=0; i<uNum; i++) {blind += "*";}
			review.setOrderUno(review.getOrderUno().substring(0, uNum) + blind);
			
			review.setOption(mapper.reviewOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(mapper.reviewProduct(review.getProductNo()));
			if (review.getReviewNo()!=0) {
				List<ReviewImg> imgList = new ArrayList<>();
				imgList=mapper.reviewImg(review.getReviewNo());
				review.setReviewImg(imgList);
			}// 상품 설정
		}
		
		
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("reviewList", reviewList);
		
		return resultMap;
	}

	/** 베스트 리뷰 조회
	 *
	 */
	@Override
	public List<Review> bestReview() {
		return mapper.bestReview();
	}

	/** 베스트 리뷰 업데이트
	 *
	 */
	@Override
	public int updateBestReview(Map<String, Object> paramMap) {
		return mapper.updateBestReview(paramMap);
	}

	// 리뷰 이미지 경로 목록 조회
	@Override
	public List<String> selectReviewImagePathList() {
		return mapper.selectReviewImagePathList();
	}




}
