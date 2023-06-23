package edu.kh.laf.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
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

	/** 리뷰 개별 조회
	 * @param reviewNo
	 * @return
	 */
	Review detailReview(String reviewNo);

	/**
	 * 특정 상품에 대한 모든 리뷰 조회
	 * @param productNo
	 * @return reviewList
	 */
	List<Review> reviewProductList(long productNo);
	
	/**
	 * 특정 상품에 대한 리뷰 개수 조회
	 * @param productNo
	 * @return reviewList
	 */
	int selectReviewProductCount(long productNo);

	/** 리뷰 작성
	 * @param review
	 * @return
	 */
	int InsertReview(Review review);

	/** 리뷰 수정하기
	 * @param review
	 * @return
	 */
	int updateReview(Review review);

	/** 리뷰 넘버 조회
	 * @param review
	 * @return
	 */
	Review reviewNo(Review review);

	
	/** 이미지 추가하기
	 * @param img
	 * @return
	 */
	int imageInsert(ReviewImg img);
	
	/** 이미지 업데이트
	 * @param img
	 * @return
	 */
	int imageUpdate(ReviewImg img);

	/** 리뷰 넘버 설정
	 * @param review
	 */
	int setReviewNo(Review review);


}
