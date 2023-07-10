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
		
//		if (arr.length >= 3 && arr[1].equals("order") && !arr[2].isEmpty()) {
//      if( arr[1] == "order" && !arr[2].isEmpty()) {
		if (arr[1].equals("order")) {
			int orderNo = 0;
			try {
				String num = arr[arr.length-1];
				orderNo = Integer.parseInt(num);
			} catch (Exception e) {
				return HandlerInterceptor.super.preHandle(request, response, handler);
			}
			// 회원일때 
			HttpSession session = request.getSession();
			Member loginMember = (Member)session.getAttribute("loginMember");
			// 주문번호로 회원번호 조회
			long memberNo = service.selectCompletOrderNo(orderNo);
			if(loginMember == null) {
//			if(loginMember.getMemberNo().equals(memberNo)) {
				response.sendRedirect(request.getContextPath()+"/");
				return false;
			}
		}
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
	
}
