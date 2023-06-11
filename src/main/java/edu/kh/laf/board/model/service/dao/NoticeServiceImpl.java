package edu.kh.laf.board.model.service.dao;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dao.NoticeDAO;
import edu.kh.laf.board.model.dto.Notice;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeDAO dao;

	/** 공지사항 리스트
	 *
	 */
	@Override
	public List<Notice> noticeList() {
		return dao.noticeList();
	}
	
	
}
