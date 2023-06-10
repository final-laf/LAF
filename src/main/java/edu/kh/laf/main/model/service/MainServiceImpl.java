package edu.kh.laf.main.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.main.model.mapper.MainMapper;

@Service
public class MainServiceImpl implements MainService {

	private MainMapper mapper;
	
	public MainServiceImpl(MainMapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public List<Banner> selectBannerList() {
		return mapper.selectBannerList();
	}

}
