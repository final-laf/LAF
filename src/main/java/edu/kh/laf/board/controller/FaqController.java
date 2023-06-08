package edu.kh.laf.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FaqController {

	// FAQ
	@GetMapping("/faq")
	public String faq() {
		return "/boards/faq/faq";
	}
	
}
