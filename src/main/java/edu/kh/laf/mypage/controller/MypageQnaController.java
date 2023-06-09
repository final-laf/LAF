package edu.kh.laf.mypage.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageServiceimpl;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class MypageQnaController {
	@Autowired
	private MypageServiceimpl qnaService;
	
	
	// 1:1 문의 내역
	@GetMapping("/my/qna")
	public String qna(@SessionAttribute("loginMember") Member loginMember, Model model
			,HttpServletResponse resp) {
		
		
		
		
		List<Qna> qna = new ArrayList<>();
		qna = qnaService.qnaList(loginMember.getMemberNo());
		System.out.println(qna);
		model.addAttribute("qnaList", qna);
		
		return "/mypage/mypageQuestion";
	}

}
