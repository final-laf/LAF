package edu.kh.laf.product.model.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.stereotype.Service;

import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.mapper.CartMapper;
import jakarta.servlet.http.Cookie;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartMapper mapper;

	// [회원] 장바구니 상품 목록 조회
	@Override
	public List<Cart> selectCart(Long memberNo) {
		return mapper.selectCart(memberNo);
	}
	
	// [비회원] 장바구니 상품 목록 조회
	@Override
	public List<Cart> selectCart(Cookie cartCookie) {
		
		List<Cart> cartList = new ArrayList<>(); 
		
		cartCookie.getAttribute("productNo");
		cartCookie.getAttribute("optionNo");
		
		return cartList;
	}

	// [회원] 장바구니에 상품 추가
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
	
	// [비회원] 장바구니에 상품 추가
	@Override
	public Cookie insertCart2(Cookie[] cookies, String data) {
		
		// 이전 장바구니 정보 찾기
		Cookie cart = null;
		for(Cookie c : cookies) {
			if(c.getName().equals("cart")) {
				cart = c;
			}
		}

		// 쿠키 데이터 생성 : 장바구니 + 신규 데이터
		String newData = cart == null ? data : cart.getValue() + data;
		Cookie cookie = new Cookie("cart", newData);
		
		// 오늘 자정에 쿠키 만료
		Calendar tomorrow = Calendar.getInstance();
		long now = tomorrow.getTimeInMillis();		
		tomorrow.add(Calendar.DATE, 1);
		tomorrow.set(Calendar.HOUR, 0);
		tomorrow.set(Calendar.MINUTE, 0);
		tomorrow.set(Calendar.SECOND, -1);
		long tomo = tomorrow.getTimeInMillis();
		int sec = (int) ((tomo - now) / 1000);
		cookie.setMaxAge(sec);
		
		// 기타 정보 지정
		cookie.setPath("/");
		
		return cookie;
	}
	

	// [회원] 장바구니 상품 삭제
	@Override
	public int deleteCart(String data, Long memberNo) {
		
		// 배열 형태 JSON data parsing
		BasicJsonParser parser = new BasicJsonParser();
		List<Object> list = parser.parseList(data);

		// Cart 타입 리스트에 담기
		List<Cart> cartList = new ArrayList<>();
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

	// 주문완료 후 장바구니 삭제
	@Override
	public int deleteCartAfterOrder(List<OrderProduct> orderList) {
		
		// Cart 타입 리스트에 담기
		List<Cart> cartList = new ArrayList<>();
		for(OrderProduct o : orderList) {			
			Cart cart = new Cart();	
			cart.setMemberNo(o.getMemberNo());
			cart.setProductNo(o.getProductNo());
			cart.setOptionNo(o.getOptionNo());
			cartList.add(cart);
		}
		
		return mapper.deleteCart(cartList);
	}

	// [비회원] 장바구니 상품 선택 삭제
	@Override
	public Cookie deleteCart2(Cookie[] cookies, String data) {
		
		// 이전 장바구니 정보 찾기
		Cookie cart = null;
		for(Cookie c : cookies) {
			if(c.getName().equals("cart")) {
				cart = c;
			}
		}
		
		String newData = cart.getValue();
		String[] arr = data.split("@");
		for(int i=0; i<arr.length; i++) {
			newData = newData.replace(arr[i] + "@", "");
		}
		
		// 쿠키 데이터 생성
		Cookie cookie = new Cookie("cart", newData);

		if(newData.trim().length() == 0) {
			cookie.setMaxAge(0);
		} else {

			// 오늘 자정에 쿠키 만료
			Calendar tomorrow = Calendar.getInstance();
			long now = tomorrow.getTimeInMillis();		
			tomorrow.add(Calendar.DATE, 1);
			tomorrow.set(Calendar.HOUR, 0);
			tomorrow.set(Calendar.MINUTE, 0);
			tomorrow.set(Calendar.SECOND, -1);
			long tomo = tomorrow.getTimeInMillis();
			int sec = (int) ((tomo - now) / 1000);
			cookie.setMaxAge(sec);
		}
		
		// 기타 정보 지정
		cookie.setPath("/");
		
		return cookie;
	}
	
}
