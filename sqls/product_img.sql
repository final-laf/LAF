-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `product_img`;

create table `product_img` (
	`img_no`	bigint	not null primary key auto_increment	comment '이미지 번호(seq_img_no)',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`img_path`	varchar(300)	not null	comment '이미지 주소',
	`thumb_fl`	char(1)	not null	default 'N'	comment 'Y(썸네일), N(아님)'
);

-- 외래키 참조

alter table `product_img` add constraint `fk_product_to_product_img_1` foreign key (`product_no`) references `product` (`product_no`);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 데이터 삽입

INSERT INTO `product_img`
VALUES (
	NULL,	-- 이미지 번호(시퀀스)					
	3,		-- 상품 번호(외래키)
	'/images/prouduct/thumbnail/3.gif', 	-- 이미지 경로
	'Y'		-- 썸네일 여부(O)
);

-- -------------------------------------------------------------------------------------------------------------------------- --

