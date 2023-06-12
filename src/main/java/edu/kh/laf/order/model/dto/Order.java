package edu.kh.laf.order.model.dto;

import lombok.Data;

@Data
public class Order {
	private long orderNo;				// 주문번호
	private long memberNo;				// 주문자번호
	private String orderRecvName;		// 받는사람 이름
	private String orderRecvAdd;		// 받는사람 주소
	private String orderRecvPhone;		// 받는사람 전화번호
	private String orderRecvRequire;	// 주문요청사항
	private long orderTotalPrice;		// 주문 총가격
	private long orderPayment;			// 결제 총가격
	private String orderDate;			// 주문날짜
	private long pointNoGain;			// 적립번호
	private long pointNoUse;			// 적립번호
	private String payment;				// 지불방법
	private String paymentBank;			// 은행
	private String paymentName;			// 입금자명
	private long reviewNo;				// 후기번호
	private String orderState;			// 주문현황
	private long couponNo;				// 쿠폰번호
}
