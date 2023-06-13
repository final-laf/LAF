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
	
	// 장바구니에 상품 추가
	@GetMapping("/cart/add")
	@ResponseBody
	public int insertCart(
			String data,
			long productNo, 
			@SessionAttribute(name = "loginMember", required = false) Member loginMember
			) throws JsonProcessingException {
		
		// 배열 형태 JSON data parsing
		BasicJsonParser parser = new BasicJsonParser();
		List<Object> optionList = parser.parseList(data);
		
		// TODO 비회원 임시 회원번호 생성 + 임시 회원 데이터 member table에 삽입
		if(loginMember == null) {
			loginMember = new Member();
			loginMember.setMemberNo(new Random().nextLong(Long.MAX_VALUE));
			// TODO 회원번호 중복검사 필요
		}
		
		List<Cart> cartList = new ArrayList<>();
		for(Object option : optionList) {			
			Cart cart = new Cart();
			
			Map<String, String> map = (Map<String, String>)(option);
			cart.setProductNo(productNo);
			
			cart.setMemberNo(loginMember.getMemberNo());
			cart.setOptionNo(Long.parseLong(map.get("optionNo")));
			cart.setCount(Integer.parseInt(map.get("count")));
			
			cartList.add(cart);
		}
		
		return mapper.insertCart(cartList);
	}
}
