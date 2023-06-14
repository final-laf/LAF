package edu.kh.laf.member.model.service;

import java.util.Map;

public interface EmailService {
	
	int signUp(String memberEmail, String title);
		
	String createAuthKey();
	
	int checkAuthKey(Map<String, Object> paramMap);

}
