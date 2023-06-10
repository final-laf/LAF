-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `like`;

create table `like` (
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)'
);

alter table `like` add constraint `pk_like` primary key (
	`member_no`,
	`product_no`
);

alter table `like` add constraint `fk_member_to_like_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

alter table `like` add constraint `fk_product_to_like_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 샘플 데이터 삽입

INSERT INTO `like`
VALUES (
	1,	-- 회원 번호
	1 -- 상품 번호
)
;


