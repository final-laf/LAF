package edu.kh.laf.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import jakarta.servlet.MultipartConfigElement;

@Configuration
@PropertySource("classpath:/db.properties")
public class FileUploadConfig implements WebMvcConfigurer  {

	// 파일을 hdd에 저장하기 전 임시로 가지고 있을 메모리 용량
	@Value("${spring.servlet.multipart.file-size-threshold}")
	private long fileSizeThreshold;
	
	// 파일 1개 크기 제한
	@Value("${spring.servlet.multipart.max-file-size}")
	private long maxFileSize;
	
	// 요청당 파일 크기 제한
	@Value("${spring.servlet.multipart.max-request-size}")
	private long maxRequestSize;
	
	@Bean // 개발자가 수동으로 Bean등록(생성은 개발자, 관리는 Spring)
	public MultipartConfigElement configElement() {
		
		MultipartConfigFactory factory = new MultipartConfigFactory();
		
		factory.setFileSizeThreshold(DataSize.ofBytes(fileSizeThreshold));
		factory.setMaxFileSize(DataSize.ofBytes(maxFileSize));
		factory.setMaxRequestSize(DataSize.ofBytes(maxRequestSize));
		
		return factory.createMultipartConfig();
	}
	
	@Bean
	public MultipartResolver multipartResolver() {
		// MultipartResolver : 파일은 파일로, 텍스트는 텍스트로 자동 구분
		
		return new StandardServletMultipartResolver();
	}
	
    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Bean
    public AmazonS3 amazonS3Client() {
    	AWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
    	
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withRegion(region)
                .build();
    }
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		  registry.addResourceHandler("/images/**")
          .addResourceLocations("https://laf-final-img.s3.ap-northeast-2.amazonaws.com/images/");
	}
	
	
}
