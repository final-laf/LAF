-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `product`;

create table `product` (
	`product_no`	bigint	PRIMARY KEY AUTO_INCREMENT not null	comment '상품 아이디(seq_product_no)',
	`product_name`	varchar(300)	not null	comment '상품 이름',
	`product_price`	bigint	not null	comment '상품 가격',
	`product_sale`	int	NOT NULL DEFAULT 0	comment '상품 할인률',
	`product_state`	char(1)	not null	default 'N'	comment 'N:비공개, O:판매중, S:전체품절',
	`product_date`	datetime	not null	default current_timestamp	comment '상품 등록일',
	`click_count`	int	not null	default 0	comment '상품 조회수'
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 샘플 데이터 삽입

INSERT INTO `product`
VALUES(
	NULL,					-- product_no
	'상품 이름 샘플', 			-- 상품 이름
	32000, 					-- 상품 가격
	default, 				-- 상품 할인율
	default, 				-- 상품 상태(기본값: N-비공개)
	default, 				-- 상품 등록일
	DEFAULT					-- 조회수
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 상품 정보 조회
SELECT `product`.product_no,
		product_name,
		product_price,
		product_sale,
		product_state,
		DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
		click_count,
		img_path AS thumbnail_path
FROM   `product`
		JOIN `product_img` ON `product`.product_no = `product_img`.product_no
WHERE  `product`.product_no = 1
		AND img_thumb = 'Y'
		
;