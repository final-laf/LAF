package edu.kh.laf.product.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.CartService;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@SessionAttributes({"loginMember", "orderProductList"})
public class CartController {

	@Autowired
	private CartService cartService;
	@Autowired
	private ProductService productService;
	@Autowired
	private OptionService optionService;
	
	// [회원] 장바구니 조회
	@GetMapping("/cart")
	public String cart(
			@SessionAttribute(name="loginMember", required=false) Member loginMember,
			Model model) {
		
		if(loginMember==null)
			return "redirect:/cart2";
		
		List<Cart> cartList = cartService.selectCart(loginMember.getMemberNo());
		List<Product> recommendList = productService.selectPersonalProductList(loginMember.getMemberNo());
		List<Product> productList = new ArrayList<>(); 
		List<Option> optionList = new ArrayList<>();
		
		// 화면에 출력할 데이터 가져오기
		for(Cart item : cartList) {
			productList.add(productService.selectProduct(item.getProductNo()));
			optionList.add(optionService.selectOption(item.getOptionNo()));
		}
		
		model.addAttribute("productList", productList);
		model.addAttribute("optionList", optionList);
		model.addAttribute("cartList", cartList);
    model.addAttribute("recommendList", recommendList);
		return "shopping/cart";
	}
	
	// [비회원] 장바구니 조회
	@GetMapping("/cart2")
	public String cart2(HttpServletRequest req, Model model) {
		
		List<Cart> cartList = new ArrayList<>();
		List<Product> productList = new ArrayList<>(); 
		List<Option> optionList = new ArrayList<>();
		
		Cookie[] cookies = req.getCookies();
		Cookie cartCookie = null;
		if(cookies != null) {
			for(Cookie c : cookies) {
				if(c.getName().equals("cart")) {
					cartCookie = c;
				}
			}
		}
		
		// 화면에 출력할 데이터 가져오기
		if(cartCookie != null) {			
			List<String> list = Arrays.asList(cartCookie.getValue().split("@"));
			for(String str : list) {
				String[] arr = str.split("-");
				long productNo = Long.parseLong(arr[0]);
				long optionNo = Long.parseLong(arr[1]);
				int count = Integer.parseInt(arr[2]);
				
				productList.add(productService.selectProduct(productNo));
				optionList.add(optionService.selectOption(optionNo));
				
				Cart newCart = new Cart();
				newCart.setProductNo(productNo);
				newCart.setOptionNo(optionNo);
				newCart.setCount(count);
				cartList.add(newCart);
			}
		}
		
		List<Product> recommendList = productService.selectRecommendProductList(productList);
		model.addAttribute("productList", productList);
		model.addAttribute("recommendList", recommendList);
		model.addAttribute("optionList", optionList);
		model.addAttribute("cartList", cartList);
		
		return "shopping/cart";
	}
	
	// 장바구니 상품 목록 조회
	@GetMapping("/cart/list")
	@ResponseBody
	public List<Cart> selectCart(@SessionAttribute("loginMember") Member loginMember) {
		return cartService.selectCart(loginMember.getMemberNo());
	}
	
	// [회원] 장바구니에 상품 추가
	@GetMapping("/cart/add")
	@ResponseBody
	public String insertCart(
			String data, 
			@SessionAttribute("loginMember") Member loginMember
		) throws JsonProcessingException {
		
		List<Cart> cartList = jsonToCartList(data, loginMember.getMemberNo());
		List<Cart> currentCart = cartService.selectCart(loginMember.getMemberNo());
		
		// 장바구니 중복 확인 후 중복되는 상품 제거
		boolean dupCheck = false;
		for(int i=0; i<cartList.size(); i++) {
			for(int j=0; j<currentCart.size(); j++) {
				if(cartList.get(i).getOptionNo() == currentCart.get(j).getOptionNo()) {
					dupCheck = true;
					cartList.remove(i);
				}
			}
		}
		if(cartList.size() == 0) 
			return "이미 장바구니에 담긴 상품입니다.";
		
		// 재고 확인
		for(Cart c : cartList) {
			int stock = optionService.selectStock(c.getOptionNo());
			if(c.getCount() > stock) {
				Option option = optionService.selectOption(c.getOptionNo());
				String optionName = option.getColor() + (option.getSize() == null ? "" : " / " + option.getSize());
				return "\"" + optionName + "\"" + "의 재고가 부족합니다. 현재 주문 가능한 수량은 " + stock + "개 입니다.";
			}
		}
		
		// 장바구니 추가
		if(cartService.insertCart(cartList) > 0) {
			if(dupCheck) return "중복 상품을 제외하고 장바구니에 상품을 담았습니다.";
			return "장바구니에 상품을 담았습니다.";			
		}

		return "장바구니 담기 실패";
	}
	
