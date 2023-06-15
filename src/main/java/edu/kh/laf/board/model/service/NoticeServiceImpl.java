package edu.kh.laf.board.model.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	/** 공지사항 상세
	 * @param noticeNo
	 * @return
	 */
	@Override
	public Notice detailNotice(String noticeNo) {
		return mapper.detailNotice(noticeNo);
	}

	/** 공지사항 작성
	 * @param no
	 * @return
	 */
	@Override
	public int writeNotice(Notice notice) {
		return mapper.writeNotice(notice);
	}

	/** 공지사항 삭제
	 *
	 */
	@Override
	public int deleteNotice(String noticeNo) {
		return mapper.deleteNotice(noticeNo);
	}

	
}
