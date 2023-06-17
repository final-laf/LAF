package edu.kh.laf.mypage.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageLikeServcie;

@Controller
public class MypageLikeController {
	
	@Autowired
	private MypageLikeServcie service;
	
	
	// 찜 목록 추가
	@GetMapping("/like/add")
	@ResponseBody
	public int insertLike(long productNo, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		return service.insertLike(map);
	}
	
	// 찜 목록 삭제
	@GetMapping("/like/delete")
	@ResponseBody
	public int deleteLike(long productNo, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		return service.deleteLike(map);
	}
}
