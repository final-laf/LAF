package edu.kh.laf.order.model.dto;

import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import lombok.Data;

@Data
public class OrderProduct {

	private long productNo;			 // 상품번호
	private long orderNo; 			 // 주문번호
	private long memberNo; 			 // 회원번호
	private long optionNo; 			 // 옵션변호
	private int count; 				 // 수량
	
	private Product product; 		 // 상품
	private Option option; 			 // 옵션
}
