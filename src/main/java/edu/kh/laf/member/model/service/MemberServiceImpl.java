package edu.kh.laf.member.model.service;

import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.mapper.MemberMapper;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberServiceImpl implements MemberService {

	
	@Autowired
	private MemberMapper mapper;
	
	@Autowired
	private MypageMapper myPageMapper;
	
	@Autowired // bean으로 등록된 객체 중 타입이 일치하는 객체를 DI
	private BCryptPasswordEncoder bcrypt;
	
    @Autowired
    private JavaMailSender mailSender;
    
    private String fromEmail = "grainbite@gmail.com";
    private String fromUsername = "LAF";
	
    
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


	// 비밀번호 찾기(이메일 전송)
	@Override
	public int sendNewPw(String memberEmail, String memberPw, String title) {
		
		int emailResult = 0;
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
	                + "<h3 style='color:blue'>" + memberPw + "</h3>";
	            // 송신자(보내는 사람) 지정
	            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
	            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(memberEmail));
	            // 이메일 제목 세팅
	            mail.setSubject(subject, charset);
	            // 내용 세팅
	            mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
	            mailSender.send(mail);
	            emailResult = 1;
	        } catch (Exception e) {
	            e.printStackTrace();
	            return emailResult;
	        }

	        return emailResult;
	}


	// 아이디와 주문번호로 비회원 주문 조회
	@Override
	public int selectNotMemberOrder(Map<String, String> paramMap) {
		return mapper.selectNotMemberOrder(paramMap);
	}

	// 회원관리 : 회원조회
	@Override
	public Map<String, Object> selectAllMemberList(Map<String, Object> paramMap) {
		// 회원수 조회
		int listCount = mapper.getAllMemberCount(paramMap);
		int cp = (paramMap.get("cp") == null) ? 1 : Integer.parseInt((String)paramMap.get("cp"));
		Pagination pagination = new Pagination(listCount, cp, 10);
				
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 로우바운드가 적용된 전체 회원 조회
		List<Member> memberList = mapper.selectAllMemberList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("memberList", memberList);
		resultMap.put("listCount", listCount);
		
		return resultMap;
	}

	// 회원 정보 비동기 조회
	@Override
	public Member selectMemberDetail(Long memberNo) {
		return mapper.selectMemberDetail(memberNo);
	}


	// 회원 정보 비동기 조회(회원 기본 배송지)
	@Override
	public Address selectMemberDetailDefaultAddress(Long memberNo) {
		return mapper.selectMemberDetailDefaultAddress(memberNo);
	}


	// 페이지리스트가 적용된 주문 조회
	@Override
	public Map<String, Object> selectAllOrderList(Map<String, Object> paramMap) {
		// 주문 개수 조회
		int listCount = mapper.getOrderListCount(paramMap); 
		int cp = (paramMap.get("cp") == null) ? 1 : Integer.parseInt(String.valueOf(paramMap.get("cp")));
		Pagination OrderListpagination = new Pagination(listCount, cp, 10);
		
		int offset = (OrderListpagination.getCurrentPage() - 1) * OrderListpagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, OrderListpagination.getLimit());
		// 페이지네이션이 적용된 주문 목록 조회
		List<Order> orderList = mapper.selectAllOrderList(paramMap, rowBounds);
		
		List<Map<String, Object>> orderMaps = new ArrayList<>();
		
		
		for(Order order : orderList) {
			OrderProduct orderProduct = myPageMapper.selectOrderProduct(order.getOrderNo());
			if(orderProduct != null) {
				Map<String, Object> orderMap = new HashMap<>();
				
				orderProduct.setProduct(myPageMapper.selectProduct(orderProduct.getProductNo()));
				orderProduct.setOption(myPageMapper.selectOption(orderProduct.getOptionNo()));
				
				orderMap.put("orderProduct", orderProduct);
				orderMap.put("order", order);
				orderMaps.add(orderMap);
			}
		}
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("OrderListpagination", OrderListpagination);
		resultMap.put("orderList", orderList);
		resultMap.put("orderMaps", orderMaps);
		
		return resultMap;
	}


	




}
