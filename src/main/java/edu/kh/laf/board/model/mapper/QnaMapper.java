package edu.kh.laf.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Qna;

@Mapper
public interface QnaMapper {

	/** qna 목록 조회
	 * @return
	 */
	List<Qna> qnaList();

	/** qna 상세 정보 조회
	 * @param no
	 * @return
	 */
	Qna detailQna(String no);

	/** qna 상세 정보 삭제
	 * @param qnaNo
	 * @return
	 */
	int deleteQna(String qnaNo);

	/** qna 글쓰기
	 * @param qna
	 * @return
	 */
	int writeQna(Qna qna);

	/** 비밀글 확인
	 * @param qna
	 * @return
	 */
	Qna confirmLockNo(Qna qna);

}
