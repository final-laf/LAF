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

	/** 포인트서비스
	 * @param order
	 * @return
	 */
	int changePoint(Order order);

	/** 상품별 서비스
	 * @param orderProductList
	 * @return
	 */
	int changeProduct(int orderNo, List<OrderProduct> orderProductList);

	/** 쿠폰 상태 업데이트
	 * @param order
	 * @return
	 */
	int updateCouponFL(Order order);

	/** 주문한 내역조회
	 * @param no
	 * @return
	 */
	Order selectOrder(int no);

	/** 주문한 상품목록조회
	 * @param no
	 * @return
	 */
	List<OrderProduct> selectOrderDetailProductList(int no);


}
