package edu.kh.laf.mypage.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;

public interface MypageQnaService {

	

	/** 특정 멤버 qna 리스트 조회 
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> qnaList(Map<String, Object> paramMap, int cp);













	

}