	// [비회원] 장바구니에 상품 추가
	@GetMapping("/cart/add2")
	@ResponseBody
	public String insertCart2(
			String data, 
			HttpServletRequest req,
			HttpServletResponse resp) {
		
		
		// 재고 확인
		List<Cart> cartList = cookieToCartList(new Cookie("cart", data));
		for(Cart c : cartList) {
			int stock = optionService.selectStock(c.getOptionNo());
			if(c.getCount() > stock) {
				Option option = optionService.selectOption(c.getOptionNo());
				String optionName = option.getColor() + (option.getSize() == null ? "" : " / " + option.getSize());
				if(stock ==0 ) return "\"" + optionName + "\"" + "의 재고가 모두 소진되었습니다.";
				return "\"" + optionName + "\"" + "의 재고가 부족합니다. 현재 주문 가능한 수량은 " + stock + "개 입니다.";
			}
		}
		
		Cookie[] cookies = req.getCookies();
		Cookie cookie = cartService.insertCart2(cookies, data);		
		resp.addCookie(cookie);
		return "성공";
	}
	
	// [회원] 장바구니 상품 선택 삭제
	@GetMapping("/cart/delete")
	@ResponseBody
	public int deleteCart(String data, @SessionAttribute("loginMember") Member loginMember)
			throws JsonProcessingException {
		return cartService.deleteCart(data, loginMember.getMemberNo());
	}
	
	// [회원] 장바구니 상품 전체 삭제
	@GetMapping("/cart/deleteAll")
	@ResponseBody
	public int deleteCartAll(@SessionAttribute("loginMember") Member loginMember)
			throws JsonProcessingException {
		return cartService.deleteCartAll(loginMember.getMemberNo());
	}

	// [비회원] 장바구니 상품 전체 삭제
	@GetMapping("/cart/delete2All")
	@ResponseBody
	public int deleteCart2All(HttpServletResponse resp) {
		resp.addCookie(cartService.deleteCart2All());
		return 1;
	}
	
	// [비회원] 장바구니 상품 선택 삭제
	@GetMapping("/cart/delete2")
	@ResponseBody
	public int deleteCart2(
			String data, 
			HttpServletRequest req,
			HttpServletResponse resp) {
		
		Cookie[] cookies = req.getCookies();
		Cookie cookie = cartService.deleteCart2(cookies, data);
		resp.addCookie(cookie);
		return 1;
	}
	
	// [회원] 장바구니 상품 수정
	@GetMapping("/cart/update")
	@ResponseBody
	public int updateCart(
			String data, 
			@SessionAttribute("loginMember") Member loginMember
		) throws JsonProcessingException {
		return cartService.deleteCartAll(loginMember.getMemberNo())
				* cartService.insertCart(data, loginMember.getMemberNo());
	}
	
	// [비회원] 장바구니 상품 수정
	@GetMapping("/cart/update2")
	@ResponseBody
	public int updateCart2(
			String data,
			HttpServletResponse resp) {
		Cookie cookie = cartService.insertCart2(null, data);
		if(cookie == null) return -1;
		resp.addCookie(cookie);
		return 1;
	}
	
