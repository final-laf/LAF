package edu.kh.laf.product.model.service;

import java.util.List;

import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Cart;

public interface CartService {

	/**
	 * 장바구니 상품 목록 조회
	 * @param memberNo
	 * @return cartList
	 */
	List<Cart> selectCart(Long memberNo);

	/**
	 * 장바구니에 상품 추가
	 * @param cartList
	 * @param memberNo
	 * @return result
	 */
	int insertCart(String data, Long memberNo);

	/**
	 * 장바구니 상품 삭제
	 * @param data
	 * @param memberNo
	 * @return result
	 */
	int deleteCart(String data, Long memberNo);
	
	/**
	 * 결제완료 후 장바구니 상품 삭제
	 * @param orderList
	 * @return result
	 */
	int deleteCartAfterOrder(List<OrderProduct> orderList);

}
