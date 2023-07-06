SELECT * FROM `member`;


/* 멤버 선택 */
  SELECT   MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_GENDER, 
    	   MEMBER_AGE, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_BIRTH, MEMBER_GRADE,
    	   DATE_FORMAT(MEMBER_ENROLL_DATE, '%Y년%m월%d일') AS MEMBER_ENROLL_DATE,
    	   MEMBER_DEL_FL, 
    	   DATE_FORMAT(MEMBER_DEL_DATE, '%Y년%m월%d일') AS MEMBER_DEL_DATE,
    	   MEMBER_SOCIAL, MEMBER_POINT,
    	   MEMBER_TOTALPAY, MEMBER_NOT, REFUND_NAME, REFUND_BANK, REFUND_ACCOUNT
  FROM `member`
  WHERE MEMBER_DEL_FL = 'N'
  AND MEMBER_ID = 'admin';	
  
 
 /* admin 회원 선택 */
  SELECT   *
  FROM `member`
  WHERE MEMBER_DEL_FL = 'N'
  AND MEMBER_ID = 'admin';	
  
 
 /* member semple 입력(초기 member 설정값) */
 INSERT INTO `member` 
 VALUES (NULL, 'user01', 'pass01!', '유저일', NULL, NULL, 
 'user01@kh.or.kr', '01012341234', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, DEFAULT, DEFAULT, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user02', 'pass02!', '유저이', NULL, NULL, 
 'user02@kh.or.kr', '01043214321', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 2000, 35000, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user03', 'pass03!', '유저삼', NULL, NULL, 
 'user03@kh.or.kr', '01055558888', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 2000, 55000, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user04', 'pass04!', '유저사', NULL, NULL, 
 'user04@kh.or.kr', '01044444444', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 5000, 90000, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user05', 'pass05!', '유저오', NULL, NULL, 
 'user05@kh.or.kr', '01055555555', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 2000, DEFAULT, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user06', 'pass06!', '유저육', NULL, NULL, 
 'user06@kh.or.kr', '01066666666', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 10000, 125000, DEFAULT, NULL, NULL, NULL);

COMMIT;
 
/*회원 insert */
INSERT INTO `member`
VALUES (NULL, 
		'user06', 
		'pass06!', 
		'유저육', 
		NULL, 
		NULL,
		'user06@kh.or.kr', 
		'01066666666', 
		NULL, 
		2, 
		DEFAULT, 
		DEFAULT, 
		NULL, 
		NULL, 
		10000, 
		125000, 
		DEFAULT, 
		NULL, 
		NULL, 
		NULL);


INSERT INTO `member`
VALUES (NULL, 
		'datetest1', 
		'datetest1', 
		'datetest1', 
		NULL, 
		NULL,
		'datetest1@kh.or.kr', 
		01044386606, 
		20230101, 
		'NULL', 
		'B', 
		DEFAULT, 
		DEFAULT, 
		NULL, 
		NULL, 
		10000, 
		125000, 
		DEFAULT, 
		NULL, 
		NULL, 
		NULL);



/* 멤버 테이블 선택 */	
SELECT * FROM `member`;

/* 해당 회원 검색 */	
SELECT COUNT(*) FROM `member`
		WHERE member_id  = 'user01'
		AND member_del_fl  = 'N';


/* confirm_email 테이블 생성 */
DROP TABLE IF EXISTS `confirm_email`;

CREATE TABLE `confirm_email` (
	`authority_key_no`	bigint	NOT NULL	PRIMARY KEY AUTO_INCREMENT	COMMENT '인증 키 번호',
	`authority_key`	char(6)	NOT NULL	COMMENT '인증 키',
	`authority_email`	varchar(30)	NOT NULL	COMMENT '인증 이메일',
	`authority_time`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '인증 날짜(시간)'
);


SELECT * FROM `member`;

/* member 삭제 */
DELETE FROM `member` WHERE member_no = 32;

COMMIT;

/* authority key 삽입 */
INSERT INTO `confirm_email`
VALUES (null, 'ABJ135', 'user01@kh.or.kr', default);


/* authority key 업데이트 */
UPDATE `confirm_email`
SET authority_key = 152444,
	authority_time = datetime
WHERE authority_email = 'user01@kh.or.kr';


