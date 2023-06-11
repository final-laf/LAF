package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageServiceImpl;

@Controller
public class MypageReviewController {
	@Autowired
	private MypageServiceImpl reviewService;
	
	// 내가 쓴 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/my/review")
	public String review(@SessionAttribute("loginMember") Member loginMember) {
		List<Review> review = new ArrayList<>();
		return "/mypage/reviewQueue";
	}
	
	// 내가 쓴 리뷰 : 작성한 리뷰
	@GetMapping("/my/review/list")
	public String reviewList() {
		
		return "/mypage/reviewList";
	}

}
