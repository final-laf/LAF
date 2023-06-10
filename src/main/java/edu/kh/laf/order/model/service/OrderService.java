package edu.kh.laf.order.model.service;

import edu.kh.laf.member.model.dto.Member;


public interface OrderService {

	/** 주문자정보
	 * @param memberNo
	 * @return
	 */
	Member orderInfo(long memberNo);

}
