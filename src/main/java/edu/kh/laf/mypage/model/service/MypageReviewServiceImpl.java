package edu.kh.laf.mypage.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.mypage.model.mapper.MypageReviewMapper;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Service
public class MypageReviewServiceImpl implements MypageReviewService {
	
	@Autowired
	private S3Uploader uploader;
	
	@Autowired
	private MypageReviewMapper mapper;

	
	/** 내가 작성하지 않은 오더 조회
	 *
	 */
	@Override
	public Map<String, Object> myOrder(int cp, Long memberNo) {
		int orderListCount = mapper.orderListCount(memberNo);
		int reviewListCount = mapper.reviewListCount(memberNo);
		
		Pagination pagination = new Pagination(orderListCount, cp, 5);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Review> reviewList = mapper.orderList(rowBounds, memberNo);
		// reviewList에서 하나씩 옵션 및 상품 설정
		
		for(Review review : reviewList) {
			review.setOption(mapper.myOrderOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(mapper.myOrderProduct(review.getProductNo()));
		}
		Map<String, Object> resultMap = new HashMap<>();
		
		resultMap.put("orderListCount", orderListCount);
		resultMap.put("reviewListCount", reviewListCount);
		resultMap.put("pagination", pagination);
		resultMap.put("orderList", reviewList);
		
		return resultMap;
	}
	
	/** 내가 작성한 리뷰 조회
	 *
	 */
	@Override
	public Map<String, Object> myReview(int cp, Long memberNo) {
		int reviewListCount = mapper.reviewListCount(memberNo);
		int orderListCount = mapper.orderListCount(memberNo);
		
		Pagination pagination = new Pagination(reviewListCount, cp, 5);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Review> reviewList = mapper.reviewList(rowBounds, memberNo);
		// reviewList에서 하나씩 옵션 및 상품 설정
		
		for(Review review : reviewList) {
			review.setOption(mapper.myOrderOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(mapper.myOrderProduct(review.getProductNo()));
		}
		Map<String, Object> resultMap = new HashMap<>();
		
		resultMap.put("orderListCount", orderListCount);
		resultMap.put("reviewListCount", reviewListCount);
		resultMap.put("pagination", pagination);
		resultMap.put("reviewList", reviewList);
		
		return resultMap;
	}

	/** 각 리뷰 옵션 조회
	 * @param optionNo
	 * @return
	 */
	public Option myOrderOption(long optionNo) {
		return mapper.myOrderOption(optionNo);
	}

	/** 리뷰 상품 조회
	 *
	 */
	@Override
	public Product myOrderProduct(long productNo) {
		return mapper.myOrderProduct(productNo);
	}


	/** 내가 작성 가능한 리뷰 개별 조회
	 *
	 */
	@Override
	public Review detailReview(Review orderProduct) {
		return mapper.detailReview(orderProduct);
	}


	/** 이미지 조회
	 *
	 */
	@Override
	public List<ReviewImg> reviewImg(long reviewNo) {
		return mapper.reviewImg(reviewNo);
	}





}
