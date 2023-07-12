package edu.kh.laf.order.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
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
	
	// 주문옵션전체조회
	public Option SelectOrderCheck(Map<String, String> orderData);
	
	// 상품이름조회
	public String SelectProductName(int productNo);

	// 비회원 생성
	public int createNonMember(Member nonMember);
	
	// 비회원번호조회
	public int selectNonMember(String orderEmail);
	
	// 주문고유번호 중복확인
	public int checkOrderKey(String orderKey);

	// 주문내역추가
	public int insertOrder(Order order);
	
	// 주문번호조회
	public int selectOrderNo(String orderKey);

	// 주문상품목록테이블 추가
	public int insertOrderProduct(OrderProduct op);

	// 상품 재고 최신화
	public int optionCountUpdate(OrderProduct op);

	// 상품 모든 재고조회
	public int selectAllStock(OrderProduct op);

	// 상품 품절 전환
	public int updateSoldOut(OrderProduct op);

	// 적립금 적립
	public int insertGainPoint(Point gainPoint);

	// 사용한 적립금 내역 삽입
	public int insertUsePoint(Point usePoint);

	// order테이블 적립/사용 적립번호 업데이트
	public int updateOrderPointNo(Order order);

	// 회원 적립금, 누적구매액 최신화
	public int updateMemberPTP(Order order);

	// 쿠폰 사용상태 업데이트
	public int updateCouponFL(Order order);

	// 주문한 내역조회
	public Order selectOrder(int no);
	
	// 주문한 상품목록조회
	public List<OrderProduct> selectOrderDetailProductList(int no);

	// 사용된 쿠폰할인액조회
	public Coupon selectCoupon(long couponNo);

	// 적립/사용된 적립금 조회
	public String selectPoint(long couponNo);

	// 누적구매액 조회
	public int selectTotalPay(long memberNo);

	// 회원 등급 업데이트
	public int updateGrade(Member member);
	
	// 주문상태업데이트(취소중)
	public int updateOrderCancle(int no);

	// 주문상품목록업데이트(삭제)
	public int updateOrderProductCancle(int no);

	// 재고 복구
	public int updateStock(OrderProduct op);

	// 상품 판매중 전환
	public int updateSell(OrderProduct op);

	// 적립된 포인트 반환 내역 삽입	
	public int insertResetGainPoint(Point usePoint);

	// 사용된 포인트 반환 내역 삽입	
	public int insertResetUsePoint(Point useResetPoint);

	// 오늘 주문현황조회(관리자)
	public List<Map<String, String>> selectTodayOrderState();

	// 오늘 주문조회(관리자)
	public List<Order> selectTodayOrder();

	// 주문처리상태변경(관리자)
	public int changeOrderState(Map<String, Object> param);

	// 조건에 맞는 주문조회목록 개수(관리자)
	public int getfindOrderListCount(Map<String, Object> paramMap);
	
	// 조건에 맞는 주문조회목록(관리자)
	public List<Order> findOrderList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	// 일별 매출 조회 (30일 전까지만 조회)
	public List<Map<String, Object>> getRevenue();
	
	// 월별 매출 조회 (12개월)
	public List<Map<String, Object>> getRevenueMonth();
	
	// 연도별 매출 조회
	public List<Map<String, Object>> getRevenueYear();

	// 주문번호로 회원번호 조회
	public int selectCompletOrderNo(int orderNo);
	
	// 오늘 매출 조회
	public Long getRevenueToday();
	
	// 오늘 결제 확인
	public Long getPaymentToday();
}
