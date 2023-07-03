package edu.kh.laf.board.model.dto;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Faq {
	private long faqNo;
	private String faqTitle;
	private String faqContent;
	private String faqCategory;
	private String faqOrder;

}
