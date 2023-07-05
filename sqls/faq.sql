drop table if exists `faq`;

create table `faq` (
	`faq_no`	bigint	not null	primary key AUTO_INCREMENT comment 'seq_faq_no',
	`faq_title`	varchar(300)	null	comment '제목',
	`faq_content`	text	null	comment '내용',
	`faq_category`	char(1)	null	comment '1(상품), 2(배송), 3(교환반품), 4(기타)',
	`faq_order`	int	null
);
SELECT 
	subquery.faq_no,
	subquery.faq_title,
	subquery.faq_content
	
FROM 
	(SELECT 
		faq_no,
		faq_title,
		faq_content,
		(SELECT count(*) FROM faq a WHERE a.faq_title LIKE '%주문%' AND a.faq_no=f.faq_no)+
		(SELECT count(*) FROM faq a WHERE a.faq_title LIKE '%취소%' AND a.faq_no=f.faq_no)+
		(SELECT count(*) FROM faq a WHERE a.faq_title LIKE '%배송%' AND a.faq_no=f.faq_no) AS count
	FROM faq f 
	ORDER BY count DESC) AS subquery
WHERE count>0;

SELECT * FROM faq WHERE faq_title LIKE '%취소%' AND faq_title LIKE '%주문%';
INSERT INTO faq values(DEFAULT, '주문한 상품이 갑자기 취소되었다고 연락왔어요!', '입금 후 공장측 원단문제로 더 이상 제작이 어려운 경우 저희 LAF에서는 빠른 배송을 위해 품절 상품 취소처리 도와드리고 있는 점 양해부탁드립니다:)', '1', '1');
INSERT INTO faq values(DEFAULT, '판매하는 상품과 같이 코디된 상품을 구입하고 싶어요!', '- 피팅모델이 착용한 상품 중 대부분은 업데이트 예정 신상품이거나, 판매 중인 상품입니다. 판매 시 상품 페이지 내 옵션별로 코디된 상품 기재 되어있어 확인 가능합니다.)', '1', '2');
INSERT INTO faq values(DEFAULT, '품절 상품은 언제 재입고되나요?', '품절된 상품은 일정을 바로 파악하기 어려우며, 정확한 일정은 거래처 상황에 따라 변경될 수 있는 점 양해 부탁드립니다. ', '1', '3');
INSERT INTO faq values(DEFAULT, '상품 세탁 방법이 궁금합니다.', '오랫동안 변형없이 착용하시기 위해 모든 의류의 첫 세탁은 드라이클리닝을 추천드립니다. 자세한 세탁 방법은 상품 상세 페이지 하단에 소재별로 기재 도와드렸습니다 ', '1', '4');
INSERT INTO faq values(DEFAULT, '신상품은 언제 업데이트 되나요?', '신상품은 매주 월/수/금 11:00am 업데이트됩니다. 상황에 따라 업데이트 일정이 변동될 수 있습니다.', '1', '5');
INSERT INTO faq values(DEFAULT, '신상품 할인 기간을 알고 싶어요', '신상품의 할인 기간은 정해진 일정이 없습니다.', '1', '6');

INSERT INTO faq values(DEFAULT, '오후 3시 이후 결제 했는데, 배송 일정 확인 가능할까요?', '기본 배송 준비일은 결제 완료 기준 다음날부터 영업일 기준 평균 (주말,공휴일제외) 2-5일 소요 됩니다.', '2', '1');
INSERT INTO faq values(DEFAULT, '배송 출고 알림 받았는데, 조회가 안돼요', '배송중으로 확인되더라도 물류센터에서 출고가 된 시점이 아닌 우체국에서 배송정보를 입력한 시점부터 배송추적이 가능하게 됩니다. 여유있게 오후 8~9시 이후에 배송추적을 해주시면 확인이 가능합니다.', '2', '2');
INSERT INTO faq values(DEFAULT, '따로 주문해서 배송비를 두 번 냈어요, 합배송 가능한가요?', '자사몰 주문건에 한해 합배송이 가능합니다. 모든 주문건 배송 전 상태에 요청 시 합배송 처리와 합배송비 환불이 가능합니다. ', '2', '3');
INSERT INTO faq values(DEFAULT, '구매 상품의 입고일정은 어디서 확인하나요?', '입고 예정 공지가 뜬 경우, 상품에 따라 영업일 기준 5일에서 최대 14일 이상 제작기간 소요되며, 제작기간을 고려하여 신중한 구매 부탁드립니다. ', '2', '4');
-- INSERT INTO faq values(DEFAULT, '당일 발송 상품 구매 시 언제 배송되나요?', '당일 오후 3시 이전까지 결제 및 입금확인이 완료된 주문건에 한해 발송 ', '2', '4');
INSERT INTO faq values(DEFAULT, '무료 배송 조건은 어떻게 되나요?', '10만원 이상 구매 시 무료배송 적용됩니다. 10만원 이하 일 경우 2500원이 부담 됩니다.', '2', '4');

