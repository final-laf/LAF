package edu.kh.laf.chatbot.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Faq;

@Mapper
public interface ChatbotMapper {

	List<Faq> faqAnswer(String categoryValue);

}
