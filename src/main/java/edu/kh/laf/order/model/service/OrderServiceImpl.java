package edu.kh.laf.order.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.member.model.dto.Member;
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
	
	// 주문상품정보
	@Override
	public List<OrderProduct> selectOrderProduct(List<OrderProduct> cartList) {
		
		List<OrderProduct> orderList = new ArrayList<>();
		
		for(OrderProduct cart : cartList) {
			
			OrderProduct orderProduct = new OrderProduct();
			
			// 상품조회
			Product selectProduct = mapper.selectOrderProduct(cart.getProductNo());
			orderProduct.setProduct(selectProduct);
			
			// 옵션조회
			Option selectOption = mapper.selectOrderProductOption(cart.getOptionNo());
			orderProduct.setOption(selectOption);
			
			// 주문수량
			orderProduct.setCount(cart.getCount());
			
			orderList.add(orderProduct);
		}
		return orderList;
	}
}
