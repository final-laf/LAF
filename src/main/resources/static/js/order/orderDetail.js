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
// 계산식 세팅

console.log(odpList);
console.log(order);


// 우편번호, 주소 세팅
const arr = order.orderRecvAdd.split("^^^");
document.getElementById("recvAddNo").innerText = arr[0];
document.getElementById("recvAdd").innerText = arr[1] + " " + arr[2];
