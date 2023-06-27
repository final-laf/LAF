package edu.kh.laf.member.model.mapper;

import edu.kh.laf.member.model.dto.Member;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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
}
