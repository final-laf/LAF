package edu.kh.laf.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReviewController {

	// 리뷰 메인화면
	@GetMapping("/review")
	public String review() {
		return "/boards/review/review";
	}
	
}
