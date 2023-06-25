package edu.kh.laf.member.model.service;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.mapper.MemberMapper;

import java.util.Map;

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
	
	// 랜덤한 비밀번호 생성
	@Override
	public String createPw() {
		String memberPw = "";
        for(int i=0 ; i< 8 ; i++) {
            int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
            if(sel1 == 0) {
                int num = (int)(Math.random() * 10); // 0~9
                memberPw += num;
            }else {
                char ch = (char)(Math.random() * 26 + 65); // A~Z
                int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
                if(sel2 == 0) {
                    ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
                }
                memberPw += ch;
            }
        }
        return memberPw;
	}
	
	// 아이디, 이메일주소로 일치하는 회원 찾기
	@Override
	public Member selectMatch(Map<String, String> paramMap) {
		return mapper.selectMatch(paramMap);
	}
	
	// 비밀번호 찾기(새로운 랜덤 비밀번호로 업데이트)
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int findPw(Map<String, String> paramMap) {
		System.out.println(paramMap.get("memberPw"));
		// 새로운 랜덤 비밀번호를 BCrypt를 이용하여 암호화 후 paramMap에 세팅
		String encPw = bcrypt.encode(paramMap.get("memberPw"));
		paramMap.put("encPw", encPw);
		int result = mapper.findPw(paramMap);
		return result;
	}


	




}
