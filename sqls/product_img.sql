drop table if exists `product_img`;

create table `product_img` (
	`img_no`	bigint	not null primary key auto_increment	comment '이미지 번호(seq_img_no)',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`img_path`	varchar(300)	not null	comment '이미지 주소',
	`img_thum`	char(1)	not null	default 'n'	comment 'y(썸네일), n(아님)'
);

alter table `product_img` add constraint `fk_product_to_product_img_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

