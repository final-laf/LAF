package edu.kh.laf.order.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.member.model.dto.Member;

@Mapper
public interface OrderMapper {
	public Member orderInfo(long memberNo);
}
