package edu.kh.laf.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/error")
public class ErrorController {
	
	// 로그인 에러
	@GetMapping("")
	public String test(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "test");
		return "redirect:/";
	}

	// 로그인 에러
	@GetMapping("/login")
	public String login(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "로그인 후 이용해주세요");
		return "redirect:/";
	}
	
	// 관리자기능 접근 제한 에러
	@GetMapping("/admin")
	public String admin(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "허용되지 않은 접근입니다.");
		return "redirect:/";
	}
}
