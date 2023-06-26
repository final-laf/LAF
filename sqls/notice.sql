drop table if exists `notice`;

create table `notice` (
	`notice_no`	bigint	not null	primary key AUTO_INCREMENT comment '공지사항 번호(seq_notice_no)',
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`notice_title`	varchar(300)	null	comment '공지사항 제목',
	`notice_content`	text	null	comment '공지사항 내용',
	`notice_date`	datetime	not null	default current_timestamp	comment '작성일',
	`notice_delete_fl`	char(1)	null	default 'n'	comment 'y(삭제됨), n(삭제안됨)'
);

alter table `notice` add constraint `fk_member_to_notice_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

-- 샘플
INSERT INTO notice values(DEFAULT, 1, '제목입니다.', '내용입니다.', DEFAULT, 'y');

SELECT * FROM notice;
INSERT INTO notice VALUES (default, 2,  '공공공지사항', 'ㅎㅇㅇ', default, default);