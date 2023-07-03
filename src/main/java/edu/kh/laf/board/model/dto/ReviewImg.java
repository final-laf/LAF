package edu.kh.laf.board.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ReviewImg {
	private long reviewImgNo;
	private long reviewNo;
	private String reviewPath;
	private int reviewImgOrder;
}
