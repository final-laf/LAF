package edu.kh.laf.order.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.order.model.service.OrderService;
import edu.kh.laf.product.model.dto.Product;

@Controller
public class OrderController {
	
	@Autowired
	private OrderService service;

	// 주문정보 입력 페이지
	@GetMapping("/order")
	public String order(OrderProduct cart, Model model) {
		// 임시 장바구니 정보 세팅---------
		List<OrderProduct> cartList = new ArrayList<>();
		cart.setMemberNo(2);
		cart.setProductNo(1);
		cart.setOptionNo(2);
		cart.setCount(2);
		cartList.add(cart);
		OrderProduct cart2 = new OrderProduct();
		cart2.setMemberNo(2);
		cart2.setProductNo(2);
		cart2.setOptionNo(11);
		cart2.setCount(1);
		cartList.add(cart2);
		OrderProduct cart3 = new OrderProduct();
		cart3.setMemberNo(2);
		cart3.setProductNo(2);
		cart3.setOptionNo(10);
		cart3.setCount(11);
		cartList.add(cart3);
		OrderProduct cart4 = new OrderProduct();
		cart4.setMemberNo(2);
		cart4.setProductNo(1);
		cart4.setOptionNo(3);
		cart4.setCount(2);
		cartList.add(cart4);
		
		// ---------------------------
		// 주문자정보
		Member orderMember = service.selectOrderMember(cartList.get(0).getMemberNo());
		model.addAttribute("orderMember", orderMember);
		
		// 주문상품정보
		List<OrderProduct> orderList = service.selectOrderProduct(cartList);
		model.addAttribute("orderList", orderList);	
		return "/order/order";
	}
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail() {
		return "/order/orderDetail";
	}
	
}
