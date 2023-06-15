package edu.kh.laf.member.model.dto;

import lombok.*;

@Data
public class Member {
    private Long memberNo;				// 회원번호
    private String memberId;			// 회원아이디
    private String memberPw;			// 비밀번호
    private String memberName;			// 회원 이름
    private String memberGender;		// 성별
    private String memberEmail;			// 이메일
    private String memberPhone;			// 전화번호
    private String memberBirth;			// 생일
    private String memberAddress;		// 회원주소
    private String memberGrade;			// 회원 등급(B:브론즈, S:실버, G:골드, D:다이아, A:관리자)
    private String memberEnrollDate;	// 가입일
    private String memberDelFL;			// 회원 탈퇴여부
    private String memberDelDate;		// 회원 탈퇴일
    private String memberSocial;		// 회원 소셜가입
    private Long memberPoint;			// 회원 적립금
    private Long memberTotalPay;		// 회원 누적 구매액
    private String memberNot;			// 비회원 여부
    private String refundName;			// 환불 예금주
    private String refundBank;			// 환불 은행명
    private String refundAccount;		// 환불 계좌번호
}
