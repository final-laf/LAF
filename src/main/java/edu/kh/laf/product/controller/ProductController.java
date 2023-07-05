package edu.kh.laf.product.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.board.model.service.ReviewService;
import edu.kh.laf.main.model.service.MainService;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageLikeServcie;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.dto.ProductImage;
import edu.kh.laf.product.model.service.CategoryService;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;
import jakarta.servlet.http.HttpSession;

@Controller
@SessionAttributes({"loginMember", "likeList"})
public class ProductController {

	@Autowired
	private ProductService productService;
	@Autowired
	private OptionService optionService;
	@Autowired
	private MypageLikeServcie likeServcie;
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private MainService mainService;
	
	// 카테고리 상품목록 조회
	@GetMapping("/{category:[0-9]+}")
	public String category(
			Model model, 
			@PathVariable("category") int categoryNo, String ordering,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam(value="cc", required=false, defaultValue="0") long cc,
			@SessionAttribute(name="loginMember", required=false) Member loginMember) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("categoryNo", categoryNo);
		paramMap.put("memberNo", loginMember == null ? -1 : loginMember.getMemberNo());
		paramMap.put("ordering", ordering);
		paramMap.put("cp", cp);
		paramMap.put("cc", cc);		
		
		Map<String, Object> resultMap = productService.selectCategoryProductList(paramMap);
		model.addAttribute("productList", resultMap.get("productList"));
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("bestList", productService.selectWeeklyBest(categoryNo, 10));
		model.addAttribute("categoryName", categoryService.selectCategoryName(categoryNo));
		model.addAttribute("childCategoryList", categoryService.selectChildCategoryList(categoryNo));
		model.addAttribute("ordering", ordering);
		model.addAttribute("cc", cc);
		
		return "shopping/categoryList";
	}
	
	// 상품상세조회
	@GetMapping("/product/{productNo:[0-9]+}")
	public String product(
			@SessionAttribute(name="loginMember", required=false) Member loginMember,
			@PathVariable("productNo")long productNo,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			RedirectAttributes ra,
			Model model,
			HttpSession session) {
		
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
		
		// 상세 이미지 조회
		List<ProductImage> productImageList = productService.selectProductImage(productNo);
		model.addAttribute("productImageList", productImageList);
		
		// 회원인 경우 찜 여부 확인, 조회 목록에 추가
		if(loginMember != null) {
			Map<String, Object> map = new HashMap<>();
			map.put("productNo", productNo);
			map.put("memberNo", loginMember.getMemberNo());
			model.addAttribute("checkLike", likeServcie.checkLike(map));
			
			List<Object> clickedProducts = mainService.checkClick(map);
			session.setAttribute("clickedProducts", clickedProducts);
		}
		
		// 리뷰 내역 조회
		Map<String, Object> resultMap = reviewService.productReviewList(cp, productNo);
		model.addAttribute("resultMap", resultMap);
		
		List<Review> bestReview = reviewService.bestReview();
		for(Review review : bestReview) {
			review.setOption(reviewService.reviewOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(reviewService.reviewProduct(review.getProductNo())); // 상품 설정
			List<ReviewImg> imgList = new ArrayList<>();
			imgList=reviewService.reviewImg(review.getReviewNo());
			review.setReviewImg(imgList);
		}
		model.addAttribute("bestReview", bestReview);
		
		
		return "shopping/product";
	}
	
	// 색상 선택 시 해당 색상 사이즈 목록 조회
	@GetMapping("/getStock")
	@ResponseBody
	public List<Option> getOptionSelectedColor(long productNo, String color, Model model) {
		return optionService.selectOptionSelectedColor(productNo, color);
	}
	
	// 특정 상품의 모든 옵션 정보 조회
	@GetMapping("/getOption")
	@ResponseBody
	public List<Option> selectOptionList(long productNo) {
		return optionService.selectOptionList(productNo);
	}
	
	// 상품검색(전체)
	@GetMapping("/search")
	public String search(
			@SessionAttribute(name="loginMember", required=false) Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			String query, String ordering, Model model) {

		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("memberNo", loginMember == null ? -1 : loginMember.getMemberNo());
		paramMap.put("ordering", ordering);
		paramMap.put("query", query);
		paramMap.put("cp", cp);
		
		Map<String, Object> resultMap = productService.search(paramMap);
		model.addAttribute("productList", resultMap.get("productList"));
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("ordering", ordering);
		model.addAttribute("query", query);
		
		return "shopping/searchResult";
	}
}
