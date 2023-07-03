package edu.kh.laf.mypage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.board.model.dto.Qna;

@Mapper
public interface MypageQnaMapper {

	/** 나의 qna 리스트 count
	 * @param object
	 * @return
	 */
	int qnaListCount(Object object);

	/** 나의 qna 리스트
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Qna> qnaList(Map<String, Object> paramMap, RowBounds rowBounds);

	/** 나의 qna 리스트 count
	 * @param object
	 * @return
	 */
	int searchQnaListCount(Map<String, Object>  paramMap);

	/** 나의 qna 리스트
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Qna> searchQnaList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	


	


	


















	
	
	
	
}
