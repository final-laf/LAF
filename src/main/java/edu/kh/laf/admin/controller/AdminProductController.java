package edu.kh.laf.admin.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.admin.model.service.AdminProductService;
import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.CategoryService;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;

@Controller
public class AdminProductController {

	@Autowired
	private AdminProductService service;
	@Autowired
	private ProductService productService;
	@Autowired
	private CategoryService categoryService;
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
		List<Map<String, Object>> productCategoryList = categoryService.selectCategoryListByProductList(productList);
		List<Category> categoryList = categoryService.selectAllCategoryList();
				
		model.addAttribute("productList", productList);
		model.addAttribute("resultCategoryList", productCategoryList);
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("paramMap", paramMap);
		
		return "admin/adminProduct/productSelect";
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
		List<Category> categoryList = categoryService.selectAllCategoryList();
		model.addAttribute("categoryList", categoryList);
		return "admin/adminProduct/productEnroll";
	}
	
	// 상품관리 : 상품등록
	@PostMapping("/admin/product/enroll/submit")
	public String productEnrollSubmit(
			String[] size, String[] color, String[] stock, String[] hiddenFl, // option 정보들
			String[] parentCategory, String[] childCategory, // category 정보들
			@RequestParam(value="productSale", required=false, defaultValue="0") String productSale,
			@RequestParam Map<String, Object> paramMap,
			MultipartFile thumbnail,
			List<MultipartFile> images,
			RedirectAttributes ra) throws IllegalStateException, IOException {
		
		paramMap.put("productSale", productSale);
		paramMap.put("hiddenFl", hiddenFl);
		paramMap.put("size", size);
		paramMap.put("color", color);
		paramMap.put("stock", stock);
		paramMap.put("parentCategory", parentCategory);
		paramMap.put("childCategory", childCategory);
		
		int result = service.enrollProduct(paramMap, thumbnail, images);
		if(result <= 0) ra.addFlashAttribute("message", "상품 등록 중 오류 발생");
		else  	        ra.addFlashAttribute("message", "등록 성공!");
		
		return "redirect:/admin/product/enroll";
	}

	// 부모 카테고리 선택 시 자식 카테고리 목록 반환
	@GetMapping("/admin/product/getChildCategories")
	@ResponseBody
	public List<Category> getChildCategories(int categoryNo) {
		return categoryService.selectChildCategoryList(categoryNo);
	}
	
	// 상품관리 : 상품수정
	@GetMapping("/admin/product/mod")
	@ResponseBody
	public Map<String, Object> selectProduct(long productNo) {
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("product", productService.adminSelectProduct(productNo));
		resultMap.put("productImageList", productService.selectProductImage(productNo));
		resultMap.put("categoryList", categoryService.selectCategoryListByProductNo(productNo));
		resultMap.put("optionList", optionService.adminSelectOptionList(productNo));		
		
		return resultMap;
	}
	
	// 상품관리 : 상품수정
	@PostMapping("/admin/product/mod/submit")
	public String updateProduct(
			String[] optionNo, String[] size, String[] color, String[] stock, String[] hiddenFl, // option 정보들
			String[] parentCategory, String[] childCategory, // category 정보들
			@RequestParam(value="productSale", required=false, defaultValue="0") String productSale,
			@RequestParam Map<String, Object> paramMap,
			MultipartFile thumbnail,
			List<MultipartFile> images, String[] imgOrder,
			RedirectAttributes ra) throws IllegalStateException, IOException {
		
		paramMap.put("optionNo", optionNo);
		paramMap.put("hiddenFl", hiddenFl);
		paramMap.put("productSale", productSale);
		paramMap.put("size", size);
		paramMap.put("color", color);
		paramMap.put("stock", stock);
		paramMap.put("parentCategory", parentCategory);
		paramMap.put("childCategory", childCategory);
		paramMap.put("imgOrder", imgOrder);
		
		int result = service.updateProduct(paramMap, thumbnail, images);
		
		if(result > 0) ra.addFlashAttribute("message", "상품 수정 성공!");
		else           ra.addFlashAttribute("message", "상품 수정 실패");
		
		ra.addFlashAttribute("queryString", (String)paramMap.get("queryString"));		
		return "redirect:/admin/product";
	}
	
} 