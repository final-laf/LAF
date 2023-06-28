package edu.kh.laf.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.service.MemberService;

@Controller
public class AdminMemberController {
	
    @Autowired
    private MemberService memberService;

	// 회원관리 : 회원조회
	@GetMapping("/admin/member")
	public String member(Model model
						,@RequestParam Map<String, Object> map) {
		// 값이 빈 키 제거
		Map<String, Object> paramMap = new HashMap<>();
		for(String key : map.keySet()) {
			Object value = map.get(key);
			paramMap.put(key, value);
		}
		
		// 페이지리스트가 적용된 회원 조회
		Map<String, Object> resultMap = memberService.selectAllMemberList(paramMap);
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("memberList", resultMap.get("memberList"));
		model.addAttribute("listCount", resultMap.get("listCount"));
		model.addAttribute("paramMap", paramMap);
		return "/admin/adminMember/member";
		
		
	}
	
	// 회원 정보 비동기 조회
	@GetMapping("/admin/member/memberdetail")
	@ResponseBody
	public Member selectMemberDetail(Long memberNo) {
		return memberService.selectMemberDetail(memberNo);
	}
	
	// 회원 정보 비동기 조회(회원 기본 배송지)
	@GetMapping("/admin/member/defaultAddress")
	@ResponseBody
	public String selectMemberDetailDefaultAddress(Long memberNo) {
		Address address = memberService.selectMemberDetailDefaultAddress(memberNo);
		String result;
		if(address == null) result = "N";
		else result = address.getAddress();
		return result;
	}
	
	// 주문 내역 비동기 조회
	@GetMapping("/admin/member/memberOrderList")
	@ResponseBody
	public Map<String, Object> selectMemberDetailOrderList(Long memberNo
											 ,Model model
											 ,@RequestParam(value="cp", required=false, defaultValue="1") int cp) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("memberNo", memberNo);
		paramMap.put("cp", cp);
		
		// 페이지리스트가 적용된 주문 조회
		Map<String, Object> resultMap = memberService.selectAllOrderList(paramMap);
		Map<String, Object> jsonMap = new HashMap<>();
		
		jsonMap.put("OrderListpagination", resultMap.get("OrderListpagination"));
		jsonMap.put("orderMaps", resultMap.get("orderMaps"));
		return jsonMap;
	}
	
}
