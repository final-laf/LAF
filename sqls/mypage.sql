
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
		93600, 
		93600, 
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

SELECT * from `order`;
SELECT * from `product`;
SELECT * from `option`;
SELECT * from `product_img`;
SELECT * from `order_product`; /* 주문번호, 상품번호, 옵션번호, 수량 */


/* 주문 상품 목록 샘플 삽입 */
/* 2번 주문, 1번 상품, 38번 옵션 */
INSERT INTO `order_product`
VALUES (2, 
		1, 
		38, 
		1);
	
/* 12번 주문, 2번 상품, 8번 옵션 1개, 9번 옵션 1개 */
INSERT INTO `order_product`
VALUES (12, 
		2, 
		8, 
		1);
INSERT INTO `order_product`
VALUES (12, 
		2, 
		9, 
		1);
	
commit;


SELECT * from `order`;

SELECT * from `order_product` where order_no = 12;

select * from `product` where product_no = 1;

select * from `option` where OPTION_NO = 8;

SELECT * from `member`;
COMMIT;
update `member`
SET member_birth = "20230101"
WHERE member_no = 2;

update `member`
SET member_birth = (SELECT STR_TO_DATE('20160501', '%Y%m%d') date_type FROM DUAL)
WHERE member_no = 2;

COMMIT;

	
SELECT STR_TO_DATE('2016-03-15 10:39:30', '%Y-%m-%d %H:%i:%s') date_type FROM DUAL;




/* 멤버 비밀번호 업데이트 */
UPDATE `member`
SET member_pw = '$2a$10$b31aOrHqrQQ2ThS/Avq2zelLtMg.SL.N5ncm3b2MOk3qiDcuuvGKy'
WHERE member_no  = 5;


COMMIT;


SELECT * FROM `coupon`;


/* 멤버 수로 쿠폰 수 조회 */
SELECT count(*) 
FROM `coupon`
WHERE member_no = 3
AND coupon_fl = 'N';

SELECT *
FROM `coupon` 
WHERE member_no = 3;



SELECT *
FROM `coupon` 
WHERE member_no = 3
ORDER BY coupon_due_date;


SELECT * FROM `address`;
/*배송지 추가*/
INSERT INTO `address` 
VALUES (null, 
		2, 
		"집", 
		"수신자", 
		"12041^^^경기도 의왕시 고천공업로 5^^^155-52", 
		"01043214321", 
		default);
	

















