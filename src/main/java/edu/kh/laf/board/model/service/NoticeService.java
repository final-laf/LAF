package edu.kh.laf.board.model.service;

import java.util.Map;

import edu.kh.laf.board.model.dto.Notice;


public interface NoticeService {

	/** 공지사항 리스트
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> noticeList(int cp);
	
	/** 공지사항 검색어를 포함한 리스트
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> noticeList(Map<String, Object> paramMap, int cp);
	
	/** 공지사항 상세
	 * @param no
	 * @return
	 */
	Notice detailNotice(String no);



	/** 공지사항 작성
	 * @param no
	 * @return
	 */
	int writeNotice(Notice notice);

	/** 공지사항 삭제
	 * @param noticeNo
	 * @return
	 */
	int deleteNotice(String noticeNo);

	/** 공지사항 수정
	 * @param notice
	 */
	int updateNotice(Notice notice);





	

	

}
