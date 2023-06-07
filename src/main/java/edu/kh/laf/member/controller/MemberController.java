package edu.kh.laf.member.controller;

import edu.kh.laf.member.model.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("/")
    public String home(String memberId, String memberPw, Model model) {
        return "main";
    }
    
    @GetMapping("shopping/product")
    public String test(String memberId, String memberPw, Model model) {
        return "shopping/product";
    }
}