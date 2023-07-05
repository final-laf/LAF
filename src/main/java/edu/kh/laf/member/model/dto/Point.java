package edu.kh.laf.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Point {
	private long pointNo;			// 적립번호
	private long memberNo;			// 회원번호
	private String pointSort;		// 구분(G적립,U사용)
	private long pointAmount;	    // 금액
	private String pointDate;    	// 날짜
	private String pointDueDate;  	// 만료일
	private String pointContent;    // 적립사용사유
	
	
	private long orderNo;  			// 주문번호
	private String orderUno;  		// 주문고유번호
}