package edu.kh.laf.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.mapper.QnaMapper;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.product.model.dto.Product;

@Service
public class QnaServiceImpl implements QnaService {
	
	@Autowired
	private QnaMapper mapper;

	/** qna 전체 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> qnaList(Map<String, Object> paramMap) {
		int listCount = mapper.qnaListCount(paramMap);
		int cp = (paramMap.get("cp") == null) ? 1 : Integer.parseInt((String)paramMap.get("cp"));
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Qna> qnaList = mapper.qnaList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("qnaList", qnaList);
		
		
		
		return resultMap;
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

	/** qna 글쓰기
	 *
	 */
	@Override
	public int writeQna(Qna qna) {
		return mapper.writeQna(qna);
	}

	/** 비밀글 확인
	 *
	 */
	@Override
	public Qna confirmLockNo(Qna qna) {
		return mapper.confirmLockNo(qna);
	}

	/** 게시글 수정
	 *
	 */
	@Override
	public int updateQna(Qna qna) {
		return mapper.updateQna(qna);
	}

	@Override
	public int answerQna(Qna qna) {
		return mapper.answerQna(qna);
	}



}
