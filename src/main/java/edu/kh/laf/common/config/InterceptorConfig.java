package edu.kh.laf.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edu.kh.laf.common.interceptor.CategoryInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
	
	@Bean
	public CategoryInterceptor CategoryInterceptor() {
		return new CategoryInterceptor();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor(CategoryInterceptor())
			.addPathPatterns("/**") // 가로챌 경로 지정(여러개 작성 시 ,로 구분)
			.excludePathPatterns("/css/**", "/js/**", "/images/**"); // 예외 경로 지정
		
	}
	
}
