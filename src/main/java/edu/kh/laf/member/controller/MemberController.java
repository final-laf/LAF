package edu.kh.laf.member.controller;

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.OAuthToken;
import edu.kh.laf.member.model.dto.SocialLoginProfile;
import edu.kh.laf.member.model.service.EmailService;
import edu.kh.laf.member.model.service.MemberService;
import edu.kh.laf.mypage.model.service.MypageLikeServcie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Controller
@SessionAttributes({"loginMember", "likeList"})
public class MemberController {

    @Autowired
    private MemberService service;
    @Autowired
    private MypageLikeServcie likeServcie;
    @Autowired
    private EmailService emailService;
    
    @Value("${kakao.client.id}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.redirect.url}")
    private String KAKAO_REDIRECT_URL;

    @Value("${kakao.socialLogin.pw}")
    private String KAKAO_PW;
    
    @Value("${kakao.logout.url}")
    private String KAKAO_LOGOUT_URL;
    
    
    // 로그인 페이지 이동
	@GetMapping("/login")
	public String login() {
		return "member/login";
	}
	
	// 회원가입 페이지 이동
	@GetMapping("/signup")
	public String signup() {
		return "member/signUp";
	}
	
	// 비밀번호 찾기 페이지 이동
	@GetMapping("/findpw")
	public String findPw() {
		return "member/findPw";
	}
	
