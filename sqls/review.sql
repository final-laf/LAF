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

-- 리뷰
SELECT * FROM review r LEFT JOIN `order` o ON r.order_no =o.order_no LEFT JOIN `member` m ON o.member_no = m.member_no;
SELECT * FROM `order`; 
SELECT * FROM `review_img`; 
SELECT * FROM `review`; 
SELECT * FROM order_product op ; 
SELECT * FROM product JOIN product_img;
SELECT * FROM product_img;

-- 샘플 추가
INSERT INTO `review` VALUES (DEFAULT, '이야 진짜 괜히 샀다', DEFAULT, 5, 2, 1, 38);

-- 리뷰 조회
SELECT DISTINCT  r.review_no, m.member_id, r.review_content, r.review_create_date, r.review_score, r.order_no, r.product_no, r.option_no, `count`, TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, (SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count FROM review r LEFT JOIN `order` o ON r.order_no =o.order_no LEFT JOIN `member` m ON o.member_no = m.member_no LEFT JOIN order_product op ON o.order_no=op.order_no ;
COMMIT;


-- 개별 리뷰 조회
-- SELECT DISTINCT  r.review_no, m.member_id, 
--         				 r.review_content, 
--         				 r.review_create_date, 
--         				 r.review_score, 
--         				 r.order_no, 
--         				 r.product_no, 
--         				 r.option_no, 
--         				 o.order_uno,
--         				 `count`, 
--         				 TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, 
--         				 (SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count 
--         FROM review r LEFT JOIN `order` o ON r.order_no =o.order_no 
--         			  LEFT JOIN `member` m ON o.member_no = m.member_no 
--         			  LEFT JOIN order_product op ON o.order_no=op.order_no
--         WHERE r.review_no = #{reviewNo}
        
        
--         
UPDATE `review`	SET review_content='리뷰내용 수정', review_score= 2.2 WHERE review_no = 28