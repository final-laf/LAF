package edu.kh.laf.product.model.service;

import java.util.List;

import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Cart;
import jakarta.servlet.http.Cookie;

public interface CartService {

	/**
	 * [회원] 장바구니 상품 목록 조회
	 * @param memberNo
	 * @return cartList
	 */
	List<Cart> selectCart(Long memberNo);
	
	/**
	 * [비회원] 장바구니 상품 목록 조회
	 * @param cartCookie
	 * @return cartList
	 */
	List<Cart> selectCart(Cookie cartCookie);

	/**
	 * [회원] 장바구니에 상품 추가
	 * @param cartList
	 * @param memberNo
	 * @return result
	 */
	int insertCart(String data, Long memberNo);


	/**
	 * [비회원] 장바구니에 상품 추가
	 * @param cookies
	 * @param data
	 * @return cookie
	 */
	Cookie insertCart2(Cookie[] cookies, String data);
	
	/**
	 * [회원] 장바구니 상품 전체 삭제
	 * @param memberNo
	 * @return result
	 */
	int deleteCartAll(Long memberNo);

	/**
	 * [회원] 장바구니 상품 선택 삭제
	 * @param data
	 * @param memberNo
	 * @return result
	 */
	int deleteCart(String data, Long memberNo);
	
	/**
	 * [비회원] 장바구니 상품 선택 삭제
	 * @param cookies
	 * @param data
	 * @return cookie
	 */
	Cookie deleteCart2(Cookie[] cookies, String data);

	/**
	 * 결제완료 후 장바구니 상품 삭제
	 * @param orderList
	 * @return result
	 */
	int deleteCartAfterOrder(List<OrderProduct> orderList);




	


}
