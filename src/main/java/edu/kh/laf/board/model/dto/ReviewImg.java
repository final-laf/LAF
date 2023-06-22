package edu.kh.laf.board.model.dto;

import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import lombok.Data;

@Data
public class ReviewImg {
	private long reviewImgNo;
	private long reviewNo;
	private String reviewPath;
	private int reviewOrder;
}
