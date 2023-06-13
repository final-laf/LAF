package edu.kh.laf.product.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.boot.json.BasicJsonParser;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.product.model.dto.Cart;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;

@Controller
@SessionAttributes({"loginMember"})
public class ProductController {

	private ProductService productService;
	private OptionService optionService;
	
	public ProductController(ProductService productService, OptionService optionService) {
		this.productService = productService;
		this.optionService = optionService;
	}
	
	// 카테고리 상품목록 
	@GetMapping("/{category:[0-9]+}")
	public String category() {
		return "/shopping/categoryList";
	}
	
	// 상품상세조회 
	@GetMapping("/product/{productNo:[0-9]+}")
	public String product(@PathVariable("productNo")long productNo, Model model, RedirectAttributes ra) {
		
		// 상품정보 조회
		Product product = productService.selectProduct(productNo);
		List<Product> recommendList = productService.selectRecommendList(productNo);
		
		if(product == null) {
			ra.addFlashAttribute("message", "해당하는 상품이 없거나 판매 중지된 상품입니다.");
			return "redirect:/";
		}
		
		model.addAttribute("product", product);
		model.addAttribute("recommendList", recommendList);
		
		// 옵션정보 조회
		Map<String, List<String>> optionNames = optionService.getOptionName(productNo);
		
		if(optionNames == null || optionNames.isEmpty()) {
			ra.addFlashAttribute("message", "옵션을 확인할 수 없습니다.");
			return "redirect:/";
		}
	
		model.addAttribute("colorList", optionNames.get("colorList"));
		model.addAttribute("sizeList", optionNames.get("sizeList"));
		
		return "/shopping/product";
	}
	
	// 특정 상품의 모든 옵션 정보 조회
	@GetMapping("/getOption")
	@ResponseBody
	public List<Option> selectOptionList(long productNo) {
		return optionService.selectOptionList(productNo);
	}
	
	// 색상 선택 시 해당 색상 사이즈 목록 조회
	@GetMapping("/getStock")
	@ResponseBody
	public List<Option> getOptionSelectedColor(long productNo, String color, Model model) {
		return optionService.getOptionSelectedColor(productNo, color); 
	}
	
}
