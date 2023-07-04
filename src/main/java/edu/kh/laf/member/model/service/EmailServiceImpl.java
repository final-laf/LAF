package edu.kh.laf.member.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import edu.kh.laf.member.model.mapper.EmailMapper;
import edu.kh.laf.order.model.dto.Order;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {
	
		@Autowired
		private SpringTemplateEngine templateEngine;
	
		@Autowired
	    private EmailMapper mapper;
	    
	    @Autowired
	    private JavaMailSender mailSender;
	    
	    private String fromEmail = "grainbite@gmail.com";
	    private String fromUsername = "LAF";

	    // 암호 키 생성
	    @Override
	    public String createAuthKey() {
	        String key = "";
	        for(int i=0 ; i< 6 ; i++) {
	            int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
	            if(sel1 == 0) {
	                int num = (int)(Math.random() * 10); // 0~9
	                key += num;
	            }else {
	                char ch = (char)(Math.random() * 26 + 65); // A~Z
	                int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
	                if(sel2 == 0) {
	                    ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
	                }
	                key += ch;
	            }
	        }
	        return key;
	    }
	    
	    @Transactional
	    @Override
	    public int signUp(String memberEmail, String title) {
	        
	        //6자리 난수 인증번호 생성
	        String authKey = createAuthKey();
	        try {
	            //인증메일 보내기
	            MimeMessage mail = mailSender.createMimeMessage();
	            // 제목
	            String subject = "[LAF]"+title+" 인증코드";
	            // 문자 인코딩
	            String charset = "UTF-8";
	            // 메일 내용
	            String mailContent 
	                = "<p>LAF "+title+" 인증코드입니다.</p>"
	                + "<h3 style='color:blue'>" + authKey + "</h3>";
	            
	            // 송신자(보내는 사람) 지정
	            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
	            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(memberEmail));
	            
	            // 수신자(받는사람) 지정
	            
	            // 이메일 제목 세팅
	            mail.setSubject(subject, charset);
	            
	            // 내용 세팅
	            mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
	            
	            mailSender.send(mail);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return 0;
	        }
	        
	        Map<String, String> map = new HashMap<String, String>();
	        map.put("authKey", authKey);
	        map.put("memberEmail", memberEmail);
	        
	        
	        int result = mapper.updateAuthKey(map);
	        
	        if(result == 0) {
	        	result = mapper.insertAuthKey(map);
	        }
	        

	        return result;
	    }

		@Override
		public int checkAuthKey(Map<String, Object> paramMap) {
			return mapper.checkAuthKey(paramMap);
		}      
		
		
		
		@Override
		public String sendOrderEmail(Map<String, Object> emailData) {
			
			Order order = (Order)emailData.get("order");
			
			// 제목
			String subject = "[LAF] " + order.getOrderDate().substring(0,10) + " 주문내역 "+ order.getOrderUno();
			System.out.println(subject);

			// 주문자 이메일 주소 조회 - 이메일 받는사람
			String sendEmail = mapper.selectSendEmail(order.getMemberNo());
			System.out.println(sendEmail);
            
			// 내용 - 템플릿에 전달할 데이터
			Context context = new Context();
			context.setVariable("emailData", emailData);
			
			 try {
	            //인증메일 보내기
	            MimeMessage mail = mailSender.createMimeMessage();
	            MimeMessageHelper mailhelper = new MimeMessageHelper(mail, true, "UTF-8");
	            
	            //메일 제목 설정
	            mailhelper.setSubject(subject);
	     
	            // 송신자(보내는 사람) 지정
	            mailhelper.setFrom("lostandfoundff@gmail.com");

	            //수신자 설정
//	            mailhelper.setTo(sendEmail);
//	            mailhelper.setTo("kjaew31@gmail.com");
	            
	            // 내용설정
	            String html = templateEngine.process("mail", context);
	            mailhelper.setText(html, true);
	            
//	            mailSender.send(mail);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		
			return null;
		}
		

}
