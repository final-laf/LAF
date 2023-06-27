drop table if exists `order_product`;

create table `order_product` (
	`order_no`	bigint	not null	comment '주문 번호 시퀀스(seq_order_no)',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`option_no`	bigint	not null	comment 'seq_option_no',
	`order_count`	int	not null	default 1	comment '주문 수량'
);

alter table `order_product` add constraint `pk_order_product` primary key (
	`order_no`,
	`product_no`,
	`option_no`
);

alter table `order_product` add constraint `fk_order_to_order_product_1` foreign key (
	`order_no`
)
references `order` (
	`order_no`
);

alter table `order_product` add constraint `fk_product_to_order_product_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

alter table `order_product` add constraint `fk_option_to_order_product_1` foreign key (
	`option_no`
)
references `option` (
	`option_no`
);

-- ---------------------------------------------------------------------------------------
ALTER TABLE `order_product` ADD `ORDER_PRODUCT_DELETE_FL`	CHAR(1) NOT NULL	DEFAULT 'N'	COMMENT 'Y(삭제됨), N(삭제안됨)';
SELECT * FROM order_product ;

SELECT order_no, 
		(SELECT sum(count) FROM order_product WHERE order_no = 46 GROUP BY order_no) count,
		product_no,
		option_no
FROM order_product op
WHERE order_no = 46 LIMIT 1;


SELECT product_no FROM order_product WHERE order_no = 30 LIMIT 1;  
SELECT option_no FROM order_product WHERE order_no = 30 LIMIT 1;

SELECT * FROM product WHERE product_no = (SELECT product_no FROM order_product WHERE order_no = 30 LIMIT 1);
SELECT * FROM product WHERE product_no = (SELECT option_no FROM order_product WHERE order_no = 30 LIMIT 1);

SELECT * FROM `order` ORDER BY order_no DESC;
SELECT member_grade FROM `member` WHERE member_no = 3
ORDER BY order_no DESC;

COMMIT;

UPDATE `member`
SET member_grade = 'G'
WHERE member_no = 3;

SELECT * FROM `point` ORDER BY point_no DESC;