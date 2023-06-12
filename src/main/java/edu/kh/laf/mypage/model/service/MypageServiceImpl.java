package edu.kh.laf.mypage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.mypage.model.mapper.MypageMapper;

@Service
public class MypageServiceImpl implements MypageService {
	
	@Autowired
	private MypageMapper mapper;
	
	// qna 리스트
	@Override
	public List<Qna> qnaList(Long memberNo) {
		return mapper.qnaList(memberNo);
	}

	// 답변된 qna
	@Override
	public List<Qna> categoryAnsweredQna(Long memberNo) {
		return mapper.categoryAnsweredQna(memberNo);
	}

	// 검색어 포함한 qna
	@Override
	public List<Qna> searchQnaList(Map<String, String> qnaMap) {
		return mapper.searchQnaList(qnaMap);
	}



	/** 답변이 달린 qna
	 *
	 */
	@Override
	public List<Qna> answeredQna(Long memberNo) {
		return mapper.answeredQna(memberNo);
	}


	/** 검색어를 포함한 답변이 달린 qna
	 *
	 */
	@Override
	public List<Qna> searchAnsweredQna(Map<String, String> qnaMap) {
		return mapper.searchAnsweredQna(qnaMap);
	}



	// 배송지정보조회
	@Override
	public List<Address> selectAddressList(Long memberNo) {
		return mapper.selectAddressList(memberNo);
	}


}
