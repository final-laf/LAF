package edu.kh.laf.board.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Notice;

@Mapper
public interface NoticeMapper {
	
	List<Notice> noticeList();
	
}