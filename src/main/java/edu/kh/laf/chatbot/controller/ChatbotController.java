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
	
	/** 클릭 이벤트 목록 조회
	 * @param categoryValue
	 * @return
	 */
	@GetMapping("/chatbot")
	@ResponseBody
	public List<Faq> selectChatbot(String categoryValue) {
		List<Faq> answer = service.faqAnswer(categoryValue);
		return answer;
	}

	/** 채팅으로 목록 조회
	 * @param chat
	 * @return
	 */
	@GetMapping("/chatbot/chat")
	@ResponseBody
	public List<Faq> searchChat(String chat) {
		List<Faq> searchAnswer = service.searchAnswer(chat);
		return searchAnswer;
	}
	
}
