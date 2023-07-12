package edu.kh.laf.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.laf.member.model.service.EmailService;

@Controller
@RequestMapping("/sendEmail")
@SessionAttributes("authKey")
public class EmailController {

    @Autowired
    private EmailService service;
    
    // 회원가입 인증 메일 전송
    @GetMapping("/signUp")
    @ResponseBody
    public int signUp(String memberEmail) {
        return service.signUp(memberEmail, "회원 가입");
    }
    
    
    // 회원가입 인증 번호 확인
    @GetMapping("/checkAuthKey")
    @ResponseBody
    public int checkAuthKey(@RequestParam Map<String, Object> paramMap){
        return service.checkAuthKey(paramMap);
    }
	
}
