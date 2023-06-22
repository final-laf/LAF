// 주문 상태 세팅
let orderState = "";
switch (order.orderState){
    case "A" : orderState = "주문접수"; break;
    case "B" : orderState = "결제확인"; break;
    case "C" : orderState = "상품준비"; break;
    case "D" : orderState = "출고완료"; break;
    case "E" : orderState = "배송중"; break;
    case "F" : orderState = "배송완료"; break;
    case "G" : orderState = "취소중"; break;
    case "H" : orderState = "취소완료"; break;
    case "I" : orderState = "교환중"; break;
    case "J" : orderState = "교환완료"; break;
    case "K" : orderState = "반품중"; break;
    case "L" : orderState = "반품완료"; break;
}
document.getElementById("orderState").innerText = orderState;
// 결제 수단 세팅
let payment = "";
switch (order.payment){
    case "1" : payment = "무통장입금"; break;
}
let paymentBank = "";
switch (order.paymentBank){
    case "1" : paymentBank = "국민은행"; break;
    case "2" : paymentBank = "농협"; break;
    case "3" : paymentBank = "우리은행"; break;
}
document.getElementById("payment").innerText = payment + ' ('+paymentBank+')';

// 쿠폰할인세팅
let discountCoupon = "";
if(dc != null){
    discountCoupon = dc.couponAmount;
    if(discountCoupon != undefined){
        if(dc.couponUnit == 'P'){
            discountCoupon = order.orderTotalPrice * dc.couponAmount * 0.01;
        }
        const result = '-' + parseInt(discountCoupon).toLocaleString() + '원';
        console.log(result);
        document.getElementById("discountCoupon").innerText = result;
    }
}

// 우편번호, 주소 세팅
const arr = order.orderRecvAdd.split("^^^");
document.getElementById("recvAddNo").innerText = arr[0];
document.getElementById("recvAdd").innerText = arr[1] + " " + arr[2];

// 배송비 설정
const deliveryCost = document.querySelectorAll('.deliveryCost');
if(parseInt(order.orderTotalPrice) > 100000){
    deliveryCost.forEach( e => {
        e.style.display = 'none';
    });
}

// 주문목록버튼 - 마이페이지 주문조회 리다이렉트
const orderListBtn = document.getElementById("orderListBtn");
if(orderListBtn != null){
    orderListBtn.addEventListener('click', () => {
        window.location.href = "/myPage/order"
    });
}