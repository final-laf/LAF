package edu.kh.laf.product.model.dto;

import lombok.*;

@Data
public class Product {
	private long productNo;
	private String productName;
	private long productPrice;
	private long productSalePrice;
	private int productSale;
	private String productState;
	private String productDate;
	private int clickCount;
	private long imgNo;
	
	private long optionNo;
	private String size;
	private String color;
	private int stock;
	private String location;
	private int sellCount;
	
	private int optionAmount;
}
