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

// 주문자 관련 정보 세팅--------------------------------------------------------------
if(loginMember != null) {
  if(loginMember.memberSocial == 'K') {
    document.getElementById("orderEmail").value="";
    document.getElementById("orderTel").value="";
  }
}

// 주문자 환불정보 세팅
if(orderMember.refundBank != null){
  document.getElementById('refundBank').children[parseInt(orderMember.refundBank)-1].selected = true;
};
// 주소 잘라서 세팅
if(orderMember.memberAddress !=null && loginMember.memberSocial != 'K'){
  const arr = orderMember.memberAddress.split("^^^");
  document.querySelectorAll("input[name='memberAddress']").forEach( (item, i) =>{
    item.value = arr[i];
  } );
}

// 주문자
const orderName = document.getElementById('orderName'); // 이름
const orderTel = document.querySelector('[name="orderTel"]');  // 전화번호

// 받는 사람
const orderDetailSame = document.getElementById('orderDetailSame');
const orderDetailNew = document.getElementById('orderDetailNew');
// 받는 사람 이름
const orderRecvName = document.querySelector('[name="orderRecvName"]');
// 받는 사람 전화번호
const orderRecvPhone = document.querySelector('[name="orderRecvPhone"]');

// 주소지 전환
// 주문자 정보와 동일
orderDetailSame.addEventListener('click', () => {
  orderRecvName.value = orderName.value;
  orderRecvPhone.value = orderTel.value;
  const arr = document.querySelectorAll("input[name='memberAddress']");
  document.querySelectorAll("input[name='receiverAddress']").forEach( (item, i) =>{
    item.value = arr[i].value;
  } )
});
// 새로운 배송지
orderDetailNew.addEventListener('click', () => {
  orderRecvName.value = "";
  orderRecvPhone.value = "";
  document.querySelectorAll("input[name='receiverAddress']").forEach( (item, i) =>{
    item.value ="";
  } )
});

// 결제 계산하기--------------------------------------------------------------

// 상품 가격 계산
const table = document.getElementById("mypageOrderProduct");
let totalAmount = 0; // 총상품금액
let totalDAmount = 0; // 총상품금액
let totalDiscount = 0; // 총할인금액
let totalPoint = 0; // 총적립금

for (let i = 1; i < table.rows.length - 1; i++) {
  let row = table.rows[i];
  
  let quantity = parseInt(row.cells[3].innerText);
  let price = parseInt(row.cells[4].innerText.replace(",", ""));
  let rowAmount = quantity * price;
  let point = parseInt(row.cells[0].children[0].value);
  point = quantity * point;

  totalAmount += rowAmount; // 상품할인전 총금액

  if (row.cells[5] != null) {
    let discountAmount = Math.abs(parseInt(row.cells[5].innerText.replace(",", "")));
    totalDiscount += quantity * discountAmount; // 총할인금액
  }
  totalPoint += point; // 총예상적립금
}

totalDAmount = totalAmount-totalDiscount; // 상품할인 적용 총금액

// 주문상품 총 금액 세팅
document.getElementById("totalAmount").innerText = totalAmount.toLocaleString() + '원'; // 결제정보의 주문상품(상품할인전 총금액)
document.getElementById("totalPrice").innerText = totalDAmount.toLocaleString() + '원'; // 주문상품정보 총금액
document.querySelector("input[name=orderTotalPrice]").value = totalDAmount; // 제출용 값 세팅

// 상품 총 할인 금액 세팅
document.getElementById("totalDiscount").innerText = totalDiscount.toLocaleString() + '원'; // 주문상품정보 총할인금액

// 배송비 세팅
let delivery = 3000;
if(totalDAmount > 100000){
  delivery = 0;
  document.getElementById('deliveryPrice').style.color='#ccc';
  document.getElementById('deliveryPrice').style.textDecoration='line-through';
}
document.getElementById('totalDelivery').innerText = delivery.toLocaleString() + '원';

