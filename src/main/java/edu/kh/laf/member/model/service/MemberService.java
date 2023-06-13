package edu.kh.laf.member.model.service;

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
	

}
