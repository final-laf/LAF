package edu.kh.laf.mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageService;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.service.OrderService;

@Controller
@SessionAttributes({"loginMember"})
public class MypageMemberController {
	
	@Autowired
	private MypageService service;
	
	@Autowired
	private OrderService orderService;

	// 마이페이지 대쉬보드
	@GetMapping("/myPage")
	public String my(@SessionAttribute(value = "loginMember", required = false) Member loginMember,
					 Model model) {
		
		// 로그인멤버의 쿠폰 정보 조회
		List<Coupon> couponList = orderService.selectCouponList(loginMember.getMemberNo());
		model.addAttribute("couponList", couponList);
		
		// 로그인 멤버의 목표 금액 설정
		long goal;
		switch(loginMember.getMemberGrade()) {
			case "B" : goal = 100000 - (long)loginMember.getMemberTotalPay(); break;
			case "S" : goal = 1000000 - (long)loginMember.getMemberTotalPay(); break;
			case "G" : goal = 5000000 - (long)loginMember.getMemberTotalPay(); break;
			default: goal = 0;
		}
		model.addAttribute("goal", goal);
		
		// 로그인 멤버의 주문 조회(최근 3개월 이내)
		List<Order> myPageOrderList = service.selectMyPageOrderList(loginMember); 
		model.addAttribute("myPageOrderList", myPageOrderList);
		
		
		
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
		for(Address add : addressList) {
			add.setAddress(add.getAddress().replace("^^^", " "));
		}
		model.addAttribute("addressList", addressList);

		return "/myPage/myPageInfo/myPageShipping";
	}
	
	// 배송지 관리 : 배송지 등록
	@GetMapping("/myPage/shipping/add")
	public String shipEnroll() {
		return "/myPage/myPageInfo/myPageAddShipping";
	}
	
	
}
