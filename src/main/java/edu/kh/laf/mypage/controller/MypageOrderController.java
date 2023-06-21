package edu.kh.laf.mypage.controller;

import java.util.List;

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
		List<Order> Orders = service.selectMyPageOrderList(loginMember); 
		
		// ***** !! 꼭 오더 샘플데이터에 해당 상품이 있어야 함(지금은 샘플 데이터에 해당 상품이 없는 건도 있어서, orderProduct 관련 사항 다 주석처리 중 *****
		// 각 주문별로 상품목록을 조회해서, 상품목록들로 이루어진 리스트를 만들기
		List<List<OrderProduct>> orderProductsList = null;
		for(Order order : Orders) {
			// 주문번호로 order_product 테이블에서 해당 상품들 조회
			List<OrderProduct> orderProducts = service.selectMyPageOrderProductList(order.getOrderNo());
			// 상품 목록으로 이루어진 리스트에 상품들 넣기 (인덱스가 주문순서와 동일)
//			if(orderProducts != null) {
//				orderProductsList.add(orderProducts);
//			}
		}
		
		// 주문 리스트와, 각 주문별 상품목록 리스트를 모델로 전달
		model.addAttribute("Orders", Orders);
//		model.addAttribute("orderProductsList", orderProductsList);
		
		
		return "/myPage/myPageOrder/myPageOrderList";
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
