drop table if exists `child_category_cd`;

create table `child_category_cd` (
	`child_category_no`	bigint	not null	primary key AUTO_INCREMENT comment 'seq_child_category_no',
	`child_category_name`	varchar(30)	not null	comment '카테고리 이름',
	`parent_category_no`	bigint	not null	comment 'seq_parent_category_no'
);

alter table `child_category_cd` add constraint `fk_parent_category_cd_to_child_category_cd_1` foreign key (
	`parent_category_no`
)
references `parent_category_cd` (
	`parent_category_no`
);

-- -------------------------------------------------------------------------------------------------------------------------- --
-- 데이터 삽입
insert into child_category_cd values(NULL, '니트', 1);
insert into child_category_cd values(NULL, '티셔츠', 1);
insert into child_category_cd values(NULL, '맨투맨/후드', 1);
insert into child_category_cd values(NULL, '셔츠/블라우스', 1);
insert into child_category_cd values(NULL, '슬리브리스', 1);

insert into child_category_cd values(NULL, '면바지', 2);
insert into child_category_cd values(NULL, '데님', 2);
insert into child_category_cd values(NULL, '슬랙스', 2);
insert into child_category_cd values(NULL, '반바지', 2);
insert into child_category_cd values(NULL, '트레이닝/조거', 2);

insert into child_category_cd values(NULL, '코트', 3);
insert into child_category_cd values(NULL, '자켓', 3);
insert into child_category_cd values(NULL, '점퍼', 3);
insert into child_category_cd values(NULL, '카디건', 3);

insert into child_category_cd values(NULL, '신발', 9);
insert into child_category_cd values(NULL, '가방', 9);


-- 부모카테고리로 자식카테고리 모두 조회
SELECT *
FROM parent_category_cd p
left JOIN child_category_cd c ON p.parent_category_no = c.parent_category_no
ORDER BY parent_category_order;


SELECT parent_category_no, parent_category_no FROM parent_category_cd;

SELECT * FROM child_category_cd;

select 	child_category_no as category_no,
		child_category_name as category_name,
		parent_category_no
from 	`child_category_cd`
where 	parent_category_no = 1;

select 	 child_category_no as category_no,
	 	 child_category_name as category_name,
		 parent_category_no
from    `child_category_cd` 
order by category_no;