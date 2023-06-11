package edu.kh.laf.mypage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.mypage.model.dao.MypageDAO;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	private MypageDAO dao;
	
	
	@Override
	public List<Qna> qnaList(Long memberNo) {
		return dao.qnaList(memberNo);
	}

}
