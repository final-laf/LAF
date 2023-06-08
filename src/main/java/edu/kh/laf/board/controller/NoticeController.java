package edu.kh.laf.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NoticeController {

	// 공지사항 목록
	@GetMapping("/notice")
	public String notice() {
		return "/boards/notice/notice";
	}
	
	// 공지사항 상세
	@GetMapping("/notice/{no:[0-9]+}")
	public String detail() {
		return "/boards/notice/noticeDetail";
	}
	
	// 공지사항 글쓰기
	@GetMapping("/notice/write")
	public String wirte() {
		return "/boards/notice/noticeWrite";
	}
	
}
