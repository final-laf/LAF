package edu.kh.laf.mypage.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;

@Mapper
public interface MypageReviewMapper {
	
	

	/** 내 리뷰 조회
	 * @param memberNo
	 * @return
	 */
	List<Review> myReview(Long memberNo);

	
}
