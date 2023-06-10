package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Product;

import java.util.List;

public interface ProductService {

    List<Product> selectProductList();

    Product selectProduct(long productNo);
}
