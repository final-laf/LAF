package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageQnaService;
import edu.kh.laf.mypage.model.service.MypageService;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@SessionAttributes({"searchQna"})
public class MypageQnaController {
	@Autowired
	private MypageQnaService qnaService;
	
	
	// 1:1 문의 내역
	@GetMapping(value = {"/myPage/qna/{categoryNo:[0-9]+}"})
	public String qna(
			@RequestParam(value="cp", required=false, defaultValue="1") int cp
			, Model model
			, @SessionAttribute("loginMember") Member loginMember
			, String categoryNo
			, @RequestParam Map<String, Object> paramMap
			) {
		System.out.println(paramMap);
		if(paramMap.get("category")==null) {
			paramMap.put("category", "write");
			paramMap.put("questionWrite", "1");
			paramMap.put("orderby", "qna_create_date");
		}
		if(paramMap.get("category")!=null) {
			if(paramMap.get("category").equals("write")) {
				categoryNo=paramMap.get("questionWrite").toString();
			}
			if(paramMap.get("category").equals("answer")) {
				categoryNo=paramMap.get("questionAnswer").toString();
			}
			if(paramMap.get("category").equals("question")) {
				categoryNo=paramMap.get("questionCategory").toString();
			}
		}
		// 검색어 없을 때
		if(paramMap.get("query") == null) { 
			System.out.println(paramMap);
			paramMap.put("memberNo", loginMember.getMemberNo());
			Map<String, Object> resultMap = qnaService.qnaList(paramMap, cp);
			model.addAttribute("resultMap", resultMap);
			
		//검색어 있을 때
		}else {
			System.out.println("검색어 있을때");
			paramMap.put("memberNo", loginMember.getMemberNo());
			Map<String, Object> resultMap = qnaService.searchQnaList(paramMap, cp);
			model.addAttribute("resultMap", resultMap);
		}
		
		model.addAttribute("categoryNo", categoryNo);
		return "/myPage/myPageBoard/myPageQuestion";
	}
	


}

