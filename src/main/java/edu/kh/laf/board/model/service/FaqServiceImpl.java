package edu.kh.laf.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Faq;
import edu.kh.laf.board.model.mapper.FaqMapper;

@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	private FaqMapper mapper;
	
	/** faq 리스트 조회
	 *
	 */
	@Override
	public List<Faq> faqList() {
		return mapper.faqList();
	}

}
