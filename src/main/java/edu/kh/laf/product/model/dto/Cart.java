package edu.kh.laf.product.model.dto;

import lombok.Data;

@Data
public class Cart {
	private long productNo;
	private long memberNo;
	private long optionNo;
	private int optionAmount;
}
