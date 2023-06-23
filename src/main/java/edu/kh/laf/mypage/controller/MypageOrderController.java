package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.mypage.model.service.MypageService;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;

@Controller
public class MypageOrderController {
	
	@Autowired
	private MypageService service;

	
	// 나의 주문목록 조회
	@GetMapping("/myPage/order") 
	public String order(@SessionAttribute(value = "loginMember", required = false) Member loginMember,
						Model model) {
		
		// 첫 페이지
		// 로그인멤버의 주문 조회(최근 3개월 이내의)
		List<Order> Orders = service.selectMyPageOrderList(loginMember);
		// 주문 상품목록 조회
//		List<OrderProduct> OrderProducts = service.selectOrderProducts(Orders);
//		System.out.println(OrderProducts);
		
		// 주문 리스트와, 각 주문별 상품목록 리스트를 모델로 전달
//		model.addAttribute("Orders", Orders);
//		model.addAttribute("OrderProducts", OrderProducts);
		
		return "/myPage/myPageOrder/myPageOrderList";
	}
	
  
	// 적립금 및 쿠폰 : 적립금
	@GetMapping("/myPage/point")
	public String point(@SessionAttribute(value = "loginMember", required = false) Member loginMember
						,@RequestParam(value="cp", required=false, defaultValue="1") int cp			
						,Model model) {
		
		// 회원번호로 적립금 적립/사용 내역 조회
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("memberNo", loginMember.getMemberNo());
		paramMap.put("cp", cp);
		
		Map<String, Object> resultMap = service.selectPoint(paramMap);
		model.addAttribute("pointList", resultMap.get("pointList"));
		model.addAttribute("accumulatedPoint", resultMap.get("accumulatedPoint"));
		model.addAttribute("accumulatedUsedPoint", resultMap.get("accumulatedUsedPoint"));
		model.addAttribute("pagination", resultMap.get("pagination"));

		return "/myPage/myPageOrder/myPagePoint";
	}
	
	// 적립금 및 쿠폰 : 쿠폰
	@GetMapping("/myPage/coupon")
	public String coupon(@SessionAttribute(value = "loginMember", required = false) Member loginMember
						,@RequestParam(value="cp", required=false, defaultValue="1") int cp			
						,Model model) {
		
		// 회원번호로 쿠폰 내역 조회
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("memberNo", loginMember.getMemberNo());
		paramMap.put("cp", cp);
		
		Map<String, Object> resultMap = service.selectCoupon(paramMap);
		model.addAttribute("couponList", resultMap.get("couponList"));
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("listCount", resultMap.get("listCount"));
		
		return "/myPage/myPageOrder/myPageCoupon";
	}

	
}
