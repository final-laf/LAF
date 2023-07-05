package edu.kh.laf.product.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.product.model.dto.Cart;

@Mapper
public interface CartMapper {

	/**
	 * 장바구니에 상품 추가
	 * @param cartList
	 * @return result
	 */
	int insertCart(List<Cart> cartList);

	/**
	 * 유저 번호로 장바구니 목록 조회
	 * @param memberNo
	 * @return cartList
	 */
	List<Cart> selectCart(long memberNo);

	/**
	 * 장바구니 상품 선택 삭제
	 * @param cartList
	 * @return result
	 */
	int deleteCart(List<Cart> cartList);

	/**
	 * 장바구니 상품 전체 삭제
	 * @param memberNo
	 * @return result
	 */
	int deleteCartAll(Long memberNo);

	/**
	 * [회원] 장바구니 상품 갯수 조회
	 * @param memberNo
	 * @return cartCount
	 */
	int getCartCount(Long memberNo);

}
