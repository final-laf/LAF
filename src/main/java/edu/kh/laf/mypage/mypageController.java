package edu.kh.laf.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mypageController {

	@GetMapping("/like")
	public String mypageLike() {
		return "/mypage/like";
	}
	
	@GetMapping("/addshipping")
	public String mypageAddShipping() {
		return "/mypage/mypageAddShipping";
	}
	
	@GetMapping("/coupon")
	public String mypageCoupon() {
		return "/mypage/mypageCoupon";
	}
	
	@GetMapping("/dash")
	public String mypageDash() {
		return "/mypage/mypageDash";
	}
	
	@GetMapping("/editinfo")
	public String mypageEditinfo() {
		return "/mypage/mypageEditinfo";
	}
	
	@GetMapping("/login")
	public String mypageLogin() {
		return "/mypage/mypageLogin";
	}
	
	@GetMapping("/order")
	public String mypageOrder() {
		return "/mypage/mypageOrder";
	}
	
	@GetMapping("/point")
	public String mypagePoint() {
		return "/mypage/mypagePoint";
	}
	
	@GetMapping("/question")
	public String mypageQuestion() {
		return "/mypage/mypageQuestion";
	}
	
	@GetMapping("/shipping")
	public String mypageShipping() {
		return "/mypage/mypageShipping";
	}
	
	@GetMapping("/signup")
	public String mypageSignUp() {
		return "/mypage/mypageSignUp";
	}

	@GetMapping("/orderlist")
	public String mypageOrderList() {
		return "/mypage/orderList";
	}
	
	
	@GetMapping("/reviewlist")
	public String mypageReviewList() {
		return "/mypage/reviewlist";
	}
	
	
	@GetMapping("/reviewqueue")
	public String mypageReviewQueue() {
		return "/mypage/reviewQueue";
	}
	
	
	
	
	
}
