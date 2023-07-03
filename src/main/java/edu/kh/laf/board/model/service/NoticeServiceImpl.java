package edu.kh.laf.board.model.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.laf.board.model.dto.Notice;
import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.mapper.NoticeMapper;
import edu.kh.laf.common.utility.Pagination;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeMapper mapper;

	/** 공지사항 리스트
	 *
	 */
	@Override
	public Map<String, Object> noticeList(int cp) {
		int listCount = mapper.noticeListCount();
		
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Notice> noticeList = mapper.noticeList(rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("noticeList", noticeList);
		
		return resultMap;
	}
	
	/** 공지사항 검색어를 포함한 리스트
	 *
	 */
	@Override
	public Map<String, Object> noticeList(Map<String, Object> paramMap, int cp) {
		int listCount = mapper.noticeListCountSearch(paramMap); // 오버로딩
		// 2. 1번 조회 결과 + cp를 이용해서 Pagination 객체 생성
		// -> 내부 필드가 모두 계산되어 초기화됨
		Pagination pagination = new Pagination(listCount, cp, 10);
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1 ) * pagination.getLimit();
			
		// 2) Rowbounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Notice> noticeList = mapper.searchNoticeList(paramMap, rowBounds);
		
		// 4. pagination, boardList를 Map에 담아서 반환
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("noticeList", noticeList);
		return map;
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
