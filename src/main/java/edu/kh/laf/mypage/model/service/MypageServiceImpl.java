package edu.kh.laf.mypage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.mypage.model.dao.MypageDAO;
import edu.kh.laf.mypage.model.dao.MypageMapper;

@Service
public class MypageServiceImpl implements MypageService {
	
	@Autowired
	private MypageDAO dao;
	
	@Autowired
	private MypageMapper mapper;
	
	
	@Override
	public List<Qna> qnaList(Long memberNo) {
		return dao.qnaList(memberNo);
	}

	// 등록된 배송지 조회
	@Override
	public List<Address> selectAddressList(Long memberNo) {
		return mapper.selectAddressList(memberNo);
	}

}