INSERT INTO faq values(DEFAULT, '주문한 상품이 갑자기 취소되었다고 연락왔어요!', '입금 후 공장측 원단문제로 더 이상 제작이 어려운 경우 저희 LAF에서는 빠른 배송을 위해 품절 상품 취소처리 도와드리고 있는 점 양해부탁드립니다:)', '3', '1');
INSERT INTO faq values(DEFAULT, '배송 전 변경/추가하고 싶어요', '자사몰 주문건에 한해 배송 전 변경/취소가 가능합니다. 자세한 사항은 1:1 문의를 남겨주세요', '3', '2');
INSERT INTO faq values(DEFAULT, '주문을 취소하고 싶어요', '영업일 기준 10시 이전 1:1 문의 게시판 접수해 주셔야 정상적인 처리가 가능합니다', '3', '3');
INSERT INTO faq values(DEFAULT, '상품을 받았는데 다른 상품으로 교환하고 싶어요', '저희 LAF는 동일 상품/ 옵션 교환 진행만 가능합니다. 다른 상품으로 교환 원하시는 경우 반품 후 새로 구매 부탁드립니다.', '3', '4');
INSERT INTO faq values(DEFAULT, '부분배송 받았는데, 반품하고 싶어요! 미 발송 상품까지 받아본 후 한번에 보내도 되나요?', '반품 접수는 전체 상품 배송완료일 기준이 아닌, 처음 수령하신 상품 기준으로 7일 이내에 반품 접수해주셔야 합니다. 1차 부분배송 받아보신 상품 반품 원하시는 경우 7일 이내 먼저 보내주셔야 처리 가능 한 점 참고 부탁드립니다. ', '3', '5');
INSERT INTO faq values(DEFAULT, '상품 보냈는데 처리가 안되고 있어요', '보내주신 상품은 택배사 중간 물류지점을 거쳐오기에 상품 보내주신 날로부터 대략 7일 정도 소요될 수 있습니다. 배송조회에서 확인되는 도착일자와 실제 LAF 사무실 도착일자가 상이한 점 참고 부탁드립니다', '3', '6');
INSERT INTO faq values(DEFAULT, '교환/반품 처리가 불가능한 경우는 언제인가요?', '-상품 수령일로부터 7일 이상 (주말제외/영업일기준) 경과된 경우
-사용 흔적(집냄새, 향수냄새, 오염, 체취)가 발견된 상품
-고객 부주의 또는 임의 세탁으로 인해 상품이 훼손된 상품
-배송 시 생긴 단순 구김과 제작 과정에서 발생하는 특유 냄새 마감 박음질, 단순 실밥, 세탁 시 지워지는 초크 자국', '3', '7');
INSERT INTO faq values(DEFAULT, '상품 받았는데, 불량/오배송 상품이 도착했어요', '▶반품 : 반품 비용은 LAF가 부담합니다.
▶교환 : 교환 왕복배송비 LAF가 부담합니다.', '3', '8');
INSERT INTO faq values(DEFAULT, '교환/반품 배송비 얼마인가요?', '▶반품 : 환불 금액에서 배송비 차감 후 환불
▶교환 : 왕복배송비 5000원 입금
- 10만원 이하 주문건 : 반품 상품 금액 -2500원 차감
- 10만원 이상 주문건 : 반품 상품 금액 -5000원 차감 (초기 무료배송 혜택 해지되는 경우)
* 반품 후 나머지 상품이 10만원 이상 시 -2500원 차감', '3', '9');
INSERT INTO faq values(DEFAULT, '교환/반품 접수는 어떻게 하나요?', 'Q&A 게시판 또는 고객센터로 접수해주셔야 정상적인 처리가 가능합니다.', '3', '10');

INSERT INTO faq values(DEFAULT, '고객센터 전화 연결이 되지 않아요', '한 주가 시작되는 월요일, 이벤트기간 동안에는 문의량이 많아 고객센터 연결이 늦어질 수 있는 점 양해부탁드립니다ㅠㅠ! (1:1 문의 게시판을 이용해주시면 감사하겠습니다:)', '4', '1');
INSERT INTO faq values(DEFAULT, '입금했는데, 입금확인 메시지를 못 받았어요.', '입금자분 성함과 금액 오차없이 입금해주신 경우 1-2이내 자동입금 확인 진행됩니다.', '4', '2');
INSERT INTO faq values(DEFAULT, '언제까지 입급해야 하나요?', '결제수단 무통장입금을 선택하신 경우 3일 이내 입금확인이 되지 않으면 주문건 자동 취소처리 됩니다.', '4', '3');





