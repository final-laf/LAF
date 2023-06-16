package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageReviewServiceImpl;
import edu.kh.laf.order.model.dto.Order;

@Controller
public class MypageReviewController {
	@Autowired
	private MypageReviewServiceImpl reviewService;
	
	// 내가 쓴 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/myPage/review")
	public String review(@SessionAttribute("loginMember") Member loginMember) {
		List<Order> myOrder = new ArrayList<>();
		return "/myPage/myPageBoard/myPageQuestion";
	}
	
	// 내가 쓴 리뷰 : 작성한 리뷰
	@GetMapping("/myPage/review/list")
	public String reviewList(@SessionAttribute("loginMember") Member loginMember) {
		List<Review> myReview = new ArrayList<>();
		myReview = reviewService.myReview(loginMember.getMemberNo());
		System.out.println(myReview);
		return "/myPage/myPageBoard/myPageReview";
	}

}
