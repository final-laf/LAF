package edu.kh.laf.member.model.service;

import java.util.Map;

public interface EmailService {
	
	
	/** 회원가입 이메일 전송
	 * @param memberEmail
	 * @param title
	 * @return
	 */
	int signUp(String memberEmail, String title);
		
	/** 인증번호 생성
	 * @return
	 */
	String createAuthKey();
	
	/** 인증번호 확인
	 * @param paramMap
	 * @return
	 */
	int checkAuthKey(Map<String, Object> paramMap);
	
	/** 주문내역 이메일전송
	 * @param emailDate
	 * @return
	 */
	String sendOrderEmail(Map<String, Object> emailData);

}
