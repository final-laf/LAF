
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
/* 내가 가져와야 할 형태 */
/* 주문번호, 주문일자, 대표 상품 이미지, 대표 상품 이름, 대표 상품 옵션, 전체 상품 개수, 전체 상품 구문 금액(할인 전, 할인 후), 주문처리상태 */
/* 로그인멤버의 주문을 받아 와 리스트형식으로, 그 주문별로 일치하는 오더프로덕트를 조회 해 와 리스트형으로, 맵 형식으로 각 주문과 각 리스트를 매핑? */

SELECT * from `order_product` where order_no = 12;

select * from `product` where product_no = 1;

select * from `option` where OPTION_NO = 8;

