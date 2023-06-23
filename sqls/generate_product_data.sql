-- 상품 샘플 데이터 삽입(관련 테이블 모두)

-- 상품 정보 등록
INSERT INTO `product`
VALUES(
	NULL,					-- product_no
	'테너 라이트 숏레인부츠 - 4 color', 			-- 상품 이름
	42000, 					-- 원가
	37800, 					-- 할인가
	10, 						-- 할인율
	378,					-- 구매시 적립 포인트
	'O', 				-- 상품 상태(기본값: N-비공개, O-판매중, S-품절)
	default, 				-- 상품 등록일
	DEFAULT					-- 조회수
);



-- 상품 번호 조회
SELECT max(`product`.product_no) from `product`;



-- 상품 옵션 등록				/	*상품번호 사이즈  컬러   재고  재고위치 판매량*/
INSERT INTO `option` VALUES (NULL, 23, NULL, '스카이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 23, NULL, '그레이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 21, NULL, '아이보리', 10, '이천', 10);
								
INSERT INTO `option` VALUES (NULL, 24, 'XS', '베이지', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'S', '베이지', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'M', '베이지', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'L', '베이지', 30, '광교', 0);

INSERT INTO `option` VALUES (NULL, 24, 'XS', '그린', 10, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'S', '그린', 10, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'M', '그린', 10, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'L', '그린', 10, '광교', 0);

INSERT INTO `option` VALUES (NULL, 24, 'XS', '언그레이', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'S', '언그레이', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'M', '언그레이', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'L', '언그레이', 30, '광교', 0);

INSERT INTO `option` VALUES (NULL, 24, 'XS', '블랙', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'S', '블랙', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'M', '블랙', 30, '광교', 0);
INSERT INTO `option` VALUES (NULL, 24, 'L', '블랙', 30, '광교', 0);

COMMIT;


-- 상품 썸네일 등록
INSERT INTO `product_img`
VALUES (
	NULL,	-- 이미지 번호(시퀀스)					
	24,		-- 상품 번호(외래키)
	'/images/prouduct/thumbnail/24.gif', 	-- 이미지 경로
	'Y'		-- 썸네일 여부(O)
);


-- 상품 카테고리 등록
SELECT * FROM `parent_category_cd`;
insert into `product_category`
values(
	24,
	9,
	NULL
);

-- MD 추천 카테고리 등록
insert into `product_category`
values(
	24,
	8,
	NULL
);

COMMIT;

-- 카테고리 확인
select * from `parent_category_cd`;

-- 부모 카테고리 생성
insert into `parent_category_cd`
values(null, 'NEW');