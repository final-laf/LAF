package edu.kh.laf.product.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CartController {

	// 장바구니
	@GetMapping("/cart")
	public String cart() {
		return "/shopping/cart";
	}
	
}
