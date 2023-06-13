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

for (let i = 1; i < table.rows.length - 1; i++) {
  let row = table.rows[i];
  
  let quantity = parseInt(row.cells[3].innerText);
  let price = parseInt(row.cells[4].innerText.replace(",", ""));
  
  let rowAmount = quantity * price;

  totalAmount += rowAmount; // 총상품금액

  if (row.cells[5] != null) {
    let discountAmount = parseInt(row.cells[5].innerText.replace(",", ""));
    totalDiscount += discountAmount; // 총할인금액
  }
}

// 상품 총 할인 금액 세팅
document.getElementById("totalDiscount").innerText = totalDiscount.toLocaleString() + '원';
// 주문상품 총 금액 세팅
document.getElementById("totalAmount").innerText = totalAmount.toLocaleString() + '원';


// 할인적용금액 세팅
const td = document.getElementById("applyDiscount").innerText;
document.getElementById("payDiscount").innerText = td;


// 최종결제금액
const payment = (totalAmount + totalDiscount + 2500).toLocaleString();
document.getElementById("payment").innerText = payment + '원';
document.getElementById("paymentBtn").innerText = payment + '원 결제하기';