drop table if exists `option`;

create table `option` (
	`option_no`	bigint	PRIMARY KEY AUTO_INCREMENT not null	comment 'seq_option_no',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`size`	char(5)	null	comment '상품 사이즈',
	`color`	char(10)	null	comment '상품 컬러',
	`stock`	int	null	comment '상품 재고',
	`location`	char(100)	null	comment '상품 위치',
	`sell_count`	int	null	default 0	comment '판매량'
);

alter table `option` add constraint `fk_product_to_option_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

-- -------------------------------------------------------------------------
-- 샘플데이터
SELECT * FROM `option` ;
SELECT * FROM `product`;

INSERT INTO `option` VALUES (NULL, 1, 'XS', '블랙', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'S', '블랙', 0, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'M', '블랙', 0, '이천', 15);
INSERT INTO `option` VALUES (NULL, 1, 'L', '블랙', 0, '이천', 6);

INSERT INTO `option` VALUES (NULL, 1, 'XS', '차콜', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'S', '차콜', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'M', '차콜', 0, '이천', 15);
INSERT INTO `option` VALUES (NULL, 1, 'L', '차콜', 19, '이천', 6);

INSERT INTO `option` VALUES (NULL, 1, 'XS', '민트', 0, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'S', '민트', 20, '이천', 0);
INSERT INTO `option` VALUES (NULL, 1, 'M', '민트', 17, '이천', 0);
INSERT INTO `option` VALUES (NULL, 1, 'L', '민트', 19, '이천', 6);

INSERT INTO `option` VALUES (NULL, 1, 'XS', '다크네이비', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'S', '다크네이비', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'M', '다크네이비', 20, '이천', 0);
INSERT INTO `option` VALUES (NULL, 1, 'L', '다크네이비', 19, '이천', 6);

INSERT INTO `option` VALUES (NULL, 3, NULL, '레드', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 4, NULL, '오트밀', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 4, NULL, '그레이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 4, NULL, '네이비', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 6, 'FREE', '내추럴크림', 0, '이천', 20);
INSERT INTO `option` VALUES (NULL, 6, 'FREE', '네이비', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 7, NULL, '블랙', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '네이비', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '화이트', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '크리미민트', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '밀크초코', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '빈티지핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '스카이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 7, NULL, '버터크림', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 8, 'FREE', '스카이블루', 14, '이천', 1);
INSERT INTO `option` VALUES (NULL, 8, 'FREE', '블랙', 13, '이천', 2);

INSERT INTO `option` VALUES (NULL, 9, NULL, '핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 9, NULL, '스카이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 9, NULL, '브라운', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 10, NULL, '화이트', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '시트러스', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '밀크핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '딥핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '스카이블루', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '비비드불루', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '딥블루', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '올리브', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '타로라벤더', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '라이트그레이지', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 10, NULL, '다크네이비', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 11, NULL, '스카이블루', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 12, NULL, '핑크', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 12, NULL, '그린', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 12, NULL, '블루', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 13, NULL, '아이보리', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 13, NULL, '밀크베이지', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 13, NULL, '스카이블루', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 13, NULL, '라이트그린', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 13, NULL, '블랙', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 14, NULL, '아이보리', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 14, NULL, '스카이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 14, NULL, '퍼플', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 15, 'FREE', '중청', 14, '이천', 1);
INSERT INTO `option` VALUES (NULL, 15, 'FREE', '진청', 13, '이천', 2);

INSERT INTO `option` VALUES (NULL, 16, NULL, '크림', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 16, NULL, '스카이', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 16, NULL, '네이비', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 16, NULL, '레드', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 16, NULL, '그린', 10, '이천', 10);

INSERT INTO `option` VALUES (NULL, 17, NULL, '파스텔블루', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 17, NULL, '올리브카키', 10, '이천', 10);
INSERT INTO `option` VALUES (NULL, 17, NULL, '블랙', 10, '이천', 10);


COMMIT;

-- -------------------------------------------------------------------------

SELECT * FROM `option`;

SELECT * FROM cart WHERE member_no = 3;

SELECT * FROM `option` WHERE product_no = 2 AND option_no = 7;
ROLLBACK;
-- 상품재고업데이트
UPDATE `option` SET stock = stock - 1, sell_count = sell_count + 1 WHERE product_no = 2 AND option_no = 7;

SELECT stock FROM `option` WHERE product_no = 2;
SELECT sum(stock) FROM `option` WHERE product_no = 2;
