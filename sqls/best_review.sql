CREATE TABLE `best_review` (
	`best_review_no`	bigint	NULL	COMMENT '베스트 후기 선택',
	`review_no`	bigint	NOT NULL	COMMENT '후기 번호(SEQ_REVIEW_NO)'
);

ALTER TABLE `best_review` ADD CONSTRAINT `pk_best_review` PRIMARY KEY (
	`best_review_no`,
	`review_no`
);

ALTER TABLE `best_review` ADD CONSTRAINT `fk_review_to_best_review` FOREIGN KEY (
	`review_no`
)
REFERENCES `review` (
	`review_no`
);

SELECT * FROM review;
SELECT * FROM review WHERE order_no=53 AND product_no=1 AND option_no=38;
        SELECT  r.review_no, 
				CASE
			        WHEN review_delete_fl  = 'Y' THEN '[[---]]'
			        ELSE member_id
			    END AS member_id, 
				DATE_FORMAT(r.review_create_date, '%Y-%m-%d') AS member_id, 
				m.member_no,
				r.review_content, 
				DATE_FORMAT(r.review_create_date, '%Y-%m-%d') AS review_create_date, 
				r.review_score, 
				r.order_no, 
				r.product_no, 
				r.option_no, 
				o.order_uno,
				m.member_name,
				TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE sr.review_delete_fl='N' AND r.product_no =sr.product_no),1) review_score_avg, 
				(SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count 
		FROM best_review br 
		 		LEFT JOIN review r ON br.review_no=r.review_no 
		 		JOIN `order` o ON r.order_no =o.order_no 
				JOIN `member` m ON o.member_no = m.member_no 
FROM best_review br 
 		LEFT JOIN review r ON br.review_no=r.review_no 
 		JOIN `order` o ON r.order_no =o.order_no 
		JOIN `member` m ON o.member_no = m.member_no;

COMMIT;
SELECT  r.review_no, 
		m.member_id, 
		m.member_no,
		r.review_content, 
		DATE_FORMAT(r.review_create_date, '%Y-%m-%d') AS review_create_date, 
		r.review_score, 
		r.order_no, 
		r.product_no, 
		r.option_no, 
		o.order_uno,
		m.member_name,
		TRUNCATE((SELECT AVG(review_score) FROM review sr WHERE r.product_no =sr.product_no),1) review_score_avg, 
		(SELECT COUNT(*) FROM review rc WHERE rc.product_no=r.product_no) review_Count 
FROM best_review br 
 		LEFT JOIN review r ON br.review_no=r.review_no 
 		JOIN `order` o ON r.order_no =o.order_no 
		JOIN `member` m ON o.member_no = m.member_no 
			  
			 
;
SELECT * FROM best_review br ORDER BY best_review_no ;
