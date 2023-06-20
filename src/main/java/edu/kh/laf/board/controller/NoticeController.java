package edu.kh.laf.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Notice;
import edu.kh.laf.board.model.service.NoticeService;
import edu.kh.laf.member.model.dto.Member;

@Controller
public class NoticeController {

	@Autowired
	private NoticeService service;
	
	
	// 공지사항 목록
	@GetMapping("/notice")
	public String notice(Model model)
			 {
		List<Notice> notice = new ArrayList<>();
		notice = service.noticeList();
		model.addAttribute("noticeList", notice);
		
		return "/boards/notice/notice";
	}
	
	// 공지사항 상세
	
	@GetMapping("/notice/{no:[0-9]+}")
	public String detail(@PathVariable String no, Model model) {
		Notice notice = service.detailNotice(no);
		model.addAttribute("notice", notice);
		
		
		return "/boards/notice/noticeDetail";
	}

	
	// 공지사항 목록 - 글쓰기페이지 연결
	@GetMapping("/notice/write")
	public String wirte(Model model){
		return "/boards/notice/noticeWrite";
	}
	
	// 공지사항 글쓰기
	@GetMapping("/notice/insert")
	public String insert(Notice notice, @RequestHeader(value = "referer") String referer
			,Model model, @SessionAttribute("loginMember") Member loginMember){
		notice.setMemberNo(loginMember.getMemberNo());
		int writeNotice = service.writeNotice(notice);
		model.addAttribute("writeNotice",writeNotice);
		
		return "redirect:/notice";
	}
	
	

	// 공지사항 삭제
	@GetMapping(value="/notice/delete",produces = "application/text; charset=UTF-8")
	@ResponseBody
	public String deleteNotice(String noticeNo){
		int no = service.deleteNotice(noticeNo);
		String n= "";
		return n;
	}
//	// 공지사항 글쓰기
//	@GetMapping("/notice/write/no:[0-9+]")
//	public String modify(@PathVariable String no, Model model){
//		Notice notice = service.modifyNotice(no);
//		
//		return "/boards/notice/noticeWrite";
//	}
	
}