package edu.kh.laf.board.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Review;

public interface ReviewService {

	/** 모든 리뷰 조회
	 * @return
	 */
	List<Review> reviewList();

}
