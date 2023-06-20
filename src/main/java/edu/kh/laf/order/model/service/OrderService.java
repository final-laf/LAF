package edu.kh.laf.order.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.dto.Order;
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

	/** 주문테이블추가
	 * @param order
	 * @param orderData
	 * @param loginMember
	 * @return
	 */
	String insertOrder(Order order, Map<String, Object> orderData, Member loginMember);

	/** 주문번호조회
	 * @param orderKey
	 * @return
	 */
	int selectOrderNo(String orderKey);

	/** 주문상품목록테이블 추가
	 * @param op
	 * @return
	 */
	int insertOrderProduct(OrderProduct op);

	/** 상품 재고 최신화
	 * @param count
	 * @return
	 */
	int optionCountUpdate(OrderProduct op);

	/** 상품 모든 재고조회
	 * @param op
	 * @return
	 */
	int selectAllStock(OrderProduct op);

	/** 상품 품절 전환
	 * @param op
	 * @return
	 */
	int updateSoldOut(OrderProduct op);

	/** 포인트서비스
	 * @param order
	 * @return
	 */
	int changePoint(Order order);


}
