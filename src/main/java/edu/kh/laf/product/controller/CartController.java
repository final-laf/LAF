package edu.kh.laf.product.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

@Controller
@SessionAttributes({"loginMember", "orderProductList"})
public class CartController {

	@Autowired
	private CartService cartService;
	@Autowired
	private ProductService productService;
	@Autowired
	private OptionService optionService;
	
	// 장바구니
	@GetMapping("/cart")
	public String cart(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		List<Cart> cartList = cartService.selectCart(loginMember.getMemberNo());

		List<Product> productList = new ArrayList<>(); 
		List<Option> optionList = new ArrayList<>();
		for(Cart item : cartList) {
			productList.add(productService.selectProduct(item.getProductNo()));
			optionList.add(optionService.selectOption(item.getOptionNo()));
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
	
	// 장바구니에 상품 추가
	@GetMapping("/cart/add")
	@ResponseBody
	public int insertCart(String data, @SessionAttribute("loginMember") Member loginMember)
			throws JsonProcessingException {
		return cartService.insertCart(data, loginMember.getMemberNo());
	}
	
	// 장바구니 상품 삭제
	@GetMapping("/cart/delete")
	@ResponseBody
	public int deleteCart(String data, @SessionAttribute("loginMember") Member loginMember)
			throws JsonProcessingException {
		return cartService.deleteCart(data, loginMember.getMemberNo());
	}
	
	// 주문
	@PostMapping("/cart/order")
	public String orderCart(
			long[] productNo,
			long[] optionNo,
			@SessionAttribute("loginMember") Member loginMember,
			Model model){
		
		List<OrderProduct> orderProductList = new ArrayList<>();
		
		for(int i=0; i<productNo.length; i++) {
			OrderProduct op = new OrderProduct();
			op.setMemberNo(loginMember.getMemberNo());
			op.setProductNo(productNo[i]);
			op.setOptionNo(optionNo[i]);
			orderProductList.add(op);
		}
		
		model.addAttribute("orderProductList", orderProductList);
		return "redirect:/order";
	}
}
