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

	/** 사용된 쿠폰할인액조회
	 * @param couponNo
	 * @param pointUseNo 
	 * @param pointGainNo 
	 * @return
	 */
	Map<String, String> selectDiscount(long couponNo, long pointGainNo, long pointUseNo);

	/** 상품 할인액 계산
	 * @param odpList
	 * @return
	 */
	int productDc(List<OrderProduct> odpList);

	/** 주문취소 서비스
	 * @param no
	 * @return
	 */
	int updateOrder(int no);

	/** 포인트 취소 서비스
	 * @param no
	 * @return
	 */
	int updatePoint(int no);

	/** 오늘 주문현황조회(관리자)
	 * @return
	 */
	List<Map<String, String>> selectTodayOrderState();

	/** 오늘 주문목록조회(관리자)
	 * @return
	 */
	List<Map<String, Object>> selectTodayOrderList();

	/** 주문처리상태변경(관리자)
	 * @param paramMap
	 * @return
	 */
	int changeOrderState(List<Map<String, Object>> paramMap);

	/** 주문조회(관리자)
	 * @param paramMap
	 * @return
	 */
	 Map<String, Object> findOrderList(Map<String, Object> paramMap);


}
