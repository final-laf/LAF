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
						@RequestParam(value="cp", required=false, defaultValue="5") int cp,
						@RequestParam(value="sd", required=false, defaultValue="3") int sd,
						Model model) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("memberNo", loginMember.getMemberNo());
		paramMap.put("sd", sd); // 검색 기간
		paramMap.put("cp", cp);
		
		// 로그인멤버의 주문 조회(최근 3개월 이내의) 페이지네이션 적용된 리스트 조회
		List<Order> Orders = service.selectSearchOrderList(paramMap);
		// 주문 상품목록 조회 위에서 조회된거 기준으로 다시 조회(주문 리스트와, 각 주문별 상품목록 리스트)
		List<Map<String, Object>> orderMaps = service.selectOrderProducts(Orders);
		
		model.addAttribute("orderMaps", orderMaps);
		
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
