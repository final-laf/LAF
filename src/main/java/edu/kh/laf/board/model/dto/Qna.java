package edu.kh.laf.board.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Qna {
	private long qnaNo;
	private long memberNo;
	private String memberName;
	private String memberGrade;
	private String orderUno;
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
