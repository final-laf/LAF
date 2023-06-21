package edu.kh.laf.product.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

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
		return "/shopping/cart";
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
		
		model.addAttribute("productList", productList);
		model.addAttribute("optionList", optionList);
		model.addAttribute("cartList", cartList);
		
		return "/shopping/cart";
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
	public int insertCart(
			String data, 
			@SessionAttribute("loginMember") Member loginMember
		) throws JsonProcessingException {
		return cartService.insertCart(data, loginMember.getMemberNo());
	}
	
	// [비회원] 장바구니에 상품 추가
	@GetMapping("/cart/add2")
	@ResponseBody
	public int insertCart2(
			String data, 
			HttpServletRequest req,
			HttpServletResponse resp) {
		
		Cookie[] cookies = req.getCookies();
		Cookie cookie = cartService.insertCart2(cookies, data);
		if(cookie == null) return -1;
		
		resp.addCookie(cookie);
		
		return 1;
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
			Model model){
		
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
		
		model.addAttribute("orderProductList", orderProductList);
		return "redirect:/order";
	}
	
	@GetMapping("/cart/orderNow")
	public String orderNow(
			String data, Model model,
			@SessionAttribute(name="loginMember", required=false) Member loginMember) {
		
		long memberNo = loginMember == null ? -1 : loginMember.getMemberNo();
		List<OrderProduct> orderProductList = cartService.jsonToOrderProductList(data, memberNo);
		model.addAttribute("orderProductList", orderProductList);
		
		return "redirect:/order";
	}
}
