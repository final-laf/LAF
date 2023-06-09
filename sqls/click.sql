drop table if exists `click`;

create table `click` (
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`click_date`	datetime	not null	default current_timestamp	comment '조회일'
);

alter table `click` add constraint `pk_click` primary key (
	`member_no`,
	`product_no`
);

alter table `click` add constraint `fk_member_to_click_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

alter table `click` add constraint `fk_product_to_click_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

