package edu.kh.laf.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.order.model.service.OrderService;

@Controller
public class AdminOrderController {
	
	@Autowired
	private OrderService service; // 주문서비스
	
	
	// 주문관리 : 주문현황
	@GetMapping("/admin/order/cur")
	public String orderCur() {
		return "admin/adminOrder/orderCurrent";
	}
	
	// 주문관리 : 주문조회
	@GetMapping("/admin/order")
	public String order(String findState, String findKeyword, 
						String findStartDate, String findEndDate,
						@RequestParam(value="sellState", required=false) String[] sellState,
						@RequestParam(value="payState", required=false) String[] payState,
						@RequestParam(value="cp", required=false, defaultValue="1") int cp,
						Model model
						) {

		
		Map<String, Object> paramMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		if(findState != null && !findState.equals("")) {
			paramMap.put("fs",findState);
			dataMap.put("findState", findState);
		}
		if(findKeyword != null && !findKeyword.equals("")) {
			paramMap.put("kw",findKeyword);
			dataMap.put("findKeyword", findKeyword);
		}
		if(findStartDate != null && !findStartDate.equals("")) {
			paramMap.put("sd",findStartDate);
			dataMap.put("findStartDate", findStartDate);
		}
		if(findEndDate != null && !findEndDate.equals("")) {
			paramMap.put("ed",findEndDate);
			dataMap.put("findEndDate", findEndDate);
		}
		if(sellState != null && sellState.length>0) {
			paramMap.put("sellState",sellState);
			dataMap.put("sellState", sellState);
		}
		if(payState != null && payState.length>0) {
			paramMap.put("payState",payState);
			dataMap.put("payState", payState);
		}
		paramMap.put("cp", cp); // 현재페이지
		
		model.addAttribute("dataMap", dataMap);
		
		Map<String, Object> returnMap = service.findOrderList(paramMap);
		if(returnMap != null) {
			if(returnMap.get("orderMaps") != null && returnMap.get("listCount") != null) {
				model.addAttribute("orderMaps", returnMap.get("orderMaps"));
				model.addAttribute("listCount", returnMap.get("listCount"));
			}
		}
		model.addAttribute("pagination", returnMap.get("pagination"));
		
		return "admin/adminOrder/orderSelect";
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
