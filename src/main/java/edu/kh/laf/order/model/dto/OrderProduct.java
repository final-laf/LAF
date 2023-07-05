package edu.kh.laf.order.model.dto;

import java.io.Serializable;

import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class OrderProduct implements Serializable {

	private long productNo;			 // 상품번호
	private long orderNo; 			 // 주문번호
	private long memberNo; 			 // 회원번호
	private long optionNo; 			 // 옵션변호
	private int count; 				 // 수량
	private String orderProductDeleteFl; // 삭제여부
	
	private Product product; 		 // 상품
	private Option option; 			 // 옵션
}
