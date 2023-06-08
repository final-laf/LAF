package edu.kh.laf.member.controller;

import edu.kh.laf.member.model.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("shopping/product")
    public String test(String memberId, String memberPw, Model model) {
        return "shopping/product";
    }
    
	@GetMapping("/login")
	public String mypageLogin() {
		return "/mypage/mypageLogin";
	}
	
	@GetMapping("/signup")
	public String mypageSignUp() {
		return "/mypage/mypageSignUp";
	}
	
	@GetMapping("/dash")
	public String mypageDash() {
		return "/mypage/mypageDash";
	}
	
	@GetMapping("/coupon")
	public String mypageCoupon() {
		return "/mypage/mypageCoupon";
	}
	
	@GetMapping("/point")
	public String mypagePoint() {
		return "/mypage/mypagePoint";
	}
	
	@GetMapping("/shipping")
	public String mypageShipping() {
		return "/mypage/mypageShipping";
	}
	
	@GetMapping("/addshipping")
	public String mypageAddShipping() {
		return "/mypage/mypageAddShipping";
	}
}