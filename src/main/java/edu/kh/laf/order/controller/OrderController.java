package edu.kh.laf.order.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import edu.kh.laf.product.model.service.CartService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@SessionAttributes({"loginMember", "orderProductList"})
public class OrderController {
	
	@Autowired
	private OrderService service; // 주문서비스
	
	@Autowired
	private MypageService service2; // 배송지정보조회
	
	@Autowired
	private CartService service3; // 장바구니삭제

	// 주문정보 입력 페이지
	@GetMapping("/order")
	public String order(@SessionAttribute(value = "loginMember", required = false) Member loginMember,
						@SessionAttribute(value = "orderProductList", required = false) List<OrderProduct> orderProductList,
						Model model
						) {
		// 주문자정보
		Member orderMember = new Member();
		
		// 로그인 회원정보가 있을때만
		if (loginMember != null) {
			// 주문자정보
			orderMember = service.selectOrderMember(orderProductList.get(0).getMemberNo());
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
		model.addAttribute("orderMember", orderMember);
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
		return message;
	}
	
	// 결제시
	@PostMapping("/order")
	public String payment(Order order,
						@RequestParam Map<String, Object> orderData ,
						@SessionAttribute(value = "loginMember", required = false) Member loginMember,
						@SessionAttribute(value = "orderProductList", required = false) List<OrderProduct> orderProductList,
						HttpServletRequest req) {
		
		// 주문테이블추가 후 주문고유번호 가져오기
		String orderKey = service.insertOrder(order,orderData,loginMember);

		if(orderKey == "") {
			// 결제실패시 장바구니로 리다이렉트
			System.out.println("결제실패");
			return "redirect:/cart";
		}
		
		// 주문번호조회 후 order에 담기
		int orderNo = service.selectOrderNo(orderKey);
		order.setOrderNo(orderNo);
		
		// 상품별 서비스처리
		int productResult = service.changeProduct(orderNo, orderProductList);
		if(productResult == 0) { // 실패시 장바구니로 리다이렉트
			System.out.println("상품처리실패");
			return "redirect:/cart";
		}
		
		// 회원일경우
		if(loginMember != null) {
			// 포인트 서비스(적립 및 사용, 회원업데이트)
			int pointResult = service.changePoint(order);
			if(pointResult == 0) { // 실패시 장바구니로 리다이렉트
				return "redirect:/cart";
			}
			// 쿠폰을 썻다면 쿠폰 테이블 업데이트 / 사용여부
			if(order.getCouponNo() != 0) {
				int couponResult = service.updateCouponFL(order);
				if(couponResult == 0) { // 실패시 장바구니로 리다이렉트
					System.out.println("쿠폰업데이트 실패");
					return "redirect:/cart";
				}
			}
		}
		
		// [회원] 결제완료 후 장바구니 상품 삭제
		service3.deleteCartAfterOrder(orderProductList);
		
		// [비회원] 결제완료 후 장바구니 상품 삭제
		Cookie[] cookies = req.getCookies();
		service3.deleteCart2AfterOrder(cookies, orderProductList);
		
		// 장바구니 삭제하기 - 세션값 제거
		req.getSession().removeAttribute("orderProductList");
		
		 //주문상세조회로 넘어가기 - 주문번호
		return "redirect:/order/" + orderNo;
	}
	
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail(@PathVariable int no, Model model) {
		
		// 주문한 내역조회
		Order order = service.selectOrder(no);
		model.addAttribute("order",order);
		
		// 주문한 상품목록조회
		List<OrderProduct> odpList = service.selectOrderDetailProductList(no);
		model.addAttribute("odpList",odpList);
		
		return "/order/orderDetail";
	}
	
}
