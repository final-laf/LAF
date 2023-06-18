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
import edu.kh.laf.mypage.model.service.MypageReviewServiceImpl;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Product;

@Controller
public class MypageReviewController {
	@Autowired
	private MypageReviewService reviewService;
	
	// 내가 쓴 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/myPage/review")
	public String review(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<OrderProduct> myReview = new ArrayList<>();
		myReview = reviewService.myReview(loginMember.getMemberNo());
		for(OrderProduct order : myReview) {
			System.out.println(order);
//			옵션 설정
			order.setOption(reviewService.myOrderOption(order.getOptionNo()));
//			상품 설정
			order.setProduct(reviewService.myOrderProduct(order.getProductNo()));
			
		}
		System.out.println(myReview);
		model.addAttribute("myReview", myReview);
		return "/myPage/myPageBoard/myPageReview";
	}
	
	// 내가 쓴 리뷰 : 작성한 리뷰
	@GetMapping("/myPage/review/list")
	public String reviewList(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<OrderProduct> myReview = new ArrayList<>();
		myReview = reviewService.myWrittenReview(loginMember.getMemberNo());
		for(OrderProduct order : myReview) {
			System.out.println(order);
//			옵션 설정
			order.setOption(reviewService.myOrderOption(order.getOptionNo()));
//			상품 설정
			order.setProduct(reviewService.myOrderProduct(order.getProductNo()));
			
		}
		System.out.println(myReview);
		model.addAttribute("myReview", myReview);
		return "/myPage/myPageBoard/myPageReviewQueue";
	}

}
