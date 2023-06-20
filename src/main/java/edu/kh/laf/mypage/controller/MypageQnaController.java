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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageService;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@SessionAttributes({"searchQna"})
public class MypageQnaController {
	@Autowired
	private MypageService qnaService;
	
	
	// 1:1 문의 내역
	@GetMapping(value = {"/myPage/qna/{search}", "/myPage/qna"})
	public String qna(@SessionAttribute("loginMember") Member loginMember, Model model,@PathVariable(required = false) String search
			) {
		
		
		//PathVariable 없을 때
		if(search == null) {
			model.addAttribute("searchQna", "");
			List<Qna> qna = new ArrayList<>();
			qna = qnaService.qnaList(loginMember.getMemberNo());
			List<Qna> answeredQna = new ArrayList<>();
			answeredQna = qnaService.answeredQna(loginMember.getMemberNo());
			model.addAttribute("qnaList", qna);
			model.addAttribute("answeredQnaList", answeredQna);
			
		//PathVariable 있을 때
		}else {
			model.addAttribute("searchQna", search);
			String[] subQna = search.split("-");
			Map<String, String> qnaMap = new HashMap<>();
			qnaMap.put("memberNo", String.valueOf(loginMember.getMemberNo()));
			qnaMap.put("type", subQna[0]);
			qnaMap.put("content", subQna[1]);
			List<Qna> qna = new ArrayList<>();
			qna = qnaService.searchQnaList(qnaMap);
			List<Qna> answeredQna = new ArrayList<>();
			answeredQna = qnaService.searchAnsweredQna(qnaMap);
			model.addAttribute("qnaList", qna);
			model.addAttribute("answeredQnaList", answeredQna);
		}
		
		return "/myPage/myPageBoard/myPageQuestion";
	}
	
	/** 분류 선택에 따른 qna 리스트
	 * @param category
	 * @param loginMember
	 * @return
	 */
	@GetMapping(value="/myPage/qna/category", produces="application/text; charset=UTF-8")
	@ResponseBody
	public List<Qna> qnaCategory(String category, @SessionAttribute("loginMember") Member loginMember, @SessionAttribute String searchQna
			) {
		List<Qna> qna = new ArrayList<>();
		if(category.equals("write")) {
			//PathVariable 없을 때
			if(searchQna == null) {
				List<Qna> qnaW = new ArrayList<>();
				qna = qnaService.qnaList(loginMember.getMemberNo());
				
			//PathVariable 있을 때
			}else {
				String[] subQna = searchQna.split("-");
				Map<String, String> qnaMap = new HashMap<>();
				qnaMap.put("memberNo", String.valueOf(loginMember.getMemberNo()));
				qnaMap.put("type", subQna[0]);
				qnaMap.put("content", subQna[1]);
				List<Qna> qnaW = new ArrayList<>();
				qna = qnaService.searchQnaList(qnaMap);
			}
		}else {
			qna=qnaService.categoryAnsweredQna(loginMember.getMemberNo());
		}
		return qna;
	}

}

