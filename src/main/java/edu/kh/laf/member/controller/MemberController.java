package edu.kh.laf.member.controller;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.service.MemberService;
import edu.kh.laf.member.model.service.MemberServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@SessionAttributes({"loginMember"})
public class MemberController {

    @Autowired
    private MemberService service;
    
    // 로그인 페이지 이동
	@GetMapping("/login")
	public String login() {
		return "/member/login";
	}
	
	// 회원가입 페이지 이동
	@GetMapping("/signup")
	public String signup() {
		return "/member/signUp";
	}
	
	// 로그인 기능
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
			
			
//			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
//			if(saveId != null) { // 체크 되었을 때
//				cookie.setMaxAge(60 * 60 * 24 * 30); // 초 단위로 지정
//			}else {
//				cookie.setMaxAge(0);
//			}
//			cookie.setPath("/"); 
//			resp.addCookie(cookie);
			
			
		} else { // 로그인 실패 시
			path += referer; // HTTP Header - referer(이전 주소)
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		
		return path;
	}

	// 로그아웃 기능
	@GetMapping("/logout")
	  public String logout(SessionStatus status, HttpSession session) {
	    status.setComplete(); 
	    return "redirect:/";
	}
   
	// 회원 가입 진행
	@PostMapping("/signUp")
	public String signUp(Member inputMember
				, String[] memberAddress
				, String[] memberBirth
				, RedirectAttributes ra) {
		
		
		System.out.println(inputMember.getRefundAccount());
		System.out.println(inputMember.getRefundBank());
		
	
		// 분리된 주소값 구분자를 넣어 String으로 변환, 입력
		// 만약 주소를 입력하지 않은 경우(,,) null로 변경
		if(inputMember.getMemberAddress().equals(",,")) {
			inputMember.setMemberAddress(null);
		
		}else {
			// 주소 요소 사이에 "^^^" 추가
			String addr = String.join("^^^", memberAddress);
			inputMember.setMemberAddress(addr);
		}
		
	
		// 분리된 생년월일 String으로 변환, 입력
		// 만약 생년월일을 입력하지 않은 경우(,,) null로 변경
		if(inputMember.getMemberBirth().equals(",,")) {
			inputMember.setMemberBirth(null);
			
		}else {
			// 주소 요소 사이에 "^^^" 추가
			String birth =  Arrays.stream(memberBirth).collect(Collectors.joining());
			inputMember.setMemberBirth(birth);
		}
		
		
		
		
		
		// 회원 가입 서비스 호출
		int result = service.signUp(inputMember);
		
		// 가입 성공 여부에 따라 주소 결정
		String path = "redirect:";
		String message = null;
		
		if(result > 0) { // 가입 성공
			path += "/"; // 메인 페이지
			message = inputMember.getMemberName() + "님의 가입을 환영합니다.";
		} else { // 가입 실패
			path += "signUp";  
			message = "회원 가입 실패!";
		}
		
		ra.addFlashAttribute("message", message);
		return path;
	}
	
	
	
	// 아이디 중복 검사
	@GetMapping("/dupCheck/id")
	@ResponseBody
	public int checkId(String memberId) {
		return service.checkId(memberId);
	}
	
	// 이메일 중복 검사
	@GetMapping("/dupCheck/email")
	@ResponseBody
	public int checkEmail(String memberEmail) {
		return  service.checkEmail(memberEmail);
	}
	
	
	
	
}