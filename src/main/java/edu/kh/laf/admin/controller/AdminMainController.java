package edu.kh.laf.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.main.model.service.MainService;

@Controller
public class AdminMainController {
	
	@Autowired
	private MainService service;
	
	// 대쉬보드
	@GetMapping("/admin")
	public String admin() {
		return "/admin/dashboard";
	}
	
	// 메인화면관리 : 배너관리
	@GetMapping("/admin/banner")
	public String banner(Model model) {
		
		List<Banner> bannerList = service.selectBannerList();
		model.addAttribute("bannerList", bannerList);
		
		return "/admin/adminMain/banner";
	}
	
	// 메인화면관리 : 카테고리
	@GetMapping("/admin/category")
	public String category() {
		return "/admin/adminMain/category";
	}
	
}
