package edu.kh.laf.product.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.boot.json.BasicJsonParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.mapper.CartMapper;

@Controller
@SessionAttributes({"loginMember"})
public class CartController {
	
	private CartMapper mapper;
	
	public CartController(CartMapper mapper) {
		this.mapper = mapper;
	}

	// 장바구니
	@GetMapping("/cart")
	public String cart() {
		return "/shopping/cart";
	}
	
	// 장바구니에 상품 목록 조회
	@GetMapping("/cart/list")
	@ResponseBody
	public List<Cart> selectCart(@SessionAttribute("loginMember") Member loginMember) {
		return mapper.selectCart(loginMember.getMemberNo());
	}
	
	// 장바구니에 상품 추가
	@GetMapping("/cart/add")
	@ResponseBody
	public int insertCart(
			String data, // JSON array
			@SessionAttribute(name = "loginMember") Member loginMember
			) throws JsonProcessingException {
		
		// 배열 형태 JSON data parsing
		BasicJsonParser parser = new BasicJsonParser();
		List<Object> optionList = parser.parseList(data);
		
		// Cart 타입 리스트에 담기
		List<Cart> cartList = new ArrayList<>();
		for(Object option : optionList) {			
			Cart cart = new Cart();	
			Map<String, String> map = (Map<String, String>)(option);
			cart.setMemberNo(loginMember.getMemberNo());
			cart.setProductNo(Long.parseLong(map.get("productNo")));
			cart.setOptionNo(Long.parseLong(map.get("optionNo")));
			cart.setCount(Integer.parseInt(map.get("count")));
			cartList.add(cart);
		}
		
		return mapper.insertCart(cartList);
	}
}