/* 컬럼 삭제 */
ALTER TABLE `member` DROP `member_age`;

/* refund_bank 일괄 수정 */
UPDATE `member` SET refund_bank = '1';

/* 회원번호 일괄 수정 */
UPDATE `member` SET member_grade= 'B';

UPDATE `member` SET member_grade = 'A'
WHERE member_no = 1;


/* 비회원 샘플 삽입 */
INSERT INTO `member`
VALUES (NULL, 
		'nonmember5', 
		'nonmember5', 
		'nonmember5', 
		NULL, 
		'nonmember5@sample.com', 
		00000000000, 
		NULL, 
		'nonAddress', 
		'B', 
		DEFAULT, 
		DEFAULT, 
		NULL, 
		NULL, 
		default, 
		default, 
		DEFAULT, 
		NULL, 
		NULL, 
		NULL);

SELECT * FROM `member`;	

COMMIT;

DELETE FROM `member` WHERE member_no = 45;



/* 멤버 비밀번호 업데이트 */
UPDATE `member`
SET member_not = 'Y'
WHERE member_no  = 38;


COMMIT;
SELECT * FROM `point`;
SELECT * FROM `point`;
SELECT * FROM `order`;

SELECT point_no , p.member_no , point_sort , point_amount , point_date , point_content , order_no , order_uno 
FROM `point` p 
LEFT JOIN `order` USING (order_no)
WHERE p.member_no = 3
;


SELECT point_sort, SUM(point_amount) point_sum
FROM `point` 
GROUP BY point_sort ;



SELECT sum(point_amount) accumulatedPoint
FROM `point`p 
LEFT JOIN `order` 
USING (order_no)
WHERE p.member_no = 3 AND point_sort = 'G';

;

SELECT * FROM `member` WHERE member_no = 3;
UPDATE `member` SET member_email = 'summerzommer@gmail.com' WHERE member_no = 72;
COMMIT;

SELECT * FROM `member`;

 DELETE FROM `member` WHERE member_no = 72;
COMMIT;


SELECT * FROM `order`;



SELECT order_no
FROM `order` 
LEFT JOIN `member` USING (member_no)
WHERE member_phone = '01043214321'
AND order_uno = '230621-3-VRZI2P'
;



UPDATE `member`
SET member_no = DEFAULT 
WHERE member_no = 2;

SELECT * FROM `member`
WHERE member_not = "N"
;



		SELECT `product`.product_no,
				product_name,
				product_price,
				product_sale_price,
				product_sale,
				product_point,
				product_state,
				DATE_FORMAT(product_date, '%Y-%m-%d') AS product_date,
				product_date as product_date_for_ordering,
				sale_sum as sales,
				stock,
				img_path AS thumbnail_path
		FROM   `product`
				join `product_img` on `product`.product_no = `product_img`.product_no
				join (select sum(sell_count) sale_sum, sum(stock) stock, product_no from `option` group by product_no) as `sales` on `product`.product_no = `sales`.product_no
				<if test="pc != null or cc != null">join `product_category` on `product`.product_no = `product_category`.product_no</if>
				<if test="pc != null">join `parent_category_cd` on `product_category`.parent_category_no = `parent_category_cd`.parent_category_no</if>
				<if test="cc != null">join `child_category_cd` on `product_category`.child_category_no = `child_category_cd`.child_category_no</if>
		where 1=1
			<if test="query != null and qk == null">and (product_name like '%$'셔츠'%' or `product`.product_no like '%$'2'%')</if>
			<if test="query != null and qk != null and qk.equals('name')">and product_name like '%${query}%'</if>
			<if test="query != null and qk != null and qk.equals('no')">and `product`.product_no like '%${query}%'</if>
			<if test="state != null">
				<foreach collection="state" item="s" open="and (" close=")" separator="or">
					product_state = #{s}
				</foreach>
			</if>
			<if test="pc != null">and `product_category`.parent_category_no = #{pc}</if>
			<if test="cc != null">and `product_category`.child_category_no = #{cc}</if>
		ORDER BY 
			<if test='ordering == null or ordering.isEmpty() or ordering.equals("new")'>product_date_for_ordering desc</if>
			<if test='ordering != null and ordering.equals("old")'>product_date_for_ordering</if>
			<if test='ordering != null and ordering.equals("name")'>product_name asc</if>
			<if test='ordering != null and ordering.equals("sales")'>sales desc</if>
			<if test='ordering != null and ordering.equals("stock")'>stock</if>;
			
			

