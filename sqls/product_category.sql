-- -------------------------------------------------------------------------------------------------------------------------- --

-- 테이블 생성

drop table if exists `product_category`;

create table `product_category` (
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`parent_category_no`	bigint	not null	comment '카테고리 번호(seq_category_no)'
);

-- 기본키 제약조건 설정

alter table `product_category` add constraint `pk_product_category` primary key (
	`product_no`,
	`parent_category_no`
);

-- 외래키 제약조건 설정

alter table `product_category` add constraint `fk_product_to_product_category` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

alter table `product_category` add constraint `fk_parent_category_cd_to_product_category` foreign key (
	`parent_category_no`
)
references `parent_category_cd` (
	`parent_category_no`
);

alter table `product_category` add constraint `fk_child_category_cd_to_product_category` foreign key (
	`child_category_no`
)
references `child_category_cd` (
	`child_category_no`
);

-- -------------------------------------------------------------------------------------------------------------------------- --

-- 샘플 데이터 삽입 

INSERT INTO laf.product_category VALUES(1, 1);

-- -------------------------------------------------------------------------------------------------------------------------- --