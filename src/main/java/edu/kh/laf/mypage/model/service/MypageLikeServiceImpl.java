package edu.kh.laf.mypage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.mypage.model.mapper.MypageLikeMapper;

@Service
public class MypageLikeServiceImpl implements MypageLikeServcie {
	
	@Autowired
	private MypageLikeMapper mapper;

	// 찜 목록 추가
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertLike(Map<String, Object> map) {
		return mapper.insertLike(map);
	}

	// 찜 목록 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteLike(Map<String, Object> map) {
		return mapper.deleteLike(map);
	}

	// 찜 목록 여러개 삭제
	@Override
	public int deleteSelectedLike(Map<String, Object> map) {
		return mapper.deleteSelectedLike(map);
	}
	
	// 찜 여부 확인
	@Override
	public int checkLike(Map<String, Object> map) {
		return mapper.checkLike(map);
	}

	// 찜한 상품 목록 조회
	@Override
	public List<Long> selectLikeList(Long memberNo) {
		return mapper.selectLikeList(memberNo);
	}

}
