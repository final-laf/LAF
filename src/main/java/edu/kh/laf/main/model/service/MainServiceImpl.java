package edu.kh.laf.main.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.common.utility.S3Uploader;
import edu.kh.laf.common.utility.Util;
import edu.kh.laf.main.model.dto.Banner;
import edu.kh.laf.main.model.mapper.MainMapper;

@Service
public class MainServiceImpl implements MainService {

	@Autowired
	private MainMapper mapper;
	@Autowired
	private S3Uploader uploader;
	
	@Value("${banner.webpath}")
	private String webPath;
	@Value("${banner.location}")
	private String filePath;
	
	@Override
	public List<Banner> selectBannerList() {
		return mapper.selectBannerList();
	}

	// 이미지 삭제
	@Override
	public int deleteImage(String[] removedImages) {
		return mapper.deleteImages(removedImages);
	}

	// 이미지 삽입
	@Override
	public int insertImage(List<MultipartFile> banner) throws IllegalStateException, IOException {
		
		// 추가된 이미지 삽입
		List<Banner> uploadList = new ArrayList<>();
		for (int i = 0; i < banner.size(); i++) {
			if (banner.get(i).getSize() == 0) continue;
			String filename = banner.get(i).getOriginalFilename();
			String rename = Util.fileRename(filename);
			
			Banner bn = new Banner();
			bn.setBannerNo(i);
			bn.setRename(rename);
			bn.setImgPath(webPath + rename);
			uploadList.add(bn);
		}
		
		// 업로드 할 파일이 없을 경우
		if (uploadList.isEmpty()) return 1;
		
		// DB에 정보 저장
//		int result = mapper.deleteImages(); 
//		result *= mapper.insertImageList(uploadList);
		int result = mapper.insertImageList(uploadList);
		if (result < uploadList.size()) {
			throw new FileUploadException();
		}
		
		// 서버에 파일 저장
		for (int i = 0; i < uploadList.size(); i++) {
			int bannerNo = uploadList.get(i).getBannerNo();
			String imagePath = uploadList.get(i).getImgPath();
			uploader.upload(banner.get(bannerNo), imagePath);
//			String uploadImageUrl = uploader.upload(banner.get(bannerNo), imagePath);
//			banner.get(bannerNo).transferTo(new File(filePath + uploadList.get(i).getRename()));
		}
		
		return 1;
	}

	// 배너 경로 조회
	@Override
	public List<String> selectBannerPathList() {
		return mapper.selectBannerPathList();
	}

	// 전체 이미지 경로 조회
	@Override
	public List<String> selectImagePathList() {
		return mapper.selectImagePathList();
	}
	
	// 조회 목록 누적
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public List<Object> checkClick(Map<String, Object> map) {
		// 조회 목록에 해당 상품이 있는지 확인
		int result = mapper.checkClickedProduct(map);
		// 있으면 기존 기록 삭제
		if(result > 0) {
			mapper.deleteClickedProduct(map);
		}
		// 조회 목록 누적
		mapper.insertClick(map);
		// 최근 조회한 상품 3개 clickedProducts로 반환
		Long memberNo = (Long) map.get("memberNo");
		List<Object> clickedProducts = mapper.selectClickedProducts(memberNo);
		return clickedProducts;
	}

	// 상품 조회 목록 자정에 초기화
	@Override
	public void cleanClickTable() {
		mapper.cleanClickTable();
	}

}
