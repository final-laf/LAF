package edu.kh.laf.board.model.dto;

import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import lombok.Data;

@Data
public class ReviewImg {
	private long reviewNo;
	
	
	private Order order;
	private Product product; 		 // 상품
	private Option option; 			 // 옵션
	private long count;
}
