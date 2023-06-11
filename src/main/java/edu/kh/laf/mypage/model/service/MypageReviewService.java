package edu.kh.laf.mypage.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;

public interface MypageReviewService {

	List<Review> myReview(Long memberNo);

}
