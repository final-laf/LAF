package edu.kh.laf.mypage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.member.model.dto.Address;
import edu.kh.laf.member.model.dto.Member;
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
	
	
	/** 주문번호로 order_product 테이블에서 해당 상품 조회
	 * @param orderNo
	 * @return myPageOrderProductList
	 */
	List<OrderProduct> selectMyPageOrderProductList(long orderNo);

	
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

	/** 배송지정보조회
	 * @param memberNo
	 * @return
	 */
	List<Address> selectAddressList(Long memberNo);

	
	
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
