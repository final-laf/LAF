package edu.kh.laf.main.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.main.model.dto.Banner;

@Mapper
public interface MainMapper {
	List<Banner> selectBannerList(); 
}
