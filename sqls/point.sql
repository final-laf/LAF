-- ------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성 

drop table if exists `point`;

create table `point` (
	`point_no`	bigint	not null	primary key AUTO_INCREMENT comment '적립 번호(seq_point_no)',
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`point_sort`	char(1)	not null	comment 'g(적립), u(사용)',
	`point_amount`	bigint	not null	default 0	comment '적립금 사용액',
	`point_get_date`	datetime	null	comment '적립금 적립일',
	`point_due_date`	datetime	not null	comment '적립금 만료일',
	`point_use_date`	datetime	null	comment '적립금 사용일',
	`point_content`	varchar(600)	null	comment '적립/사용 사유',
	`order_no`	bigint	null	comment '적립금 사용 주문',
	`option_no`	bigint	not null	comment 'seq_option_no'
);

-- 외래키 제약조건

alter table `point` add constraint `fk_member_to_point` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

alter table `point` add constraint `fk_order_to_point` foreign key (
	`order_no`
)
references `order` (
	`order_no`
);

alter table `point` add constraint `fk_option_to_point` foreign key (
	`order_no`
)
references `option` (
	`option_no`
);

-- ------------------------------------------------------------------------------------------------------------- --

SELECT * FROM `member`;
SELECT * FROM `point`;
-- 포인트 적립시
INSERT INTO `point`
VALUES(NULL, 3, 'U', 300, NULL, NULL,23-06-06, '상품구매시 사용한 적립금', NULL,NULL);

-- 포인트 사용시
INSERT INTO `point`
VALUES(NULL, 3, 'U', 300, NULL, NULL,23-06-06, '상품구매시 사용한 적립금', NULL,NULL);

DELETE FROM `point` WHERE point_no = 2;

COMMIT;

SELECT point_amount FROM `point` WHERE point_no = 4;






