package edu.kh.laf.order.model.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.member.model.dto.Coupon;
import edu.kh.laf.member.model.dto.Member;
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
				int nonMemberNo = mapper.selectNonMember((String)orderData.get("orderEmail"));
				order.setMemberNo(nonMemberNo);
			}
		}
		System.out.println(order);
		
		
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
		
		System.out.println(order);
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
}
