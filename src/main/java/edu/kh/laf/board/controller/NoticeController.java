package edu.kh.laf.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Notice;
import edu.kh.laf.board.model.service.NoticeServiceImpl;
import edu.kh.laf.member.model.dto.Member;

@Controller
public class NoticeController {

	@Autowired
	private NoticeServiceImpl noticeService;
	
	
	// 공지사항 목록
	@GetMapping("/notice")
	public String notice(Model model)
			 {
		List<Notice> notice = new ArrayList<>();
		notice = noticeService.noticeList();
		model.addAttribute("noticeList", notice);
		System.out.println(notice);
		
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
