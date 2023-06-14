package edu.kh.laf.board.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.laf.board.model.dto.Notice;
import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.service.QnaService;
import edu.kh.laf.member.model.dto.Member;

@Controller
public class QnaController {
	
	@Autowired
	private QnaService qnaService;
	

	// 1:1 문의 목록
	@GetMapping(value = {"/qna/{search}","/qna"})
	public String qna(Model model,@PathVariable(required = false) String search
			) {
		//PathVariable 없을 때
		if(search == null) {
			model.addAttribute("searchQna", "");
			List<Qna> qna = new ArrayList<>();
			qna = qnaService.qnaList();
			List<Qna> answeredQna = new ArrayList<>();
//			answeredQna = qnaService.answeredQna();
			model.addAttribute("qnaList", qna);
//			model.addAttribute("answeredQnaList", answeredQna);
			
		//PathVariable 있을 때
		}else {
			model.addAttribute("searchQna", search);
			String[] subQna = search.split("-");
			Map<String, String> qnaMap = new HashMap<>();
			System.out.println(subQna[0]);
			qnaMap.put("type", subQna[0]);
			qnaMap.put("content", subQna[1]);
			System.out.println(qnaMap);
			List<Qna> qna = new ArrayList<>();
//			qna = qnaService.searchQnaList(qnaMap);
			List<Qna> answeredQna = new ArrayList<>();
//			answeredQna = qnaService.searchAnsweredQna(qnaMap);
			model.addAttribute("qnaList", qna);
//			model.addAttribute("answeredQnaList", answeredQna);
			System.out.println(qna);
		}
		return "/boards/qna/qna";
	}
	
	// 1:1 문의 상세
	@GetMapping("/qna/detail/{no:[0-9]+}")
	public String detail(@PathVariable String no, Model model) {
		Qna qna = qnaService.detailQna(no);
		model.addAttribute("qna", qna);
		return "/boards/qna/qnaDetail";
	}
	
	// 1:1 문의 글쓰기 컨트롤러
	@GetMapping("/qna/write")
	public String writeQna() {
		return "/boards/qna/qnaWrite";
	}
	
	// 1:1 문의 수정 컨트롤러
	@GetMapping("/qna/modify/{no:[0-9]+}")
	public String modifyQna(@PathVariable String no, Model model) {
		return "/boards/qna/qnaModify";
	}
	
	// 1:1 문의 답글 컨트롤러
	@GetMapping("/qna/answer/{no:[0-9]+}")
	public String answerQna(@PathVariable String no, Model model) {
		return "/boards/qna/qnaAnswer";
	}
	
	// 기능: 1:1 문의 글쓰기
	@GetMapping("/qna/insert")
	public String insert(Qna qna, @RequestHeader(value = "referer") String referer
			,Model model){
		System.out.println(qna);
		if(qna.getQnaLockFl().equals("on")) {
			qna.setQnaLockFl("y");
		}else {
			qna.setQnaLockFl("n");
		}
		int writeNotice = qnaService.writeQna(qna);
		
		return "redirect:/qna";
	}
	
	
	
	
	/** 기능: 1:1 문의 삭제
	 * @param qnaNo
	 * @return
	 */
	@GetMapping(value="/qna/delete",produces = "application/text; charset=UTF-8")
	@ResponseBody
	public String deleteQna(String qnaNo){
		System.out.println(qnaNo);
		int no = qnaService.deleteQna(qnaNo);
		String n= "";
		return n;
	}
	
}
