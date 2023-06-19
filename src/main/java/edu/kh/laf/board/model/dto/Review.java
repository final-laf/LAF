package edu.kh.laf.board.model.dto;

import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import lombok.Data;

@Data
public class Review {
	private String memberId;
	private long reviewNo; 			 // 리뷰 번호
	private String reviewContent; 	 // 리뷰 내용
	private String reviewCreateDate; // 리뷰 생성일
	private int reviewScore; 		 // 후기 점수
	private long orderNo;			 // 주문 번호
	private long productNo;			 // 상품 번호
	private long optionNo;			 // 옵션 번호
	private ReviewImg reviewImg;     // 리뷰 이미지
	
	private Order order;	      	 // 주문
	private Product product; 		 // 상품
	private Option option; 			 // 옵션
	private long count;				 // 수량
	
	private double reviewScoreAvg;  	 // 후기 점수 평균
	private int reviewCount;
}
