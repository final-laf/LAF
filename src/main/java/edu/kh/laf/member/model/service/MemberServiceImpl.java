package edu.kh.laf.member.model.service;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
			
			if(bcrypt.matches(inputMember.getMemberPw(),loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
			} else {
				loginMember = null;
			}
		}
		return loginMember;
	}


	// 회원 가입 서비스
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int signUp(Member inputMember) {

		// 비밀번호를 BCrypt를 이용하여 암호화 후 다시 inputMember에 세팅
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		int result = mapper.signUp(inputMember);
		return result;
	}

	// 아이디 중복 검사
	@Override
	public int checkId(String memberId) {
		return mapper.checkId(memberId);
	}
	
	// 이메일 중복 확인
	@Override
	public int checkEmail(String email) {
		return mapper.checkEmail(email);
	}

}
