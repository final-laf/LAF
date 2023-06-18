package edu.kh.laf.order.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;


import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageService;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.order.model.service.OrderService;

@Controller
@SessionAttributes({"loginMember", "orderProductList"})
public class OrderController {
	
	@Autowired
	private OrderService service;
	
	@Autowired
	private MypageService service2; // 배송지정보조회

	// 주문정보 입력 페이지
	@GetMapping("/order")
	public String order(@SessionAttribute(value = "loginMember", required = false) Member loginMember,
						@SessionAttribute(value = "orderProductList", required = false) List<OrderProduct> orderProductList,
						Model model
						) {
		System.out.println(orderProductList);
		// 주문자정보
		Member orderMember = service.selectOrderMember(orderProductList.get(0).getMemberNo());
		model.addAttribute("orderMember", orderMember);
		
		// 로그인 회원정보가 있을때만
		if (loginMember != null) {
			// 배송지정보조회
			List<Address> addressList = service2.selectAddressList(loginMember.getMemberNo());
			for(Address add : addressList) {
				add.setAddress(add.getAddress().replace("^^^", " "));
			}
			model.addAttribute("addressList", addressList);
			// 쿠폰정보조회
			List<Coupon> couponList = service.selectCouponList(loginMember.getMemberNo());
			model.addAttribute("couponList", couponList);
		}
		// 주문상품정보
		List<OrderProduct> orderList = service.selectOrderProduct(orderProductList);
		model.addAttribute("orderList", orderList);	
		return "/order/order";
	}

	
	// 결제시
	@PostMapping("/order")
	public String payment(Order order) {
		
		// 상품 리스트는 세션에서 받기
		
		System.out.println(order);
		
		// order테이블 인설트하기
		
		
//		insertOrder
		// order_product 테이블 인설트하기
		
		// 장바구니 삭제하기
				
		// 상품 테이블 / 판매량, 상품상태(모든옵션재고)
		
		// option 업데이트하기 / 재고, 판매량
		
		// member테이블 업데이트하기 / 적립금, 누적구매액
		
		// 쿠폰 테이블 업데이트 / 사용여부
		
		// 적립금 내역 테이블 데이터 삽입
		
		
		
		// 주문테이블 조회해서 번호얻어와서 이동할 번호 path
		return "/order/orderDetail"; //주문상세조회로 넘어가기
	}
	
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail() {
		return "/order/orderDetail";
	}
	
}
