package edu.kh.laf.mypage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageLikeMapper {

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
	 * 찜 여부 확인
	 * @param map
	 * @return result (1: true, 0: false)
	 */
	int checkLike(Map<String, Object> map);

	/**
	 * 찜한 상품 목록 조회
	 * @param memberNo
	 * @return likeList
	 */
	List<Long> selectLikeList(Long memberNo);
	
}
