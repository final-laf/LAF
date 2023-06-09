package edu.kh.laf.member.model.mapper;

import edu.kh.laf.member.model.dto.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
	
	
    Member selectMember(long id);
    
	/** 로그인
	 * @param inputMember
	 * @return 
	 */
	Member login(Member inputMember);
}
