package edu.kh.laf.mypage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Address;

@Mapper
public interface MypageMapper {

	/** 내 qna조회
	 * @param memberNo
	 * @return
	 */
	List<Qna> qnaList(Long memberNo);

	/** 답변 qna
	 * @param memberNo
	 * @return
	 */
	List<Qna> categoryAnsweredQna(Long memberNo);

	/** 검색어를 포함한 qna
	 * @param memberNo
	 * @param search
	 * @return
	 */
	List<Qna> searchQnaList(Map<String, String> qnaMap);

	/** 배송지정보조회
	 * @param memberNo
	 * @return
	 */
	List<Address> selectAddressList(Long memberNo);

	
	
	/** 답변이 달린 qna
	 * @param memberNo
	 * @return
	 */
	List<Qna> answeredQna(Long memberNo);

	/** 검색어를 포함한 답변이 달린 qna
	 * @param qnaMap
	 * @return
	 */
	List<Qna> searchAnsweredQna(Map<String, String> qnaMap);

	
	
	
	
}
