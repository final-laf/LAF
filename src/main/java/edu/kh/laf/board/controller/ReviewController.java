package edu.kh.laf.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.service.ReviewService;

@Controller
public class ReviewController {

	@Autowired
	private ReviewService service;
	
	// 리뷰 메인화면
	@GetMapping("/review")
	public String review(Model model) {
		List<Review> reviewList = new ArrayList<>();
		reviewList = service.reviewList();
		System.out.println(reviewList);
//		reviewList에서 하나씩 옵션 및 상품 설정
		for(Review review : reviewList) {
			int num = review.getMemberId().length()/2;
			int uNum = review.getOrderUno().length()/2;
			String blind = "";
			for(int i=0; i<num; i++) {blind += "*";}
			review.setMemberId(review.getMemberId().substring(0, num)+blind);
			blind = "";
			for(int i=0; i<uNum; i++) {blind += "*";}
			review.setOrderUno(review.getOrderUno().substring(0, uNum)+blind);
			
//			옵션 설정
			review.setOption(service.reviewOption(review.getOptionNo()));
//			상품 설정
			review.setProduct(service.reviewProduct(review.getProductNo()));
			System.out.println(review.getProduct());
		}
		model.addAttribute("reviewList", reviewList);
		System.out.println(reviewList);
		return "/boards/review/review";
	}
	
}
