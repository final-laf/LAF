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

