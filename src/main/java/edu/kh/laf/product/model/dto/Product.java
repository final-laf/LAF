package edu.kh.laf.product.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {
    private long productNo;			// 상품번호
    private String productName;		// 상품명
    private long productPrice;		// 원가
    private long productSalePrice;	// 할인가
    private int productSale;        // 할인율
    private	int productPoint;		// 상품 구매시 적립 포인트
    private String productState;    // N:비공개, O:판매중, S:품절
    private String productDate;     // 상품 등록일
    private int clickCount;

    // join `product_img` table
    private String thumbnailPath;   // 썸네일 이미지 경로
    private String[] imgPath;       // 상품 상세 이미지 경로
    
    // additional data
    private int likeCount; 			// 찜목록에 담긴 횟수
    private int reviewCount; 		// 리뷰 갯수
    private int sales;				// 총 판매량
    private int stock;				// 총 재고
}
