package edu.kh.laf.member.model.service;

import edu.kh.laf.member.model.dto.Member;

public interface MemberService {

	 
	/** 로그인 서비스
	 * @param inputMember
	 * @return id,pw가 일치하는 회원 정보 또는 null
	 */
	Member login(Member inputMember);
	
	

}
