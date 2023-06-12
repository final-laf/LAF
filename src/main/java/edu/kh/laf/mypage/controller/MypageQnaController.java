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

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageService;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class MypageQnaController {
	@Autowired
	private MypageService qnaService;
	
	
	// 1:1 문의 내역
	@GetMapping(value = {"/my/qna/{search}", "/my/qna"})
	public String qna(@SessionAttribute("loginMember") Member loginMember, Model model,@PathVariable(required = false) String search
			) {
//		PathVariable 없을 때
		if(search == null) {
			List<Qna> qna = new ArrayList<>();
			qna = qnaService.qnaList(loginMember.getMemberNo());
			System.out.println(qna);
			model.addAttribute("qnaList", qna);
//		PathVariable 있을 때
		}else {
			String[] subQna = search.split("-");
			Map<String, String> qnaMap = new HashMap<>();
			qnaMap.put("memberNo", String.valueOf(loginMember.getMemberNo()));
			System.out.println(subQna[0]);
			qnaMap.put("type", subQna[0]);
			qnaMap.put("content", subQna[1]);
			System.out.println(qnaMap);
			List<Qna> qna = new ArrayList<>();
			qna = qnaService.searchQnaList(qnaMap);
			model.addAttribute("qnaList", qna);
			System.out.println(qna);
		}
		
		return "/mypage/mypageQuestion";
	}
	
	/** 분류 선택에 따른 qna 리스트
	 * @param category
	 * @param loginMember
	 * @return
	 */
	@GetMapping(value="/my/qna/category", produces="application/text; charset=UTF-8")
	@ResponseBody
	public List<Qna> qnaCategory(String category, @SessionAttribute("loginMember") Member loginMember) {
		List<Qna> qna = new ArrayList<>();
		System.out.println(category);
		if(category.equals("write")) {
			System.out.println("작성 일자별");
			qna=qnaService.qnaList(loginMember.getMemberNo());
		}else {
			System.out.println("답변 유무별");
			qna=qnaService.categoryAnsweredQna(loginMember.getMemberNo());
		}
		return qna;
	}

}

