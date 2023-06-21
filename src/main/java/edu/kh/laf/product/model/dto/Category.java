package edu.kh.laf.product.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Category {
	private long categoryNo;
	private String categoryName;
	private long parentCategoryNo;
	private int categoryOrder;
}