package edu.kh.laf.product.model.dto;

import lombok.Data;

@Data
public class Product {
    private long productNo;
    private String productName;
    private long productPrice;	// 원가
    private int productSalePrice;	// 할인가
    private int productSale;        // 할인율
    private String productState;    // N:비공개, O:판매중, S:품절
    private String productDate;     // 상품 등록일
    private int clickCount;

    // join `product_img` table
    private String thumbnailPath;   // 썸네일 이미지 경로
    private String[] imgPath;       // 상품 상세 이미지 경로
    
    // additional data
    private int likeCount; // 찜목록에 담긴 횟수
    private int reviewCount; // 리뷰 갯수
}
