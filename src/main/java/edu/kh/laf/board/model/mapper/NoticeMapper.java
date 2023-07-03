package edu.kh.laf.board.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.board.model.dto.Notice;

@Mapper
public interface NoticeMapper {
	
	/** 공지사항 count
	 * @return
	 */
	int noticeListCount();
	
	/** 공지사항 검색어 count
	 * @param paramMap
	 * @return
	 */
	int noticeListCountSearch(Map<String, Object> paramMap);
	
	/** 공지사항 목록
	 * @return
	 */
	List<Notice> noticeList(RowBounds rowBounds);
	
	
	/** 공지사항 검색어를 포함한 목록
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Notice> searchNoticeList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	/** 공지사항 상세
	 * @param noticeNo
	 * @return
	 */
	Notice detailNotice(String noticeNo);

	/** 공지사항 작성
	 * @return
	 */
	int writeNotice(Notice notice);

	/** 공지사항 삭제
	 * @param noticeNo
	 * @return
	 */
	int deleteNotice(String noticeNo);







	

}
