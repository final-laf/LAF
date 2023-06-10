package edu.kh.laf.order.model.service;

import java.util.List;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.dto.Product;


public interface OrderService {

	/** 주문자정보
	 * @param memberNo
	 * @return
	 */
	Member orderMember(long memberNo);

	/** 주문상품정보
	 * @param cartList
	 * @return
	 */
	List<Product> orderList(List<Cart> cartList);

}
