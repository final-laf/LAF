package edu.kh.laf.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.laf.common.utility.Util;
import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.main.model.service.MainService;
import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.ProductImage;
import edu.kh.laf.product.model.service.CategoryService;

@Controller
public class AdminMainController {
	
	@Autowired
	private MainService service;
	@Autowired
	private CategoryService categoryService;
	
	// 대쉬보드
	@GetMapping("/admin")
	public String admin() {
		return "/admin/dashboard";
	}
	
	// 메인화면관리 : 배너관리
	@GetMapping("/admin/banner")
	public String banner(Model model) {
		
		List<Banner> bannerList = service.selectBannerList();
		model.addAttribute("bannerList", bannerList);
		
		return "/admin/adminMain/banner";
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
		
		return "/admin/adminMain/category";
	}
	
}
