package edu.kh.laf.member.model.dto;

import lombok.*;

@Data
public class Member {
    private Long memberNo;				// 회원번호
    private String memberId;			// 회원아이디
    private String memberPw;			// 비밀번호
    private String memberName;			// 회원 이름
    private String memberGender;		// 성별
    private int memberAge;				// 나이
    private String memberEmail;			// 이메일
    private String memberPhone;			// 전화번호
    private String memberBirth;			// 생일
    private String memberGrade;			//
    private String memberEnrollDate;	// 가입일
    private String memberDeleteFlage;	
    private String memberDeleteDate;
    private String memberSocial;
    private Long memberPoint;
    private Long memberTotalPay;
    private String memberNot;
    private String refundName;
    private String refundBank;
    private String refundAccount;
}
