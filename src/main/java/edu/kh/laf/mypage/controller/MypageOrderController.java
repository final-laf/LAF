package edu.kh.laf.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageOrderController {

	
	// 나의 주문목록 조회
	@GetMapping("/myPage/order") // 연결 에러남
	public String order() {
		return "/myPage/myPageOrder/myPageOrderList";
	}

	
}
