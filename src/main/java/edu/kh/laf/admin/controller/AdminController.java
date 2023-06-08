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
	@GetMapping("/adminMain/mainView")
	public String adminMainView() {
		return "/admin/adminMain/mainView";
	}
	
	// 메인카테고리관리 이동
	@GetMapping("/adminMain/category")
	public String adminCategory() {
		return "/admin/adminMain/category";
	}
	
	// 회원관리 이동
	@GetMapping("/adminMember/member")
	public String adminMember() {
		return "/admin/adminMember/member";
	}
	
	// 상품등록 이동
	@GetMapping("/adminProduct/productEnroll")
	public String adminProductEnroll() {
		return "/admin/adminProduct/productEnroll";
	}
	
	// 상품조회 이동
	@GetMapping("/adminProduct/productSelect")
	public String adminProductselect() {
		return "/admin/adminProduct/productSelect";
	}
	
	// 주문현황 이동
	@GetMapping("/adminOrder/orderCurrent")
	public String adminOrderCurrent() {
		return "/admin/adminOrder/orderCurrent";
	}
	
	// 주문조회 이동
	@GetMapping("/adminOrder/orderSelect")
	public String adminOrderselect() {
		return "/admin/adminOrder/orderSelect";
	}
	

	
	
	
}
