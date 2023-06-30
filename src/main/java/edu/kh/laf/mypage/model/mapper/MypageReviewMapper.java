package edu.kh.laf.mypage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface MypageReviewMapper {
	
	

	/** 리뷰가 없는 오더 리스트
	 * @param memberNo
	 * @return
	 */
	int orderListCount(Long memberNo);
	
	/** 리뷰가 없는 오더 리스트
	 * @param rowBounds
	 * @param memberNo
	 * @return
	 */
	List<Review> orderList(RowBounds rowBounds, Long memberNo);
	
	/** 옵션 조회
	 * @param optionNo
	 * @return
	 */
	Option myOrderOption(long optionNo);
	
	/** 상품 조회
	 * @param productNo
	 * @return
	 */
	Product myOrderProduct(long productNo);
	
	

	/** 리뷰 리스트 count
	 * @param memberNo
	 * @return
	 */
	int reviewListCount(Long memberNo);
	
	/** 리뷰 리스트
	 * @param rowBounds
	 * @param memberNo
	 * @return
	 */
	List<Review> reviewList(RowBounds rowBounds, Long memberNo);

	
	
	


	/** 내가 작성 가능한 리뷰 조회
	 * @param orderProduct
	 * @return
	 */
	Review detailReview(Review orderProduct);
	
	/** 리뷰 이미지 조회
	 * @param reviewNo
	 * @return
	 */
	List<ReviewImg> reviewImg(long reviewNo);







	
}
