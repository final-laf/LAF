package edu.kh.laf.common.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import edu.kh.laf.common.filter.AdminFilter;
import edu.kh.laf.common.filter.LoginFilter;

@Configuration
public class FilterConfig {
	
	// 로그인 필터
	@Bean
	public FilterRegistrationBean<LoginFilter> loginFilter() {
		
		FilterRegistrationBean<LoginFilter> resiRegistrationBean = new FilterRegistrationBean<LoginFilter>();
		resiRegistrationBean.setFilter(new LoginFilter());
		
		// 개발 간 관리자 필터 해제
//		String[] url = { "/myPage/*", "/admin/*" };
		String[] url = { "/myPage/*" };
		resiRegistrationBean.setUrlPatterns(Arrays.asList(url));
		resiRegistrationBean.setName("loginFilter");
		resiRegistrationBean.setOrder(3);
		return resiRegistrationBean;
	}
	
	// 관리자기능 접근 제한 필터
	@Bean
	public FilterRegistrationBean<AdminFilter> adminFilter() {
		
		FilterRegistrationBean<AdminFilter> resiRegistrationBean = new FilterRegistrationBean<AdminFilter>();
		resiRegistrationBean.setFilter(new AdminFilter());
		
		String[] url = { "/admin/*" };
		resiRegistrationBean.setUrlPatterns(Arrays.asList(url));
		resiRegistrationBean.setName("adminFilter");
		resiRegistrationBean.setOrder(4);
		return resiRegistrationBean;
	}
	
}
