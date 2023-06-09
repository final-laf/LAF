package edu.kh.laf.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminMemberController {

	// 회원관리 : 회원조회
	@GetMapping("/admin/member")
	public String member() {
		return "/admin/adminMember/member";
	}
	
}
