package edu.kh.laf.member.model.service;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

	
	@Autowired
	private MemberMapper mapper;
	
	@Autowired // bean으로 등록된 객체 중 타입이 일치하는 객체를 DI
	private BCryptPasswordEncoder bcrypt;
	
    
    // 로그인 서비스
	@Override
	public Member login(Member inputMember) {
		Member loginMember = mapper.login(inputMember);
		if(loginMember != null) { // 아이디가 일치하는 회원이 조회된 경우
			
			// 회원가입 암호화 처리시 주석 풀 것
			/*if(bcrypt.matches(inputMember.getMemberPw(),
							  loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
				*/
			
			// 회원가입 암호화 처리시 삭제할 것
			if(inputMember.getMemberPw().equals(loginMember.getMemberPw())) {	
			} else { // 다를 경우
				loginMember = null; // 로그인 실패처럼 만듦
			}
		}
		return loginMember;
	}
}
