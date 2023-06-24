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
import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Product;

@Service
public class MypageServiceImpl implements MypageService {
	
	@Autowired
	private MypageMapper mapper;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	// ---------------------------- MyPage Dashboard ---------------------------- 
	
	
	// 로그인 멤버의 3개월 주문 조회
	@Override
	public List<Order> selectMyPageOrderList(Member loginMember) {
		return mapper.selectMyPageOrderList(loginMember);
	}
	

	// ---------------------------- MyPage info ---------------------------- 

	
	// 회원 정보 수정
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int editMyPageInfo(Member inputMember) {
		return mapper.editMyPageInfo(inputMember);
	}
	
	// 회원 정보 조회
	@Override
	public Member selectMember(Long memberNo) {
		return mapper.selectMember(memberNo);
	}
	
	// 비밀번호 변경
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int changePw(String memberPw, String newMemberPw, Member loginMember) {
		
		int result;
		
		// 로그인 멤버의 비밀번호 조회
		String beforePw = mapper.selectMember(loginMember.getMemberNo()).getMemberPw();
		
		// 입력한 비밀번호와, 로그인 멤버의 비밀번호가 일치하면
		if(bcrypt.matches(memberPw,beforePw)) {
			// 새로운 비밀번호로 업데이트 
			Member member = new Member();
			member.setMemberNo(loginMember.getMemberNo());
			member.setMemberPw(bcrypt.encode(newMemberPw));
			
			result = mapper.changePw(member);
			
		} else {
		// 일치하지 않으면
			result = 0;
		}
		return result;
	}
	
	
	// 회원 탈퇴
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int deleteMember(Long memberNo) {
		return mapper.deleteMember(memberNo);
	}
	
	// 배송지 등록
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int insertAddress(Address address) {
		return mapper.insertAddress(address);
	}


	
	// ---------------------------- MyPage Order ---------------------------- 
	
	// 기간별 주문목록 조회
	@Override
	public Map<String, Object> selectSearchOrderList(Map<String, Object> paramMap) {
		
		int listCount = mapper.getOrderListCount(paramMap); // 기간내 주문목록개수
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 5);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		// 기간내 주문목록
		List<Order> orders = mapper.selectSearchOrderList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("orders", orders);
		
		return resultMap;
	}
	
	// 주문 상품 조회
	@Override
	public List<Map<String, Object>> selectOrderProducts(List<Order> orders) {
		
		List<Map<String, Object>> orderMaps = new ArrayList<>();
		
		for(Order order : orders) {
			OrderProduct orderProduct = mapper.selectOrderProduct(order.getOrderNo());
			if(orderProduct != null) {
				Map<String, Object> orderMap = new HashMap<>();
				
				orderProduct.setProduct(mapper.selectProduct(orderProduct.getProductNo()));
				orderProduct.setOption(mapper.selectOption(orderProduct.getOptionNo()));
				
				orderMap.put("orderProduct", orderProduct);
				orderMap.put("order", order);
				orderMaps.add(orderMap);
			}
		}
		
		return orderMaps;
	}

	
	// 회원 포인트 조회(전체, 페이지네이션, 누적액 계산)
	@Override
	public Map<String, Object> selectPoint(Map<String, Object> paramMap) {
		
		// 회원 적립 내역 개수 조회
	 	int listCount = mapper.getListCount(paramMap);
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 5);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 로우바운드가 적용된 포인트 적립 내역 조회
		List<Point> pointList = mapper.selectPointList(paramMap, rowBounds);
		
		// 포인트 누적액. 누적 사용액 조회
		List<Map<String, Long>> sumList = mapper.selectAccumulatedPoints(paramMap);
		long accumulatedPoint = Long.parseLong(String.valueOf(sumList.get(0).get("pointSum")));
		long accumulatedUsedPoint = Long.parseLong(String.valueOf(sumList.get(1).get("pointSum")));
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("pointList", pointList);
		resultMap.put("accumulatedPoint", accumulatedPoint);
		resultMap.put("accumulatedUsedPoint", accumulatedUsedPoint);
		return resultMap;
	}

	//	회원 쿠폰 조회(사용 가능한 쿠폰)
	@Override
	public Map<String, Object> selectCoupon(Map<String, Object> paramMap) {
		
		// 사용가능한 쿠폰 개수 조회
		int listCount = mapper.getCouponListCount(paramMap);
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 5);
				
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 로우바운드가 적용된 쿠폰 적립 내역 조회
		List<Point> couponList = mapper.selectCouponList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("couponList", couponList);
		resultMap.put("listCount", listCount);
		return resultMap;
	}
	

	// -------------------------------------------------------------------------- 

	
	
	
	// qna 리스트
	@Override
	public List<Qna> qnaList(Long memberNo) {
		return mapper.qnaList(memberNo);
	}

	// 답변된 qna
	@Override
	public List<Qna> categoryAnsweredQna(Long memberNo) {
		return mapper.categoryAnsweredQna(memberNo);
	}

	// 검색어 포함한 qna
	@Override
	public List<Qna> searchQnaList(Map<String, String> qnaMap) {
		return mapper.searchQnaList(qnaMap);
	}



	/** 답변이 달린 qna
	 *
	 */
	@Override
	public List<Qna> answeredQna(Long memberNo) {
		return mapper.answeredQna(memberNo);
	}


	/** 검색어를 포함한 답변이 달린 qna
	 *
	 */
	@Override
	public List<Qna> searchAnsweredQna(Map<String, String> qnaMap) {
		return mapper.searchAnsweredQna(qnaMap);
	}



	// 배송지정보조회
	@Override
	public List<Address> selectAddressList(Long memberNo) {
		return mapper.selectAddressList(memberNo);
	}















}
