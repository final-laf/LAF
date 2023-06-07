package edu.kh.laf.member.model.service;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.member.model.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberMapper mapper;

    public Member getMember(Long id) {
        return mapper.selectMember(id);
    }
}
