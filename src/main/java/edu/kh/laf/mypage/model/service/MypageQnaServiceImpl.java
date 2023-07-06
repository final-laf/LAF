package edu.kh.laf.mypage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.mypage.model.mapper.MypageQnaMapper;

@Service
public class MypageQnaServiceImpl implements MypageQnaService {
	
	@Autowired
	private MypageQnaMapper mapper;
	
	// 나의 qna 리스트
	@Override
	public Map<String, Object> qnaList(Map<String, Object> paramMap, int cp) {
		int listCount = mapper.qnaListCount(paramMap.get("memberNo"));
		
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Qna> qnaList = mapper.qnaList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("qnaList", qnaList);
		
		return resultMap;
	}


	/** 검색어를 포함한 qna 리스트
	 *
	 */
	@Override
	public Map<String, Object> searchQnaList(Map<String, Object> paramMap, int cp) {
		int listCount = mapper.searchQnaListCount(paramMap);
		
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Qna> qnaList = mapper.searchQnaList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("qnaList", qnaList);
		
		return resultMap;
	}


























}
