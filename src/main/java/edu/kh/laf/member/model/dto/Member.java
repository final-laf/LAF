package edu.kh.laf.member.model.dto;

import java.sql.Date;

import lombok.*;

@Data
public class Member {
    private Long memberNo;
    private String memberId;
    private String memberPw;
    private String memberName;
    private String memberGender;
    private int memberAge;
    private String memberEmail;
    private String memberPhone;
    private String memberBirth;
    private String memberGrade;
    private String memberEnrollDate;
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
