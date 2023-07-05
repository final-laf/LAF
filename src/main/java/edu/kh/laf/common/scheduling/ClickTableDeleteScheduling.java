package edu.kh.laf.common.scheduling;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.laf.common.utility.S3Uploader;
import edu.kh.laf.main.model.service.MainService;

@Component // Bean 등록
@EnableScheduling
public class ClickTableDeleteScheduling {
	
	@Autowired
	private MainService mainService;
	
//	@Scheduled(cron = "0,30 * * * * *")
	@Scheduled(cron = "0 0 0 * * *")
	public void cleanClickTable() {
		// 상품 조회 목록 자정에 초기화
		mainService.cleanClickTable();
	}
}