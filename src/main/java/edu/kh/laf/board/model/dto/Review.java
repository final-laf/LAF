package edu.kh.laf.board.model.dto;

import java.util.List;

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
public class Review {
	private String memberId; 		 // 주문자 id
	private String memberName; 		 // 주문자 네임
	private long memberNo;
	private String orderUno;		 // 주문고유번호
	private long reviewNo; 			 // 리뷰 번호
	private String reviewContent; 	 // 리뷰 내용
	private String reviewCreateDate; // 리뷰 생성일
	private float reviewScore; 		 // 후기 점수
	private long orderNo;			 // 주문 번호
	private long productNo;			 // 상품 번호
	private long optionNo;			 // 옵션 번호
	private List<ReviewImg> reviewImg;     // 리뷰 이미지
	
	private Product product; 		 // 상품
	private Option option; 			 // 옵션
	private long count;				 // 수량
	
	private double reviewScoreAvg;  	 // 후기 점수 평균
	private int reviewCount;
}
