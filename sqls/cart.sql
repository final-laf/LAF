drop table if exists `cart`;

create table `cart` (
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`option_no`	bigint	not null	comment 'seq_option_no',
	`option_amount`	int(100)	not null	default 1	comment '상품 수량'
);

alter table `cart` add constraint `pk_cart` primary key (
	`product_no`,
	`member_no`,
	`option_no`
);

alter table `cart` add constraint `fk_product_to_cart_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

alter table `cart` add constraint `fk_member_to_cart_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

alter table `cart` add constraint `fk_option_to_cart_1` foreign key (
	`option_no`
)
references `option` (
	`option_no`
);

