-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `product`;

create table `product` (
	`product_no`	bigint	PRIMARY KEY AUTO_INCREMENT not null	comment '상품 아이디(seq_product_no)',
	`product_name`	varchar(300)	not null	comment '상품 이름',
	`product_price`	bigint	not null	comment '원가',
	`product_sale_price`	bigint	not null	comment '할인가',
	`product_sale`	int	NOT NULL DEFAULT 0	comment '할인율',
	`product_point` int comment '상품 구매시 적립금',
	`product_state`	char(1)	not null	default 'N'	comment 'N:비공개, O:판매중, S:전체품절',
	`product_date`	datetime	not null	default current_timestamp	comment '상품 등록일',
	`click_count`	int	not null	default 0	comment '상품 조회수'
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 샘플 데이터 삽입

INSERT INTO `product`
VALUES(
	NULL,					-- product_no
	'앤더슨 1997 자수 맨투맨 - 3 color', 			-- 상품 이름
	25000, 					-- 원가
	25000, 					-- 할인가
	0, 						-- 할인율
	250,					-- 적립금
	default, 				-- 상품 상태(기본값: N-비공개)
	default, 				-- 상품 등록일
	DEFAULT					-- 조회수
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 상품 정보 조회(상품 번호 검색)
SELECT `product`.product_no,
		product_name,
		product_price,
		product_sale_price,
		product_sale,
		product_point,
		product_state,
		DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
		click_count,
		img_path AS thumbnail_path,
		(select count(*) from `like` where  `product`.product_no = `like`.product_no) AS like_count
FROM   `product`
		JOIN `product_img` ON `product`.product_no = `product_img`.product_no
WHERE  `product`.product_no = 1
		AND thumb_fl  = 'Y'
;

-- -------------------------------------------------------------------------------------------------------------------------- --

-- MD추천 카테고리 상품목록 조회 (1 : 단순 join)
-- 양이 많아졌을 때 뭐가 더 빠를지 모르겠다.

SELECT `product`.product_no,
		product_name,
		product_price,
		product_sale_price,
		product_sale,
		product_point,
		product_state,
		DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
		click_count,
		img_path AS thumbnail_path,
		(SELECT count(*) FROM `like` WHERE  `product`.product_no = `like`.product_no) AS like_count,
		(SELECT count(*) FROM `review` WHERE  `product`.product_no = `review`.product_no) AS review_count
FROM   `product`
		JOIN `product_img` ON `product`.product_no = `product_img`.product_no
		JOIN `product_category` ON `product`.product_no = `product_category`.product_no
WHERE  thumb_fl  = 'Y' -- 썸네일 반드시 필요
		AND parent_category_no = 8
;

-- MD추천 카테고리 상품목록 조회 (2: 어쩌구 뷰)

SELECT `product`.product_no,
		product_name,
		product_price,
		product_sale_price,
		product_sale,
		product_point,
		product_state,
		DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
		click_count,
		img_path AS thumbnail_path,
		(SELECT count(*) FROM `like` WHERE  `product`.product_no = `like`.product_no) AS like_count,
		(SELECT count(*) FROM `review` WHERE  `product`.product_no = `review`.product_no) AS review_count
FROM (
	SELECT * FROM `product` WHERE product_no IN (
		SELECT product_no
		FROM `product_category`
		WHERE parent_category_no = 8
	)) AS  `product`
JOIN `product_img` ON `product`.product_no = `product_img`.product_no
WHERE  thumb_fl  = 'Y' -- 썸네일 반드시 필요
;

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 카테고리별 주간 판매량 순위
-- 아직 오더 테이블이 안됐으니까.. 조회순으로 하자

SELECT `product`.product_no,
		product_name,
		product_price,
		product_sale_price,
		product_sale,
		product_point,
		product_state,
		DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
		click_count,
		img_path AS thumbnail_path,
		(SELECT count(*) FROM `like` WHERE  `product`.product_no = `like`.product_no) AS like_count,
		(SELECT count(*) FROM `review` WHERE  `product`.product_no = `review`.product_no) AS review_count
FROM   `product`
		JOIN `product_img` ON `product`.product_no = `product_img`.product_no
		JOIN `product_category` ON `product`.product_no = `product_category`.product_no
WHERE  thumb_fl  = 'Y' -- 썸네일 반드시 필요
		AND parent_category_no = 1
ORDER BY click_count asc, product_sale_price desc
LIMIT 7
;


ALTER TABLE laf.product ADD product_point int(11) NULL;

COMMIT;



-- 검색
SELECT `product`.product_no,
			   `product`.product_name,
			   `product`.product_price,
			   `product`.product_sale_price,
			   `product`.product_sale,
			   `product`.product_point,
			   `product`.product_state,
				DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
				product_date AS product_date_for_ordering,
				click_count,
				img_path AS thumbnail_path,
				(SELECT count(*) FROM `like` WHERE  `product`.product_no = `like`.product_no) AS like_count_for_ordering,
				(SELECT count(*) FROM `review` WHERE  `product`.product_no = `review`.product_no) AS review_count
		FROM   `product`
				JOIN `product_img` ON `product`.product_no = `product_img`.product_no
		ORDER BY 
				(click_count + like_count_for_ordering + review_count) desc

	
-- product_state 일괄 갱신
update product set product_state = 'O';



-- TOP 베스트상품 검색
SELECT `product`.product_no,
				product_name,
				product_price,
				product_sale_price,
				product_sale,
				product_point,
				product_state,
				DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
				click_count,
				img_path AS thumbnail_path,
				(SELECT count(*) FROM `like` WHERE  `product`.product_no = `like`.product_no) AS like_count,
				(SELECT count(*) FROM `review` WHERE  `product`.product_no = `review`.product_no) AS review_count
		FROM   `product`
				JOIN `product_img` ON `product`.product_no = `product_img`.product_no
				JOIN `product_category` ON `product`.product_no = `product_category`.product_no
		WHERE  thumb_fl  = 'Y' -- 썸네일 반드시 필요
				AND parent_category_no = 1
				and product_state = 'O' -- 판매중
		ORDER BY click_count asc, product_sale_price desc
		LIMIT 20