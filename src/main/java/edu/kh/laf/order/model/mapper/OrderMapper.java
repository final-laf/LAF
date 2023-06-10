package edu.kh.laf.order.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface OrderMapper {
	
	// 주문자정보
	public Member orderMember(long memberNo);

	// 주문상품정보
	public Product orderProduct(Cart cart);
}
