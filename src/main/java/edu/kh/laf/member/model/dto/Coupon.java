package edu.kh.laf.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Coupon {
	
	private long couponNo;			// 쿠폰번호
	private long memberNo;			// 회원번호
	private String couponName;		// 쿠폰명		
	private String couponGetDate;	// 쿠폰발급일
	private String couponDueDate;	// 쿠폰만료일
	private long couponAmount;		// 할인율/할인액
	private String couponUnit;		// p퍼센트/m금액
	private long couponMaxDiscount;	// 최대할인금액
	private long couponCondition;	// 사용조건금액
	private String couponFL;		// N사용전/Y사용후
	
	
}
