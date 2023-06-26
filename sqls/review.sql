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

SELECT * FROM `review_img`; 
SELECT * FROM `review`; 
SELECT * FROM `review`; 
SELECT * FROM order_product op ; 
SELECT * FROM product JOIN product_img;
SELECT * FROM product_img;
COMMIT;
-- 샘플 추가
INSERT INTO `review` VALUES (DEFAULT, '이야 진짜 괜히 샀다', DEFAULT, 5, 2, 1, 38);
-- INSERT INTO `review` VALUES (DEFAULT, #{reviewContent}, DEFAULT, #{reviewScore}, #{orderNo}, #{productNo}, #{optionNo});

-- 리뷰 조회
SELECT DISTINCT  r.review_no, m.member_id, r.review_content, r.review_create_date, r.review_score, r.order_no, r.product_no, r.option_no, `count`, TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, (SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count FROM review r LEFT JOIN `order` o ON r.order_no =o.order_no LEFT JOIN `member` m ON o.member_no = m.member_no LEFT JOIN order_product op ON o.order_no=op.order_no ;
COMMIT;
SELECT * FROM `review` WHERE review_delete_fl='N' ORDER BY review_create_date DESC;

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
UPDATE `review`	SET review_content='리뷰내용 수정', review_score= 2.2 WHERE review_no = 28;


SELECT * FROM `order` r2 ;
SELECT * FROM `order_product` r2 ;
SELECT * FROM review r2 ;


-- 리뷰 없는 오더 리스트
SELECT  op.review_no,
		r.review_delete_fl,
		op.order_no,
	   op.product_no, 
	   op.option_no, 
	   (SELECT order_uno FROM `order`o WHERE member_no=2 AND op.order_no=o.order_no) order_uno,
	   op.count, 
	   TRUNCATE((SELECT AVG(review_score) FROM review r WHERE op.product_no =r.product_no),1) review_score_avg, 
	   (SELECT COUNT(*) FROM review r WHERE r.product_no=op.product_no) review_Count  
FROM `order_product` op LEFT JOIN `order` o ON op.order_no =o.order_no LEFT JOIN review r ON op.review_no=r.review_no
WHERE op.order_no=(SELECT so.order_no FROM `order` so WHERE member_no=2 AND op.order_no=so.order_no)
AND (r.review_delete_fl = 'y' OR op.review_no IS NULL) 
ORDER BY order_date DESC;
        
-- 내 리뷰 리스트 
        SELECT r.review_no, 
	           m.member_id, 
			   r.review_content, 
			   r.review_create_date, 
			   r.review_score, 
			   r.order_no, 
			   r.product_no, 
			   r.option_no, 
			   o.order_uno,
			   TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, 
			   (SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count  
		FROM review r LEFT JOIN order_product op ON r.review_no = op.review_no 
					  JOIN `order` o ON r.order_no = o.order_no 
					  JOIN `member`m ON o.member_no = m.member_no 
		WHERE o.member_no=2 AND r.review_delete_fl = 'n'
		ORDER BY o.order_date DESC

SELECT * FROM `order` r2 ;
SELECT * FROM `review` r2 ;
SELECT o.review_no, 
        m.member_id, 
		r.review_content, 
		r.review_create_date, 
		r.review_score, 
		r.order_no, 
		r.product_no, 
		r.option_no, 
		o.order_uno,
		TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, 
		(SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count  FROM review r LEFT JOIN `order` o ON r.review_no = o.review_no JOIN `member`m ON o.member_no = m.member_no ;

SELECT DISTINCT  r.review_no, 
        				 m.member_id, 
        				 r.review_content, 
        				 DATE_FORMAT(r.review_create_date, '%Y-%m-%d') AS review_create_date, 
        				 r.review_score, 
        				 r.order_no, 
        				 r.product_no, 
        				 r.option_no, 
        				 o.order_uno,
        				 op.count, 
        				 m.member_name,
        				 TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, 
        				 (SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count 
        FROM review r LEFT JOIN `order` o ON r.order_no =o.order_no 
        			  LEFT JOIN `member` m ON o.member_no = m.member_no 
        			  LEFT JOIN order_product op ON o.order_no=op.order_no
        WHERE r.review_no = 28;
        
SELECT * FROM `order` r WHERE member_no=3 ;
SELECT * FROM `review` r LEFT JOIN order_product op ON r.review_no=op.review_no ;
SELECT * FROM `review` r  ;
SELECT * FROM `order_product` WHERE order_no = 2 AND product_no =1 AND option_no =38 ;


SELECT op.order_no,
	   op.product_no, 
	   op.option_no, 
	   op.count, 
	   TRUNCATE((SELECT AVG(review_score) FROM review r WHERE op.product_no =r.product_no),1) review_score_avg, 
	   (SELECT COUNT(*) FROM review r WHERE r.product_no=op.product_no) review_Count  
FROM `order_product` op LEFT JOIN `order` o ON op.order_no =o.order_no 
WHERE op.order_no = 2 AND op.product_no =1 AND op.option_no =38;

SELECT review_no 
FROM review 
WHERE order_no = 51 AND product_no =1 AND option_no =48;

SELECT r.review_no, 
       m.member_id, 
	   r.review_content, 
	   r.review_create_date, 
	   r.review_score, 
	   r.order_no, 
	   r.product_no, 
	   r.option_no, 
	   o.order_uno,
	   TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, 
	   (SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count  
FROM review r LEFT JOIN order_product op ON r.review_no = op.review_no 
	   JOIN `order` o ON r.order_no = o.order_no 
	   JOIN `member`m ON o.member_no = m.member_no 
WHERE o.member_no=2;