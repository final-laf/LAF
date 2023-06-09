package edu.kh.laf.board.model.dto;

import lombok.*;

@Data
public class Qna {
	private int qnaNo;
	private int memberNo;
	private int orderNo;
	private int productNo;
	private String qnaCategory;
	private String qnaTitle;
	private String qnaContent;
	private String qnaCreateDate;
	private String qnaLockFLl;
	private int qnaPw;
	private String qnaAnswer;

}
