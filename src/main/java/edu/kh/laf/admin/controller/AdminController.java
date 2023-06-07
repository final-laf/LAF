package edu.kh.laf.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/admin")
@Controller
public class AdminController {
	
	// 대시보드 이동
	@GetMapping("/dashboard")
	public String adminDashboard() {
		return "/admin/dashboard";
	}
	
	// 메인배너관리 이동
	@GetMapping("/mainview")
	public String adminMainView() {
		return "/admin/mainview";
	}
	
	// 메인카테고리관리 이동
	@GetMapping("/category")
	public String adminCategory() {
		return "/admin/category";
	}
	
	// 회원관리 이동
	@GetMapping("/member")
	public String adminMember() {
		return "/admin/member";
	}
	
	// 상품등록 이동
	@GetMapping("/productenroll")
	public String adminProductEnroll() {
		return "/admin/productenroll";
	}
	
	// 상품조회 이동
	@GetMapping("/productselect")
	public String adminProductselect() {
		return "/admin/productselect";
	}
	
	// 주문현황 이동
	@GetMapping("/ordercurrent")
	public String adminOrderCurrent() {
		return "/admin/ordercurrent";
	}
	
	// 주문조회 이동
	@GetMapping("/orderselect")
	public String adminOrderselect() {
		return "/admin/orderselect";
	}
	

	
	
	
}
