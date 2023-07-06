package edu.kh.laf.member.model.dto;

import jakarta.annotation.Generated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SocialLoginProfile {
	public Long id;
	public String connected_at;
	public Properties properties;
	public KakaoAccount  kakao_account;

	@Getter
	@Setter
	@ToString
	public class Properties {
		public String nickname;
	}

	@Getter
	@Setter
	@ToString
	public class KakaoAccount {
		public Boolean profile_nickname_needs_agreement;
		public Profile profile;
		public Boolean has_email;
		public Boolean email_needs_agreement;
		public Boolean is_email_valid;
		public Boolean is_email_verified;
		public String email;

		@Getter
		@Setter
		@ToString
		public class Profile {
			public String nickname;
		}

	}

}
