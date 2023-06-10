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

INSERT INTO `option` VALUES (NULL, 1, 'S', '아이보리', 15, '이천', 23);
INSERT INTO `option` VALUES (NULL, 1, 'M', '아이보리', 17, '이천', 15);
INSERT INTO `option` VALUES (NULL, 1, 'L', '아이보리', 19, '이천', 6);

INSERT INTO `option` VALUES (NULL, 1, 'S', '검정', 25, '이천', 3);
INSERT INTO `option` VALUES (NULL, 1, 'M', '검정', 27, '이천', 5);
INSERT INTO `option` VALUES (NULL, 1, 'L', '검정', 29, '이천', 6);

INSERT INTO `option` VALUES (NULL, 2, 'S', '검정', 5, '이천', 3);
INSERT INTO `option` VALUES (NULL, 2, 'M', '검정', 7, '이천', 15);
INSERT INTO `option` VALUES (NULL, 2, 'L', '검정', 9, '이천', 6);

INSERT INTO `option` VALUES (NULL, 2, 'S', '그린', 12, '이천', 13);
INSERT INTO `option` VALUES (NULL, 2, 'M', '그린', 11, '이천', 5);
INSERT INTO `option` VALUES (NULL, 2, 'L', '그린', 21, '이천', 26);

ROLLBACK;
COMMIT;