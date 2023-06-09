package edu.kh.laf.mypage.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.laf.board.model.dto.Qna;

@Repository
public class MypageDAO {

	@Autowired
	private MypageMapper mapper;
	
	public List<Qna> qnaList(Long memberNo) {
		return mapper.qnaList(memberNo);
	}

}
