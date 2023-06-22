package edu.kh.laf.mypage.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.service.MemberService;
import edu.kh.laf.mypage.model.service.MypageService;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.service.OrderService;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@SessionAttributes({"loginMember"})
public class MypageMemberController {
	
	@Autowired
	private MypageService service;
	
	@Autowired
	private OrderService orderService;
	

	// 마이페이지 대쉬보드
	@GetMapping("/myPage")
	public String my(@SessionAttribute(value = "loginMember", required = false) Member loginMember,
					 Model model) {
		
		// 로그인멤버의 쿠폰 정보 조회
		List<Coupon> couponList = orderService.selectCouponList(loginMember.getMemberNo());
		model.addAttribute("couponList", couponList);
		
		// 로그인 멤버의 목표 금액 설정
		long goal;
		switch(loginMember.getMemberGrade()) {
			case "B" : goal = 100000 - (long)loginMember.getMemberTotalPay(); break;
			case "S" : goal = 1000000 - (long)loginMember.getMemberTotalPay(); break;
			case "G" : goal = 5000000 - (long)loginMember.getMemberTotalPay(); break;
			default: goal = 0;
		}
		model.addAttribute("goal", goal);
		
		// 로그인 멤버의 주문 조회(최근 3개월 이내)
		List<Order> myPageOrderList = service.selectMyPageOrderList(loginMember); 
		model.addAttribute("myPageOrderList", myPageOrderList);
		
		
		
		return "/myPage/myPageDashboard";
	}
	
	
	
	// 회원정보 수정 페이지 이동  
	@GetMapping("/myPage/info") 
	public String info(Model model
					  ,@SessionAttribute("loginMember") Member loginMember) {
		
		// 로그인멤버의 쿠폰 정보 조회
		List<Coupon> couponList = orderService.selectCouponList(loginMember.getMemberNo());
		model.addAttribute("couponList", couponList);
		
		return "/myPage/myPageInfo/myPageInfo";
	}
	
	
	
	// 회원정보 수정
	@PostMapping("/myPage/info")
	public String editMyPageInfo(Member inputMember
							   , String[] memberAddress
							   , String[] memberBirth
							   , @RequestHeader(value="referer") String referer
							   , @SessionAttribute("loginMember") Member loginMember
							   , RedirectAttributes ra
							   , Model model) {
		
			
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
			// 생일 요소 사이에 "^^^" 추가
			String birth =  Arrays.stream(memberBirth).collect(Collectors.joining());
			inputMember.setMemberBirth(birth);
		}
		
		
		// 로그인한 회원의 번호를 inputMember에 추가
		inputMember.setMemberNo(loginMember.getMemberNo());
		// 회원 수정 서비스 호출
		int result = service.editMyPageInfo(inputMember);
		String message = null;
		if(result > 0) {
			message = "회원 정보가 수정되었습니다.";
			// Session에 로그인된 회원 정보도 수정(동기화)
			loginMember = service.selectMember(loginMember.getMemberNo());
			model.addAttribute("loginMember", loginMember);
		} else {
			message = "회원 정보 수정 실패.";
		}
		ra.addFlashAttribute("message", message);
		return "redirect:" + referer ;
	}
	
	
	// 회원 탈퇴
	@PostMapping("/myPage/delete")
	public String deleteMember(@SessionAttribute("loginMember") Member loginMember
								,SessionStatus status
								,HttpServletResponse resp
								,RedirectAttributes ra) {
		
		Long memberNo = loginMember.getMemberNo();
		int result = service.deleteMember(memberNo);
		
		String path = "redirect:";
		String message = null;
		
		//탈퇴 성공 시
		if(result > 0) {
			message = "탈퇴 되었습니다";
			path += "/";
			status.setComplete();
//			Cookie cookie = new Cookie("saveId", ""); 
//			cookie.setMaxAge(0);
//			cookie.setPath("/"); 
//			resp.addCookie(cookie); 
		}
		//탈퇴 실패 시
		else {
			message = "현재 비밀번호가 일치하지 않습니다";
			path += "/myPage/delete";
		}
		
		ra.addFlashAttribute("message",message);
		return path;
	}
	
	
	// 비밀번호 수정 페이지 이동  
	@GetMapping("/myPage/changePw") 
	public String changePw() {
		return "/myPage/myPageInfo/myPageChangePw";
	}
	
	
	// 비밀번호 수정
	@PostMapping("/myPage/changePw") 
	public String changePassword(@RequestHeader(value="referer") String referer
			 					,@SessionAttribute("loginMember") Member loginMember
								,String memberPw
								,@RequestParam("newMemberPw") String newMemberPw
								,RedirectAttributes ra) {
		
		// 기존의 비밀번호와 일치하면, 새로운 비밀번호를 기존의 비밀번호로 업데이트
		String message = null;
		int result = service.changePw(memberPw, newMemberPw ,loginMember);
		if(result > 0) {
			message="비밀번호가 변경되었습니다.";
		} else {
			message="현재 비밀번호가 일치하지 않습니다.";
		}
		ra.addFlashAttribute("message", message);
		return "redirect:" + referer;
	}
	
	

	// 배송지 관리
	@GetMapping("/myPage/shipping")
	public String ship(@SessionAttribute("loginMember") Member loginMember
					, Model model) {
		// 배송지 목록 조회
		List<Address> addressList = service.selectAddressList(loginMember.getMemberNo());
		for(Address add : addressList) {
			add.setAddress(add.getAddress().replace("^^^", " "));
		}
		model.addAttribute("addressList", addressList);

		return "/myPage/myPageInfo/myPageShipping";
	}
	
	
	
	// 배송지 관리 : 배송지 등록
	@GetMapping("/myPage/shipping/add")
	public String shipEnroll() {
		return "/myPage/myPageInfo/myPageAddShipping";
	}
	
	
}
