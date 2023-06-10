package edu.kh.laf.board.model.dto;

import lombok.*;

@Data
public class Qna {
	private long qnaNo;
	private long memberNo;
	private String memberName;
	private long orderNo;
	private long productNo;
	private String qnaCategory;
	private String qnaTitle;
	private String qnaContent;
	private String qnaCreateDate;
	private String qnaLockFLl;
	private int qnaPw;
	private String qnaAnswer;

}
