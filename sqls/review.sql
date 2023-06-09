drop table if exists `review`;

create table `review` (
	`review_no`	bigint	not NULL primary key auto_increment	comment '후기 번호(seq_review_no)',
	`review_content`	varchar(2000)	not null	comment '후기 내용',
	`review_create_date`	datetime	null	comment '후기 작성 날짜',
	`review_score`	int	not null	default 0	comment '후기 별점 점수',
	`order_no`	bigint	not null	comment '주문 번호 시퀀스(seq_order_no)',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`option_no`	bigint	not null	comment 'seq_option_no'
);

alter table `review` add constraint `fk_order_product_to_review_1` foreign key (
	`order_no`
)
references `order_product` (
	`order_no`
);

alter table `review` add constraint `fk_order_product_to_review_2` foreign key (
	`product_no`
)
references `order_product` (
	`product_no`
);

alter table `review` add constraint `fk_order_product_to_review_3` foreign key (
	`option_no`
)
references `order_product` (
	`option_no`
);

