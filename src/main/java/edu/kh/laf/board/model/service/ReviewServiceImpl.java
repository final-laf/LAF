package edu.kh.laf.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.mapper.ReviewMapper;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Service
public class ReviewServiceImpl implements ReviewService{

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

}
