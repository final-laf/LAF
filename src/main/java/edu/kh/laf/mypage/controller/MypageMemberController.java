package edu.kh.laf.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageMemberController {

	// 마이페이지 대쉬보드
	@GetMapping("/my")
	public String my() {
		return "/mypage/mypageDash";
	}
	
	// 회원정보 수정 
	@GetMapping("/my/info")
	public String info() {
		return "/mypage/mypageEditInfo";
	}
	
	// 적립금 및 쿠폰 : 적립금
	@GetMapping("/my/point")
	public String point() {
		return "/mypage/mypagePoint";
	}
	
	// 적립금 및 쿠폰 : 쿠폰
	@GetMapping("/my/coupon")
	public String coupon() {
		return "/mypage/mypageCoupon";
	}
	
	// 배송지 관리
	@GetMapping("/my/ship")
	public String ship() {
		return "/mypage/mypageShipping";
	}
	
	// 배송지 관리 : 배송지 등록
	@GetMapping("/my/ship/enroll")
	public String shipEnroll() {
		return "/mypage/mypageAddShipping";
	}
	
	// 찜 목록
	@GetMapping("/my/like")
	public String like() {
		return "/mypage/like";
	}
	
}
