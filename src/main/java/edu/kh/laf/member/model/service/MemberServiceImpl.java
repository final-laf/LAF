package edu.kh.laf.member.model.service;

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

import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.mapper.MemberMapper;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.order.model.mapper.OrderMapper;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class MemberServiceImpl implements MemberService {

	
	@Autowired
	private MemberMapper mapper;
	
	@Autowired
	private OrderMapper orderMapper;
	
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
	
	// 회원 가입 기념 적립금 2000원 지급
	@Override
	public int insertSignupPoint(String memberId) {
		return mapper.insertSignupPoint(memberId);
	}

	
	// 적립한 포인트를 회원 정보에 반영
	@Override
	public int updateSignupPoint(String memberId) {
		return mapper.updateSignupPoint(memberId);
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
	            String subject = "[LAF]"+title+" 새로운 비밀번호 전송";
	            // 문자 인코딩
	            String charset = "UTF-8";
	            // 메일 내용
	            String mailContent 
	                = "<p>LAF "+title+" 새로운 비밀번호 입니다.</p>"
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
		Pagination OrderListpagination = new Pagination(listCount, cp, 5);
		
		int offset = (OrderListpagination.getCurrentPage() - 1) * OrderListpagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, OrderListpagination.getLimit());
		// 페이지네이션이 적용된 주문 목록 조회
		List<Order> orders = mapper.selectAllOrderList(paramMap, rowBounds);
		
		// 각 주문에 해당되는 orderProductList 조회
		List<Map<String, Object>> orderMaps = new ArrayList<>();
		for(Order order : orders) {
			List<OrderProduct> orderProductList = orderMapper.selectOrderDetailProductList((int)order.getOrderNo());
			// 상품, 옵션, 수량정보 담기
        	for(OrderProduct odp : orderProductList) {
        		// 상품정보조회
        		Product product = orderMapper.selectOrderProduct(odp.getProductNo());
        		odp.setProduct(product);
        		// 옵션정보조회
        		Option option = new Option();
        		option.setProductNo(odp.getProductNo());
        		option.setOptionNo(odp.getOptionNo());
        		option = orderMapper.selectOrderProductOption(option);
        		odp.setOption(option);
			}
        	Map<String, Object> orderMap = new HashMap<>();
			orderMap.put("orderProductList", orderProductList);
			orderMap.put("order", order);
			orderMaps.add(orderMap);
		}
		
		Map<String, Object> resultMap = new HashMap<>();

		resultMap.put("orderMaps", orderMaps);
		resultMap.put("OrderListpagination", OrderListpagination);
		
		return resultMap;
	}

	
	// 포인트를 적립하는 서비스
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int insertMemberPoint(Map<String, Object> paramMap) {
		int result = mapper.insertMemberPoint(paramMap);
		return result;
	}

	// 적립한 포인트를 회원 정보에 반영하는 서비스
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int updateMemberPoint(Map<String, Object> pointParamMap) {
		int updateResult = mapper.updateMemberPoint(pointParamMap);
		return updateResult;
	}

	// 회원 번호로 회원 목록 조회
	@Override
	public List<Member> selectMemberList(List<String> memberNoList) {
		return mapper.selectMemberList(memberNoList);
	}
	
	// 회원등급으로 회원 목록 조회
	@Override
	public List<Long> selectGradeMemberList(Long memberGrade) {
		return mapper.selectGradeMemberList(memberGrade);
	}

	// 회원 쿠폰 발급
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int insertMemberCoupon(Map<String, Object> paramMap) {
		return mapper.insertMemberCoupon(paramMap);
	}

	// 아이디로 회원 조회(회원id로 조회해서 member로 받아오는 기존 login sql문 재활용)
	@Override
	public Member selectMemberById(Member member) {
		return mapper.login(member);
	}

	// 멤버 수 추이 조회(최대 3년)
	@Override
	public List<Map<String, Object>> getMemeberStatistics() {
		return mapper.getMemeberStatistics();
	}




	




}
