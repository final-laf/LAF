package edu.kh.laf.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageReviewController {
	
	// 내가 쓴 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/my/review")
	public String review() {
		return "/mypage/reviewQueue";
	}
	
	// 내가 쓴 리뷰 : 작성한 리뷰
	@GetMapping("/my/reivew/list")
	public String reviewList() {
		return "/mypage/reviewList";
	}

}
