package edu.kh.laf.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageController {

	@GetMapping("/like")
	public String mypageLike() {
		return "/mypage/like";
	}
	

	

	

	
	@GetMapping("/editinfo")
	public String mypageEditinfo() {
		return "/mypage/mypageEditinfo";
	}
	

	
	@GetMapping("/order")
	public String mypageOrder() {
		return "/mypage/mypageOrder";
	}
	

	
	@GetMapping("/question")
	public String mypageQuestion() {
		return "/mypage/mypageQuestion";
	}
	

	



	
	
	@GetMapping("/reviewlist")
	public String mypageReviewList() {
		return "/mypage/reviewlist";
	}
	
	
	@GetMapping("/reviewqueue")
	public String mypageReviewQueue() {
		return "/mypage/reviewQueue";
	}
}
