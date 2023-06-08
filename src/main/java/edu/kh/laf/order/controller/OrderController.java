package edu.kh.laf.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OrderController {

	// 주문정보 입력 페이지
	@GetMapping("/order")
	public String order() {
		return "/order/order";
	}
	
	// 주문상세조회
	@GetMapping("/order/{no:[0-9]+}")
	public String detail() {
		return "/order/orderDetail";
	}
	
}
