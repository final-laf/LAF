DROP TABLE `qna`; 

create table `qna` (
	`qna_no`		bigint	PRIMARY KEY AUTO_INCREMENT not null	comment '문의 번호(seq_qna_no)',
	`member_no`		bigint	not null	comment '문의글 작성자 회원번호',
	`order_no`		bigint	null	comment '관련 주문번호',
	`product_no`	bigint	null	comment '관련 상품번호',
	`qna_category`	char(1)	not null	comment '1(상품), 2(배송), 3(일반)',
	`qna_title`		varchar(300)	not null	comment '문의 제목',
	`qna_content`	TEXT	not null	comment '문의 내용',
	`qna_create_date`	DATETIME	not null	default current_timestamp	comment '문의 작성 날짜',
	`qna_lock_fl`	char(1)	not null	default 'n'	comment '문의 비밀글 여부',
	`qna_pw`		int	null	comment '문의 비밀글 비밀번호',
	`qna_answer`	TEXT	null	comment '답글 내용'
);

alter table `qna` add constraint `pk_qna` primary key (
	`qna_no`
);

alter table `qna` add constraint `fk_member_to_qna` foreign key (`member_no`) references `member` (`member_no`);

SELECT * FROM qna;

-- insert구문
-- INSERT INTO qna VALUES (default, #{memberNo}, #{orderNo}, #{productNo}, #{qnaCategory}, #{qnaTitle}, #{qnaContent}, DEFAULT, #{qnaLockFl}, #{qnaPw} ,default);
-- INSERT INTO `qna` VALUES (default, 2, null, null, 2, #{qnaTitle}, #{qnaContent}, DEFAULT, #{qnaLockFl}, #{qnaPw} ,default);
INSERT INTO qna VALUES (default, 2, 1, 1, '배송', '배송', '배송', default, 'y', null, null, 'n');


-- qna 목록 조회
SELECT qna_no, q.member_no, qna_category, qna_title, member_name, SUBSTRING_INDEX(qna_create_date, ' ', 1) qna_create_date, q.qna_answer, q.qna_lock_fl, qna_create_date qna_order_by FROM `qna` q  JOIN `member` m ON q.member_no = m.member_no WHERE qna_delete_fl='n' ORDER BY qna_order_by DESC;

-- update구문
-- UPDATE qna SET (default, #{memberNo}, #{orderNo}, #{productNo}, #{qnaCategory}, #{qnaTitle}, #{qnaContent}, DEFAULT, #{qnaLockFl}, #{qnaPw}, NULL, default) WHERE pnaNo
