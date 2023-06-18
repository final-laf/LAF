package edu.kh.laf.mypage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.mypage.model.mapper.MypageReviewMapper;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Service
public class MypageReviewServiceImpl implements MypageReviewService {
	@Autowired
	private MypageReviewMapper mapper;

	/** 내 리뷰 조회
	 *
	 */
	@Override
	public List<OrderProduct> myReview(Long memberNo) {
		return mapper.myReview(memberNo);
	}

	/** 각 리뷰 옵션 조회
	 * @param optionNo
	 * @return
	 */
	public Option myOrderOption(long optionNo) {
		return mapper.myOrderOption(optionNo);
	}

	/** 리뷰 상품 조회
	 *
	 */
	@Override
	public Product myOrderProduct(long productNo) {
		return mapper.myOrderProduct(productNo);
	}

	/** 내가 작성한 리뷰 조회
	 *
	 */
	@Override
	public List<OrderProduct> myWrittenReview(Long memberNo) {
		return mapper.myWrittenReview(memberNo);
	}


	
	

}
