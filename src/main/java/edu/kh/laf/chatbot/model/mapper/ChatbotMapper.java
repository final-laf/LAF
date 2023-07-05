package edu.kh.laf.chatbot.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Faq;

@Mapper
public interface ChatbotMapper {

	/** faq 목록 조회
	 * @param categoryValue
	 * @return
	 */
	List<Faq> faqAnswer(String categoryValue);

	/** 단어 포함한 faq 목록 조회
	 * @param searchWord
	 * @return
	 */
	List<Faq> searchAnswer(List<String> searchWord);

}
