package edu.kh.laf.mypage.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

public interface MypageReviewService {

	/** 내 작성 가능한 리뷰 조회
	 * @param cp
	 * @param loginMember 
	 * @return
	 */
	Map<String, Object> myOrder(int cp, Long memberNo);
	
	
	/** 내가 작성한 리뷰
	 * @param cp
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> myReview(int cp, Long memberNo);
	

	/** 리뷰 옵션 조회
	 * @param optionNo
	 * @return
	 */
	Option myOrderOption(long optionNo);

	/** 리뷰 상품 조회
	 * @param productNo
	 * @return
	 */
	Product myOrderProduct(long productNo);


	/** 내가 작성 가능한 리뷰 개별 조회
	 * @param orderProduct
	 * @return
	 */
	Review detailReview(Review orderProduct);

		/** 리뷰 이미지 리스트
	 * @param reviewNo
	 * @return
	 */
	List<ReviewImg> reviewImg(long reviewNo);



}