let couponDis = 0;

if(loginMember != null){ // 로그인한 회원일시
  // 쿠폰 적용하기--------------------------------------------------------------
  // 쿠폰 제한 금액과 상품총금액 비교
  const couponList = document.querySelectorAll('.orderCoupon-coupon-list');
  const applyBtn = document.getElementById('applyBtn'); // 적용하기 버튼
  const cn = document.getElementById("couponNo"); // 쿠폰번호세팅
  const cp = document.getElementById("couponDiscount"); // 쿠폰적용 할인가 화면표시

  let couponNoC = [];

  for(c of couponList){
    let couponCondition = c.children[0].children[1].getAttribute('value'); // 쿠폰적용최소가격
    let couponNo = c.children[0].children[0].getAttribute('value');
    let couponUnit = c.children[0].children[2].getAttribute('value')
    let couponAmount = c.children[0].children[3].getAttribute('value')
    let couponMaxDiscount = c.children[0].children[4].getAttribute('value')

    const couponSelect = c.children[2];

    if(totalAmount < parseInt(couponCondition)){ // 쿠폰 적용불가능판단 후 선택불가
      couponSelect.children[1].children[0].innerText= '적용불가'
      couponSelect.style.pointerEvents = 'none';
    }else{ // 사용가능시 쿠폰적용할인금액 계산
      if(couponUnit == 'P'){ // 할인율일때
        if(totalAmount * couponAmount * 0.01 < couponMaxDiscount){
          couponMaxDiscount = totalAmount * couponAmount * 0.01
        }
      }else{
        couponMaxDiscount = couponAmount
      }
    }
    couponNoC.push([couponNo,couponMaxDiscount])
  }

  applyBtn.addEventListener('click',() => {
    // 모달창 닫기
    document.getElementById("orderCouponBack").style.display="none";
    document.getElementById("orderCouponContent").style.display="none";
    document.body.style.removeProperty('overflow');
    // 체크된 인덱스번호가져오기
    if(document.querySelector('input[name="useCoupon"]:checked') != null){
      // 체크된 인덱스번째의 쿠폰번호, 쿠폰적용할인가격 계산후 세팅
      const checked = document.querySelector('input[name="useCoupon"]:checked').getAttribute('id').slice(-1);
      cn.value = couponNoC[checked][0]; // 쿠폰 적용 번호 세팅
      cp.innerText = parseInt(couponNoC[checked][1]).toLocaleString(); // 쿠폰 적용 금액 세팅
      // 쿠폰할인금액 세팅
      couponDis = parseInt(couponNoC[checked][1]);
    }
  })

  // 예상적립금 세팅
  document.getElementById("productPoint").innerText = totalPoint.toLocaleString() + '원';
  document.querySelector("input[name=pointNoGain]").value = totalPoint; // 제출용

  // 쿠폰 적용 전 값 저장
  let cpp = cp.innerText;
  // 일정 간격마다 확인
  setInterval(function() {
    if (cp.innerText !== cpp) {
      paySet();
      cpp = cp.innerText;
    }
  }, 500);
  // 쿠폰 적용시 세팅
  function paySet() {
    const cp = parseInt(document.getElementById("couponDiscount").innerText.replace(",", ""));
    // 할인적용 총 금액 세팅
    document.getElementById("applyDiscount").innerText = '-' + (totalDiscount + cp).toLocaleString() + '원';
    document.getElementById("payDiscount").innerText = '-' + (totalDiscount + cp).toLocaleString() + '원'; // 제출용
    // 최종결제금액 세팅
    const payment = totalAmount - totalDiscount + delivery - cp;
    document.getElementById("payment").innerText = payment.toLocaleString() + '원';
    document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
    document.querySelector("input[name=orderPayment]").value = payment;
  }
  // 쿠폰 끝--------------------------------------------------------------

  // 포인트 사용
  const memberPoint = document.getElementById("memberPoint").innerText;
  const pointInput = document.querySelector("input[name=usePoint]");
  // 전액사용 포인트 버튼
  document.getElementById("pointBtn").addEventListener('click', () => {
    pointInput.value = memberPoint;
  });
  // 포인트 입력시 사용포인트 제어
  pointInput.addEventListener('input', e => {
    const value = parseInt(e.target.value);
    
    if (isNaN(value) || value < 0 || value > orderMember.memberPoint) {
      e.target.value = "";
    }else{
      let usep = parseInt(memberPoint.replace(",", "")) - parseInt(e.target.value);
      document.getElementById("memberPoint").innerText = usep.toLocaleString();
    }
    if(e.target.value == ""){
      document.getElementById("memberPoint").innerText = memberPoint;
    }
  });

  // 포인트 할인적용버튼 누를시
  const applyPointBtn = document.getElementById("applyPointBtn");

  applyPointBtn.addEventListener('click', () => {
    let point = 0;
    if(pointInput.value != ""){
      point = parseInt(pointInput.value.replace(",", ""));
    };
    // 사용한 포인트 금액 세팅(제출용)
    document.querySelector("input[name=pointNoUse]").value = point;
    // 쿠폰 할인 금액
    const cp = parseInt(document.getElementById("couponDiscount").innerText.replace(",", ""));

    // 할인적용 총 금액 세팅
    document.getElementById("applyDiscount").innerText = '-' + (totalDiscount + cp + point).toLocaleString() + '원';
    document.getElementById("payDiscount").innerText = '-' + (totalDiscount + cp + point).toLocaleString() + '원'; // 제출용
    // 최종결제금액 세팅
    const payment = totalAmount - totalDiscount + delivery - cp - point;
    document.getElementById("payment").innerText = payment.toLocaleString() + '원';
    document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
    document.querySelector("input[name=orderPayment]").value = payment;
  });

  // 할인 적용 취소
  const discountClearBtn = document.getElementById('discountClearBtn');
  discountClearBtn.addEventListener('click', () => {
    document.querySelector("input[name=pointNoUse]").value = 0;
    document.getElementById('usePoint').value = '';
    cn.value = 0;
    cp.innerText ='0';

    // 할인적용 총 금액 세팅
    document.getElementById("applyDiscount").innerText = '-' + (totalDiscount).toLocaleString() + '원';
    document.getElementById("payDiscount").innerText = '-' + (totalDiscount).toLocaleString() + '원'; // 제출용

    // 최종결제금액 세팅
    const payment = totalAmount + delivery;
    document.getElementById("payment").innerText = payment.toLocaleString() + '원';
    document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
    document.querySelector("input[name=orderPayment]").value = payment;
  });

  // 처음 페이지 로딩시--------------------------------------------------------------
  // 할인적용 총 금액 세팅
  document.getElementById("applyDiscount").innerText = '-' + (totalDiscount).toLocaleString() + '원';
  document.getElementById("payDiscount").innerText = '-' + (totalDiscount).toLocaleString() + '원'; // 제출용
  // 최종결제금액 세팅
  const payment = totalAmount - totalDiscount + delivery;
  document.getElementById("payment").innerText = payment.toLocaleString() + '원';
  document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
  document.querySelector("input[name=orderPayment]").value = payment;
    
}else{

  // 할인적용 총 금액 세팅
  document.getElementById("applyDiscount").innerText = '-' + (totalDiscount).toLocaleString() + '원';
  document.getElementById("payDiscount").innerText = '-' + (totalDiscount).toLocaleString() + '원'; // 제출용

  // 최종결제금액 세팅
  const payment = totalAmount -totalDiscount + delivery;
  document.getElementById("payment").innerText = payment.toLocaleString() + '원';
  document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
  document.querySelector("input[name=orderPayment]").value = payment;
}

