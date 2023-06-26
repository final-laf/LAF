package edu.kh.laf.product.model.service;

import edu.kh.laf.common.utility.Pagination;
import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.dto.ProductImg;
import edu.kh.laf.product.model.mapper.ProductMapper;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductMapper mapper;

    public ProductServiceImpl(ProductMapper mapper) {
        this.mapper = mapper;
    }
    
    // 모든 상품 목록 조회
	@Override
	public Map<String, Object> selectProductList(Map<String, Object> paramMap) {
		
		int listCount = mapper.getProductCount(paramMap);
		int cp = (paramMap.get("cp") == null) ? 1 : Integer.parseInt((String)paramMap.get("cp"));
		Pagination pagination = new Pagination(listCount, cp, 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.selectProductList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);
		
		return resultMap;
	}

    // 상품 번호로 상품 정보 조회
    @Override
    public Product selectProduct(long productNo) {
        return mapper.selectProduct(productNo);
    }
    
    // 카테고리별 위클리 베스트 상품 목록 조회(갯수제한)
    @Override
	public List<Product> selectWeeklyBest(int categoryNo, int limit) {
    	Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);
    	
		return mapper.selectWeeklyBest(map);
	}

    // 카테고리 상품 목록 조회
    @Override
    public Map<String, Object> selectCategoryProductList(Map<String, Object> paramMap) {
    	
    	int listCount = mapper.getListCount(paramMap);
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 16);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.selectCategoryProductList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);
    	
    	return resultMap;
    }
    
	// 상품 검색
	@Override
	public Map<String, Object> search(Map<String, Object> paramMap) {
		int listCount = mapper.getSearchListCount(paramMap);
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 16);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.search(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);
    	
    	return resultMap;
	}

    
    // 카테고리 상품 목록 조회(갯수제한)
	@Override
	public List<Product> selectCategoryProductList(int categoryNo, int limit) {		
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);
		
		return mapper.selectCategoryProductList(map);
	}
	
	// 신규 등록 상품 목록 조회(20개)
	@Override
	public List<Product> selectNewArrivalProductList() {
		return mapper.selectNewArrivalProductList();
	}

	// 개인별 맞춤 상품 추천
	@Override
	public List<Product> selectPersonalProductList(long memberNo) {
		return mapper.selectPersonalProductList(memberNo);
	}

	// 상품별 추천 상품
	@Override
	public List<Product> selectRecommendList(long productNo) {
		return mapper.selectRecommendList(productNo);
	}

	// 부모 카테고리 목록 조회
	@Override
	public List<Category> selectCategoryList() {
		return mapper.selectCategoryList();
	}
	
	// 카테고리 이름 조회
	@Override
	public String selectCategoryName(int categoryNo) {
		return mapper.selectCategoryName(categoryNo);
	}

	// 자식 카테고리 조회
	@Override
	public List<Category> selectChildCategoryList(int categoryNo) {
		return mapper.selectChildCategoryList(categoryNo);
	}
	
	// 모든 카테고리 조회
	@Override
	public List<Category> selectAllCategoryList() {
		return mapper.selectAllCategoryList();
	}

	// 키 목록으로 상품 조회
	@Override
	public Map<String, Object> selectProductBySeveralKeys(Map<String, Object> paramMap) {
		int listCount = ((List<Long>)paramMap.get("likeList")).size();
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"), 10);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = null;
		if(listCount != 0)
			productList = mapper.selectProductBySeveralKeys(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);
		
		return resultMap;
	}

	// 상품이 포함된 카테고리 조회
	@Override
	public List<Map<String, Object>> selectCategoryListByProductNo(List<Product> productList) {
		return mapper.selectCategoryListByProductNo(productList);
	}

	// 상품 정보 변경
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateState(long productNo, String state) {
		Map<String, Object> map = new HashMap<>();
		map.put("productNo", productNo);
		map.put("state", state);
		
		return mapper.updateState(map);
	}

	// 선택 상품 상태 일괄 변경
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateAllState(String data, String state) {
		String[] tmp = data.split("-");
		List<Long> productNoList = new ArrayList<>(); 
		for(String str : tmp) {
			productNoList.add(Long.parseLong(str));
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("productNoList", productNoList);
		map.put("state", state);
		return  mapper.updateStateList(map);
	}

	// 상품 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public long insertProduct(Map<String, Object> paramMap) {
		
		// Product 등록 및 productNo 키 발급
		Product product = new Product();
		product.setProductName((String)paramMap.get("productName"));
		product.setProductPrice(Long.parseLong(((String)paramMap.get("productPrice")).replaceAll(",", "")));
		product.setProductSale(Integer.parseInt((String)paramMap.get("productSale")));
		product.setProductSalePrice(Long.parseLong(((String)paramMap.get("productSalePrice")).replaceAll(",", "")));
		product.setProductPoint(Integer.parseInt(((String)paramMap.get("productPoint")).replaceAll(",", "")));
		
		int result = mapper.insertProduct(product);
		if(result > 0) return product.getProductNo();
		return -1;
	}

	// 상품 등록 중 카테고리 정보 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertProductCategory(Map<String, Object> paramMap) {
		
		List<Map<String, Object>> productCategoryList = new ArrayList<>();

		String[] childCategoryArr = (String[])paramMap.get("childCategory");
		String[] parentCategoryArr = (String[])paramMap.get("parentCategory");
		long productNo = Long.parseLong(String.valueOf(paramMap.get("productNo")));
		
		// 부모 카테고리 추가
		for(String pc : parentCategoryArr) {
			Map<String, Object> map = new HashMap<>();
			map.put("productNo", productNo);
			map.put("parentCategoryNo", pc);
			productCategoryList.add(map);
		}

		// 자식 카테고리 추가
		List<Category> childCategoryList = mapper.selectAllChildCategoryList();
		for(String cc : childCategoryArr) {
			Map<String, Object> map = new HashMap<>();
			map.put("productNo", productNo);
			map.put("childCategoryNo", cc);
			
			// 짝 맞는 부모 카테고리 찾아서 연결
			for(Category c : childCategoryList) {
				if(cc.equals(String.valueOf(c.getCategoryNo()))) {
					map.put("parentCategoryNo", c.getParentCategoryNo());
				}
			}
			productCategoryList.add(map);
		}
		
		// 상품이 등록될 카테고리 정보 삽입
		return mapper.insertProductCategory(productCategoryList);
	}

	// 상품 이미지 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertProductImage(Map<String, Object> paramMap, MultipartFile thumbnail, List<MultipartFile> images) {
		
		// List<MultipartFile> images
		// -> 업로드된 파일이 담긴 객체 MultipartFile이 5개 존재
		//    단, 업로드된 파일이 없어도 MultipartFile 객체는 존재함
		
		// 실제 업로드된 파일의 정보를 기록할 List
		List<ProductImg> uploadList = new ArrayList<>();
		
		// images에 담겨있는 파일 중 실제 업로드된 파일만 분류
		for(int i=0; i<images.size(); i++) {
			
			// i번째 요소에 업로드한 파일이 있다면
			if(images.get(i).getSize() > 0) {
				BoardImage img = new BoardImage();
				
				// img에 파일 정보를 담아서 uploadList에 추가
				img.setImagePath(webPath); // 웹 접근 경로
				img.setBoardNo(boardNo); // 게시글 번호
				img.setImageOrder(i); // 이미지 순서
				
				String filename = images.get(i).getOriginalFilename(); // 파일 원본명
				img.setImageOriginal(filename); // 원본명
				img.setImageReName(Util.fileRename(filename)); // 변경명
				 
				uploadList.add(img);
			}
		} // 분류 for문 종료
		
		// 분류 작업 후 uploadList가 비어있지 않은 경우
		// => 업로드한 파일이 있음
		if(!uploadList.isEmpty()) {
			// BOARD_IMG 테이블에 INSERT하는 DAO 호출
			int result = dao.insertImageList(uploadList);
			// result == 삽입된 행의 개수 == uploadList.size()
			
			// 삽입된 행의 개수와 uploadList의 개수가 같다면 (=전체 insert 성공)
			if(result == uploadList.size()) {
				// 서버에 파일을 저장(transferTo())
				
				// images 	  : 실제 파일이 담긴 객체 리스트
				//				(업로드 안된 인덱스는 빈칸)
				
				// uploadList : 업로드된 파일의 정보
				//				(원본명, 변경명, 순서, 경로, 게시글번호)
				// 순서 == images 업로드된 인덱스
				
				for(int i=0; i<uploadList.size(); i++) {
					int index = uploadList.get(i).getImageOrder();
					
					// 파일로 변환
					String rename = uploadList.get(i).getImageReName();
					images.get(index).transferTo(new File(filePath + rename));
				}
			} else { // 일부 또는 전체 insert 실패
				// ** 웹 서비스 수행 중 1개라도 실패하면 전체 실패 **
				// -> rollback 필요
				
				// @Transactional(rollbackFor = Exception.class)
				// -> 예외가 발생해야지만 롤백
				
				// [결론] 예외를 강제 발생 시켜서 rollback을 해야한다!
				// => 사용자 정의 예외 생성
				throw new FileUploadException(); // 예외 강제발생
			}
		}
		
		return 0;
	}
	
}
