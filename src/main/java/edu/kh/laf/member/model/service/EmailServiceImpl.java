package edu.kh.laf.member.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import edu.kh.laf.member.model.dto.Member;
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
	    
	    // 회원가입 인증 메일 보내기
	    @Transactional
	    @Override
	    public int signUp(String memberEmail, String title) {
	        
	        //6자리 난수 인증번호 생성
	        String authKey = createAuthKey();
	        try {
	        	
	            String subject = "[LAF]"+title+" 인증코드";
				Context context = new Context();
				context.setVariable("authKey", authKey);
				
	            //인증메일 보내기
	            MimeMessage mail = mailSender.createMimeMessage();
	            MimeMessageHelper mailhelper = new MimeMessageHelper(mail, true, "UTF-8");
	            
	            //메일 제목 설정
	            mailhelper.setSubject(subject);
	            // 송신자(보내는 사람) 지정
	            mailhelper.setFrom("lostandfoundff@gmail.com");
	            //수신자 설정
	            mailhelper.setTo(memberEmail);
	            // 내용설정
	            String html = templateEngine.process("SignupMail", context);
	            mailhelper.setText(html, true);
	            // 로고이미지 cid로 삽입
	            mailhelper.addInline("logo", new ClassPathResource("/static/images/logo.png"));
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

	    
	    // 인증메일 확인
		@Override
		public int checkAuthKey(Map<String, Object> paramMap) {
			return mapper.checkAuthKey(paramMap);
		}      
		
		
		
		@Override
		public String sendOrderEmail(Map<String, Object> emailData) {
			
			Order order = (Order)emailData.get("order");
			
			// 제목
			String subject = "[LAF] " + order.getOrderDate().substring(0,10) + " 주문내역 "+ order.getOrderUno();

			// 주문자 정보 조회 - 이메일 받는사람
			Member orderMember = mapper.selectSendEmail(order.getMemberNo());
			
			// 주문자 이름 세팅
			order.setPaymentName(orderMember.getMemberName());
			
            // 주문자 이메일
			String sendEmail = orderMember.getMemberEmail();

			// 받는 사람 주소 세팅
			String[] add = order.getOrderRecvAdd().split("\\^\\^\\^");
			add[0] = "(" + add[0] + ")";
			order.setOrderRecvAdd(String.join(" ", add));

			
			// 받는 사람 전화번호 세팅
			StringBuilder recvTel = new StringBuilder();
			recvTel.append(order.getOrderRecvPhone().substring(0, 3));
	        recvTel.append("-");
	        recvTel.append(order.getOrderRecvPhone().substring(3, 7));
	        recvTel.append("-");
	        recvTel.append(order.getOrderRecvPhone().substring(7));
			
			order.setOrderRecvPhone(recvTel.toString());
			
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
	            mailhelper.setTo(sendEmail);
	            
	            // 내용설정
	            String html = templateEngine.process("orderMail", context);
	            mailhelper.setText(html, true);
	            
	            // 로고이미지 cid로 삽입
	            mailhelper.addInline("logo", new ClassPathResource("/static/images/logo.png"));
	            
	            mailSender.send(mail);
	            return "주문내역 이메일 전송 성공";
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "주문내역 이메일 전송 실패";
	        }
		
		}
		

}
