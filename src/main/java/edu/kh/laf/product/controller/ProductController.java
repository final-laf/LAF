package edu.kh.laf.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.member.model.dto.Member;
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
	public String product(
			@SessionAttribute(name="loginMember", required=false) Member loginMember,
			@PathVariable("productNo")long productNo,
			RedirectAttributes ra,
			Model model) {
		
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
		
		// 회원인 경우 좋아요 여부 확인
		if(loginMember != null) {
			Map<String, Object> map = new HashMap<>();
			map.put("productNo", productNo);
			map.put("memberNo", loginMember.getMemberNo());
			model.addAttribute("checkLike", productService.checkLike(map));
		}
		
		return "/shopping/product";
	}
	
	// 색상 선택 시 해당 색상 사이즈 목록 조회
	@GetMapping("/getStock")
	@ResponseBody
	public List<Option> getOptionSelectedColor(long productNo, String color, Model model) {
		return optionService.getOptionSelectedColor(productNo, color);
	}
	
	// 특정 상품의 모든 옵션 정보 조회
	@GetMapping("/getOption")
	@ResponseBody
	public List<Option> selectOptionList(long productNo) {
		return optionService.selectOptionList(productNo);
	}
	
	// 찜 목록 추가
	@GetMapping("/like/add")
	@ResponseBody
	public int insertLike(long productNo, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		return productService.insertLike(map);
	}
	
	// 찜 목록 삭제
	@GetMapping("/like/delete")
	@ResponseBody
	public int deleteLike(long productNo, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		return productService.deleteLike(map);
	}
	
}
