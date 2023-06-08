package edu.kh.laf.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageOrderController {

	// 나의 주문목록 조회
	@GetMapping("/my/order")
	public String order() {
		return "/mypage/orderList";
	}
	
}
