package edu.kh.laf.board.model.dao;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.laf.board.model.dto.Notice;


@Repository
public class NoticeDAO {

	@Autowired
	private NoticeMapper mapper;

	/** 공지사항 목록
	 * @return
	 */
	public List<Notice> noticeList() {
		return mapper.noticeList();
	}
	

}
