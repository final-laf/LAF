package edu.kh.laf.order.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.SessionAttributes;


import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageService;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.order.model.service.OrderService;
import edu.kh.laf.product.model.dto.Option;

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

	// 상품품절확인
	@PostMapping(value="/orderCheck", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String orderCheck(@RequestBody Map<String, String> orderData){
		
		// 상품번호 및 주문수량
		int productNo = Integer.parseInt(orderData.get("productNo"));
		int count = Integer.parseInt(orderData.get("count"));
		// 상품옵션전체조회
		Option option = service.SelectOrderCheck(orderData);
		
		// 상품이름조회 + 10글자만
		String productName = service.SelectProductName(productNo);
		String message = "";
		
		// 주문수량, 재고 비교
		if(option.getStock() == 0 ){
			message = productName + "["+ option.getColor() +"/" + option.getSize() +"]" +" 현재 품절입니다.";
		}else if(option.getStock() < count){
//			message = "현재 남아있는 재고는 " + option.getStock() +"개 입니다.";
			message = productName + "["+ option.getColor() +"/" + option.getSize() +"]" +" 현재 남아있는 재고는 " + option.getStock() +"개 입니다.";
		}
		System.out.println(message);
		return message;
	}
	
	// 결제시
	@PostMapping("/order")
	public String payment(Order order) {
		
		// 1.
		// 상품 리스트는 세션에서 받기
//		System.out.println(order);

		// 2.
		// 주문번호 시퀀스 번호 얻어오기
		// 주문고유번호 생성 230616-memberNo-[랜덤영어(대문자만)/숫자6자리]
		// 상품 별 주문번호 주문고유번호 부여 for

		//3.
		// 회원 비회원 구분하기 세션에서 가져와서 비교
		// 비회원일 경우 멤버테이블 새로 생성해서 번호조회해오기
		// 회원일경우 바로 회원번호 넣어주기
		
		//4. 
		// order테이블 인설트하기
		
		//5. 
		// order_product 테이블 인설트하기
		
		//6.
		// 장바구니 삭제하기 - 세션값 제거
		
		//7.
		// 상품 테이블 / 판매량, 상품상태(모든옵션재고)
		
		//8.
		// option 업데이트하기 / 재고, 판매량
		
		//9.
		// 회원일경우만
		// member테이블 업데이트하기 / 적립금, 누적구매액
		// 쿠폰 테이블 업데이트 / 사용여부
		// 적립금 내역 테이블 데이터 삽입
		
		
		//10.
		// 주문테이블 조회해서 번호얻어와서 이동할 번호 path
		return "/order/orderDetail"; //주문상세조회로 넘어가기
	}
	
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail() {
		return "/order/orderDetail";
	}
	
}
