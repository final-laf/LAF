package edu.kh.laf.order.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Option;


public interface OrderService {

	/** 주문자정보
	 * @param memberNo
	 * @return
	 */
	Member selectOrderMember(long memberNo);

	/** 주문상품정보
	 * @param cartList
	 * @return
	 */
	List<OrderProduct> selectOrderProduct(List<OrderProduct> cartList);

	/** 쿠폰정보
	 * @param memberNo
	 * @return
	 */
	List<Coupon> selectCouponList(Long memberNo);

	/** 상품옵션전체조회
	 * @param orderData
	 * @return
	 */
	Option SelectOrderCheck(Map<String, String> orderData);

	/** 상품이름조회
	 * @param productNo
	 * @return
	 */
	String SelectProductName(int productNo);

}
