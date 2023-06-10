package edu.kh.laf.order.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.service.OrderService;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.dto.Product;

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
		
		Cart cart2 = new Cart();
		cart2.setMemberNo(2);
		cart2.setProductNo(2);
		cart2.setOptionNo(11);
		cart2.setOptionAmount(1);
		
		cartList.add(cart2);
		// ---------------------------
		// 주문자정보
		Member orderMember = service.orderMember(cartList.get(0).getMemberNo());
		model.addAttribute("orderMember", orderMember);
		
		// 주문상품정보
		List<Product> orderList = service.orderList(cartList);
		model.addAttribute("orderList", orderList);	
		return "/order/order";
	}
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail() {
		return "/order/orderDetail";
	}
	
}