SELECT * FROM `member`;


SELECT member_no, member_id, member_name, member_email, member_grade, member_del_fl, member_point, member_enroll_date 
FROM `member`
WHERE member_not = "N"
<if test="qk != null and qk.equals('all')">AND (member_name LIKE '%${query}%' OR member_id LIKE '%${query}%' OR member_email LIKE '%${query}%') </if>
<if test="qk != null and qk.equals('name')"> AND member_name LIKE '%${query}%' </if>
<if test="qk != null and qk.equals('id')"> AND member_id LIKE '%${query}%'</if>
<if test="qk != null and qk.equals('email')"> AND member_email LIKE '%${query}%' </if>
ORDER BY member_enroll_date DESC
;
			
SELECT member_no, member_name, member_social, DATE_FORMAT(member_enroll_date, "%Y-%m-%d") member_enroll_date, 
	   member_del_fl, member_grade, member_id, DATE_FORMAT(member_birth, "%Y-%m-%d") member_birth, member_address, address 
FROM `member` m
left JOIN `address` a USING (member_no)
WHERE member_no = 3;
AND address_default_fl = "Y";

SELECT * FROM address a ;
SELECT * FROM `member` WHERE member_not = "N";

COMMIT;

select count(*) 
FROM   `product`
		join `product_img` on `product`.product_no = `product_img`.product_no
		join (select sum(sell_count) sale_sum, sum(stock) stock, product_no from `option` group by product_no) as `sales` on `product`.product_no = `sales`.product_no
where 1=1;
			

SELECT member_id, member_name, DATE_FORMAT(member_enroll_date, "%Y-%m-%d") member_enroll_date
FROM `member`;

SELECT * FROM `address`
WHERE address_default_fl = "Y";
AND member_no = #{}
;




SELECT count(*) FROM `order` WHERE member_no = 3;

SELECT * FROM `order`;
SELECT * FROM `orderproduct`;

SELECT order_no, DATE_FORMAT(order_date, "%Y-%m-%d") order_date ,order_uno, order_total_price, order_payment, order_state
FROM `order` WHERE member_no = 3
;

SELECT order_no, DATE_FORMAT(order_date, "%Y-%m-%d") order_date ,order_uno, order_total_price, order_payment, order_state
FROM `order` WHERE member_no = 47;

SELECT order_no, DATE_FORMAT(order_date, "%Y-%m-%d") order_date ,order_uno, order_total_price, order_payment, order_state
FROM `order` WHERE member_no = 47;

SELECT order_no, (SELECT sum(count) FROM order_product WHERE order_no = 3 GROUP BY order_no) count, product_no, option_no
FROM order_product
WHERE order_no = 32;

SELECT * FROM `order_product` ;


SELECT *
FROM `order`
LEFT JOIN `order_product` USING (order_no)
WHERE product_no IS NULL;

DELETE m FROM `order` m WHERE m.order_no in (SELECT c.order_no
									  FROM `order` c
									  LEFT JOIN `order_product` USING (order_no)
									  WHERE product_no IS NULL); 
;

DELETE FROM `order`
WHERE order_no IN (
    SELECT order_no
    FROM (
        SELECT c.order_no
        FROM `order` c
        LEFT JOIN `order_product` USING (order_no)
        WHERE product_no IS NULL
    ) AS temp
);

COMMIT;

SELECT * FROM `point`;

select * from `point`;


insert into `point`
values 
		(null
		,'6'
		,'G'
		,'2000'
		,default
		,'20230729'
		,'특별 적립금'
		,null),
		
		(null
		,'6'
		,'G'
		,'3000'
		,default
		,'20230729'
		,'특별 적립금'
		,null),
		
		(null
		,'6'
		,'G'
		,'4000'
		,default
		,'20230729'
		,'특별 적립금'
		,null)
		
		;
	
	ROLLBACK;

COMMIT;

SELECT * FROM `point`;
SELECT * FROM `member`;
COMMIT;

UPDATE `member` SET member_grade= 'B';

COMMIT;



DELETE FROM `member` WHERE member_no = 78;
		

			