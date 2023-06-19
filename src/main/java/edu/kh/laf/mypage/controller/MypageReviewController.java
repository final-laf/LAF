package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageReviewService;

@Controller
public class MypageReviewController {
	@Autowired
	private MypageReviewService reviewService;
	
	// 내가 쓴 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/myPage/review")
	public String review(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<Review> myOrder = new ArrayList<>();
		myOrder = reviewService.myReview(loginMember.getMemberNo());
		for(Review review : myOrder) {
			System.out.println(review);
//			옵션 설정
			review.setOption(reviewService.myOrderOption(review.getOptionNo()));
//			상품 설정
			review.setProduct(reviewService.myOrderProduct(review.getProductNo()));
//		 	
			
		}
		List<Review> myWrittenReview = reviewService.myWrittenReview(loginMember.getMemberNo());
		System.out.println(myOrder);
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
			System.out.println(review);
//			옵션 설정
			review.setOption(reviewService.myOrderOption(review.getOptionNo()));
//			상품 설정
			review.setProduct(reviewService.myOrderProduct(review.getProductNo()));
		}
		List<Review> myOrder = reviewService.myReview(loginMember.getMemberNo());
		System.out.println(myWrittenReview);
		model.addAttribute("myOrder", myOrder);
		model.addAttribute("myWrittenReview", myWrittenReview);
		return "/myPage/myPageBoard/myPageReviewQueue";
	}
}
