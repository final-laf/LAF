package edu.kh.laf.order;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class orderController {

	@GetMapping("/orderdetail")
	public String orderDetail() {
		return "/order/orderDetail";
	}
	@GetMapping("/ordertest")
	public String ordertest() {
		return "/order/ordertest";
	}
}
