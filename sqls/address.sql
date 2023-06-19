drop table if exists `address`;

create table `address` (
	`address_no`	bigint primary key AUTO_INCREMENT not null,
	`member_no`	bigint	not null	comment '회원 번호 시퀀스(seq_member_no)',
	`address_name`	varchar(100)	not null	default '미지정'	comment '배송지명',
	`address_reciever`	varchar(100)	not null	comment '받는사람',
	`address`	varchar(1000)	not null	comment '배송지주소',
	`address_tel`	char(11)	not null	comment '전화번호',
	`address_default`	char(1)	not null	default 'n'	comment 'y(기본배송지), n(일반배송지)'
);

alter table `address` add constraint `fk_member_to_address_1` foreign key (
	`member_no`
)
references `member` (
	`member_no`
);

-- ------------------------------------------------------------------------------
-- 샘플데이터
SELECT * FROM `address`;
SELECT * FROM `member`;
INSERT INTO address VALUES(NULL, 3, '집', '유저이', '경기 평택시 청북읍 판교길 4^^^길바닥 3-4', '01043214321', 'Y');
INSERT INTO address VALUES(NULL, 3, '회사', '코카콜라', '경기도 의왕시 고천공업로 5', '01016683282', 'N');
INSERT INTO address VALUES(NULL, 3, '왠수', '팹시', '서울 강남구 테헤란로98길 8', '01015228000', 'N');

UPDATE address SET address_tel = '01015228000' WHERE address_no =3;

COMMIT;

-- ------------------------------------------------------------------------------

-- 등록된 배송지 조회
SELECT * FROM `address` WHERE member_no = 3 ORDER BY address_default_fl DESC, address_no ASC;



