package edu.kh.laf.board.model.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.mapper.ReviewMapper;
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

}
