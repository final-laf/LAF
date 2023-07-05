package edu.kh.laf.chatbot.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Faq;

public interface ChatbotService {

	/** faq 질문/답변 조회
	 * @param categoryValue
	 * @return
	 */
	List<Faq> faqAnswer(String categoryValue);

	/** 채팅으로 질문/답변 조회
	 * @param chat
	 * @return
	 */
	List<Faq> searchAnswer(String chat);

}
