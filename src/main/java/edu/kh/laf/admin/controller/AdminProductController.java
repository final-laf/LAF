package edu.kh.laf.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminProductController {

	// 상품관리 : 상품조회
	@GetMapping("/admin/product")
	public String product() {
		return "/admin/adminProduct/productselect";
	}
	
	// 상품관리 : 상품등록
	@GetMapping("/admin/product/enroll")
	public String productEnroll() {
		return "/admin/adminProduct/productenroll";
	}
	
}