package edu.kh.laf.member.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Address {

	private long addressNo; 			// 주소번호
	private long memberNo;				// 회원번호
	private String addressName;			// 배송지명
	private String addressReceiver;		// 받는사람
	private String address;				// 배송지 주소
	private String addressTel;			// 받는사람 전화번호
	private String addressDefaultFL;	// 기본배송지유무
	
}
