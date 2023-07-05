package edu.kh.laf.product.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Category {
	private long categoryNo;
	private String categoryName;
	private long parentCategoryNo;
	private String parentCategoryName;
	private int categoryOrder;
	
	private List<Category> childCategoryList;
}
