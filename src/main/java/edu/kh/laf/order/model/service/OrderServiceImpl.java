package edu.kh.laf.order.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.mapper.OrderMapper;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderMapper mapper;
	
	// 주문자정보
	@Override
	public Member orderInfo(long memberNo) {
		// TODO Auto-generated method stub
		return mapper.orderInfo(memberNo);
	}
}
