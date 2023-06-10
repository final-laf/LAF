package edu.kh.laf.main.controller;

import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.ProductService;
import org.springframework.objenesis.instantiator.sun.MagicInstantiator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MainController {

    private ProductService productService;

    public MainController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public String home() {
//        List<Product> productList = productService.selectProductList();
        Product product = productService.selectProduct(1L);
        return "/main";
    }
    
}
