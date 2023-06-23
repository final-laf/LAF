package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.service.ReviewService;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageReviewService;

@Controller
public class MypageReviewController {
	@Autowired
	private MypageReviewService reviewService;
	private ReviewService service;
	
	// 내가 쓴 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/myPage/review")
	public String review(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<Review> myOrder = new ArrayList<>();
		myOrder = reviewService.myReview(loginMember.getMemberNo());
		for(Review review : myOrder) {
//			옵션 설정
			review.setOption(reviewService.myOrderOption(review.getOptionNo()));
//			상품 설정
			review.setProduct(reviewService.myOrderProduct(review.getProductNo()));
//		 	
			
		}
		List<Review> myWrittenReview = reviewService.myWrittenReview(loginMember.getMemberNo());
		model.addAttribute("myOrder", myOrder);
		model.addAttribute("myWrittenReview", myWrittenReview);
		return "/myPage/myPageBoard/myPageReview";
	}
	
	// 내가 쓴 리뷰 : 작성한 리뷰
	@GetMapping("/myPage/review/list")
	public String reviewList(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<Review> myWrittenReview = new ArrayList<>();
		myWrittenReview = reviewService.myWrittenReview(loginMember.getMemberNo());
		for(Review review : myWrittenReview) {
//			옵션 설정
			review.setOption(reviewService.myOrderOption(review.getOptionNo()));
//			상품 설정
			review.setProduct(reviewService.myOrderProduct(review.getProductNo()));
		}
		List<Review> myOrder = reviewService.myReview(loginMember.getMemberNo());
		model.addAttribute("myOrder", myOrder);
		model.addAttribute("myWrittenReview", myWrittenReview);
		for (int i = 0; i < myWrittenReview.size(); i++) {
			System.out.println(myWrittenReview.get(i));
		}
		return "/myPage/myPageBoard/myPageReviewQueue";
	}
	/** 작성 가능한 리뷰 개별 조회
	 * @param orderProduct
	 * @return
	 */
	@PostMapping(value="/review/detail", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Review detail(@RequestBody Review orderProduct) {
		Review review = new Review();
		System.out.println(orderProduct);
		review = reviewService.detailReview(orderProduct);
		
		review.setOption(reviewService.myOrderOption(orderProduct.getOptionNo())); // 옵션 설정
		review.setProduct(reviewService.myOrderProduct(orderProduct.getProductNo())); // 상품 설정
		return review;
	}
	
	
}