// -----------------------------------------------------------------------------

// 결제수단선택
const payHows = document.querySelectorAll('input[name="payHow"]');
payHows.forEach( e => {
  e.addEventListener('change', () => {
    const payHow = document.querySelector('input[name="payHow"]:checked');
    if(payHow != null){
      if(payHow.getAttribute('id').slice(-1) == '1'){
        document.getElementById('inputPay1').classList.remove("hidden");
      }else{
        document.getElementById('inputPay1').classList.add("hidden");
      }
    }
    document.querySelector('input[name="payment"]').value = payHow.getAttribute('id').slice(-1);
  });
});


// 결제동의
function agreeCheck(){ // 둘다체크시 모두동의 체크
  const agreePays = document.querySelectorAll("#agreePay");
  const agreePayAll = document.getElementById('agreePayAll');
  let agreeFL = 0;
  agreePays.forEach( e => {
    if(e.checked) agreeFL += 1;
  })
  if(agreeFL == 2)agreePayAll.checked = true;
  else agreePayAll.checked = false;
}

function agreePayAllCheck() { // 모두동의 체크해제시 둘다체크해제
  const agreePays = document.querySelectorAll("#agreePay");
  const agreePayAll = document.getElementById('agreePayAll');
  agreePays.forEach(e => {
    e.checked = agreePayAll.checked;
  });
}

