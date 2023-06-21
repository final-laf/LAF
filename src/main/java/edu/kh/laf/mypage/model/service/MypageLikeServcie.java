package edu.kh.laf.mypage.model.service;

import java.util.List;
import java.util.Map;

public interface MypageLikeServcie {

	/**
	 * 찜 목록 추가
	 * @param map
	 * @return result
	 */
	int insertLike(Map<String, Object> map);
	
	/**
	 * 찜 목록 삭제
	 * @param productNo
	 * @return result
	 */
	int deleteLike(Map<String, Object> map);
	
	/**
	 * 찜 목록 여러개 삭제
	 * @param map
	 * @return
	 */
	int deleteSelectedLike(Map<String, Object> map);
	
	/**
	 * 찜 여부 확인
	 * @param map
	 * @return result ( 1: true, 0: false)
	 */
	int checkLike(Map<String, Object> map);

	/**
	 * 찜한 상품 목록 조회
	 * @param memberNo
	 * @return likeList
	 */
	List<Long> selectLikeList(Long memberNo);

	
	
}
