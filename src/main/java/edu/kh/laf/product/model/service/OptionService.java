package edu.kh.laf.product.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.product.model.dto.Option;

public interface OptionService {

	/**
	 * 상품번호로 해당 상품의 모든 옵션 조회
	 * @param productNo
	 * @return optionList
	 */
	List<Option> selectOptionList(long productNo);
	
	/**
	 * 옵션 목록에서 색상 추출
	 * @param optionList
	 * @return colorList
	 */
	List<String> getColorList(List<Option> optionList);
	
	/**
	 * 옵션 목록에서 사이즈 추출
	 * @param optionList
	 * @return sizeList
	 */
	List<String> getSizeList(List<Option> optionList);

	/**
	 * 옵션 목록에서 색상, 사이즈 정보 추출
	 * @param productNo
	 * @return 
	 */
	Map<String, List<String>> getOptionName(long productNo);

	/**
	 * 색상 선택 시 사이즈 품절여부 확인
	 * @param map
	 * @return emptySizeList
	 */
	List<Option> getOptionSelectedColor(long productNo, String color);
}
