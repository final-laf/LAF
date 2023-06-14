// 모달창 관련
if(loginMember != null){ // 로그인한 회원만
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
};

// 배송지관련

// 보내는 사람

// 주소 잘라서 세팅
if(orderMember.memberAddress !=null){
  const arr = orderMember.memberAddress.split("^^^");
  document.querySelectorAll("input[name='memberAddress']").forEach( (item, i) =>{
      if(arr[i] == undefined ){
        item.value = " "; // 상세주소없으면 빈값넣어서 placeholder가리기
      }else{
        item.value = arr[i];
      }
  } );
}

// 받는 사람
const orderDetailSame = document.getElementById('orderDetailSame');
const orderDetailNew = document.getElementById('orderDetailNew');
// 받는 사람 이름
const orderRecvName = document.querySelector('[name="orderRecvName"]');
// 받는 사람 주소
const arr2 = orderMember.memberAddress.split("^^^");
// 받는 사람 전화번호
const orderRecvPhone = document.querySelector('[name="orderRecvPhone"]');

console.log(orderMember.memberNo);
// 주문자 정보와 동일
orderDetailSame.addEventListener('click', () => {
  orderRecvName.value = orderMember.memberName;
  orderRecvPhone.value = orderMember.memberPhone;
  document.querySelectorAll("input[name='memberAddress']")[3].value = arr2[0];
  document.querySelectorAll("input[name='memberAddress']")[4].value = arr2[1];
  document.querySelectorAll("input[name='memberAddress']")[5].value = arr2[2];
});
// 새로운 배송지
orderDetailNew.addEventListener('click', () => {
  orderRecvName.value = "";
  orderRecvPhone.value = "";
  document.querySelectorAll("input[name='memberAddress']")[3].value = "";
  document.querySelectorAll("input[name='memberAddress']")[4].value = "";
  document.querySelectorAll("input[name='memberAddress']")[5].value = "";
});

// 결제 계산하기--------------------------------------------------------------

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

// 주문상품 총 금액 세팅
document.getElementById("totalPrice").innerText = totalAmount.toLocaleString() + '원'; // 주문상품정보 총금액
document.getElementById("totalAmount").innerText = totalAmount.toLocaleString() + '원'; // 결제정보의 주문상품
document.querySelector("input[name=orderTotalPrice]").value = totalAmount; // 제출용 값 세팅

// 상품 총 할인 금액 세팅
document.getElementById("totalDiscount").innerText = totalDiscount.toLocaleString() + '원'; // 주문상품정보 총할인금액

// 배송비 세팅
let delivery = 2500;
if(totalAmount > 100000){
  delivery = 0;
  document.getElementById('deliveryPrice').style.color='#ccc';
  document.getElementById('deliveryPrice').style.textDecoration='line-through';
}
document.getElementById('totalDelivery').innerText = delivery.toLocaleString() + '원';

 // 쿠폰할인금액
let couponDiscount = 0;

if(loginMember != null){ // 로그인한 회원일시
  // 예상적립금 세팅
  document.getElementById("productPoint").innerText = totalPoint.toLocaleString() + '원';
  
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

  // 쿠폰할인금액 세팅
  couponDiscount = document.getElementById("couponDiscount").innerText;
}

// 할인적용 총 금액 세팅
document.getElementById("applyDiscount").innerText = '-' + (totalDiscount + couponDiscount).toLocaleString() + '원';
document.getElementById("payDiscount").innerText = '-' + (totalDiscount + couponDiscount).toLocaleString() + '원';

// 최종결제금액 세팅
const payment = totalAmount - totalDiscount + delivery;
document.getElementById("payment").innerText = payment.toLocaleString() + '원';
document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
document.querySelector("input[name=orderPayment]").value = payment;

// -----------------------------------------------------------------------------

