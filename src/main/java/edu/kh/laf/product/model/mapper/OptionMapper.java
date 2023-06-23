package edu.kh.laf.product.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

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
	List<Option> selectOptionSelectedColor(Map<String, Object> map);

	/**
	 * 옵션 번호로 옵션 정보 조회
	 * @param optionNo
	 * @return option
	 */
	Option selectOption(long optionNo);
	
	/**
	 * 상품 번호 여러개로 해당 상품의 모든 옵션 조회
	 * @param paramMap
	 * @param rowBounds 
	 * @return optionList
	 */
	List<Option> selectOptionListBySeveralKeys(Map<String, Object> paramMap, RowBounds rowBounds);

	/**
	 * 옵션 번호로 재고량 조회
	 * @param optionNo
	 * @return stock
	 */
	int selectStock(long optionNo);
}
