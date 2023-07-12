package edu.kh.laf.member.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;

public interface MemberService {

	 
	/** 로그인 서비스
	 * @param inputMember
	 * @return id,pw가 일치하는 회원 정보 또는 null
	 */
	Member login(Member inputMember);

	/** 회원가입 서비스
	 * @param inputMember
	 * @return result
	 */
	int signUp(Member inputMember);
	
	/** 아이디 중복 검사 서비스
	 * @param nickname
	 * @return result
	 */
	int checkId(String memberId);


	/** 이메일 중복 확인
	 * @param email
	 * @return count
	 */
	int checkEmail(String email);
	
	/** 회원 가입 기념 적립금 2000원 지급
	 * @param memberId
	 */
	int insertSignupPoint(String memberId);

	/** 적립한 포인트를 회원 정보에 반영
	 * @param memberId
	 * @return
	 */
	int updateSignupPoint(String memberId);
	
	
	/** 랜덤한 패스워드 생성
	 * @return memberPw
	 */
	String createPw();

	/** 아이디, 비밀번호가 일치하는 회원 찾기
	 * @param paramMap
	 * @return member
	 */
	Member selectMatch(Map<String, String> paramMap);

	/** 비밀번호 찾기
	 * @param paramMap
	 * @return result
	 */
	int findPw(Map<String, String> paramMap);

	/** 비밀번호 찾기(이메일 전송)
	 * @param memberEmail
	 * @param memberPw
	 * @param string
	 * @return emailResult
	 */
	int sendNewPw(String memberEmail, String memberPw, String string);

	/** 아이디와 주문번호로 비회원 주문 조회
	 * @param paramMap
	 * @return orderNo
	 */
	int selectNotMemberOrder(Map<String, String> paramMap);

	/** 회원관리 : 회원조회
	 * @param cp
	 * @return resultMap
	 */
	Map<String, Object> selectAllMemberList(Map<String, Object> paramMap);

	/** 회원 정보 비동기 조회
	 * @param memberId
	 * @return member
	 */
	Member selectMemberDetail(Long memberNo);

	/** 회원 정보 비동기 조회(회원 기본 배송지)
	 * @param memberNo
	 * @return adress
	 */
	Address selectMemberDetailDefaultAddress(Long memberNo);

	/** 페이지리스트가 적용된 주문 조회
	 * @param memberNo
	 * @return resultMap
	 */
	Map<String, Object> selectAllOrderList(Map<String, Object> paramMap);

	/** 포인트를 적립하는 서비스
	 * @param paramMap
	 * @return result
	 */
	int insertMemberPoint(Map<String, Object> paramMap);

	/** 적립한 포인트를 회원 정보에 반영하는 서비스
	 * @param paramMap
	 * @return updateResult
	 */
	int updateMemberPoint(Map<String, Object> pointParamMap);

	/** 회원번호로 회원 목록 조회
	 * @param memberNoList
	 * @return memberList
	 */
	List<Member> selectMemberList(List<String> memberNoList);
	
	/** 회원등급으로 회원 목록 조회
	 * @param memberNo
	 * @return memberList
	 */
	List<Long> selectGradeMemberList(Long memberGrade);

	/** 회원 쿠폰 발급
	 * @param inputCoupon
	 * @return result
 	 */
	int insertMemberCoupon(Map<String, Object> paramMap);

	/** 아이디로 회원 조회
	 * @param memberId
	 * @return member
	 */
	Member selectMemberById(Member member);

	/**
	 * 멤버 수 추이 조회
	 * @return memberCountList
	 */
	List<Map<String, Object>> getMemeberStatistics();










	

}
