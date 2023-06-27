package edu.kh.laf.mypage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.dto.Point;
import edu.kh.laf.order.model.dto.Order;
import edu.kh.laf.order.model.dto.OrderProduct;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;

@Mapper
public interface MypageMapper {
	
	
	// ---------------------------- MyPage Dashboard ---------------------------- 

	


	/** 로그인 멤버의 주문 조회
	 * @param loginMember
	 * @return myPageOrderList
	 */
	List<Order> selectMyPageOrderList(Member loginMember);
	
	
	// ---------------------------- MyPage Order ---------------------------- 
	
	/** 기간내 주문목록개수
	 * @param object
	 * @return
	 */
	int getOrderListCount(Map<String, Object> map);
	
	/** 기간내 주문목록
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Order> selectSearchOrderList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	
	/** 주문번호로 order_product 테이블에서 해당 상품 조회
	 * @param orderNo
	 * @return myPageOrderProductList
	 */
	List<OrderProduct> selectMyPageOrderProductList(long orderNo);

	/** 주문 상품 조회
	 * @param orderNo
	 * @return
	 */
	OrderProduct selectOrderProduct(long orderNo);
	// 상품조회
	Product selectProduct(long productNo);
	// 옵션조회
	Option selectOption(long optionNo);
	
	/** 회원 번호로 적립금 사용 개수 조회
	 * @param paramMap
	 * @return listCount
	 */
	int getListCount(Map<String, Object> paramMap);


	/** 로우바운드가 적용된 포인트 적립 내역 조회
	 * @param paramMap
	 * @param rowBounds
	 * @return pointList
	 */
	List<Point> selectPointList(Map<String, Object> paramMap, RowBounds rowBounds);


	/** 포인트 누적액. 누적 사용액 조회
	 * @param paramMap
	 * @return sumList
	 */
	List<Map<String, Long>> selectAccumulatedPoints(Map<String, Object> paramMap);


	/** 사용가능한 쿠폰 개수 조회
	 * @param paramMap
	 * @return listCount
	 */
	int getCouponListCount(Map<String, Object> paramMap);


	/** 로우바운드가 적용된 쿠폰 적립 내역 조회
	 * @param paramMap
	 * @param rowBounds
	 * @return resultMap
	 */
	List<Point> selectCouponList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	// ---------------------------- MyPage info ---------------------------- 
	
	
	/** 회원 정보 수정
	 * @param inputMember
	 * @return result
	 */
	int editMyPageInfo(Member inputMember);

	/** 회원 정보 조회
	 * @param memberId
	 * @return loginMember
	 */
	Member selectMember(Long memberNo);

	/** 비밀번호 변경
	 * @param member
	 * @return result
	 */
	int changePw(Member member);

	/** 회원 탈퇴
	 * @param memberNo
	 * @return result
	 */
	int deleteMember(Long memberNo);
	
	/** 배송지정보조회
	 * @param memberNo
	 * @return
	 */
	List<Address> selectAddressList(Long memberNo);

	/** 배송지 등록
	 * @param address
	 * @return result
	 */
	int insertAddress(Address address);
	
	/** 기존의 기본 배송지 유무 검색
	 * @param memberNo
	 * @return existingAddressNo
	 */
	Address selectDefaultAddress(long memberNo);
	
	/** 기존의 기본배송지를 "N"으로 변경
	 * @param addressNo
	 */
	void updateDefaultAddress(long addressNo);

	/** 배송지 삭제
	 * @param addressNo
	 * @return result
	 */
	int deleteAddress(String[] addressNo);

	/** 배송지 수정
	 * @param inputaddress
	 * @return return
	 */
	int updateAddress(Address inputaddress);

	
	// -------------------------------------------------------------------------- 
	

	/** 내 qna조회
	 * @param memberNo
	 * @return
	 */
	List<Qna> qnaList(Long memberNo);

	/** 답변 qna
	 * @param memberNo
	 * @return
	 */
	List<Qna> categoryAnsweredQna(Long memberNo);

	/** 검색어를 포함한 qna
	 * @param memberNo
	 * @param search
	 * @return
	 */
	List<Qna> searchQnaList(Map<String, String> qnaMap);



	
	
	/** 답변이 달린 qna
	 * @param memberNo
	 * @return
	 */
	List<Qna> answeredQna(Long memberNo);

	/** 검색어를 포함한 답변이 달린 qna
	 * @param qnaMap
	 * @return
	 */
	List<Qna> searchAnsweredQna(Map<String, String> qnaMap);


	/** 상품 번호로 상품 조회
	 * @param productNo
	 * @return product
	 */
	Product selectMyPageProduct(long productNo);


	/** 옵션 번호로 옵션 조회
	 * @param optionNo
	 * @return option
	 */
	Option selectMyPageProductOption(long optionNo);









	


	


















	
	
	
	
}
