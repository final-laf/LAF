package edu.kh.laf.board.model.service.dao;

import java.util.List;


import edu.kh.laf.board.model.dto.Notice;


public interface NoticeService {

	/** 공지사항 리스트
	 * @param memberNo
	 * @return
	 */
	List<Notice> noticeList();
	

}
