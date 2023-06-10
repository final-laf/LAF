package edu.kh.laf.product.dto;

import java.util.List;

import lombok.*;

@Data
public class Product {
	private long productNo;
	private String productName;
	private long productPrice;
	private int productSale;
	private String productState;
	private String productDate;
	private int clickCount;
	private long imgNo;
	
	private List<Option> option; 
}
