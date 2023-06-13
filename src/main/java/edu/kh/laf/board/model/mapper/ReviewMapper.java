package edu.kh.laf.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Review;

@Mapper
public interface ReviewMapper {

	/** 모든 리뷰 조회
	 * @return
	 */
	List<Review> reviewList();

}
