package edu.kh.laf.mypage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.mypage.model.dao.MypageReviewDAO;

@Service
public class MypageReviewServiceImpl implements MypageReviewService {
	@Autowired
	private MypageReviewDAO dao;

	@Override
	public List<Review> myReview(Long memberNo) {
		return dao.myReview(memberNo);
	}


	
	

}
