drop table if exists `coupon`;

create table `coupon` (
	`coupon_no`	bigint	not null	primary key AUTO_INCREMENT comment '쿠폰 번호(seq_coupon_no)',
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`coupon_name`	varchar(1000)	null	comment '쿠폰명',
	`coupon_get_date`	datetime	not null	default current_timestamp	comment '쿠폰 발긃일',
	`coupon_due_date`	datetime	not null	comment '쿠폰 만료일(무제한:9999-12-31)',
	`coupon_amount`	bigint	null	comment '할인율/할인액',
	`coupon_unit`	char(1)	null	comment 'p(퍼센트), m(금액)',
	`coupon_max_discount`	bigint	null	comment '최대할인금액',
	`coupon_condition`	bigint	null	comment '사용조건금액',
	`coupon_fl`	char(1)	not null	default 'n'	comment 'n(사용전), y(사용후)'
);

alter table `coupon` add constraint `fk_member_to_coupon_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);
