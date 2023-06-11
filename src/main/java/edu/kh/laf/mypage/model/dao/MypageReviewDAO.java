package edu.kh.laf.mypage.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.laf.board.model.dto.Review;

@Repository
public class MypageReviewDAO {

	@Autowired
	private MypageMapper mapper;

	public List<Review> myReview(Long memberNo) {
		return mapper.myReview(memberNo);
	}
	

}
