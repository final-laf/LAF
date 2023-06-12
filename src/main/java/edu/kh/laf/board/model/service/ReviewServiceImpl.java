package edu.kh.laf.board.model.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.mapper.ReviewMapper;

@Service
public class ReviewServiceImpl implements ReviewService{

	@Mapper
	private ReviewMapper mapper;
	/** 모든 리뷰 조회
	 *
	 */
	@Override
	public List<Review> reviewList() {
		return mapper.reviewList();
	}

}
