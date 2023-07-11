package edu.kh.laf.common.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import edu.kh.laf.member.model.dto.Member;
import edu.kh.laf.order.model.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class OrderInterceptor implements HandlerInterceptor  {
	
	@Autowired
	private OrderService service;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String url = request.getRequestURI();
		String[] arr = url.split("/"); 
		
		if (arr[arr.length-1] != null) {
			int orderNo = 0;
			
			String num = arr[arr.length-1];
			orderNo = Integer.parseInt(num);
		
			HttpSession session = request.getSession();
			Member loginMember = (Member)session.getAttribute("loginMember");
			Object memberPhone = session.getAttribute("memberPhone");
			
			if(loginMember != null) { // 회원일때
				// 주문번호로 회원번호 조회
				long memberNo = service.selectCompletOrderNo(orderNo);
				if(loginMember.getMemberNo() == memberNo) {
					return HandlerInterceptor.super.preHandle(request, response, handler);
				}
			}
			if(memberPhone != null) {
				((HttpServletRequest) session).getSession().removeAttribute("memberPhone");
				return HandlerInterceptor.super.preHandle(request, response, handler);
			}
				
		}
		
		response.sendRedirect(request.getContextPath()+"/");
		return false;
	}
	
	
}
