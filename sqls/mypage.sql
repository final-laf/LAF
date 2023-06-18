
/* 멤버 등급 업데이트 */
UPDATE `member`
SET member_grade = 'G'
WHERE member_no  = 4;

SELECT * FROM `order`;

SELECT * FROM order_product;

/* 주문 샘플 삽입 */
INSERT INTO `order`
VALUES (NULL, 
		2, 
		'유저일', 
		'12041^^^경기도 의왕시 고천공업로 5^^^33-1', 
		'01012341234', 
		'부재시 경비실에', 
		18000, 
		18000, 
		default, 
		null, 
		null, 
		1, 
		1, 
		'유저일', 
		null, 
		'K', 
		null);


SELECT * FROM `member`;
SELECT * FROM `order`;	
COMMIT;
DELETE FROM `member` WHERE member_no = 44;

/* 해당 회원의 3개월 이내의 주문 조회 */
SELECT *  FROM `order` 
WHERE member_no = 2 
and (order_date BETWEEN  DATE_ADD(NOW(), INTERVAL -3 MONTH) AND NOW());



