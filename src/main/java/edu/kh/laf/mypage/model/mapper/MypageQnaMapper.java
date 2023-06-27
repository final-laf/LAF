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
public interface MypageQnaMapper {

	/** 특정 멤버 qna 리스트 count
	 * @param object
	 * @return
	 */
	int qnaListCount(Object object);

	/** 특정 멤버 qna 리스트
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Qna> qnaList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	










	


	


















	
	
	
	
}