// 변화감지하면 함수호출
const checkboxes = document.querySelectorAll("#agreePay, #agreePayAll");
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", function() {
    if (checkbox.id === "agreePayAll")agreePayAllCheck();
    else agreeCheck();
  });
});

// 유효성검사
const checkObj = {
  "orderName" : false,
  "orderEmail" : false,
  "orderTel" : false,
  "memberAddress" : false,
  "refundName" : false,
  "refundAccount" : false,
  "orderRecvName" : false,
  "receiverAddress" : false,
  "recvTel" : false,
  "paymentName" : false,
  "agreePayAll" : false
};

// 미리 입력되어 있는 값 확인[이름]
function namePreCheck(inputName) {
  const eName = document.getElementById(inputName);
  if (eName.value.trim().length > 0) {
    const regEx = /^[a-zA-Z가-힣]{1,20}$/;
    if (regEx.test(eName.value)) {
      checkObj[inputName] = true;
    } else {
      checkObj[inputName] = false;
    }
  }
}

// 입력시 값 확인[이름]
function nameCheck(inputName) {
  const eName = document.getElementById(inputName);
  eName.addEventListener("input", () => {
    if (eName.value.trim().length === 0) {
      eName.value = "";  // 띄어쓰기 못 넣게 하기
      checkObj[inputName] = false;
      return;
    }
    const regEx = /^[a-zA-Z가-힣]{1,20}$/;
    if (regEx.test(eName.value)) {
      checkObj[inputName] = true;
    } else {
      checkObj[inputName] = false;
    }
  });
}
nameCheck("orderName");
nameCheck("refundName");
nameCheck("orderRecvName");



// 이메일 유효성 검사
const orderEmail = document.getElementById("orderEmail");
orderEmail.addEventListener("input", () => {
  // 이메일이 입력되지 않은 경우
  if(orderEmail.value.trim().length == 0) {
    orderEmail.value = ""; // 띄어쓰기 못 넣게 하기
    emailMessage.innerText=""
    checkObj.orderEmail = false; // 빈칸 == 유효하지 않다
    return;
  }
  const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
  if (regEx.test(orderEmail.value)) {
    checkObj.orderEmail = true;
  } else {
    checkObj.orderEmail = false;
  }
});

// 미리 입력되어 있는 값 확인[전화번호]
function telPreCheck(inputTel) {
  const eTel = document.getElementById(inputTel);
  if (eTel.value.trim().length > 0) {
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;
    if (regEx.test(eTel.value)) {
      checkObj[inputTel] = true;
    } else {
      checkObj[inputTel] = false;
    }
  }
}

