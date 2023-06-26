package edu.kh.laf.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.service.MemberService;

@Controller
public class AdminMemberController {
	
    @Autowired
    private MemberService memberService;

	// 회원관리 : 회원조회
	@GetMapping("/admin/member")
	public String member(Model model
						,@RequestParam(value="cp", required=false, defaultValue="1") int cp
						, @RequestParam Map<String, Object> paramMap) {
		
		
		Map<String, Object> resultMap = memberService.selectAllMemberList(cp);
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("memberList", resultMap.get("memberList"));
		model.addAttribute("listCount", resultMap.get("listCount"));
		
		return "/admin/adminMember/member";
	}
	
	// 회원 정보 비동기 조회
	@PostMapping("/admin/member/memberdetail")
	@ResponseBody
	public Member selectMemberDetail(Long memberNo) {
		return memberService.selectMemberDetail(memberNo);
	}
	
}
