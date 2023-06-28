package edu.kh.laf.product.model.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.mapper.OptionMapper;

@Service
public class OptionServiceImpl implements OptionService {

	private OptionMapper mapper;
	
	public OptionServiceImpl(OptionMapper mapper) {
		this.mapper = mapper;
	}
	
	// 상품번호로 해당 상품의 모든 옵션 조회
	@Override
	public List<Option> selectOptionList(long productNo) {
		return mapper.selectOptionList(productNo);
	}
	
	// colorList(컬러 종류), sizeList(사이즈 종류) 추출
	@Override
	public Map<String, List<String>> getOptionName(long productNo) {
		
		List<Option> optionList = selectOptionList(productNo);
		if(optionList.isEmpty()) return null;
		
		Map<String, List<String>> map = new HashMap<>();
		map.put("colorList", getColorList(optionList));
		map.put("sizeList", getSizeList(optionList));
		
		return map;
	}

	// 옵션 목록에서 색상 추출
	@Override
	public List<String> getColorList(List<Option> optionList) {
		Set<String> colors = new LinkedHashSet<>();
		for(Option op : optionList) {
			colors.add(op.getColor());
		}
		
		return new ArrayList<String>(colors);
	}

	// 옵션 목록에서 사이즈 추출
	@Override
	public List<String> getSizeList(List<Option> optionList) {
		Set<String> sizes = new LinkedHashSet<>();
		for(Option op : optionList) {
			sizes.add(op.getSize());
		}
		
		return new ArrayList<String>(sizes);
	}

	// 색상 선택 시 해당 색상 사이즈 목록 조회
	@Override
	public List<Option> selectOptionSelectedColor(long productNo, String color) {

		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("color", color);
		
		return mapper.selectOptionSelectedColor(map);
	}

	// 옵션 번호로 옵션 정보 조회 
	@Override
	public Option selectOption(long optionNo) {
		return mapper.selectOption(optionNo);
	}

	// 옵션 번호 여러개로 해당 상품의 모든 옵션 조회
//	@Override
//	public Map<String, Object> selectOptionListBySeveralKeys(List<Product> productList) {
//		int listCount = ((List<Long>)paramMap.get("likeList")).size();
//		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 10);
//		
//		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
//		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
//		List<Option> optionList = mapper.selectOptionListBySeveralKeys(paramMap, rowBounds);
//		
//		Map<String, Object> resultMap = new HashMap<>();
//		resultMap.put("pagination", pagination);
//		resultMap.put("optionList", optionList);
//		
//		return resultMap;
//	}

	// 옵션 번호로 재고량 조회
	@Override
	public int selectStock(long optionNo) {
		return mapper.selectStock(optionNo);
	}

	// 옵션 번호 여러개로 해당 상품의 재고량 조회
	@Override
	public List<Map<String, Object>> selectStockListBySeveralKeys(List<Product> productList) {
		return mapper.selectStockListBySeveralKeys(productList);
	}

	// 상품 등록 중 옵션 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertOptionList(Map<String, Object> paramMap) {
		List<Option> optionList = new ArrayList<>();
		int length = ((String[])paramMap.get("stock")).length;
		
		long productNo = Integer.parseInt(String.valueOf(paramMap.get("productNo")));
		String[] color = (String[])paramMap.get("color");
		String[] size = (String[])paramMap.get("size");
		String[] stock = (String[])paramMap.get("stock");
		String[] location = (String[])paramMap.get("location");
		
		for(int i=0; i<length; i++) {
			Option op = new Option();
			op.setProductNo(productNo);
			op.setColor(color[i]);
			if(size != null && size[i].trim().length() > 0) {
				op.setSize(size[i]);
			}
			op.setStock(Integer.parseInt(stock[i].replaceAll(",", "")));
			if(location != null && location[i].trim().length() > 0) {
				op.setLocation(location[i]);
			}
			optionList.add(op);
		}
		
		return mapper.insertOptionList(optionList);
	}

	// 상품 번호로 관련 옵션 모두 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteProductOption(long productNo) {
		return mapper.deleteProductOption(productNo);
	}

}
