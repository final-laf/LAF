package edu.kh.laf.mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageService;

@Controller
@SessionAttributes({"loginMember"})
public class MypageMemberController {
	
	@Autowired
	private MypageService service;

	// 마이페이지 대쉬보드
	@GetMapping("/myPage")
	public String my() {
		return "/myPage/myPageDashboard";
	}
	
	// 회원정보 수정  
	@GetMapping("/myPage/info") // css 수정 필요 
	public String info() {
		return "/myPage/myPageInfo/myPageInfo";
	}
	

	// 배송지 관리
	@GetMapping("/myPage/shipping")
	public String ship(@SessionAttribute("loginMember") Member loginMember
					, Model model) {
		// 배송지 목록 조회
		List<Address> addressList = service.selectAddressList(loginMember.getMemberNo());
		
		model.addAttribute("addressList", addressList);

		return "/myPage/myPageInfo/myPageShipping";
	}
	
	// 배송지 관리 : 배송지 등록
	@GetMapping("/myPage/shipping/add")
	public String shipEnroll() {
		return "/myPage/myPageInfo/myPageAddShipping";
	}
	
	
	// 적립금 및 쿠폰 : 적립금
	@GetMapping("/myPage/point")
	public String point() {
		return "/myPage/myPageOrder/myPagePoint";
	}
	
	// 적립금 및 쿠폰 : 쿠폰
	@GetMapping("/myPage/coupon")
	public String coupon() {
		return "/myPage/myPageOrder/myPageCoupon";
	}
	
	
	// 찜 목록
	@GetMapping("/myPage/like")
	public String like() {
		return "/myPage/like";
	}
	
}
