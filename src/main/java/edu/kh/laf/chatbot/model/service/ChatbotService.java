package edu.kh.laf.chatbot.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Faq;

public interface ChatbotService {

	List<Faq> faqAnswer(String categoryValue);

}
