-- ------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성 

drop table if exists `order`;

create table `order` (
	`order_no`	bigint	PRIMARY KEY auto_incrementnot null	comment '주문 번호 시퀀스(seq_order_no)',
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`order_res_name`	varchar(20)	not null	comment '받는 사람 이름',
	`order_res_add`	varchar(1000)	not null	comment '받는 사람 주소',
	`order_res_phone`	char(11)	not null	comment '받는 사람 전화번호',
	`order_resp_require`	varchar(300)	null	comment '주문 배송 요청 사항',
	`order_total_price`	bigint	not null	default 0	comment '주문 총 가격',
	`order_payment`	bigint	not null	comment '결제 총 가격',
	`order_date`	datetime	not null	default current_timestamp	comment '주문 날짜',
	`point_no_gain`	bigint	null	comment '적립 번호(seq_point_no)',
	`point_no_use`	bigint	null	comment '적립 번호(seq_point_no)',
	`payment`	char(1)	not null	comment '1(무통장입금), 2(페이팔)',
	`payment_bank`	varchar(50)	null	comment '1(국민은행), 2(농협), 3(우리은행)',
	`payment_name`	varchar(50)	null,
	`review_no`	bigint	null	comment '후기 번호(seq_review_no)',
	`order_state`	char(1)	not null	default '1'	comment '오른쪽 참조',
	`coupon_no`	bigint	not null	comment '쿠폰 번호(seq_coupon_no)'
);

-- 외래키 제약조건

alter table `order` add constraint `pk_order` primary key (
	`order_no`
);

alter table `order` add constraint `fk_member_to_order_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

alter table `order` add constraint `fk_point_to_order_1` foreign key (
	`point_no_gain`
)
references `point` (
	`point_no`
);

alter table `order` add constraint `fk_point_to_order_2` foreign key (
	`point_no_use`
)
references `point` (
	`point_no`
);

alter table `order` add constraint `fk_review_to_order_1` foreign key (
	`review_no`
)
references `review` (
	`review_no`
);

alter table `order` add constraint `fk_coupon_to_order_1` foreign key (
	`coupon_no`
)
references `coupon` (
	`coupon_no`
);

-- ------------------------------------------------------------------------------------------------------------- --

-- 주문자 조회
SELECT * FROM `member` WHERE member_no=1;

-- 상품조회
SELECT product_name, product_price, product_sale_price , i.img_path  
FROM product as p
JOIN product_img as i ON p.product_no = i.product_no 
WHERE thumb_fl = 'Y' 
AND p.product_no = 2;

-- 옵션조회
SELECT `size` , color 
FROM `option`
WHERE product_no = 1
AND option_no = 2;
 
COMMIT;

SELECT * FROM `member`;
UPDATE `member` SET refund_bank = NULL WHERE member_no in (11, 12, 14,15,31,32);

SELECT * FROM address;
UPDATE `address` SET address = '12008^^^서울 강남구 테헤란로98길 8^^^언덕위에빌딩' WHERE address_no = 3;

SELECT * FROM coupon;
INSERT INTO coupon VALUES (NULL,3,'5,000원 할인', '2023-05-01', '2055-05-01', 5000, 'm','50000',NULL,'n');

