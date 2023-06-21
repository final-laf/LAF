package edu.kh.laf.mypage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;

@Service
public class MypageServiceImpl implements MypageService {
	
	@Autowired
	private MypageMapper mapper;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	// ---------------------------- MyPage Dashboard ---------------------------- 
	
	
	// 로그인 멤버의 주문 조회
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
	@Override
	public int deleteMember(Long memberNo) {
		return mapper.deleteMember(memberNo);
	}


	
	// ---------------------------- MyPage Order ---------------------------- 
	
	
	// 주문번호로 order_product 테이블에서 해당 상품 조회
	@Override
	public List<OrderProduct> selectMyPageOrderProductList(long orderNo) {
		
		// 조회한 상품번호와 옵션을 Product와 option테이블에서 조회해 값 추가
		List<OrderProduct> myPageOrderProductList = mapper.selectMyPageOrderProductList(orderNo);
		for(OrderProduct myPageOrderProduct : myPageOrderProductList) {
			if(myPageOrderProduct != null) {
				myPageOrderProduct.setProduct(mapper.selectMyPageProduct(myPageOrderProduct.getProductNo()));
				myPageOrderProduct.setOption(mapper.selectMyPageProductOption(myPageOrderProduct.getOptionNo()));
			}
		}
		
		return myPageOrderProductList;
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
