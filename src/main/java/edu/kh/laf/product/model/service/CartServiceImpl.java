package edu.kh.laf.product.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.stereotype.Service;

import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.mapper.CartMapper;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartMapper mapper;

	// 장바구니 상품 목록 조회
	@Override
	public List<Cart> selectCart(Long memberNo) {
		return mapper.selectCart(memberNo);
	}

	// 장바구니에 상품 추가
	@Override
	public int insertCart(String data, Long memberNo) {
		
		// 배열 형태 JSON data parsing
		BasicJsonParser parser = new BasicJsonParser();
		List<Object> optionList = parser.parseList(data);
		
		// Cart 타입 리스트에 담기
		List<Cart> cartList = new ArrayList<>();
		for(Object option : optionList) {			
			Cart cart = new Cart();	
			Map<String, String> map = (Map<String, String>)(option);
			cart.setMemberNo(memberNo);
			cart.setProductNo(Long.parseLong(map.get("productNo")));
			cart.setOptionNo(Long.parseLong(map.get("optionNo")));
			cart.setCount(Integer.parseInt(map.get("count")));
			cartList.add(cart);
		}
		
		return mapper.insertCart(cartList);
	}

	// 장바구니 상품 삭제
	@Override
	public int deleteCart(String data, Long memberNo) {
		
		// 배열 형태 JSON data parsing
		BasicJsonParser parser = new BasicJsonParser();
		List<Object> list = parser.parseList(data);
//		Map<String, Object> obj = parser.parseMap(data);
//		
//		// Cart 타입 리스트에 담기
		List<Cart> cartList = new ArrayList<>();
//		cartList();
		for(Object obj : list) {			
			Cart cart = new Cart();	
			Map<String, String> map = (Map<String, String>)(obj);
			cart.setMemberNo(memberNo);
			cart.setProductNo(Long.parseLong(map.get("productNo")));
			cart.setOptionNo(Long.parseLong(map.get("optionNo")));
			cartList.add(cart);
		}
	
		return mapper.deleteCart(cartList);
	}
	
}
