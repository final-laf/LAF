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

public interface MypageService {
	
	
	// ---------------------------- MyPage Dashboard ---------------------------- 
	

	/** 로그인 멤버의 주문 조회
	 * @param loginMember
	 * @return myPageOrderList
	 */
	List<Order> selectMyPageOrderList(Member loginMember);
	
	
	// ---------------------------- MyPage Order ---------------------------- 
	
	

	
	
	// -------------------------------------------------------------------------- 

	
	

	/** qna 전체
	 * @param memberNo
	 * @return
	 */
	List<Qna> qnaList(Long memberNo);

	/** 답변 완료된 qna
	 * @param memberNo
	 * @return
	 */
	List<Qna> categoryAnsweredQna(Long memberNo);

	/** 검색어 포함한 qna
	 * @param memberNo
	 * @param search
	 * @return
	 */
	List<Qna> searchQnaList(Map<String, String> qnaMap);


	/** 답변된 qna
	 * @param memberNo
	 * @return
	 */
	List<Qna> answeredQna(Long memberNo);

	/** 검색어를 포함한 답변된 qna
	 * @param qnaMap
	 * @return
	 */
	List<Qna> searchAnsweredQna(Map<String, String> qnaMap);

	/** 배송지정보조회
	 * @param memberNo
	 * @return
	 */
	List<Address> selectAddressList(Long memberNo);


	/** 회원 정보 수정
	 * @param inputMember
	 * @return result
	 */
	int editMyPageInfo(Member inputMember);


	/** 회원 정보 조회
	 * @param memberId
	 * @return loginMember
	 */
	Member selectMember(Long memberNo);


	/** 비밀번호 변경
	 * @param memberPw
	 * @param newMemberPw
	 * @param loginMember
	 * @return result
	 */
	int changePw(String memberPw, String newMemberPw, Member loginMember);


	/** 회원 탈퇴
	 * @param memberNo
	 * @return result
	 */
	int deleteMember(Long memberNo);


	/** 회원 포인트 조회(전체, 페이지네이션, 누적액 계산)
	 * @param paramMap
	 * @return resultMap
	 */
	Map<String, Object> selectPoint(Map<String, Object> paramMap);


	/** 회원 쿠폰 조회(사용 가능한 쿠폰 전체)
	 * @param paramMap
	 * @return resultMap
	 */
	Map<String, Object> selectCoupon(Map<String, Object> paramMap);



	/** 배송지 등록
	 * @param address
	 * @return result
	 */
	int insertAddress(Address address);



	/** 기간별 주문목록 조회
	 * @param loginMember
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectSearchOrderList(Map<String, Object> paramMap);

	/** 주문 상품 조회
	 * @param orders
	 * @return
	 */
	List<Map<String, Object>> selectOrderProducts(List<Order> orders);







	

}
