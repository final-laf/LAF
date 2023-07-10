package edu.kh.laf.board.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface QnaMapper {

	/** qna 목록 개수
	 * @param paramMap
	 * @return
	 */
	int qnaListCount();
	
	/** 검색어를 포함한 qna 목록 개수
	 * @param paramMap
	 * @return
	 */
	int getListCountSearch(Map<String, Object> paramMap);
	
	/** qna 목록 조회
	 * @param rowBounds 
	 * @param paramMap 
	 * @return
	 */
	List<Qna> qnaList(RowBounds rowBounds);
	
	/** 검색어를 포함한 qna검색 결과
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Qna> searchQnaList(Map<String, Object> paramMap, RowBounds rowBounds);


	
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

	/** qna 수정
	 * @param qna
	 * @return
	 */
	int updateQna(Qna qna);

	/** qna 답변달기
	 * @param qna
	 * @return
	 */
	int answerQna(Qna qna);

	/** qna 오더리스트
	 * @param memberNo
	 * @return
	 */
	List<Order> orderList(Long memberNo);

	/** qna 상품 검색
	 * @param productName
	 * @return
	 */
	List<Product> productSearch(String productName);







}
