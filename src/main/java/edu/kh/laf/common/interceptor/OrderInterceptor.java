package edu.kh.laf.common.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import edu.kh.laf.member.model.dto.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class OrderInterceptor implements HandlerInterceptor  {

//	
//	
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//
//		String url = request.getRequestURI();
//		
//		String[] arr = url.split("/"); 
//		
//		if( arr[1] == "order" && !arr[2].isEmpty()) {
//			
//			String num = arr[arr.length-1];
//			
//			int orderNo = 0;
//			
//			try {
//				orderNo = Integer.parseInt(num);
//			} catch (Exception e) {
//				return HandlerInterceptor.super.preHandle(request, response, handler);
//			}
//			
//			HttpSession session = request.getSession();
//			
//			Member loginMember = (Member)session.getAttribute("loginMember");
//			
//			
//		}
//		
//		
//		
//		return HandlerInterceptor.super.preHandle(request, response, handler);
//	}
//	
	
}
