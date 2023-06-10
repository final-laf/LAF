package edu.kh.laf.mypage.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Qna;

public interface MypageService {

	List<Qna> qnaList(Long memberNo);

}
