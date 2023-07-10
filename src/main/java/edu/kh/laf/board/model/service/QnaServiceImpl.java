package edu.kh.laf.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.mapper.QnaMapper;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.product.model.dto.Product;

@Service
public class QnaServiceImpl implements QnaService {
	
	@Autowired
	private QnaMapper mapper;

	/** qna 전체 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> qnaList(int cp) {
		int listCount = mapper.qnaListCount();
		
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Qna> qnaList = mapper.qnaList(rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("qnaList", qnaList);
		
		return resultMap;
	}
	
	
	/** qna 검색어를 포함한 전체 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> qnaList(Map<String, Object> paramMap, int cp) {
		int listCount = mapper.getListCountSearch(paramMap); // 오버로딩
		// 2. 1번 조회 결과 + cp를 이용해서 Pagination 객체 생성
		// -> 내부 필드가 모두 계산되어 초기화됨
		Pagination pagination = new Pagination(listCount, cp, 10);
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1 ) * pagination.getLimit();
			
		// 2) Rowbounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Qna> qnaList = mapper.searchQnaList(paramMap, rowBounds);
		
		// 4. pagination, boardList를 Map에 담아서 반환
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("qnaList", qnaList);
		return map;
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

	/** qna 답변달기
	 *
	 */
	@Override
	public int answerQna(Qna qna) {
		return mapper.answerQna(qna);
	}


	/** 내 주문목록
	 *
	 */
	@Override
	public List<Order> orderList(Long memberNo) {
		return mapper.orderList(memberNo);
	}


	/** qna 상품 검색
	 *
	 */
	@Override
	public List<Product> productSearch(String productName) {
		return mapper.productSearch(productName);
	}





}
