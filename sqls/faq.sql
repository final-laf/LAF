drop table if exists `faq`;

create table `faq` (
	`faq_no`	bigint	not null	primary key AUTO_INCREMENT comment 'seq_faq_no',
	`faq_title`	varchar(300)	null	comment '제목',
	`faq_content`	text	null	comment '내용',
	`faq_category`	char(1)	null	comment '1(상품), 2(배송), 3(교환반품), 4(기타)',
	`faq_order`	int	null
);


