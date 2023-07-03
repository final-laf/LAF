package edu.kh.laf.board.model.dto;

import lombok.Data;

@Data
public class ReviewImg {
	private long reviewImgNo;
	private long reviewNo;
	private String reviewPath;
	private int reviewImgOrder;
}
