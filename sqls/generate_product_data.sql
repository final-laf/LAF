-- 상품 샘플 데이터 삽입(관련 테이블 모두)

-- 상품 정보 등록
INSERT INTO `product`
VALUES(
	NULL,					-- product_no
	'[98project/7천장돌파] 멜로우 스트라이프 카라 니트 - 3 color', 			-- 상품 이름
	34500, 					-- 원가
	34500, 					-- 할인가
	0, 						-- 할인율
	345,					-- 구매시 적립 포인트
	default, 				-- 상품 상태(기본값: N-비공개)
	default, 				-- 상품 등록일
	DEFAULT					-- 조회수
);


-- 상품 번호 조회
SELECT max(`product`.product_no) from `product`;



-- 상품 썸네일 등록
INSERT INTO `product_img`
VALUES (
	NULL,	-- 이미지 번호(시퀀스)					
	17,		-- 상품 번호(외래키)
	'/images/prouduct/thumbnail/17.gif', 	-- 이미지 경로
	'Y'		-- 썸네일 여부(O)
);



-- 상품 카테고리 등록
insert into `product_category`
values(
	17,
	1,
	NULL
);

-- MD 추천 카테고리 등록
insert into `product_category`
values(
	10,
	8,
	NULL
);



-- 부모 카테고리 생성
insert into `parent_category_cd`
values(null, 'NEW');