-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `product`;

create table `product` (
	`product_no`	bigint	PRIMARY KEY AUTO_INCREMENT not null	comment '상품 아이디(seq_product_no)',
	`product_name`	varchar(30)	not null	comment '상품 이름',
	`product_price`	bigint	not null	comment '상품 가격',
	`product_sale`	int	NOT NULL DEFAULT 0	comment '상품 할인률',
	`product_description`	varchar(50)	not null	comment '상품 설명',
	`product_state`	char(1)	not null	default 'n'	comment 'n:비공개, o:판매중, s:전체품절',
	`product_date`	datetime	not null	default current_timestamp	comment '상품 등록일',
	`click_count`	int	not null	default 0	comment '상품 조회수'
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 샘플 데이터 삽입

INSERT INTO `product`
VALUES(NULL, '상품 이름 샘플', 32000, default, '상품 설명 샘플(product_description)', default, default, default);

-- -------------------------------------------------------------------------------------------------------------------------- --