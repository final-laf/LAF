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

INSERT INTO `option` VALUES (NULL, 1, 'XS', '아이보리', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'S', '아이보리', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'M', '아이보리', 17, '이천', 15);
INSERT INTO `option` VALUES (NULL, 1, 'L', '아이보리', 19, '이천', 6);

ROLLBACK;
COMMIT;

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

COMMIT;