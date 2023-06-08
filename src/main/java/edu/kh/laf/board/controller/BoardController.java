package edu.kh.laf.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {
	
	
	// 공지사항 게시글 리스트 연결
	@GetMapping("/notice")
	public String notice() {
		return "/boards/notice/notice";
	}
	
	// 공지사항 게시글 상세 연결
	@GetMapping("/notice/detail")
	public String noticeDetail() {
		return "/boards/notice/noticeDetail";
	}
	
	// 공지사항 글쓰기 연결
	@GetMapping("/notice/write")
	public String noticeWrite() {
		return "/boards/notice/noticeWrite";
	}
	
	// 1대1문의 게시글 리스트 연결
	@GetMapping("/qna")
	public String qna() {
		return "/boards/qna/qna";
	}
	
	// 1대1문의 게시글 상세(질문) 연결
	@GetMapping("/qna/detail-q")
	public String qnaDetail() {
		return "/boards/qna/qnaDetail";
	}

	// 1대1문의 게시글 상세(답변) 연결
	@GetMapping("/qna/detail-a")
	public String qnaDetailAnswer() {
		return "/boards/qna/qnaDetailAnswer";
	}
	
	// 1대1문의 글쓰기(질문) 연결
	@GetMapping("/qna/write")
	public String qnaWrite() {
		return "/boards/qna/qnaWrite";
	}
	
	// 리뷰 게시글 리스트 연결
	@GetMapping("/review")
	public String review() {
		return "/boards/review/review";
	}
	
	// faq 연결
	@GetMapping("/faq")
	public String faq() {
		return "/boards/faq/faq";
	}
	
	
}
