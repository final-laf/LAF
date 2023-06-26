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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.service.QnaService;

@Controller
public class QnaController {
	
	@Autowired
	private QnaService qnaService;
	

	// 1:1 문의 목록
	@GetMapping(value = {"/qna/{search}","/qna"})
	public String qna(
			Model model,
			@PathVariable(required = false) String search,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam(value="cc", required=false, defaultValue="0") long cc
			) {
		//PathVariable 없을 때
		if(search == null) {
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("cp", cp);
			paramMap.put("cc", cc);	
			List<Qna> qna = new ArrayList<>();
			Map<String, Object> resultMap = qnaService.qnaList(paramMap);
			
			List<Qna> answeredQna = new ArrayList<>();
			model.addAttribute("searchQna", "");
			model.addAttribute("qnaList", qna);
			
		//PathVariable 있을 때
		}else {
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("search", search);
			paramMap.put("cp", cp);
			paramMap.put("cc", cc);	
			
			model.addAttribute("searchQna", search);
			String[] subQna = search.split("-");
			Map<String, String> qnaMap = new HashMap<>();
			qnaMap.put("type", subQna[0]);
			qnaMap.put("content", subQna[1]);
			List<Qna> qna = new ArrayList<>();
			List<Qna> answeredQna = new ArrayList<>();
			model.addAttribute("qnaList", qna);
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
	
	
	// 1:1 문의 수정 컨트롤러
	@GetMapping("/qna/modify/{no:[0-9]+}")
	public String modifyQna(@PathVariable String no, Model model) {
		Qna qna = qnaService.detailQna(no);
		model.addAttribute("qna", qna);
		return "/boards/qna/qnaModify";
	}
	
	// 1:1 문의 답글 컨트롤러
	@GetMapping("/qna/answer/{no:[0-9]+}")
	public String answerQna(@PathVariable String no, Model model) {
		Qna qna = qnaService.detailQna(no);
		model.addAttribute("qna", qna);
		return "/boards/qna/qnaAnswer";
	}
	// 1:1 문의 글쓰기 컨트롤러
	@GetMapping("/qna/write")
	public String write() {
		return "/boards/qna/qnaWrite";
	}
	
	// 기능: 1:1 문의 글쓰기
	@PostMapping("/qna/insert")
	
	public String insert(Qna qna, @RequestHeader(value = "referer") String referer
			,Model model){
		
		if(qna.getMemberNo()==0) {
			qna.setMemberNo(35);
		}
		if(qna.getOrderNo()=="") {
			qna.setOrderNo(null);
		}
		if(qna.getProductNo()=="") {
			qna.setProductNo(null);
		}
		if(qna.getQnaPw()=="") {
			qna.setQnaPw(null);
		}
		if(qna.getQnaLockFl()!=null) {
			if(qna.getQnaLockFl().equals("on")) {
				qna.setQnaLockFl("y");
			}
		}else {
			qna.setQnaLockFl("n");
		}
		if(qna.getQnaCategory().equals("etc")) {
			qna.setQnaCategory("일반");
		}else if(qna.getQnaCategory().equals("product")){
			qna.setQnaCategory("상품");
		}else {
			qna.setQnaCategory("배송");
		}
		
		int writeNotice = qnaService.writeQna(qna);
		
		return "redirect:/qna";
	}
	
	// 기능: 1:1 문의 수정하기
	@PostMapping("/qna/update")
	
	public String update(Qna qna, Model model){
		String path = "redirect:/qna/detail/";
		path+=qna.getQnaNo();
		
		if(qna.getMemberNo()==0) {
			qna.setMemberNo(35);
		}
		if(qna.getOrderNo()=="") {
			qna.setOrderNo(null);
		}
		if(qna.getProductNo()=="") {
			qna.setProductNo(null);
		}
		if(qna.getQnaPw()=="") {
			qna.setQnaPw(null);
		}
		if(qna.getQnaLockFl().equals("on")) {
			qna.setQnaLockFl("y");
		}else {
			qna.setQnaLockFl("n");
		}
		if(qna.getQnaCategory().equals("etc")) {
			qna.setQnaCategory("일반");
		}else if(qna.getQnaCategory().equals("product")){
			qna.setQnaCategory("상품");
		}else {
			qna.setQnaCategory("배송");
		}
		
		int writeNotice = qnaService.updateQna(qna);
		
		return path;
	}
	
	// 기능: 1:1 문의 수정하기
	@PostMapping("/qna/answer")
	
	public String answer(Qna qna, Model model){
		String path = "redirect:/qna/detail/";
		path+=qna.getQnaNo();
		
		int answerNotice = qnaService.answerQna(qna);
		
		return path;
	}
	
	
	
	
	/** 기능: 1:1 문의 삭제
	 * @param qnaNo
	 * @return
	 */
	@GetMapping(value="/qna/delete",produces = "application/text; charset=UTF-8")
	@ResponseBody
	public String deleteQna(String qnaNo){
		int no = qnaService.deleteQna(qnaNo);
		String n= "";
		return n;
	}
	
	// 기능 : 1:1 문의 비밀글 유효성 검사
	@PostMapping("/qna/qnaLockNo")
	@ResponseBody
	public int detail(@RequestBody Qna qna) {
		Qna check = qnaService.confirmLockNo(qna);
		int checkSecretPw=1;
		if(check==null) {
			checkSecretPw=-1;
		}
		return checkSecretPw;
	}
	
}
