package edu.kh.laf.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.laf.board.model.dto.Faq;
import edu.kh.laf.board.model.service.FaqService;

@Controller
public class FaqController {

	@Autowired
	private FaqService service;
	// FAQ
	@GetMapping("/faq")
	public String faq(Model model) {
		List<Faq> faqList = new ArrayList<>();
		faqList = service.faqList();
		model.addAttribute("faqList", faqList);
		
		return "boards/faq/faq";
	}
	
}
