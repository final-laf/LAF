package edu.kh.laf.main.controller;

import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.main.model.service.MainService;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;

@Controller
@SessionAttributes({"loginMember"})
public class MainController {

	private MainService mainService;
    private ProductService productService;

    public MainController(MainService mainService, ProductService productService) {
    	this.mainService = mainService;
        this.productService = productService;
    }

    @GetMapping("/")
    public String home(Model model, @SessionAttribute(required = false) Member loginMember) {
    	
    	List<Banner> bannerList = mainService.selectBannerList();
    	List<Product> weeklyBest = productService.selectWeeklyBest(1, 7); // 1:TOP
        List<Product> mdList = productService.selectCategoryProductList(8, 20); // 8:MD추천
        List<Product> newArrivals = productService.selectNewArrivalProductList(); // 신규상품
        
        long memberNo = loginMember == null ? 0 : loginMember.getMemberNo();
        List<Product> personalList = productService.selectPersonalProductList(memberNo);
        
        model.addAttribute("bannerList", bannerList);
        model.addAttribute("mdList", mdList);
        model.addAttribute("weeklyBest", weeklyBest);
        model.addAttribute("newArrivals", newArrivals);
        model.addAttribute("personalList", personalList);
        
        return "main";
    }
    
    @GetMapping("/weekly")
    @ResponseBody
    public List<Product> weeklyBest(int no, Model model) {
        return productService.selectWeeklyBest(no, 7);
    }
    
}
