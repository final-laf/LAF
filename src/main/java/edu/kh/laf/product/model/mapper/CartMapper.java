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

}
