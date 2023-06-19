-- 상품 샘플 데이터 삽입(관련 테이블 모두)

-- 상품 정보 등록
INSERT INTO `product`
VALUES(
	NULL,					-- product_no
	'[98project] 오키 썸머 에이드핑크 와이드팬츠 - 4 size', 			-- 상품 이름
	36000, 					-- 원가
	36000, 					-- 할인가
	0, 						-- 할인율
	360,					-- 구매시 적립 포인트
	default, 				-- 상품 상태(기본값: N-비공개)
	default, 				-- 상품 등록일
	DEFAULT					-- 조회수
);



-- 상품 번호 조회
SELECT max(`product`.product_no) from `product`;



-- 상품 옵션 등록
INSERT INTO `option` VALUES (NULL, 18, 'XS', '핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 18, 'S', '핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 18, 'M', '핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 18, 'L', '핑크', 10, '이천', 10);



-- 상품 썸네일 등록
INSERT INTO `product_img`
VALUES (
	NULL,	-- 이미지 번호(시퀀스)					
	18,		-- 상품 번호(외래키)
	'/images/prouduct/thumbnail/18.jpg', 	-- 이미지 경로
	'Y'		-- 썸네일 여부(O)
);


-- 상품 카테고리 등록
SELECT * FROM `parent_category_cd`;
insert into `product_category`
values(
	18,
	2,
	NULL
);

-- MD 추천 카테고리 등록
insert into `product_category`
values(
	18,
	8,
	NULL
);







-- 부모 카테고리 생성
insert into `parent_category_cd`
values(null, 'NEW');