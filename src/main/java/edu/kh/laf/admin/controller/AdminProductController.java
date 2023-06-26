package edu.kh.laf.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;

@Controller
public class AdminProductController {

	@Autowired
	private ProductService productService;
	@Autowired
	private OptionService optionService;
	
	// 상품관리 : 상품조회
	@GetMapping("/admin/product")
	public String product(
			@RequestParam Map<String, Object> map,
			String[] state,
			Model model) {
		
		// 비어있는 매개변수 제거
		Map<String, Object> paramMap = new HashMap<>();
		for(String key : map.keySet()) {
			Object value = map.get(key);
			if(((String)value).trim().length() != 0)
				paramMap.put(key, value);
		}
		if(state != null) paramMap.put("state", state);
		
		Map<String, Object> resultMap = productService.selectProductList(paramMap);
		List<Product> productList = (List<Product>)resultMap.get("productList");
		List<Map<String, Object>> productCategoryList = productService.selectCategoryListByProductNo(productList);
		List<Category> categoryList = productService.selectAllCategoryList();
				
		model.addAttribute("productList", productList);
		model.addAttribute("resultCategoryList", productCategoryList);
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("paramMap", paramMap);
		
		return "/admin/adminProduct/productSelect";
	}
	
	// 상품 상태 변경
	@GetMapping("/admin/product/update/state")
	@ResponseBody
	public int updateState(long productNo, String state) {
		return productService.updateState(productNo, state);
	}
	
	// 선택상품 상태 일괄 변경
	@GetMapping("/admin/product/updateAll/state")
	@ResponseBody
	public int updateAllState(String data, String state) {
		return productService.updateAllState(data, state);
	}
	
	// 상품관리 : 상품등록 화면 이동
	@GetMapping("/admin/product/enroll")
	public String productEnroll(Model model) {
		List<Category> categoryList = productService.selectAllCategoryList();
		model.addAttribute("categoryList", categoryList);
		return "/admin/adminProduct/productEnroll";
	}
	
	// 상품관리 : 상품등록
	@PostMapping("/admin/product/enroll/submit")
	public String productEnrollSubmit(
			String[] size, String[] color, String[] stock, String[] location, // option 정보들
			String[] parentCategory, String[] childCategory, // category 정보들
			@RequestParam(value="productSale", required=false, defaultValue="0") String productSale,
			@RequestParam Map<String, Object> paramMap,
			MultipartFile thumbnail,
			List<MultipartFile> images,
			Model model,
			RedirectAttributes ra) {
		
		paramMap.put("productSale", productSale);
		paramMap.put("size", size);
		paramMap.put("color", color);
		paramMap.put("stock", stock);
		paramMap.put("location", location);
		paramMap.put("parentCategory", parentCategory);
		paramMap.put("childCategory", childCategory);
		
		int result = productService.productEnroll(paramMap, thumbnail, images);
		
		ra.addFlashAttribute("message", "등록 성공!");
		return "redirect:/admin/product/enroll";
		
		
		
		
		
		
		
		
		
		
		
		
		
		
//		String returnPath = "redirect:/admin/product/enroll";
//		
//		// Product 테이블 삽입 및 key 반환
//		paramMap.put("productSale", productSale);
//		long productNo = productService.insertProduct(paramMap);
//		paramMap.put("productNo", productNo);
//		if(productNo <= 0) {
//			ra.addFlashAttribute("상품정보 등록 중 오류가 발생했습니다.");
//			return returnPath;
//		}
//
//		// Option 정보 삽입
//		paramMap.put("size", size);
//		paramMap.put("color", color);
//		paramMap.put("stock", stock);
//		paramMap.put("location", location);
//		int result = optionService.insertOptionList(paramMap);
//		if(result <= 0) {
//			ra.addFlashAttribute("옵션정보 등록 중 오류가 발생했습니다.");
//			return returnPath;
//		}
//		
//		// 카테고리 정보 삽입
//		paramMap.put("parentCategory", parentCategory);
//		paramMap.put("childCategory", childCategory);
//		result = productService.insertProductCategory(paramMap);
//		if(result <= 0) {
//			ra.addFlashAttribute("카테고리 정보 등록 중 오류가 발생했습니다.");
//			return returnPath;
//		}
//		
//		// 이미지 정보 삽입
//		result = productService.insertProductImage(paramMap, thumbnail, images);
//		if(result <= 0) {
//			ra.addFlashAttribute("이미지 등록 중 오류가 발생했습니다.");
//			return returnPath;
//		}
//		
//		ra.addFlashAttribute("message", "등록 성공!");
//		return returnPath;
	}

	// 부모 카테고리 선택 시 자식 카테고리 목록 반환
	@GetMapping("/admin/product/getChildCategories")
	@ResponseBody
	public List<Category> getChildCategories(int categoryNo) {
		return productService.selectChildCategoryList(categoryNo);
	}
	
} 