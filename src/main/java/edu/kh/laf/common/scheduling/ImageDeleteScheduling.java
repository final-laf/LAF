package edu.kh.laf.common.scheduling;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import edu.kh.laf.common.utility.S3Uploader;
import edu.kh.laf.main.model.service.MainService;

@Component // Bean 등록
@EnableScheduling
public class ImageDeleteScheduling {
	
	@Autowired
	private MainService mainService;
	
	@Autowired
	private S3Uploader uploader;
	
	@Value("${images.webpath}")
	private String imageFilePath;
	
//	@Scheduled(cron = "0,30 * * * * *")
//	@Scheduled(cron = "0 0 * * * *")
	public void cleanImageFiles() {
		
		List<String> serverImageList = uploader.getList(imageFilePath);
		List<String> dbImageList = mainService.selectImagePathList();
		
		for(String server : serverImageList) {
			// common 폴더 밑에 있는 자료들은 삭제 안함
			if(server.contains("common")) continue;
			
			if(dbImageList.indexOf(server) == -1) {
				uploader.remove(server);
			}
		}
	}
}