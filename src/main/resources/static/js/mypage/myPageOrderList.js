// 주문 상태 세팅
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
