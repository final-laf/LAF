package edu.kh.laf.product.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import edu.kh.laf.product.model.dto.Option;
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
	public List<Option> getOptionSelectedColor(long productNo, String color) {

		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("color", color);
		
		return mapper.getOptionSelectedColor(map);
	}

}
