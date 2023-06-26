// 주문 조회 날짜필터
const dateFilterBtn = document.querySelectorAll('#dateFilterBtn>li');
const dateFilter = document.querySelectorAll('#dateFilter>input');

dateFilterBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    const currentDate = new Date();
    const startDate = new Date();

    if (index === 0) startDate.setDate(currentDate.getDate());
    else if (index === 1)startDate.setDate(currentDate.getDate() - 7);
    else if (index === 2)startDate.setMonth(currentDate.getMonth() - 1);
    else if (index === 3) startDate.setMonth(currentDate.getMonth() - 3);
    else if (index === 4)  startDate.setMonth(currentDate.getMonth() - 6);
    
    dateFilter[0].value = formatDate(startDate);
    dateFilter[1].value = formatDate(currentDate);
  });
});

// "YYYY-MM-DD" 형식으로 변환
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


// 조회 조건 유지
const orderStates = document.querySelectorAll('#orderStateSelect>option');

for(let orderState of orderStates){
  if(orderState.value == os){
    orderState.selected = true;
  }
}

// 주문 상품정보 주문처리상태 세팅
const preOrderStates = document.querySelectorAll(".orderState");

for(let preOrderState of preOrderStates){
  let orderState = "";
  switch (preOrderState.innerText){
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
  preOrderState.innerText = orderState;
}


// 주문취소
const item = document.querySelectorAll(".item-choose");

item.forEach( e => {
  e.addEventListener('click', (event) => {
    if (event.target === e.children[0]) {
      const orderNo = {orderNo : e.children[1].value};

      if (confirm("정말 취소하시겠습니까?\n주문취소시 사용된 쿠폰은 반환되지 않습니다.")) {
        fetch("/order/cancle", {
          method: "POST",
          headers: {"Content-Type": "application/json; charset=UTF-8"},
          body: JSON.stringify(orderNo)
        })
        .then(resp => resp.text())
        .then(message => {
          
          alert(message)
        }) 
        .catch( err => {
            console.log(err);
        } );
      } else {
        return;
      }
    }
  });
});
