// 모달창 관련
document.getElementById("orderDetailShipping").addEventListener("click", () => {
  document.getElementById("orderShippingBack").style.display="block";
  document.getElementById("orderShippingContent").style.display="block";
  document.body.style.overflowY = "hidden";
})

document.getElementById("orderShippingBack").addEventListener("click", () => {
  document.getElementById("orderShippingBack").style.display="none";
  document.getElementById("orderShippingContent").style.display="none";
  document.body.style.removeProperty('overflow');
})

document.getElementById("orderDetailCoupon").addEventListener("click", () => {
  document.getElementById("orderCouponBack").style.display="block";
  document.getElementById("orderCouponContent").style.display="block";
  document.body.style.overflowY = "hidden";
})

document.getElementById("orderCouponBack").addEventListener("click", () => {
  document.getElementById("orderCouponBack").style.display="none";
  document.getElementById("orderCouponContent").style.display="none";
  document.body.style.removeProperty('overflow');
})
document.getElementById("orderCouponCancel").addEventListener("click", () => {
  document.getElementById("orderCouponBack").style.display="none";
  document.getElementById("orderCouponContent").style.display="none";
  document.body.style.removeProperty('overflow');
})

// 상품 가격 계산
const table = document.getElementById("mypageOrderProduct");
let totalAmount = 0; // 총상품금액
let totalDiscount = 0; // 총할인금액
let totalPoint = 0; // 총적립금

for (let i = 1; i < table.rows.length - 1; i++) {
  let row = table.rows[i];
  
  let point = parseInt(row.cells[0].children[0].value)
  let quantity = parseInt(row.cells[3].innerText);
  let price = parseInt(row.cells[4].innerText.replace(",", ""));
  let rowAmount = quantity * price;

  totalAmount += rowAmount; // 총상품금액

  if (row.cells[5] != null) {
    let discountAmount = Math.abs(parseInt(row.cells[5].innerText.replace(",", "")));
    totalDiscount += quantity * discountAmount; // 총할인금액
  }
  totalPoint += point; // 총적립금
}
// 예상적립금 세팅
document.getElementById("productPoint").innerText = totalPoint.toLocaleString() + '원';

// 상품 총 할인 금액 세팅
document.getElementById("totalDiscount").innerText = totalDiscount.toLocaleString() + '원';
// 주문상품 총 금액 세팅
document.getElementById("totalAmount").innerText = totalAmount.toLocaleString() + '원';
document.querySelector("input[name=orderTotalPrice]").value = totalAmount;

// 포인트 사용
const memberPoint = document.getElementById("memberPoint").innerText;
const pointInput = document.querySelector("input[name=usePoint]");

// 전액사용 포인트 버튼
document.getElementById("pointBtn").addEventListener('click', () => {
  pointInput.value = memberPoint;
});
// 포인트 입력시 사용포인트 제어
document.querySelector("input[name=usePoint]").addEventListener('change', e => {
  if (parseInt(e.target.value) > parseInt(memberPoint)) {
    e.preventDefault();
  }
});

// 할인적용금액 세팅
const td = document.getElementById("applyDiscount").innerText;
const couponDiscount = document.getElementById("couponDiscount").innerText;
td = '-' + totalDiscount + parseInt(couponDiscount) + parseInt(pointInput);

// 최종결제금액 세팅
const payment = totalAmount + totalDiscount + 2500;
document.getElementById("payment").innerText = payment.toLocaleString() + '원';
document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
document.querySelector("input[name=orderPayment]").value = payment;
