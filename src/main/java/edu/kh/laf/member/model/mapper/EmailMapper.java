package edu.kh.laf.member.model.mapper;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EmailMapper {

	@Autowired
    private SqlSessionTemplate sqlSession;

	public int updateAuthKey(Map<String, String> map) {
		return sqlSession.update("emailMapper.updateAuthKey", map);
	}

	public int insertAuthKey(Map<String, String> map) {
		return sqlSession.update("emailMapper.insertAuthKey", map);
	}

	public int checkAuthKey(Map<String, Object> paramMap) {
		return sqlSession.selectOne("emailMapper.checkAuthKey", paramMap);
	}
	
}
