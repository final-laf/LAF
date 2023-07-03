package edu.kh.laf.board.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

public interface ReviewService {

	/** 모든 리뷰 조회
	 * @return
	 */
	Map<String, Object> reviewList(int cp);

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

	/** 리뷰 작성
	 * @param review
	 * @param images
	 * @return
	 */
	int insertReview(Review review, List<MultipartFile> images)  throws IllegalStateException, IOException;


	/** 리뷰 이미지 리스트
	 * @param reviewNo
	 * @return
	 */
	List<ReviewImg> reviewImg(long reviewNo);

	/** 리뷰 수정하기
	 * @param review
	 * @param images 
	 * @param deleteList 
	 * @return
	 * @throws Exception 
	 */

	int updateReview(Review review, List<MultipartFile> images, String deleteList) throws IllegalStateException, IOException, Exception;

	/** 리뷰 삭제하기
	 * @param reviewNo
	 * @return
	 */
	int deleteReview(long reviewNo);

	/** 상품 개별 리뷰
	 * @param cp
	 * @return
	 */
	Map<String, Object> productReviewList(int cp, long productNo);

	/** 베스트 리뷰 조회
	 * @return
	 */
	List<Review> bestReview();

	/** 베스트 리뷰 업데이트
	 * @param paramMap
	 * @return
	 */
	int updateBestReview(Map<String, Object> paramMap);

	/**
	 * 리뷰 이미지 경로 조회
	 * @return imagePathList
	 */
	List<String> selectReviewImagePathList();


}
