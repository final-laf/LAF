package edu.kh.laf.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.main.model.service.MainService;
import edu.kh.laf.order.model.service.OrderService;
import edu.kh.laf.product.model.service.CategoryService;
import edu.kh.laf.product.model.service.ProductService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class AdminMainController {
	
	@Autowired
	private MainService service;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ProductService productService;
	@Autowired
	private OrderService orderService;
	
	// 대쉬보드
	@GetMapping("/admin")
	public String admin(Model model) {
		return "admin/dashboard";
	}
	
	// 대쉬보드 : 오늘 주문 현황
	@GetMapping("/admin/today")
	@ResponseBody
	public List<Map<String, String>> today() {
		List<Map<String, String>> mapList = orderService.selectTodayOrderState();
		Map<String, String> map = new HashMap<>();
		map.put("todayRevenue", String.valueOf(orderService.getRevenueToday()));
		map.put("todayPayment", String.valueOf(orderService.getPaymentToday()));
		mapList.add(map);
		return mapList;
	}
	
	// 일별 매출 조회 (30일 전까지만 조회)
	@GetMapping("/admin/revenue")
	@ResponseBody
	public List<Map<String, Object>> getRevenue() {
		return orderService.getRevenue();
	}
	
	// 월별 매출 조회 (12개월)
	@GetMapping("/admin/revenue/month")
	@ResponseBody
	public List<Map<String, Object>> getRevenueMonth() {
		return orderService.getRevenueMonth();
	}
	
	// 연도별 매출 조회
	@GetMapping("/admin/revenue/year")
	@ResponseBody
	public List<Map<String, Object>> getRevenueYear() {
		return orderService.getRevenueYear();
	}
	
	// 메인화면관리 : 배너관리
	@GetMapping("/admin/banner")
	public String banner(Model model) {
		
		List<Banner> bannerList = service.selectBannerList();
		model.addAttribute("bannerList", bannerList);
		
		return "admin/adminMain/banner";
	}
	
	@PostMapping("/admin/banner/update")
	public String updateBanner(
			List<MultipartFile> banner,
			String[] removedImages,
			RedirectAttributes ra) throws IllegalStateException, IOException {
		
		int result = 1;
		
		// 삭제된 이미지 DB 데이터 동기화
		if(removedImages.length > 0)
			result *= service.deleteImage(removedImages);
		
		// 추가된 이미지 삽입
		result *= service.insertImage(banner);
		
		if(result > 0) ra.addFlashAttribute("message", "변경 성공!");
		else		   ra.addFlashAttribute("message", "변경 중 오류 발생");
		return "redirect:/admin/banner";
	}
	
	// 메인화면관리 : 카테고리
	@GetMapping("/admin/category")
	public String category(Model model) {
		model.addAttribute("categoryList", categoryService.selectAllCategoryList());
		return "admin/adminMain/category";
	}
	
	// 카테고리 순서 변경
	@PostMapping("/admin/category/save")
	public String updateCategory(
			String[] categoryName, 
			String[] categoryNo, 
			String[] childCategoryName, 
			String[] childCategoryNo, 
			String[] parentCategoryNo,
			HttpServletRequest request,
			RedirectAttributes ra) {
		
		Map<String, String[]> map = new HashMap<>();
		map.put("categoryName", categoryName);
		map.put("categoryNo", categoryNo);
		map.put("childCategoryName", childCategoryName);
		map.put("childCategoryNo", childCategoryNo);
		map.put("parentCategoryNo", parentCategoryNo);
		
		if(categoryService.categoryUpdate(map)) {
			updateApplicationScopeCategory(request);
			ra.addFlashAttribute("message", "카테고리 변경사항이 적용되었습니다");
		} else {
			ra.addFlashAttribute("message", "카테고리 변경 실패");
		}
		
		return "redirect:/admin/category";
	}
	
	// 부모 카테고리 추가
	@GetMapping("/admin/category/addParent")
	@ResponseBody
	public long insertParentCategory(String name, HttpServletRequest request) {
		long categoryNo = categoryService.insertParentCategory(name);
		if(categoryNo > 0) updateApplicationScopeCategory(request);
		return categoryNo;
	}
	
	// 부모 카테고리 삭제
	@GetMapping("/admin/category/rmParent")
	@ResponseBody
	public int deleteParentCategory(long categoryNo, HttpServletRequest request) {
		
		// 카테고리에 등록된 상품이 있을 시 카테고리 삭제 불가
		if(productService.adminGetListCount(categoryNo, 0) > 0) return -1; 
		
		// 카테고리 삭제 및 동기화
		int result = categoryService.deleteParentCategory(categoryNo);
		if(result > 0) updateApplicationScopeCategory(request);
		return result;
	}
	
	// 자식 카테고리 추가
	@GetMapping("/admin/category/addChild")
	@ResponseBody
	public long insertChildCategory(String name, long parentNo, HttpServletRequest request) {
		long categoryNo = categoryService.insertChildCategory(name, parentNo);
		if(categoryNo > 0) updateApplicationScopeCategory(request);
		return categoryNo;
	}
	
	// 자식 카테고리 삭제
	@GetMapping("/admin/category/rmChild")
	@ResponseBody
	public long deleteChildCategory(long categoryNo, long parentNo, HttpServletRequest request) {
		// 카테고리에 등록된 상품이 있을 시 카테고리 삭제 불가
		if(productService.adminGetListCount(parentNo, categoryNo) > 0) return -1; 
		
		// 카테고리 삭제 및 동기화
		int result = categoryService.deleteChildCategory(categoryNo);
		if(result > 0) updateApplicationScopeCategory(request);
		return result;
	}
	
	// 카테고리 변경사항 application scope 동기화
	private void updateApplicationScopeCategory(HttpServletRequest request) {
		ServletContext application = request.getServletContext();
		application.setAttribute("category", categoryService.selectNavCategoryList());
	}

}
