package edu.kh.laf.chatbot.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Faq;
import edu.kh.laf.chatbot.model.mapper.ChatbotMapper;

@Service
public class ChatbotServiceImpl implements ChatbotService {
	
	@Autowired
	private ChatbotMapper mapper;

	/** 챗봇 답변 조회
	 *
	 */
	@Override
	public List<Faq> faqAnswer(String categoryValue) {
		return mapper.faqAnswer(categoryValue);
	}

	/** 채팅으로 답변 조회
	 *
	 */
//	@Override
//	public List<Faq> searchAnswer(String chat) {
//		System.out.println(chat);
//		List<Faq> Answer = new ArrayList<>();
//		return Answer;
//	}

}
