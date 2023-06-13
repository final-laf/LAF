package edu.kh.laf.board.model.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import edu.kh.laf.board.model.dto.Notice;

@Mapper
public interface NoticeMapper {
	
	/** 공지사항 목록
	 * @return
	 */
	List<Notice> noticeList();

	/** 공지사항 상세
	 * @param noticeNo
	 * @return
	 */
	Notice detailNotice(String noticeNo);

	/** 공지사항 작성
	 * @return
	 */
	Notice writeNotice(Notice notice);

}