// 입력시 값 확인[전화번호]
function telCheck(inputTel) {
  const eTel = document.getElementById(inputTel);
  eTel.addEventListener("input", () => {
    if (eTel.value.trim().length === 0) {
      eTel.value = "";  // 띄어쓰기 못 넣게 하기
      checkObj[inputTel] = false;
      return;
    }
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;
    if (regEx.test(eTel.value)) {
      checkObj[inputTel] = true;
    } else {
      checkObj[inputTel] = false;
    }
  });
}
telCheck("orderTel");
telCheck("recvTel");

// 비어 있는지 값 확인[주소]
function addCheck(inputAdd) {
  const addList = document.querySelectorAll(`input[name="${inputAdd}"]`);
  for (let add of addList) {
    if (add.value.trim().length === 0) {
      checkObj[inputAdd] = false;
    } else {
      checkObj[inputAdd] = true;
    }
  }
}

// 회원 가입 form태그가 제출 되었을 때
document.getElementById("orderSubmit").addEventListener("submit", e => {
  // 미리 입력되어 있는 값 확인[이름]함수호출
  namePreCheck("orderName");
  namePreCheck("refundName");
  namePreCheck("orderRecvName");
  namePreCheck("paymentName");
  // 미리 입력되어 있는 값 확인[이메일]
  const orderEmail = document.getElementById("orderEmail");
  if (orderEmail.value.trim().length > 0) {
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    if (regEx.test(orderEmail.value)) {
      checkObj.orderEmail = true;
    } else {
      checkObj.orderEmail = false;
    }
  }
  // 미리 입력되어 있는 값 확인[전화번호]함수호출
  telPreCheck("orderTel");
  telPreCheck("recvTel");
  // 비어 있는지 값 확인[주소]함수호출
  addCheck("memberAddress");
  addCheck("receiverAddress");
  // 계좌번호 체크
  const refundAccount = document.getElementById("refundAccount");
  if (refundAccount.value.trim().length > 0) {
    const regEx = /^[0-9\-]{10,20}$/;
    if (regEx.test(refundAccount.value)) {
      checkObj.refundAccount = true;
    } else {
      checkObj.refundAccount = false;
    }
  }
  // 결제동의 체크
  const agreePayAll = document.getElementById('agreePayAll');
  if(agreePayAll.checked){
    checkObj.agreePayAll = true;
  }
  // 결제수단별 입금자명 체크
  if(document.getElementById('inputPay1').classList.contains("hidden")){
    checkObj.paymentName = true;
  }else{
    nameCheck("paymentName");
  }
  // 유효성검사
  for(let key in checkObj){
    if(!checkObj[key]){ // 각 key에 대한 value(true/false)를 얻어와
      // false인 경우 == 유효하지 않다!
      switch(key){
        case "orderName": 
        alert("주문자가 유효하지 않습니다"); break;
        case "refundName": 
        alert("환불자가 유효하지 않습니다"); break;
        case "orderRecvName":
        alert("받는사람이 유효하지 않습니다"); break;
        case "paymentName":
        alert("입금자명이 유효하지 않습니다"); break;
        case "orderEmail":
        alert("주문자 이메일이 유효하지 않습니다"); break;
        case "orderTel":
        alert("주문자 전화번호가 유효하지 않습니다"); break;
        case "recvTel":
        alert("받는사람 전화번호가 유효하지 않습니다"); break;
        case "memberAddress":
        alert("주문자 상세 주소까지 주소를 다 적어 주시기 바랍니다"); break;
        case "receiverAddress":
        alert("받는사람 상세 주소까지 주소를 다 적어 주시기 바랍니다"); break;
        case "refundAccount":
        alert("환불계좌번호가 유효하지 않습니다"); break;
        case "agreePayAll":
        alert("주문 내용을 확인하였으며 약관에 동의해주세요"); break;
      }
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
    }
  }
      
  // 주문자 주소 세팅
  const memberAddress = document.querySelectorAll("input[name='memberAddress']"); // 배송지주소
  const orderAdd = document.querySelector('[name="orderAdd"]'); // 제출용세팅
  orderAdd.value = memberAddress[0].value + "^^^" + memberAddress[1].value + "^^^" + memberAddress[2].value;
  // 배송지 주소 제출용에 세팅
  const deliveryAdd = document.querySelectorAll("input[name='receiverAddress']"); // 배송지주소
  const orderRecvAdd = document.querySelector('[name="orderRecvAdd"]'); // 제출용세팅
  orderRecvAdd.value = deliveryAdd[0].value + "^^^" + deliveryAdd[1].value + "^^^" + deliveryAdd[2].value;

  // 상품 품절확인
  e.preventDefault(); 

  let orderState = [];
  let fetchEnds = [];
  for(order of orderList){
    const orderData = {productNo: order.productNo, optionNo: order.optionNo, count: order.count};
    const fetchEnd = fetch("/orderCheck", {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=UTF-8"},
      body: JSON.stringify(orderData)
    })
    .then(resp => resp.text())
    .then(message => {
      if(message !=""){
        orderState.push(message);
      }
    }) 
    .catch( err => {
        console.log(err);
    } );
    fetchEnds.push(fetchEnd);
  }
  // 비동기요청 종료후 담긴 배열 내용 출력
  Promise.all(fetchEnds)
    .then(() => {
      if (orderState.length > 0) {
        const result = orderState.join("\n\n");
        alert(result);
        // 경고창 확인 누르면 특정 주소로 이동
        window.location.href = "/cart";
      } else {
        const payHow = document.querySelector('input[name="payment"]').value;
        if(payHow == '1') document.getElementById("orderSubmit").submit();
        else requestPay();
      }
    });
});


