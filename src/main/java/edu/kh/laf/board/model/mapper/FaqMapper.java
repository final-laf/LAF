package edu.kh.laf.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Faq;

@Mapper
public interface FaqMapper {

	/** faq 리스트 조회
	 * @return
	 */
	List<Faq> faqList();

}
