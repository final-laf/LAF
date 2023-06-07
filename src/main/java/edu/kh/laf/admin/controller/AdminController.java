package edu.kh.laf.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/admin")
@Controller
public class AdminController {

	@GetMapping("/dashboard")
	public String adminDashboard() {
		return "/admin/dashboard";
	}
	
	@GetMapping("/mainview")
	public String adminMainView() {
		return "/admin/mainview";
	}
	
	@GetMapping("/member")
	public String adminMember() {
		return "/admin/member";
	}
	
	@GetMapping("/productenroll")
	public String adminProductEnroll() {
		return "/admin/productenroll";
	}
	
	@GetMapping("/ordercurrent")
	public String adminOrderCurrent() {
		return "/admin/ordercurrent";
	}
	

	
	
	
}