// 배송지 설정
const myShippingBtn = document.getElementById('myShippingBtn');
myShippingBtn.addEventListener('click', () => {
  window.location.href = "/myPage/shipping"
});

const shippingSelectBtn = document.getElementById('shippingSelectBtn');
const addSelect = document.querySelectorAll('[name="addSelect"]');
const addLists = document.getElementsByClassName("order-shipping-address");
shippingSelectBtn.addEventListener('click', () => {
  addSelect.forEach( (e,i) => {
    if(e.checked){
      const add = addressList[i].address.split("^^^");
      document.getElementById('orderRecvName').value = addressList[i].addressReceiver // 받는사람
      document.querySelectorAll("input[name='receiverAddress']").forEach( (item, j) =>{ // 주소
        item.value = add[j];
      } )
      document.getElementById('recvTel').value = addressList[i].addressTel // 받는사람전화번호

      document.getElementById("orderShippingBack").style.display="none";
      document.getElementById("orderShippingContent").style.display="none";
      document.body.style.removeProperty('overflow');
    }
  })
});

/* 결제 시스템 테스트 */
function requestPay() {

  const payHow = document.querySelector('input[name="payment"]').value;


  IMP.init('imp33621846');
  IMP.request_pay({
    pg : payHow == '2' ? 'kcp.A52CY' : 'kakaopay.TC0ONETIME' ,
    merchant_uid: orderMember.memberNo + new Date().getTime(), // 상점에서 관리하는 주문 번호
    name : document.getElementById('productName').innerText,
    amount : document.querySelector('[name="orderPayment"]').value,
    buyer_email : document.getElementById('orderEmail').value,
    buyer_name : document.getElementById('orderName').value,
    buyer_tel : document.getElementById('orderTel').value,
    buyer_addr : document.querySelector('[name="orderAdd"]').value,
    buyer_postcode : '123-456'
    }, function (rsp) { // callback
        if (rsp.success) {
            // console.log(rsp);
            document.getElementById("orderSubmit").submit();
        } else {
            // console.log(rsp);
        }
    });
  }



/* 
tosspay
payco
kakaopay.TC0ONETIME

*/