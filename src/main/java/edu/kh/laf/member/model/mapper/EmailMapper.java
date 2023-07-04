package edu.kh.laf.member.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmailMapper {

	/** 인증 키 업데이트
	 * @param map
	 * @return result
	 */
	int updateAuthKey(Map<String, String> map);

	/** 인증 키 삽입
	 * @param map
	 * @return result
	 */
	int insertAuthKey(Map<String, String> map);

	/** 인증 키 확인
	 * @param paramMap
	 * @return int 1(인증) 0(인증 안 됨)
	 */
	public int checkAuthKey(Map<String, Object> paramMap);
	
	/** 주문자 이메일 주소 조회
	 * @param memberNo 
	 * @return
	 */
	String selectSendEmail(long memberNo);
	
}
