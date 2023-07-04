package edu.kh.laf.member.model.service;

import java.util.Map;

public interface EmailService {
	
	int signUp(String memberEmail, String title);
		
	String createAuthKey();
	
	int checkAuthKey(Map<String, Object> paramMap);
	
	/** 주문내역 이메일전송
	 * @param emailDate
	 * @return
	 */
	String sendOrderEmail(Map<String, Object> emailData);

}
