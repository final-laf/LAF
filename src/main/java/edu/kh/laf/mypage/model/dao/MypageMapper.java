package edu.kh.laf.mypage.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.member.model.dto.Address;

@Mapper
public interface MypageMapper {
	
	

	List<Qna> qnaList(Long memberNo);

	List<Review> myReview(Long memberNo);

	
	/** 등록된 배송지 조회
	 * @param memberNo
	 * @return
	 */
	List<Address> selectAddressList(Long memberNo);
	

	
}
