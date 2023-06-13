package edu.kh.laf.product.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.product.model.dto.Option;

@Mapper
public interface OptionMapper {

	/**
	 * 상품번호로 해당 상품의 모든 옵션 조회
	 * @param productNo
	 * @return optionList
	 */
	List<Option> selectOptionList(long productNo);

	/**
	 * 색상 선택 시 품절 사이즈 목록 조회
	 * @param map
	 * @return optionList
	 */
	List<Option> getOptionSelectedColor(Map<String, Object> map);
	
}
