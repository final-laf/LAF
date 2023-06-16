package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {

    Product selectProduct(long productNo);
    List<Product> selectWeeklyBest(int categoryNo);
    List<Product> selectCategoryProductList(int categoryNo);
    List<Product> selectCategoryProductList(int categoryNo, int limit);
	List<Product> selectPersonalProductList(long memberNo);
	List<Product> selectRecommendList(long productNo);
}