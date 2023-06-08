package edu.kh.laf.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class QnaController {

	// 1:1 문의 목록
	@GetMapping("/qna")
	public String qna() {
		return "/boards/qna/qna";
	}
	
	// 1:1 문의 상세
	@GetMapping("/qna/{no:[0-9]+}")
	public String detail() {
		return "/boards/qna/qnaDetail";
	}
	
	// 1:1 문의 글쓰기
	@GetMapping("/qna/write")
	public String write() {
		return "/boards/qna/qnaWrite";
	}
	
}
