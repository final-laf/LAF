drop table if exists `review_img`;

create table `review_img` (
	`review_img_no`	bigint	not NULL primary key auto_increment	comment 'seq_reivew_img_no',
	`review_no`	bigint	not null	comment '후기 번호(seq_review_no)',
	`review_path`	varchar(300)	null	comment '후기 이미지 주소'
);

alter table `review_img` add constraint `fk_review_to_review_img_1` foreign key (
	`review_no`
)
references `review` (
	`review_no`
);
COMMIT;
SELECT * FROM `review_img`; 
