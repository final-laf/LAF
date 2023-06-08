package edu.kh.laf.product.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductController {

	// 카테고리 상품목록 
	@GetMapping("/{category:[0-9]+}")
	public String category() {
		return "/shopping/categoryList";
	}
	
	// 상품상세조회 
	@GetMapping("/{category:[0-9]+}/{no:[0-9]+}")
	public String product() {
		return "/shopping/product";
	}
	
}
