package edu.kh.laf.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminOrderController {
	
	// 주문관리 : 주문현황
	@GetMapping("/admin/order/cur")
	public String orderCur() {
		return "/admin/ordercurrent";
	}
	
	// 주문관리 : 주문조회
	@GetMapping("/admin/order")
	public String order() {
		return "/admin/orderselect";
	}
	
}
