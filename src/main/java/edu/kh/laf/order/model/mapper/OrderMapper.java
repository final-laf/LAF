package edu.kh.laf.order.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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

}
