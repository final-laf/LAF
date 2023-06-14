package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.mapper.ProductMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductMapper mapper;

    public ProductServiceImpl(ProductMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * 상품 번호로 상품 정보 조회
     * @param productNo
     * @return product
     */
    @Override
    public Product selectProduct(long productNo) {
        return mapper.selectProduct(productNo);
    }
    
    /**
     * 카테고리별 위클리 베스트 상품 목록 조회
     * @return productList
     */
    @Override
	public List<Product> selectWeeklyBest(int categoryNo) {
		return mapper.selectWeeklyBest(categoryNo);
	}

    /**
     * 카테고리 전체 상품 목록 조회
     * @return productList
     */
    @Override
    public List<Product> selectCategoryProductList(int categoryNo) {
    	Map<String, Object> map = new HashMap<>();
    	map.put("categoryNo", categoryNo);
    	
    	return mapper.selectCategoryProductList(map);
    }
    
    /**
     * 카테고리 상품 목록 조회(갯수제한)
     * @return productList
     */
	@Override
	public List<Product> selectCategoryProductList(int categoryNo, int limit) {		
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);
		
		return mapper.selectCategoryProductList(map);
	}

	/**
	 * 개인별 맞춤 상품 추천
	 * @param memberNo
	 * @return productList
	 */
	@Override
	public List<Product> selectPersonalProductList(long memberNo) {
		return mapper.selectPersonalProductList(memberNo);
	}

	/**
	 * 상품별 추천 상품
	 * @param productNo
	 * @return productList
	 */
	@Override
	public List<Product> selectRecommendList(long productNo) {
		return mapper.selectRecommendList(productNo);
	}

}
