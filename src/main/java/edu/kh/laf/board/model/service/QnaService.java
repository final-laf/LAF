package edu.kh.laf.board.model.service;

import java.util.Map;

import edu.kh.laf.board.model.dto.Qna;

public interface QnaService {

	/** qna 목록 전체 조회
	 * @param paramMap 
	 * @return
	 */
	Map<String, Object> qnaList(int cp);

	


	/** 검색어를 포함한 목록 전체 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> qnaList(Map<String, Object> paramMap, int cp);
	
	
	/** qna 상세정보 조회
	 * @param no
	 * @return
	 */
	Qna detailQna(String no);





	/** qna 상세정보 삭제
	 * @param qnaNo
	 * @return
	 */
	int deleteQna(String qnaNo);





	/** qna writeQna
	 * @param qna
	 * @return
	 */
	int writeQna(Qna qna);





	/** 비밀글 비밀번호 유효성 검사
	 * @param qna
	 * @return
	 */
	Qna confirmLockNo(Qna qna);





	/** qna 수정하기
	 * @param qna
	 * @return
	 */
	int updateQna(Qna qna);





	/** qna 답변달기
	 * @param qna
	 * @return
	 */
	int answerQna(Qna qna);








}
