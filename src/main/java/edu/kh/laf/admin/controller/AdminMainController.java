package edu.kh.laf.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminMainController {
	
	// 대쉬보드
	@GetMapping("/admin")
	public String admin() {
		return "/admin/dashboard";
	}
	
	// 메인화면관리 : 배너관리
	@GetMapping("/admin/banner")
	public String banner() {
		return "/admin/mainview";
	}
	
	// 메인화면관리 : 카테고리
	@GetMapping("/admin/category")
	public String category() {
		return "/admin/category";
	}
	
}
