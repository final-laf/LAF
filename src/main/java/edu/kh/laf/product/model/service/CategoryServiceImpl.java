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

	// Navigation 카테고리 조회
	@Override
	public List<Category> selectNavCategoryList() {
		return mapper.selectNavCategoryList();
	}
	
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

	// 카테고리 순서 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public boolean categoryUpdate(Map<String, String[]> paramMap) {
		
		String[] categoryName = paramMap.get("categoryName");
		String[] categoryNo = paramMap.get("categoryNo");
		String[] childCategoryName = paramMap.get("childCategoryName");
		String[] childCategoryNo = paramMap.get("childCategoryNo");
		String[] parentCategoryNo = paramMap.get("parentCategoryNo");
		
		int result = updateParentCategory(categoryName, categoryNo);
		result *= updateChildCategory(childCategoryName, childCategoryNo, parentCategoryNo);
		
		return result > 0;
	}
	
	// 부모 카테고리 순서 업데이트
	private int updateParentCategory(String[] categoryName, String[] categoryNo) {
		
		int result = 1;
		
		List<Category> updateParentList = new ArrayList<>();
		for(int i=0; i<categoryName.length; i++) {
			Category c = new Category();
			c.setCategoryNo(Long.parseLong(categoryNo[i]));
			c.setCategoryOrder(i);
			updateParentList.add(c);
		}
		
		for(Category c :updateParentList)
			result *= mapper.updateParentCategory(c);
		
		return result;
	}
	
	// 자식 카테고리 업데이트 + 신규 추가
	private int updateChildCategory(String[] categoryName, String[] categoryNo, String[] parentCategoryNo) {
		
		int result = 1;
		
		List<Category> updateChildList = new ArrayList<>();
//		List<Category> insertChildList = new ArrayList<>();
		
		for(int i=0; i<categoryName.length; i++) {
			Category c = new Category();
			
			long no = Long.parseLong(categoryNo[i]);
			c.setCategoryOrder(i);

//			if( no > 0 ) {
				c.setCategoryNo(no);
				updateChildList.add(c);
//			} else {
//				c.setCategoryName(categoryName[i]);
//				c.setParentCategoryNo(Long.parseLong(parentCategoryNo[i]));
//				insertChildList.add(c);
//			}
		}
		
		for(Category c : updateChildList)
			result *= mapper.updateChildCategory(c);
//		if(insertChildList.size() > 0)
//			result *= mapper.insertChildCategory(insertChildList);
		
		return result;
	}

	// 부모 카테고리 추가
	@Override
	public long insertParentCategory(String name) {
		
		Category c = new Category();
		c.setCategoryName(name);
		mapper.insertParentCategory(c);
		
		return c.getCategoryNo();
	}

	// 부모 카테고리 삭제
	@Override
	public int deleteParentCategory(long categoryNo) {
		return mapper.deleteParentCategory(categoryNo);
	}

	// 자식 카테고리 추가
	@Override
	public long insertChildCategory(String name, long parentNo) {
		
		Category c = new Category();
		c.setCategoryName(name);
		c.setParentCategoryNo(parentNo);
		mapper.insertChildCategory(c);
		
		return c.getCategoryNo();
	}

	// 자식 카테고리 삭제
	@Override
	public int deleteChildCategory(long categoryNo) {
		return mapper.deleteChildCategory(categoryNo);
	}

	// 카테고리별 판매량 조회(30일)
	@Override
	public List<Map<String, Object>> getCategoryStatistics() {
		return mapper.getCategoryStatistics();
	}
}
