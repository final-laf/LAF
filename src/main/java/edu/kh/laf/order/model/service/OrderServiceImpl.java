package edu.kh.laf.order.model.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.order.model.mapper.OrderMapper;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderMapper mapper;
	
	// 주문자정보
	@Override
	public Member selectOrderMember(long memberNo) {
		return mapper.selectOrderMember(memberNo);
	}
	
	// 쿠폰정보
	@Override
	public List<Coupon> selectCouponList(Long memberNo) {
		return mapper.selectCouponList(memberNo);
	}
	
	// 주문상품정보
	@Override
	public List<OrderProduct> selectOrderProduct(List<OrderProduct> cartList) {
		
		List<OrderProduct> orderList = new ArrayList<>();
		
		for(OrderProduct cart : cartList) {
			
			OrderProduct orderProduct = new OrderProduct();
			
			// 상품,옵션번호 유지
			orderProduct.setProductNo(cart.getProductNo());
			orderProduct.setOptionNo(cart.getOptionNo());
			
			// 상품조회
			Product selectProduct = mapper.selectOrderProduct(cart.getProductNo());
			orderProduct.setProduct(selectProduct);
			
			// 옵션조회
			Option selectOption = new Option();
			selectOption.setProductNo(cart.getProductNo());
			selectOption.setOptionNo(cart.getOptionNo());
			
			selectOption= mapper.selectOrderProductOption(selectOption);
			orderProduct.setOption(selectOption);
			
			// 주문수량
			orderProduct.setCount(cart.getCount());
			
			orderList.add(orderProduct);
		}
		return orderList;
	}
	
	// 주문옵션전체조회
	@Override
	public Option SelectOrderCheck(Map<String, String> orderData) {
		return mapper.SelectOrderCheck(orderData);
	}
	
	// 상품이름조회
	@Override
	public String SelectProductName(int productNo) {
		return mapper.SelectProductName(productNo);
	}
	
	// 주문테이블추가
	@Override
	@Transactional(rollbackFor = Exception.class)
	public String insertOrder(Order order, Map<String, Object> orderData, Member loginMember) {
	
		// 주문자 번호 세팅
		// 비회원인 경우
		if( loginMember == null) {
			// 회원번호생성
			Member nonMember = new Member();
			nonMember.setMemberId("0");
			nonMember.setMemberPw("0");
			nonMember.setMemberName((String)orderData.get("orderName"));
			nonMember.setMemberEmail((String)orderData.get("orderEmail"));
			nonMember.setMemberPhone((String)orderData.get("orderTel"));
			nonMember.setMemberAddress((String)orderData.get("orderAdd"));
			nonMember.setRefundName((String)orderData.get("refundName"));
			nonMember.setRefundBank((String)orderData.get("paymentBank"));
			nonMember.setRefundAccount((String)orderData.get("refundAccount"));
			
			int result = mapper.createNonMember(nonMember);
			
			// 회원번호 가져오기
			if(result > 0) {
				long memberNo = nonMember.getMemberNo();
				order.setMemberNo(memberNo);
			}
		}
		
		// 주문고유번호 세팅
		// 주문고유번호 중복확인
		int duplCheck = 0;
		String orderKey = "";
		do{
			// 주문고유번호 생성
			String key = createAuthKey();
			// 결제날짜생성
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMdd");
			String dateCode = dateFormat.format(new Date());
			orderKey = dateCode +"-"+ order.getMemberNo() + "-"+ key;
			
			duplCheck = mapper.checkOrderKey(orderKey);
		}while(duplCheck != 0);
		order.setOrderUno(orderKey);
		
		// 주문상태 세팅(주문접수)
		order.setOrderState("A");
		// 주문내역 추가
		int result = mapper.insertOrder(order);
		if(result == 0) {
			orderKey = "";
		}
		return orderKey;
	}
	
	// 주문번호조회
	@Override
	public int selectOrderNo(String orderKey) {
		return mapper.selectOrderNo(orderKey);
	}
	
	// 상품별 서비스
	@Override
	public int changeProduct(int orderNo, List<OrderProduct> orderProductList) {
		
		int productResult = 0;
		
		for(OrderProduct op : orderProductList) {
			// orderNo세팅
			op.setOrderNo(orderNo);
			// 주문상품목록테이블 추가
			int opResult = mapper.insertOrderProduct(op);
			if(opResult == 0) {
				productResult = 0;
				break; // 실패 처리
			}else { // 추가성공시
				// 상품 재고 최신화
				int ocUpResult = mapper.optionCountUpdate(op);
				if(ocUpResult == 0) {
					productResult = 0;
					break; // 실패 처리
				}else { // 재고 최신화 성공시
					productResult = 1;
				}
			}
			
			// 상품 모든 재고조회 
			int productAllStock = mapper.selectAllStock(op);
			if(productAllStock == 0) { // 재고가 0이면 품절로 상품상태 업데이트
				// 상품 품절 전환
				int soldOut = mapper.updateSoldOut(op);
				if(soldOut == 0) {
					break; // 실패 처리
				}else {
					productResult = 1;
				}
			}
		}
		return productResult;
	}
	
	// 포인트서비스
	@Override
	public int changePoint(Order order) {
		
		int result = 0;
		
		// 회원 적립금, 누적구매액 최신화
		int umResult = mapper.updateMemberPTP(order);
		if(umResult > 0) {
			System.out.println("업데이트성공");
		}

		// 날짜 생성
		SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");
		String payDate = dateFormat.format(new Date()); // 현재 날짜
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.YEAR, 1); // 현재 날짜에 1년을 더함
		String payDateYear = dateFormat.format(calendar.getTime());
		
		// 적립될 적립금 내역 추가
		Point gainPoint = new Point();
		gainPoint.setMemberNo(order.getMemberNo());
		gainPoint.setPointSort("G");
		gainPoint.setPointAmount(order.getPointNoGain());
		gainPoint.setPointDate(payDate);
		gainPoint.setPointDueDate(payDateYear);
		gainPoint.setPointContent("구매에 대한 적립금");
		gainPoint.setOrderNo(order.getOrderNo());
		// 적립금 내역 테이블 데이터 삽입	
		int gpResult = mapper.insertGainPoint(gainPoint);
		// 적립된 적립금 추가 후 적립번호 가져오기
		if(gpResult > 0) {
			long gainPointNo = gainPoint.getPointNo();
			// order에 세팅
			order.setPointNoGain(gainPointNo);
		}
		
		// 포인트 사용한 경우
		if(order.getPointNoUse() != 0) {
			// 사용한 적립금 내역 추가
			Point usePoint = new Point();
			usePoint.setMemberNo(order.getMemberNo());
			usePoint.setPointSort("U");
			usePoint.setPointAmount(order.getPointNoUse());
			usePoint.setPointDate(payDate);
			usePoint.setPointContent("상품구매시 사용한 적립금");
			usePoint.setOrderNo(order.getOrderNo());
			// 사용한 적립금 내역 삽입	
			int upResult = mapper.insertUsePoint(usePoint);
			// 사용한 적립금 추가 후 적립번호 가져오기
			if(upResult > 0) {
				long usePointNo = usePoint.getPointNo();
				// order에 세팅
				order.setPointNoUse(usePointNo);
			}
		}
				
		// order테이블 적립/사용 적립번호 업데이트
		int uoResult = mapper.updateOrderPointNo(order) ;
		if(uoResult > 0) { // 성공시
			result = 1;
		}
		
		return result;
	}
	
	// 쿠폰 상태 업데이트
	@Override
	public int updateCouponFL(Order order) {
		return mapper.updateCouponFL(order);
	}
	
	// 랜덤 값 생성
    public String createAuthKey() {
        String key = "";
        for(int i=0 ; i< 6 ; i++) {
            int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
            if(sel1 == 0) {
                int num = (int)(Math.random() * 10); // 0~9
                key += num;
            }else {
                char ch = (char)(Math.random() * 26 + 65); // A~Z
                int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
                if(sel2 == 0) {
                    ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
                    ch = Character.toUpperCase(ch);
                }
                key += ch;
            }
        }
        return key;
    }
    
    // 주문 상세페이지 서비스 시작 ------------------------------------------
    
    // 주문한 내역조회
    @Override
    public Order selectOrder(int no) {
    	return mapper.selectOrder(no);
    }
    
    // 주문한 상품목록조회
    @Override
    public List<OrderProduct> selectOrderDetailProductList(int no) {

    	// 주문한 상품목록조회
    	List<OrderProduct> odpList = mapper.selectOrderDetailProductList(no);
    	// 상품, 옵션, 수량정보 담기
    	for(OrderProduct odp : odpList) {
    		// 상품정보조회
    		Product product = mapper.selectOrderProduct(odp.getProductNo());
    		odp.setProduct(product);
    		// 옵션정보조회
    		Option option = new Option();
    		option.setProductNo(odp.getProductNo());
    		option.setOptionNo(odp.getOptionNo());
    		option = mapper.selectOrderProductOption(option);
    		odp.setOption(option);
    	}
    	return odpList;
    }
    
    // 사용된 쿠폰할인액조회
    @Override
    public List<Map> selectDiscount(long couponNo) {
    	
    	List<Map> dc = new ArrayList<>();
    	int couponAmount = mapper.selectCouponAmount(couponNo);
    	
    	return dc;
    }
}
