package edu.kh.laf.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageQnaController {
	
	// 1:1 문의 내역
	@GetMapping("/my/qna")
	public String qna() {
		return "/mypage/mypageQuestion";
	}

}
