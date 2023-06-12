package edu.kh.laf.order.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface OrderMapper {
	
	// 주문자정보
	public Member selectOrderMember(long memberNo);

	// 상품조회
	public Product selectOrderProduct(long productNo);

	// 옵션조회
	public Option selectOrderProductOption(Option selectOption);
	
	// 쿠폰조회
	public List<Coupon> selectCouponList(Long memberNo);
}
