package edu.kh.laf.board.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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

		// reviewList에서 하나씩 옵션 및 상품 설정
		for(Review review : reviewList) {
			int num = review.getMemberId().length()/2;
			int uNum = review.getOrderUno().length()/2;
			
			String blind = "";
			for(int i=0; i<num; i++) {blind += "*";}
			review.setMemberId(review.getMemberId().substring(0, num) + blind);
			
			blind = "";
			for(int i=0; i<uNum; i++) {blind += "*";}
			review.setOrderUno(review.getOrderUno().substring(0, uNum) + blind);
			
			review.setOption(service.reviewOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(service.reviewProduct(review.getProductNo())); // 상품 설정
		}
		model.addAttribute("reviewList", reviewList);
		return "/boards/review/review";
	}
	
	@GetMapping("/review/detailReview")
	@ResponseBody
	public Review detail(String reviewNo) {
		Review review = new Review();
		review = service.detailReview(reviewNo);
		int num = review.getMemberId().length()/2;
		int uNum = review.getOrderUno().length()/2;
		
		String blind = "";
		for(int i=0; i<num; i++) {blind += "*";}
		review.setMemberId(review.getMemberId().substring(0, num)+blind);
		
		blind = "";
		for(int i=0; i<uNum; i++) {blind += "*";}
		review.setOrderUno(review.getOrderUno().substring(0, uNum)+blind);
		
		review.setOption(service.reviewOption(review.getOptionNo())); // 옵션 설정
		review.setProduct(service.reviewProduct(review.getProductNo())); // 상품 설정
		System.out.println(review);
		
		return review;
	}
	
	@PostMapping("/review/insert")
	public String insert(Review review, @RequestParam(value="images", required=false) List<MultipartFile> images)throws IllegalStateException, IOException {
		System.out.println("리뷰 추가");
		System.out.println(review);
		System.out.println(images);
		int i = service.insertReview(review, images);
		
		System.out.println(i);
		
		return "redirect:/myPage/review/list"; 
	}

	@PostMapping("/review/update")
	public String update(Review review, @RequestParam(value="images", required=false) List<MultipartFile> images) {
		System.out.println(review);
		System.out.println(review);
		int i = service.updateReview(review, images);
		
		System.out.println(i);
		
		return "redirect:/myPage/review/list"; 
	}
	
}
