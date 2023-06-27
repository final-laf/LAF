package edu.kh.laf.mypage.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.mypage.model.mapper.MypageQnaMapper;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Product;

@Service
public class MypageQnaServiceImpl implements MypageQnaService {
	
	@Autowired
	private MypageQnaMapper mapper;
	

	
	
	// 특정 멤버 qna 리스트
	@Override
	public Map<String, Object> qnaList(Map<String, Object> paramMap, int cp) {
		int listCount = mapper.qnaListCount(paramMap.get("memberNo"));
		
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Qna> qnaList = mapper.qnaList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("qnaList", qnaList);
		
		return resultMap;
	}


























}
