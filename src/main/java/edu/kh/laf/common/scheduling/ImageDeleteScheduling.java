package edu.kh.laf.common.scheduling;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.laf.product.model.service.ProductService;

@Component // Bean 등록
@EnableScheduling
public class ImageDeleteScheduling {
	
	@Autowired
	private ProductService service;
	
	@Value("${product.location}")
	private String productFilePath;
	
	@Value("${my.review.location}")
	private String reviewFilePath;
	
//	@Scheduled(cron = "0,30 * * * * *") // 매 분 0초, 30초마다
	@Scheduled(cron = "0 0 * * * *") // 매 정시마다
	public void test() {
		
//		System.out.println("----게시판 DB,서버 불일치 파일 제거----");

		/* 상품 이미지 정리 */
		File path = new File(productFilePath);
		File[] imageArr = path.listFiles();
		List<File> serverImageList = null;
		if(imageArr != null) serverImageList = Arrays.asList(imageArr);
		List<String> dbImageList = service.selectImageList();
		
		if(!serverImageList.isEmpty()) {
			for(File server : serverImageList) {
				if(dbImageList.indexOf(server.getName()) == -1) {
//					System.out.println(server.getName() + " 삭제");
					server.delete();
				}
			}			
		}
		
		/* 리뷰 이미지 정리 */
		path = new File(reviewFilePath);
		imageArr = path.listFiles();
		if(imageArr != null) serverImageList = Arrays.asList(imageArr);
		dbImageList = service.selectImageList();
		
		if(!serverImageList.isEmpty()) {
			for(File server : serverImageList) {
				if(dbImageList.indexOf(server.getName()) == -1) {
//					System.out.println(server.getName() + " 삭제");
					server.delete();
				}
			}			
		}
		
//		System.out.println("----이미지파일 삭제 스케줄러 종료----");
	}
}