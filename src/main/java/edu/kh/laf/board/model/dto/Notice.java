package edu.kh.laf.board.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Notice {
	private long noticeNo;
	private long memberNo;
	private String noticeTitle;
	private String noticeContent;
	private String noticeDate;
	private String noticeDeleteFl;
}
