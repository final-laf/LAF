package edu.kh.laf.order.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.mapper.OrderMapper;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.dto.Product;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderMapper mapper;
	
	// 주문자정보
	@Override
	public Member orderMember(long memberNo) {
		// TODO Auto-generated method stub
		return mapper.orderMember(memberNo);
	}
	
	// 주문상품정보
	@Override
	public List<Product> orderList(List<Cart> cartList) {
		
		List<Product> orderList = new ArrayList<>();
		
		for(Cart cart : cartList) {
			
			Product orderProduct = mapper.orderProduct(cart);
			//orderProduct.setOptionAmount(cart.getOptionAmount());
			
			orderList.add(orderProduct);
		}
		
		return orderList;
	}
}
