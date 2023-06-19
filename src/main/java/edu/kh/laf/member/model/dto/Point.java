package edu.kh.laf.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class Point {
	private long pointNo;			// 적립번호
	private long memberNo;			// 회원번호
	private String pointSort;		// 구분(G적립,U사용)
	private long pointAmount;	    // 사용액
	private String pointGetDate;    // 적립일
	private String pointDueDate;  	// 만료일
	private String pointUseDate;  	// 사용일
	private String pointContent;    // 적립사용사유
	private long orderNo;  			// 주문번호
	private long optionNo;  		// 옵션번호
	
}
