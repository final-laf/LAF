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

