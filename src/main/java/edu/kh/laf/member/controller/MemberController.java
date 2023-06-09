package edu.kh.laf.member.controller;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.service.MemberService;
import edu.kh.laf.member.model.service.MemberServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@SessionAttributes({"loginMember"})
public class MemberController {

    @Autowired
    private MemberService service;
    
	@GetMapping("/login")
	public String login() {
		return "/member/login";
	}
	
	@GetMapping("/signup")
	public String signup() {
		return "/member/signUp";
	}
	
	@PostMapping("/login")
	public String login(Member inputMember, Model model
			, @RequestHeader(value="referer") String referer
			, @RequestParam(value="saveId", required=false) String saveId
			, HttpServletResponse resp
			, RedirectAttributes ra
			) {
		
		Member loginMember = service.login(inputMember);
		String path = "redirect:"; 
		if(loginMember != null) { // 로그인 성공 시
			path += "/"; // 메인페이지로 리다이렉트
			model.addAttribute("loginMember", loginMember);
			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
			if(saveId != null) { // 체크 되었을 때
				cookie.setMaxAge(60 * 60 * 24 * 30); // 초 단위로 지정
			}else {
				cookie.setMaxAge(0);
			}
			cookie.setPath("/"); 
			resp.addCookie(cookie);
		} else { // 로그인 실패 시
			path += referer; // HTTP Header - referer(이전 주소)
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		
		return path;
	}
	
}