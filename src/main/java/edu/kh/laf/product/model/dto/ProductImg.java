package edu.kh.laf.product.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProductImg {
	private long imgNo;
	private long productNo;
	private String imgPath;
	private String thumbFl;
}
