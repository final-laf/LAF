package edu.kh.laf.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.board.model.mapper.ReviewMapper;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Service
@PropertySource("classpath:/db.properties")
public class ReviewServiceImpl implements ReviewService{

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
	public List<Review> reviewList() {
		return mapper.reviewList();
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
	public Review detailReview(String reviewNo) {
		return mapper.detailReview(reviewNo);
	}

	
	/** 리뷰 작성하기
	 *
	 */
	@Override
	public int insertReview(Review review, List<MultipartFile> images) {
		int result = mapper.InsertReview(review);
		if(result==0) return 0;
		long reviewNo=review.getReviewNo();
		List<ReviewImg> uploadList = new ArrayList<ReviewImg>();
		for(int i = 0; i < images.size(); i++) {
			if(images.get(i).getSize()>0) {
				ReviewImg img = new ReviewImg();
				
				img.setReviewPath(webPath + "review");
				img.setReviewNo(reviewNo);
				img.setReviewImgNo(i);
				uploadList.add(img);
				result = mapper.imageUpdate(img);
				if(result==0) {
//					result=mapper.imageInsert(img);
				}
				
			}
		}
		
		if(!uploadList.isEmpty()) {
			for(int i=0; i<uploadList.size(); i++) {
//				int index = uploadList.get(i).get
			}
		}
		return 1;
		
		
		
	}

	
	
	/** 리뷰 수정하기
	 *
	 */
	@Override
	public int updateReview(Review review, List<MultipartFile> images) {
		int result = mapper.updateReview(review);
		if(result==0) return 0;
		long reviewNo=review.getReviewNo();
		List<ReviewImg> uploadList = new ArrayList<ReviewImg>();
		for(int i = 0; i < images.size(); i++) {
			if(images.get(i).getSize()>0) {
				ReviewImg img = new ReviewImg();
				
				img.setReviewPath(webPath + "review");
				img.setReviewNo(reviewNo);
				img.setReviewImgNo(i);
				uploadList.add(img);
				result = mapper.imageUpdate(img);
				if(result==0) {
//					result=mapper.imageInsert(img);
				}
				
			}
		}
		
		if(!uploadList.isEmpty()) {
			for(int i=0; i<uploadList.size(); i++) {
//				int index = uploadList.get(i).get
			}
		}
		return 1;
				
		
	}



}