	// 주문
	@PostMapping(path="/cart/order")
	public String orderCart(
			long[] productNo,
			long[] optionNo,
			int[] count,
			@SessionAttribute(name="loginMember", required=false) Member loginMember,
			Model model,
			RedirectAttributes ra){
		
		List<OrderProduct> orderProductList = new ArrayList<>();
		
		for(int i=0; i<productNo.length; i++) {
			OrderProduct op = new OrderProduct();
			if(loginMember != null)
				op.setMemberNo(loginMember.getMemberNo());
			op.setProductNo(productNo[i]);
			op.setOptionNo(optionNo[i]);
			op.setCount(count[i]);
			orderProductList.add(op);
		}
		
		// 재고확인
		for(OrderProduct c : orderProductList) {
			int stock = optionService.selectStock(c.getOptionNo());
			if(c.getCount() > stock) {
				Option option = optionService.selectOption(c.getOptionNo());
				String optionName = option.getColor() + (option.getSize() == null ? "" : " / " + option.getSize());
				
				String message = null;
				if(stock == 0 ) message = "\"" + optionName + "\"" + "의 재고가 모두 소진되었습니다.";
				message = "\"" + optionName + "\"" + "의 재고가 부족합니다. 현재 주문 가능한 수량은 " + stock + "개 입니다.";
				ra.addFlashAttribute("message", message);
				return loginMember == null ? "redirect:/cart2" : "redirect:/cart";
			}
		}
		
		model.addAttribute("orderProductList", orderProductList);
		return "redirect:/order";
	}
	
	// 상품상세 페이지에서 바로 주문하기
	@GetMapping("/cart/orderNow")
	public String orderNow(
			String data, Model model,
			@SessionAttribute(name="loginMember", required=false) Member loginMember) {
		
		long memberNo = loginMember == null ? -1 : loginMember.getMemberNo();
		List<OrderProduct> orderProductList = cartService.jsonToOrderProductList(data, memberNo);
		model.addAttribute("orderProductList", orderProductList);
		
		return "redirect:/order";
	}
	
	// 옵션 번호로 재고량 확인
	@PostMapping("/stock")
	@ResponseBody
	public int selectStock(long optionNo){
		return optionService.selectStock(optionNo); 
	}
	
	// [비회원] json to List<Cart>
	private List<Cart> jsonToCartList(String json) {
		return jsonToCartList(json, null);
	}
	
	// [회원] json to List<Cart>
	private List<Cart> jsonToCartList(String json, Long memberNo) {
		// 배열 형태 JSON data parsing
		BasicJsonParser parser = new BasicJsonParser();
		List<Object> optionList = parser.parseList(json);
		
		// Cart 타입 리스트에 담기
		List<Cart> cartList = new ArrayList<>();
		for(Object option : optionList) {			
			Cart cart = new Cart();	
			Map<String, String> map = (Map<String, String>)(option);
			if(memberNo != null) cart.setMemberNo(memberNo);
			cart.setProductNo(Long.parseLong(map.get("productNo")));
			cart.setOptionNo(Long.parseLong(map.get("optionNo")));
			cart.setCount(Integer.parseInt(map.get("count")));
			cartList.add(cart);
		}
		
		return cartList;
	}
	
	// cookie to List<Cart>
	private List<Cart> cookieToCartList(Cookie cart) {
		
//		Cookie cart = findCart(cookie);
		List<Cart> cartList = new ArrayList<>();
		String[] arr = cart.getValue().split("@");
		for(String s : arr) {
			String[] arr2 = s.split("-");
			Cart c = new Cart();
			c.setProductNo(Long.parseLong(arr2[0]));
			c.setOptionNo(Long.parseLong(arr2[1]));
			c.setCount(Integer.parseInt(arr2[2]));
			cartList.add(c);
		}
		
		return cartList;
	}
	
	// 장바구니 쿠키 찾기
//	private Cookie findCart(Cookie[] cookies) {
//		
//		// 브라우저에 존재하는 쿠키가 없음
//		if(cookies == null) return null;
//		
//		Cookie cart = null;
//		for(Cookie c : cookies) {
//			if(c.getName().equals("cart")) cart = c;
//		}
//		
//		return cart;
//	}

}
