package edu.kh.laf.product.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.mapper.CategoryMapper;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryMapper mapper;

	// 부모 카테고리 목록 조회
	@Override
	public List<Category> selectCategoryList() {
		return mapper.selectCategoryList();
	}

	// 카테고리 이름 조회
	@Override
	public String selectCategoryName(int categoryNo) {
		return mapper.selectCategoryName(categoryNo);
	}

	// 자식 카테고리 조회
	@Override
	public List<Category> selectChildCategoryList(int categoryNo) {
		return mapper.selectChildCategoryList(categoryNo);
	}

	// 모든 카테고리 조회
	@Override
	public List<Category> selectAllCategoryList() {
		return mapper.selectAllCategoryList();
	}

	// 상품목록으로 카테고리 조회
	@Override
	public List<Map<String, Object>> selectCategoryListByProductList(List<Product> productList) {
		return mapper.selectCategoryListByProductList(productList);
	}

	// 상품 등록 중 카테고리 정보 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertProductCategory(Map<String, Object> paramMap) {

		List<Map<String, Object>> productCategoryList = new ArrayList<>();

		String[] childCategoryArr = (String[]) paramMap.get("childCategory");
		String[] parentCategoryArr = (String[]) paramMap.get("parentCategory");
		long productNo = Long.parseLong(String.valueOf(paramMap.get("productNo")));

		// 부모 카테고리 추가
		if(parentCategoryArr != null) {
			for (String pc : parentCategoryArr) {
				Map<String, Object> map = new HashMap<>();
				map.put("productNo", productNo);
				map.put("parentCategoryNo", pc);
				productCategoryList.add(map);
			}
		}

		// 자식 카테고리 추가
		List<Category> childCategoryList = mapper.selectAllChildCategoryList();
		if(childCategoryArr != null) {
			for (String cc : childCategoryArr) {
				Map<String, Object> map = new HashMap<>();
				map.put("productNo", productNo);
				map.put("childCategoryNo", cc);
	
				// 짝 맞는 부모 카테고리 찾아서 연결
				for (Category c : childCategoryList) {
					if (cc.equals(String.valueOf(c.getCategoryNo()))) {
						map.put("parentCategoryNo", c.getParentCategoryNo());
					}
				}
				productCategoryList.add(map);
			}
		}

		// 상품이 등록될 카테고리 정보 삽입
		return mapper.insertProductCategory(productCategoryList);
	}

	// 상품번호로 카테고리 목록 조회
	@Override
	public List<Category> selectCategoryListByProductNo(long productNo) {
		return mapper.selectCategoryListByProductNo(productNo);
	}

	// 상품번호로 카테고리 삭제
	@Override
	public int deleteProductCategory(long productNo) {
		return mapper.deleteProductCategory(productNo);
	}
}
