package edu.kh.laf.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.service.ReviewService;

@Controller
public class ReviewController {

	@Autowired
	private ReviewService service;
	
	// 리뷰 메인화면
	@GetMapping("/review")
	public String review() {
		List<Review> reviewList = new ArrayList<>();
		reviewList = service.reviewList();
		System.out.println(reviewList);
		return "/boards/review/review";
	}
	
}
