package edu.kh.laf.member.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.dto.Order;

@Mapper
public interface MemberMapper {
	
	

	Member selectMember(long id);
    
	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

	/** 회원 가입 서비스
	 * @param inputMember
	 * @return result
	 */
	int signUp(Member inputMember);

	/** 아이디 중복 검사
	 * @param memberId
	 * @return result
	 */
	int checkId(String memberId);

	/** 이메일 중복 검사
	 * @param email
	 * @return result
	 */
	int checkEmail(String email);

	/** 이메일, 아이디가 일치하는 회원 찾기
	 * @param paramMap
	 * @return member
	 */
	Member selectMatch(Map<String, String> paramMap);

	/** 비밀번호 찾기(기존의 비밀번호를 생성한 랜덤비밀번호로 변경)
	 * @param paramMap
	 * @return result
	 */
	int findPw(Map<String, String> paramMap);

	/** 아이디와 주문번호로 비회원 주문 조회
	 * @param paramMap
	 * @return orderNo
	 */
	int selectNotMemberOrder(Map<String, String> paramMap);

	/** 전체 회원의 수 조회
	 * @param cp
	 * @return listCount
	 */
	int getAllMemberCount(Map<String, Object> paramMap);

	/** 로우바운드가 적용된 전체 회원 조회
	 * @param cp
	 * @param rowBounds
	 * @return resultMap
	 */
	List<Member> selectAllMemberList(Map<String, Object> paramMap, RowBounds rowBounds);

	/** 회원 정보 비동기 조회
	 * @return member
	 */
	Member selectMemberDetail(Long memberNo);

	/** 회원 정보 비동기 조회(회원 기본 배송지)
	 * @param memberNo
	 * @return
	 */
	Address selectMemberDetailDefaultAddress(Long memberNo);

	/** 페이지리스트가 적용된 주문 개수 조회(관리자-회원관리-회원상세)
	 * @param memberNo
	 * @return listCount
	 */
	int getOrderListCount(Map<String, Object> paramMap);

	/** 페이지네이션이 적용된 주문 목록 조회
	 * @param memberNo
	 * @param rowBounds
	 * @return orderList
	 */
	List<Order> selectAllOrderList(Map<String, Object> paramMap, RowBounds rowBounds);

	/** memberNo로 포인트를 적립
	 * @param paramMap
	 * @return result
	 */
	int insertMemberPoint(Map<String, Object> paramMap);

	/** 적립한 포인트를 회원 정보에 반영
	 * @param paramMap
	 * @return updateResult
	 */
	int updateMemberPoint(Map<String, Object> pointParamMap);

	/** 회원 번호로 회원 조회
	 * @param memberNoList
	 * @return memberList
	 */
	List<Member> selectMemberList(List<String> memberNoList);

	/** 회원등급으로 회원 목록 조회
	 * @param memberGrade
	 * @return memberList
	 */
	List<Long> selectGradeMemberList(Long memberGrade);

	/** 회원 쿠폰 발급
	 * @param inputCoupon
	 * @return result
	 */
	int insertMemberCoupon(Map<String, Object> paramMap);

}
