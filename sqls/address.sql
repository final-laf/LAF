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

