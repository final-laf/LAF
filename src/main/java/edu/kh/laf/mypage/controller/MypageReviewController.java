package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageReviewService;

@Controller
public class MypageReviewController {
	@Autowired
	private MypageReviewService reviewService;
	
	// 내 리뷰 : 작성 가능한 리뷰 
	@GetMapping("/myPage/review")
	public String review(
			@SessionAttribute("loginMember") Member loginMember, 
			Model model, 
			@RequestParam(value="cp", required=false, defaultValue="1") int cp) {
		Map<String, Object> resultMap = reviewService.myOrder(cp, loginMember.getMemberNo());
		model.addAttribute("resultMap", resultMap);
		return "/myPage/myPageBoard/myPageReview";
	}
	
	// 내 리뷰 : 작성한 리뷰
	@GetMapping("/myPage/review/list")
	public String reviewList(
			@SessionAttribute("loginMember") Member loginMember, 
			Model model,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp) {
		Map<String, Object> resultMap = reviewService.myReview(cp, loginMember.getMemberNo());
		model.addAttribute("resultMap", resultMap);
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
		review = reviewService.detailReview(orderProduct);
		
		review.setOption(reviewService.myOrderOption(orderProduct.getOptionNo())); // 옵션 설정
		review.setProduct(reviewService.myOrderProduct(orderProduct.getProductNo())); // 상품 설정
		List<ReviewImg> imgList = new ArrayList<>();
		imgList=reviewService.reviewImg(review.getReviewNo());
		review.setReviewImg(imgList);
		return review;
	}
	
	
}
