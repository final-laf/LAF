package edu.kh.laf.board.model.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Notice;
import edu.kh.laf.board.model.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeMapper mapper;

	/** 공지사항 리스트
	 *
	 */
	@Override
	public List<Notice> noticeList() {
		return mapper.noticeList();
	}
	
	
}
