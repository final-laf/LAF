package edu.kh.laf.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.mapper.QnaMapper;

@Service
public class QnaServiceImpl implements QnaService {
	
	@Autowired
	private QnaMapper mapper;

	/** qna 전체 목록 조회
	 *
	 */
	@Override
	public List<Qna> qnaList() {
		return mapper.qnaList();
	}

	/** qna 상세 정보 조회
	 *
	 */
	@Override
	public Qna detailQna(String no) {
		return mapper.detailQna(no);
	}

	/** qna 상세 정보 삭제
	 *
	 */
	@Override
	public int deleteQna(String qnaNo) {
		return mapper.deleteQna(qnaNo);
	}

}