package edu.kh.laf.mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.member.model.dto.Member;
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
		
		// 로그인멤버의 주문 조회(최근 3개월 이내의)
		List<Order> myPageOrderList = service.selectMyPageOrderList(loginMember); 
		model.addAttribute("myPageOrderList", myPageOrderList);
		
		// 각 주문 번호별로 주문한 상품 매칭
		Map<Order, List<OrderProduct>> orderList = new HashMap<>(); 
		for(Order myPageOrder : myPageOrderList) {
			// 주문번호로 order_product 테이블에서 해당 상품 조회
			List<OrderProduct> myPageOrderProductList = service.selectMyPageOrderProductList(myPageOrder.getOrderNo());
			// 각 주문과 각 상품리스트를 매핑
			orderList.put(myPageOrder, myPageOrderProductList);
		}
		
		model.addAttribute("orderList", orderList);
		
		
		return "/myPage/myPageOrder/myPageOrderList";
	}
	
	// 찜 목록
	@GetMapping("/myPage/like")
	public String like() {
		return "/myPage/like";
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

	
}
