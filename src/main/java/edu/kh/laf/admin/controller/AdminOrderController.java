package edu.kh.laf.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.order.model.service.OrderService;

@Controller
public class AdminOrderController {
	
	@Autowired
	private OrderService service; // 주문서비스
	
	
	// 주문관리 : 주문현황
	@GetMapping("/admin/order/cur")
	public String orderCur() {
		return "/admin/adminOrder/orderCurrent";
	}
	
	// 주문관리 : 주문조회
	@GetMapping("/admin/order")
	public String order() {
		return "/admin/adminOrder/orderSelect";
	}
	
	// 오늘 주문현황조회
	@PostMapping("/admin/order/cur")
	@ResponseBody
	public List<Map<String, String>> todayOrderState() {
		return service.selectTodayOrderState();
	}
	
	// 오늘 주문목록조회
	@PostMapping("/admin/order/list")
	@ResponseBody
	public List<Map<String, Object>> todayOrderList() {
		return service.selectTodayOrderList();
	}
	
	// 주문처리상태변경
	@PostMapping("/admin/order/state")
	@ResponseBody
	public int changeOrderState(@RequestBody List<Map<String, Object>> paramMap) {
		return service.changeOrderState(paramMap);
	}

	
}
