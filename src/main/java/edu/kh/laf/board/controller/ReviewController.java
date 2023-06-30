package edu.kh.laf.board.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.board.model.dto.ReviewImg;
import edu.kh.laf.board.model.service.ReviewService;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.mypage.model.service.MypageReviewService;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ReviewController {

	@Autowired
	private ReviewService service;
	private MypageReviewService myReviewService;
	
	// 리뷰 메인화면
	@GetMapping("/review")
	public String review(
			Model model
			, @RequestParam(value="cp", required=false, defaultValue="1") int cp
			) {
			Map<String, Object> resultMap = service.reviewList(cp);
			model.addAttribute("resultMap", resultMap);
			
			List<Review> bestReview = service.bestReview();
			for(Review review : bestReview) {
				System.out.println(bestReview);
				review.setOption(service.reviewOption(review.getOptionNo())); // 옵션 설정
				review.setProduct(service.reviewProduct(review.getProductNo())); // 상품 설정
				List<ReviewImg> imgList = new ArrayList<>();
				imgList=service.reviewImg(review.getReviewNo());
				review.setReviewImg(imgList);
			}
			model.addAttribute("bestReview", bestReview);
		return "/boards/review/review";
	}
//	리뷰 상세
	@GetMapping("/review/detailReview")
	@ResponseBody
	public Review detail(String reviewNo) {
		Review review = new Review();
		review = service.detailReview(reviewNo);
		if(review!=null) {
			int num = review.getMemberId().length()/2;
			int uNum = review.getOrderUno().length()/2;
			
			String blind = "";
			blind = "";
			for(int i=0; i<uNum; i++) {blind += "*";}
			review.setOrderUno(review.getOrderUno().substring(0, uNum)+blind);
			
			List<ReviewImg> imgList = new ArrayList<>();
			imgList=service.reviewImg(review.getReviewNo());
			review.setReviewImg(imgList);
			review.setOption(service.reviewOption(review.getOptionNo())); // 옵션 설정
			review.setProduct(service.reviewProduct(review.getProductNo())); // 상품 설정
		}else {
			review = new Review();
			review.setMemberNo(0);
		}
		System.out.println(review.getMemberNo());
		return review;
	}
	
	/** 리뷰 추가
	 * @param review
	 * @param images
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@PostMapping("/review/insert")
	public String insert(Review review, @RequestParam(value="images", required=false) List<MultipartFile> images)throws IllegalStateException, IOException {
		int i = service.insertReview(review, images);
		
		return "redirect:/myPage/review/list"; 
	}

	/** 리뷰 수정
	 * @param review
	 * @param deleteList
	 * @param images
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/review/update")
	public String update(
			Review review,
			@RequestParam(value="deleteList", required=false) String deleteList, 
			@RequestParam(value="images", required=false) List<MultipartFile> images,
			@RequestHeader("referer") String referer
			)  throws Exception {
		int i = service.updateReview(review, images, deleteList);
		
		System.out.println(referer);
		
		return "redirect:"+referer; 
	}
	/** 리뷰 삭제
	 * @param reviewNo
	 * @return
	 */
	@GetMapping("/review/delete")
	public String delete(
			@RequestParam(value="reviewNo", required=false) long reviewNo,
			@RequestHeader("referer") String referer
			) {
		int i = service.deleteReview(reviewNo);
		System.out.println(referer);
		return "redirect:"+referer; 
	}
	
	
	/** 베스트 리뷰 수정
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/review/best")
	public String bestReview(
			@RequestParam Map<String, Object> paramMap
			) {
		System.out.println(paramMap);
		int i = service.updateBestReview(paramMap);
		System.out.println(i + "ㅇㅇ");
		return "redirect:/review"; 
	}
	
}
