package edu.kh.laf.product.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

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
	List<Option> selectOptionSelectedColor(long productNo, String color);

	/**
	 * 옵션 번호로 옵션 정보 조회
	 * @param optionNo
	 * @return option
	 */
	Option selectOption(long optionNo);
	
	/**
	 * 상품 번호 여러개로 해당 상품의 모든 옵션 조회
	 * @param paramMap
	 * @return resultMap
	 */
//	public List<Option> selectOptionListBySeveralKeys(List<Product> productList);

	/**
	 * 옵션 번호로 재고량 조회
	 * @param optionNo
	 * @return stock
	 */
	int selectStock(long optionNo);

	/**
	 * 상품 번호 여러개로 해당 상품의 모든 재고 조회
	 * @param productList
	 * @return stockList
	 */
	List<Map<String, Object>> selectStockListBySeveralKeys(List<Product> productList);

	/**
	 * 상품 등록 중 옵션 정보 등록
	 * @param paramMap
	 * @return result
	 */
	int insertOptionList(Map<String, Object> paramMap);

	/**
	 * 상품 번호로 관련 옵션 모두 삭제
	 * @param productNo
	 * @return result
	 */
	int deleteProductOption(long productNo);
	
}
