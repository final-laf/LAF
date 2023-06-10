package edu.kh.laf.order.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.service.OrderService;
import edu.kh.laf.product.dto.Cart;

@Controller
public class OrderController {
	
	@Autowired
	private OrderService service;

	// 주문정보 입력 페이지
	@GetMapping("/order")
	public String order(Cart cart, Model model) {
		// 임시 장바구니 정보 세팅---------
		cart.setMemberNo(2);
		cart.setProductNo(1);
		cart.setOptionNo(2);
		cart.setOptionAmount(2);
		
		List<Cart> cartList = new ArrayList<>();
		cartList.add(cart);
		// ---------------------------
		
		// 주문자정보
		Member orderMember = service.orderInfo(cartList.get(0).getMemberNo());
		
		model.addAttribute("orderMember", orderMember);
		
		return "/order/order";
	}
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail() {
		return "/order/orderDetail";
	}
	
}