	// 로그인 기능
	@PostMapping("/login")
	public String login(Member inputMember, Model model
			, @RequestHeader(value="referer") String referer
			, @RequestParam(value="saveId", required=false) String saveId
			, HttpServletResponse resp
			, RedirectAttributes ra
			, HttpServletRequest request
			) {
		
		Member loginMember = service.login(inputMember);
		String path = "redirect:"; 
		if(loginMember != null) { // 로그인 성공 시
			
			
			// 비회원인지 조회 후 이전페이지로 리다이렉트
			if(loginMember.getMemberNot().toUpperCase().equals("Y")) {
				ra.addFlashAttribute("message", "회원가입이 되어있지 않은 회원입니다.");
				return path += referer;
			}
			
			// 기존에 있던 세션 정보를 초기화
			request.getSession().invalidate();
			request.getSession(true);

			path += "/"; // 메인페이지로 리다이렉트
			model.addAttribute("loginMember", loginMember);
			
			// 로그인한 회원의 찜 목록 리스트(productNo)
			List<Long> likeLikst = likeServcie.selectLikeList(loginMember.getMemberNo());
			model.addAttribute("likeList", likeLikst);
			
			
//			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
//			if(saveId != null) { // 체크 되었을 때
//				cookie.setMaxAge(60 * 60 * 24 * 30); // 초 단위로 지정
//			}else {
//				cookie.setMaxAge(0);
//			}
//			cookie.setPath("/"); 
//			resp.addCookie(cookie);
			
			
		} else { // 로그인 실패 시
			path += referer; // HTTP Header - referer(이전 주소)
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		
		return path;
	}

	// 로그아웃 기능
	@GetMapping("/logout")
	  public String logout(SessionStatus status, @SessionAttribute(value = "loginMember", required = false) Member loginMember) {
		
		
		// 카카오 로그인일 경우 카카오톡과 함께 로그아웃 (GET방식으로 요청/진행중)
		if(loginMember.getMemberSocial().equals("K")) {
            URI logoutUrl = UriComponentsBuilder
                    .fromUriString("https://kauth.kakao.com/oauth/logout")
                    .queryParam("client_id", KAKAO_CLIENT_ID)     
                    .queryParam("logout_redirect_uri", KAKAO_LOGOUT_URL)     
                    .build()
                    .toUri();
			RestTemplate rt = new RestTemplate();
			rt.getForObject(logoutUrl, String.class);
			status.setComplete(); 
		} else {
			status.setComplete(); 
		}
	    
	    return "redirect:/";
	}
	
	// 아이디 중복 검사
	@GetMapping("/dupCheck/id")
	@ResponseBody
	public int checkId(String memberId) {
		return service.checkId(memberId);
	}
	
	// 이메일 중복 검사
	@GetMapping("/dupCheck/email")
	@ResponseBody
	public int checkEmail(String memberEmail) {
		return  service.checkEmail(memberEmail);
	}
   
	// 회원 가입 진행
	@PostMapping("/signUp")
	public String signUp(Member inputMember
				, String[] memberAddress
				, String[] memberBirth
				, RedirectAttributes ra) {
		
	
		// 분리된 주소값 구분자를 넣어 String으로 변환, 입력
		// 만약 주소를 입력하지 않은 경우(,,) null로 변경
		if(inputMember.getMemberAddress().equals(",,")) {
			inputMember.setMemberAddress(null);
		
		}else {
			// 주소 요소 사이에 "^^^" 추가
			String addr = String.join("^^^", memberAddress);
			inputMember.setMemberAddress(addr);
		}
		
	
		// 분리된 생년월일 String으로 변환, 입력
		// 만약 생년월일을 입력하지 않은 경우(,,) null로 변경
		if(inputMember.getMemberBirth().equals(",,")) {
			inputMember.setMemberBirth(null);
			
		}else {
			// 생일 요소 사이에 "^^^" 추가
			String birth =  Arrays.stream(memberBirth).collect(Collectors.joining());
			inputMember.setMemberBirth(birth);
		}
		
		
		// 회원 가입 서비스 호출
		int result = service.signUp(inputMember);
		
		// 가입 성공 여부에 따라 주소 결정
		String path = "redirect:";
		String message = null;
		
		if(result > 0) { // 가입 성공
			path += "/"; // 메인 페이지
			message = inputMember.getMemberName() + "님의 가입을 환영합니다.";
		} else { // 가입 실패
			path += "signUp";  
			message = "회원 가입 실패!";
		}
		
		ra.addFlashAttribute("message", message);
		return path;
	}
	

	
	// 비밀번호 찾기
	@PostMapping("/findpw")
	public String findPw(String memberId
						,String memberEmail
						,RedirectAttributes ra) {
		
		String message;
		String path;
		
		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("memberId", memberId);
		paramMap.put("memberEmail", memberEmail);
		
		// 아이디와 이메일번호가 일치하는지 확인
		Member member = service.selectMatch(paramMap);
		// 일치하지 않으면
		if(member == null) {
			message = "아이디 또는 비밀번호가 일치하지 않습니다.";
			path =  "redirect:/findpw";
		} else {
		// 일치하면
			// 랜덤한 비밀번호 생성
			String memberPw = service.createPw();
			// 비밀번호를 새로운 랜덤 비밀번호로 업데이트
			paramMap.putIfAbsent("memberPw", memberPw);
			int result = service.findPw(paramMap);
			// 랜덤으로 생성한 번호를 메일로 보내기
			if(result > 0) {
				service.sendNewPw(memberEmail, memberPw, "비밀번호 찾기");
				message = "새로운 비밀번호가 이메일로 전송되었습니다.";
				path = "redirect:/login";
			} else {
				message = "새로운 비밀번호가 이메일로 전송되지 않았습니다. 다시 시도해주시기 바랍니다.";
				path =  "redirect:/";
			}
		}
		
		ra.addFlashAttribute("message", message);
		return path;
	}
	
	
	// 아이디와 주문번호로 비회원 주문 조회
	@PostMapping("/notmember")
	public String signUp(String memberPhone
				  		,String orderUno
				  		,RedirectAttributes ra) {
		
		String path;
		// orderNo Long 타입으로 바꿔주기
		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("memberPhone", memberPhone);
		paramMap.put("orderUno", orderUno);
		
		// orderNo를 받아옴
		long orderNo = service.selectNotMemberOrder(paramMap);
		if(orderNo > 0) {
			path = "redirect:/order/" + orderNo;
		} else {
			path = "redirect:/login";
			String message = "전화번호 또는 이메일 주소가 일치하지 않습니다.";
			ra.addFlashAttribute("message", message);
		}
		return path;
	}
	
	// 카카오로그인 (POST방식으로 인증 토큰 요청)
	public OAuthToken kakaoCallback(String code) {
		
		RestTemplate rt = new RestTemplate();
		
		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8"); // 내가 담을 데이터가 key=value 타입이라는걸 알려줌
		
		// HttpBody 오브젝트 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", KAKAO_CLIENT_ID);
		params.add("redirect_uri", KAKAO_REDIRECT_URL);
		params.add("code", code);
		
		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기(exchange함수가 httpentity를 담기 때문)
		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
		
		// Http 요청하기 = Post 방식으로 - 그리고 response 변수의 응답 받음
		ResponseEntity<String> response = rt.exchange(
				"https://kauth.kakao.com/oauth/token",
				HttpMethod.POST,
				kakaoTokenRequest,
				String.class
		);
		
		// 엑세스 토큰을 java 객체로 만들기
		// Gson, Json Simple, ObjectMapper
		ObjectMapper objectMapper = new ObjectMapper();
		OAuthToken oauthtoken = null;
		try {
			oauthtoken = objectMapper.readValue(response.getBody(), OAuthToken.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return oauthtoken;
	}
	
	
	// 카카오로그인
	public Member kakaoGetInfo(OAuthToken oauthtoken) {
		
		//POST방식으로 인증 토큰을 가지고 사용자 정보 요청(카카오쪽으로)
		RestTemplate rt2 = new RestTemplate();
		
		// HttpHeader 오브젝트 생성
		HttpHeaders headers2 = new HttpHeaders();
		headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		headers2.add("Authorization", "Bearer " + oauthtoken.getAccess_token());
		
		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기(exchange함수가 httpentity를 담기 때문)
		HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest2 = new HttpEntity<>(headers2);
		
		// Http 요청하기 = Post 방식으로 - 그리고 response 변수의 응답 받음
		ResponseEntity<String> response2 = rt2.exchange(
				"https://kapi.kakao.com/v2/user/me",
				HttpMethod.POST,
				kakaoProfileRequest2,
				String.class
		);
		
		// 엑세스 토큰을 java 객체로 만들기
		// Gson, Json Simple, ObjectMapper
		ObjectMapper objectMapper2 = new ObjectMapper();
		SocialLoginProfile socialLoginProfile = null;
		try {
			socialLoginProfile = objectMapper2.readValue(response2.getBody(), SocialLoginProfile.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		// Member 오브젝트(id)
		Member member = new Member();
		member.setMemberId("K" + socialLoginProfile.getId());
		member.setMemberPw(KAKAO_PW);
		member.setMemberName(socialLoginProfile.properties.getNickname());
		member.setMemberEmail("emailTemp");
		member.setMemberPhone("01012341234");
		member.setMemberAddress("00000, 임시주소값, 임시주소값");
		member.setMemberSocial("K");
		
		return member;
	}
	
	
	
	// 카카오 로그인
	@GetMapping("/auth/kakao/callback")
	public String kakaoLogin(String code
							, Model model
							, HttpServletResponse resp
							, RedirectAttributes ra
							, HttpServletRequest request) {
		
		// 카카오에 코드를 주고 인증 토큰 받아오기
		OAuthToken oauthtoken = kakaoCallback(code);
		// 카카오에 인증 토큰을 주고 개인정보 받아오기(id, nickname)
		Member member = kakaoGetInfo(oauthtoken);
		// id 중복검사
		int result = checkId(member.getMemberId());
		
		Member loginMember = new Member();
		if(result == 0) {
			// 중복된 id가 없을시 회원가입 후 로그인
			service.signUp(member);
		}
		// member로 회원 조회(회원번호를 가져오기 위한 과정)
		loginMember = service.selectMemberById(member);
		// 중복된 id가 있을 시 로그인
		service.login(loginMember);
		
		// 기존에 있던 세션 정보를 초기화
		request.getSession().invalidate();
		request.getSession(true);
		
		// 세션에 로그인멤버 정보 저장
		model.addAttribute("loginMember", loginMember);
		
		
//		// 로그인한 회원의 찜 목록 리스트(productNo)
//		List<Long> likeLikst = likeServcie.selectLikeList(member.getMemberNo());
//		model.addAttribute("likeList", likeLikst);
		
		
		return "member/socialLoginInfo";
	}
	
	
	
}