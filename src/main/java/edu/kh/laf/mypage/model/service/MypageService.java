package edu.kh.laf.mypage.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Address;

public interface MypageService {

	List<Qna> qnaList(Long memberNo);

	/** 등록된 배송지 조회
	 * @param memberNo
	 * @return selectAddressList
	 */
	List<Address> selectAddressList(Long memberNo);

}
