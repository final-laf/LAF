package edu.kh.laf.board.model.service;

import java.util.List;


import edu.kh.laf.board.model.dto.Notice;


public interface NoticeService {

	/** 공지사항 상세
	 * @param no
	 * @return
	 */
	Notice detailNotice(String no);

	/** 공지사항 리스트
	 * @param memberNo
	 * @return
	 */
	List<Notice> noticeList();


	/** 공지사항 작성
	 * @param no
	 * @return
	 */
	Notice writeNotice(Notice notice);

	/** 공지사항 삭제
	 * @param noticeNo
	 * @return
	 */
	int deleteNotice(String noticeNo);

	

}
