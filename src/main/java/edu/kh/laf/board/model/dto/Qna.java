package edu.kh.laf.board.model.dto;

import lombok.*;

@Data
public class Qna {
	private long qnaNo;
	private long memberNo;
	private String memberName;
	private String orderNo;
	private String productNo;
	private String qnaCategory;
	private String qnaTitle;
	private String qnaContent;
	private String qnaCreateDate;
	private String qnaLockFl;
	private String qnaPw;
	private String qnaAnswer;
	private String qnaDeleteFl;

}
