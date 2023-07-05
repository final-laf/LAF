package edu.kh.laf.chatbot.model.service;

import java.util.ArrayList;
import java.util.Arrays;
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
	@Override
	public List<Faq> searchAnswer(String chat) {
		List<String> word = new ArrayList<String>(Arrays.asList("배송", "상품", "오배송", "잘못", "취소", "배송비", "입고", "반품", "입금", "교환", "언제"));
		List<String> searchWord = new ArrayList<>();
		List<Faq> Answer = new ArrayList<>();
		for(String i : word){
			if(chat.contains(i)) {
				searchWord.add(i);
			}
		}
		if(searchWord.size()==0) {
			Faq faq = new Faq();
			faq.setFaqTitle("연관된 결과가 없습니다. <br> qna게시판에 문의 남겨주세요 <br> 게시판 바로가기");
			faq.setFaqContent("qna");
			Answer.add(faq);
			return Answer;
		}
		Answer = mapper.searchAnswer(searchWord);
		return Answer;
	}

}
