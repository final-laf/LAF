package edu.kh.laf.board.model.dto;

import lombok.Data;

@Data
public class Notice {
	private long noticeNo;
	private long memberNo;
	private String noticeTitle;
	private String noticeContent;
	private String noticeDate;
	private String noticeDeleteFl;
}
