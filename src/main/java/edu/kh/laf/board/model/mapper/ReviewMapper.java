package edu.kh.laf.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface ReviewMapper {

	/** 모든 리뷰 조회
	 * @return
	 */
	List<Review> reviewList();

	/** 리뷰 옵션 조회
	 * @param optionNo
	 * @return
	 */
	Option reviewOption(long optionNo);

	/** 리뷰 상품 조회
	 * @param productNo
	 * @return
	 */
	Product reviewProduct(long productNo);

}
