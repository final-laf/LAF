package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageLikeServcie;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;

@Controller
@SessionAttributes({"loginMember", "likeList"})
public class MypageLikeController {
	
	@Autowired
	private MypageLikeServcie service;
	@Autowired
	private ProductService productService;
	@Autowired
	private OptionService optionService;
	
	
	// 찜 목록 추가
	@GetMapping("/like/add")
	@ResponseBody
	public int insertLike(
			long productNo, 
			@SessionAttribute("loginMember") Member loginMember,
			@SessionAttribute("likeList") List<Long> likeList) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = service.insertLike(map);
		if(result > 0 && likeList.add(productNo)) 
			return 1; // succeed 
		return 0; // failed
	}
	
	// 찜 목록 삭제
	@GetMapping("/like/delete")
	@ResponseBody
	public int deleteLike(
			long productNo, 
			@SessionAttribute("loginMember") Member loginMember,
			@SessionAttribute("likeList") List<Long> likeList) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = service.deleteLike(map);
		if(result > 0 && likeList.remove(productNo)) 
			return 1; // succeed 
		return 0; // failed
	}
	
	// 찜 목록 삭제 (여러개)
	@GetMapping("/like/delete/selected")
	@ResponseBody
	public int deleteSelectedLike(
			String data, 
			@SessionAttribute("loginMember") Member loginMember,
			@SessionAttribute("likeList") List<Long> likeList) {
		
		
		List<Long> productNoList = new ArrayList<>();
		List<String> strList = Arrays.asList(data.split("-"));
		for(String str : strList)
			productNoList.add(Long.parseLong(str));
		
		Map<String, Object> map = new HashMap<>();
		map.put("productNoList", productNoList);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = service.deleteSelectedLike(map);
		if(result > 0 && likeList.removeAll(productNoList))
			return 1; // succeed 
		return 0; // failed
	}
	
	// 찜 목록 조회
	@GetMapping("/myPage/like")
	public String like(
			Model model,
			@SessionAttribute("likeList") List<Long> likeList,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("likeList", likeList);
		paramMap.put("cp", cp);
		
		Map<String, Object> resultMap = productService.selectProductBySeveralKeys(paramMap);
		model.addAttribute("productList", resultMap.get("productList"));
		model.addAttribute("pagination", resultMap.get("pagination"));
		
		return "mypage/like";
	}
}
