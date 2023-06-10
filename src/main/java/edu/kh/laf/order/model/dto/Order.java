package edu.kh.laf.order.model.dto;

import lombok.Data;

@Data
public class Order {
	private long orderNo;
	private long memberNo;
	private String orderResName;
	private String orderResAdd;
	private String orderResPhone;
	private String orderResRequire;
	private long orderTotalPrice;
	private long orderPayment;
	private String orderDate;
	private long pointNoGain;
	private long pointNoUse;
	private String payment;
	private String paymentBank;
	private String paymentName;
	private long reviewNo;
	private String orderState;
	private long couponNo;
}
