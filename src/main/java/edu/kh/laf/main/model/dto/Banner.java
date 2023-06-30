package edu.kh.laf.main.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Banner {
	private int bannerNo;
	private long productNo;
	private String imgPath;
}
