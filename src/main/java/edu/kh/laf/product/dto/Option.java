package edu.kh.laf.product.dto;

import lombok.*;

@Data
public class Option {
	private long optionNo;
	private long productNo;
	private String size;
	private String color;
	private int stock;
	private String location;
	private int sellCount;
}
