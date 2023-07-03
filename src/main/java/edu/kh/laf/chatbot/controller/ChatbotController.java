package edu.kh.laf.chatbot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.board.model.dto.Faq;
import edu.kh.laf.chatbot.model.service.ChatbotService;

@Controller
public class ChatbotController {
	
	@Autowired
	private ChatbotService service;
	
	@GetMapping("/chatbot")
	@ResponseBody
	public List<Faq> selectChatbot(String categoryValue) {
		System.out.println(categoryValue);
		List<Faq> answer = service.faqAnswer(categoryValue);
		System.out.println(answer);
		return answer;
	}

}