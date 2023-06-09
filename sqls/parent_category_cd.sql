-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `parent_category_cd`;

create table `parent_category_cd` (
	`parent_category_no`	bigint	not null	primary key auto_increment comment 'seq_parent_category_no',
	`parent_category_name`	varchar(30)	not null	comment '카테고리 이름'
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 샘플 데이터 삽입

INSERT INTO parent_category_cd VALUES(NULL, 'TOP');
INSERT INTO parent_category_cd VALUES(NULL, 'PANTS');
INSERT INTO parent_category_cd VALUES(NULL, 'OUTER');
INSERT INTO parent_category_cd VALUES(NULL, 'DRESS');
INSERT INTO parent_category_cd VALUES(NULL, 'SKIRTS');
INSERT INTO parent_category_cd VALUES(NULL, 'SALE');
INSERT INTO parent_category_cd VALUES(NULL, 'BEST50');

SELECT * FROM parent_category_cd pcc;

-- -------------------------------------------------------------------------------------------------------------------------- --