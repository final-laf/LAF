package edu.kh.laf.product.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Cart {
	private long productNo;
	private long memberNo;
	private long optionNo;
	private int count;
}
