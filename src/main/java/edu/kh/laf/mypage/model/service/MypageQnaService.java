package edu.kh.laf.mypage.model.service;

import java.util.Map;

public interface MypageQnaService {

	

	/** 나의 qna 리스트 조회 
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> qnaList(Map<String, Object> paramMap, int cp);

	/** 나의 qna 리스트 조회 (검색)
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchQnaList(Map<String, Object> paramMap, int cp);













	

}
