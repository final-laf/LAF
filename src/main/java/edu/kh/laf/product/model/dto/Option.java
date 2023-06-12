package edu.kh.laf.product.model.dto;

import lombok.*;

@Data
public class Option {
	private long optionNo;		// 옵션번호
	private long productNo;		// 상품번호
	private String size;		// 사이즈
	private String color;		// 컬러
	private int stock;			// 재고
	private String location;	// 창고위치
	private int count;		  // 총판매량
}
