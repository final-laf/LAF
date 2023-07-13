/////////////////////////////////////////////////////////////////////// 페이지 초기 설정


/* 쿼리스트링으로 화면 초기설정 */
new URLSearchParams(location.search).forEach((value, key) => {
  if(value == '') return;

  switch(key) {
    case 'query' : document.getElementById('query').value = value; break;
    case 'qk' : document.querySelector('#queryKey > option[value="' + value + '"]').selected = true; break;
  }
})

/* 전체 클릭 */
const allChecked = document.getElementById("headCheckbox");
const adminMemberCheckbox = document.getElementsByClassName("admin-member-checkbox")
allChecked.addEventListener("click", e => {
  if(allChecked.checked) {
    for(input of adminMemberCheckbox) {
      input.checked = true;
    }
  } else {
    for(input of adminMemberCheckbox) {
      input.checked = false;
    }
  }
});





/////////////////////////////////////////////////////////////////////// 회원 상세 모달
//--------------------------------------------------------------- 회원 상세 모달용 함수

// 주문 내역 불러오는 함수
function loadOrderList (memberNo, cp){
  // 주문 내역 테이블 초기화
  const orderTable = document.querySelector("#member-modal-orderlist-table > tbody")
  orderTable.innerHTML = '';

  // 페이지네이션 처리된 주문내역 불러오기(비동기)
  fetch("/admin/member/memberOrderList?memberNo=" + memberNo + "&cp=" + cp)
  .then(response => response.json()) 
  .then(resultMap => {
    // resultMap : orderMaps - orderList - orderProductList
    //             OrderListpagination


  // 주문이 없는 경우
  if (resultMap.orderMaps.length == 0) {
    // 페이지네이션 삭제
    document.getElementById("orderListPaginationArea").innerHTML = '';
    // 주문이 없다는 테이블 row 생성
    const newRow = document.createElement("tr");
    const notExist = document.createElement("td");
    newRow.append(notExist);
    const notExistMessage = document.createElement("div");
    notExistMessage.innerText = "주문이 존재하지 않습니다.";
    notExist.append(notExistMessage);
    notExist.setAttribute("colspan", 6)
    notExist.setAttribute("id", "notExist")
    orderTable.append(newRow);

    
  // 주문이 있는 경우
  } else {
    for(orderList of resultMap.orderMaps) {
      // 주문 내역 테이블 생성
      const order = orderList.order;
      const orderProductList = orderList.orderProductList;
      // tr생성
      const newRow = document.createElement("tr");
      newRow.style.cursor="pointer";
      newRow.addEventListener("click", e => {
        location.href="/order/" + order.orderNo;
      });
      // td생성
      // 주문정보
      const orderInfoCell = document.createElement("td");
      newRow.append(orderInfoCell);
      const orderDate = document.createElement("div");
      orderDate.innerText = order.orderDate;
      orderInfoCell.append(orderDate);
      const orderUno = document.createElement("div");
      orderUno.innerText = "[" + order.orderUno + "]";
      orderInfoCell.append(orderUno);
      // 이미지
      const orderProductImg = document.createElement("td");
      const productImg = document.createElement("img");
      productImg.setAttribute("src", orderProductList[0].product.thumbnailPath)
      orderProductImg.append(productImg);
      newRow.append(orderProductImg);
      // 상품정보
      const orderProductInfoCell = document.createElement("td");
      newRow.append(orderProductInfoCell);
      const orderProductName = document.createElement("div");
      orderProductName.innerText = orderProductList[0].product.productName;
      orderProductInfoCell.append(orderProductName);
      const orderProductOption = document.createElement("div");
      // 사이즈 옵션이 있을 경우, 없을 경우
      if(orderProductList[0].option.size == null | orderProductList[0].option.size == "") {
        orderProductOption.innerText = 
        "[옵션 :" + orderProductList[0].option.color + "]"
      } else {
        orderProductOption.innerText = 
        "[옵션 :" + orderProductList[0].option.color + "/" + orderProductList[0].option.size + "]"
      }
      orderProductInfoCell.append(orderProductOption); 
      // 수량
      const orderProductCountCell = document.createElement("td");
      newRow.append(orderProductCountCell);
      const orderProductCount = document.createElement("div");
      orderProductCount.innerText = orderProductList.length;
      orderProductCountCell.append(orderProductCount);
      // 구매금액
      const orderPriceCell = document.createElement("td");
      newRow.append(orderPriceCell);
      const orderPrice = document.createElement("div");
      orderPrice.innerText = order.orderTotalPrice;
      orderPrice.style.textDecoration="line-through"
      orderPrice.style.fontSize="1.0rem"
      orderPriceCell.append(orderPrice);
      const orderTotalPrice = document.createElement("div");
      orderTotalPrice.innerText = order.orderPayment;
      orderPriceCell.append(orderTotalPrice);
      // 주문처리상태
      const orderStateCell = document.createElement("td");
      newRow.append(orderStateCell);
      const orderState = document.createElement("div");
      switch(order.orderState) {
        case 'A' : orderState.innerText = "주문접수"; break;
        case 'B' : orderState.innerText = "결제확인"; break;
        case 'C' : orderState.innerText = "상품준비"; break;
        case 'D' : orderState.innerText = "출고완료"; break;
        case 'E' : orderState.innerText = "배송중"; break;
        case 'F' : orderState.innerText = "배송완료"; break;
        case 'G' : orderState.innerText = "취소중"; break;
        case 'H' : orderState.innerText = "취소완료"; break;
        case 'I' : orderState.innerText = "교환중"; break;
        case 'J' : orderState.innerText = "교환완료"; break;
        case 'K' : orderState.innerText = "반품중"; break;
        case 'L' : orderState.innerText = "반품완료"; break;
        default : break;
      } 
      orderStateCell.append(orderState);
      // 기존 테이블에 추가
      orderTable.append(newRow)
    }

    /* 페이지네이션 */
    const OrderListpagination = resultMap.OrderListpagination
    // 페이지네이션 초기화
    document.getElementById("orderListPaginationArea").innerHTML = "";
    // 페이지네이션 ul 생성
    const pagination = document.createElement("ul")
    pagination.classList.add("orderListPagination")
    // 첫 페이지로 이동
    const firstPage =  document.createElement("li")
    const firstPageImg = document.createElement("img");
    firstPageImg.setAttribute("id", "firstPage")
    firstPageImg.setAttribute("src", "/images/common/paging/first-page.svg")
    firstPage.append(firstPageImg);
    firstPage.addEventListener("click", () => {
      loadOrderList (memberNo, 1);
    });
    pagination.append(firstPage);
    // 이전 목록 마지막 번호로 이동
    const prevPage =  document.createElement("li")
    const prevPageImg = document.createElement("img");
    prevPageImg.setAttribute("id", "prevPage")
    prevPageImg.setAttribute("src", "/images/common/paging/prev-page.svg")
    prevPage.append(prevPageImg);
    prevPage.addEventListener("click", () => {
      loadOrderList (memberNo, OrderListpagination.prevPage);
    });
    pagination.append(prevPage);
    // 다음 목록 시작 번호로 이동
    const nextPage =  document.createElement("li")
    const nextPageImg = document.createElement("img");
    nextPageImg.setAttribute("id", "prevPage")
    nextPageImg.setAttribute("src", "/images/common/paging/next-page.svg")
    nextPage.append(nextPageImg);
    nextPage.addEventListener("click", () => {
      loadOrderList (memberNo, OrderListpagination.nextPage);
    });
    pagination.append(nextPage);
    // 끝 페이지로 이동
    const maxPage =  document.createElement("li")
    const maxPageImg = document.createElement("img");
    maxPageImg.setAttribute("id", "prevPage")
    maxPageImg.setAttribute("src", "/images/common/paging/last-page.svg")
    maxPage.append(maxPageImg);
    maxPage.addEventListener("click", () => {
      loadOrderList (memberNo, OrderListpagination.maxPage);
    });
    pagination.append(maxPage);
    // 특정 페이지로 이동
    for (let i = OrderListpagination.startPage; i <= OrderListpagination.endPage; i++) {
      if(i == OrderListpagination.currentPage) {
        /* 현재 보고있는 페이지 */
        const currPage = document.createElement("li");
        currPage.innerText = i;
        currPage.classList.add("current");
        nextPage.parentElement.insertBefore(currPage, nextPage);
      } else {
        /* 현재 보고있는 페이지를 제외한 나머지 */
        const uniquePage = document.createElement("li");
        uniquePage.innerText = i;
        uniquePage.addEventListener("click", () => {
          loadOrderList (memberNo, i);
        });
        nextPage.parentElement.insertBefore(uniquePage, nextPage);
      }
    }
    // 페이지네이션 영역에 추가
    document.getElementById("orderListPaginationArea").append(pagination)
  }  
    }) 
  .catch (e => { console.log(e)}); 
}


// 적립금 내역 불러오는 함수
function loadPointList (memberNo, cp){

  // // 주문 내역 테이블 초기화
  const pointTable = document.querySelector("#member-modal-pointList-table > tbody")
  pointTable.innerHTML = '';

  // 페이지네이션 처리된 주문내역 불러오기(비동기)
  fetch("/admin/member/memberPointList?memberNo=" + memberNo + "&cp=" + cp)
  .then(response => response.json()) 
  .then(resultMap => {

  
    const pointList = resultMap.pointList;
    // 포인트 적립 내역이 없는 경우
    if (pointList.length == 0) {
    // 페이지네이션 삭제
    document.getElementById("pointListPaginationArea").innerHTML = '';
    // 포인트 적립 내역이 없다는 테이블 row 생성
    const newRow = document.createElement("tr");
    const notExist = document.createElement("td");
    newRow.append(notExist);
    const notExistMessage = document.createElement("div");
    notExistMessage.innerText = "포인트 적립 내역이 존재하지 않습니다.";
    notExist.append(notExistMessage);
    notExist.setAttribute("colspan", 6)
    notExist.setAttribute("id", "notExist")
    pointTable.append(newRow);

    
  // 포인트 적립 내역이 있는 경우
  } else {
    for(point of pointList) {
      // 포인트 적립 내역 테이블 생성
      // tr생성
      const newRow = document.createElement("tr");
      // td생성
      // 포인트 번호
      const pointNoCell = document.createElement("td");
      pointNoCell.innerText = point.pointNo;
      newRow.append(pointNoCell);
      // 구분
      const pointSortCell = document.createElement("td");
      switch(point.pointSort) {
        case 'G' : pointSortCell.innerText = "적립"; break;
        case 'U' : pointSortCell.innerText = "사용"; break;
        case 'C' : pointSortCell.innerText = "취소"; break;
        default : break;
      }
      newRow.append(pointSortCell); 
      // 지급/차감 포인트 금액
      const pointAmountCell = document.createElement("td");
      pointAmountCell.innerText = point.pointAmount + " 원";
      newRow.append(pointAmountCell);
      // 사유
      const pointContentCell = document.createElement("td");
      pointContentCell.innerText = point.pointContent;
      newRow.append(pointContentCell);
      // 지급/차감일
      const pointDateCell = document.createElement("td");
      pointDateCell.innerText = point.pointDate.substring(0, 10);
      newRow.append(pointDateCell);
      // // 기존 테이블에 추가
      pointTable.append(newRow)
    }

    /* 페이지네이션 */
    const PointListpagination = resultMap.PointListpagination
    // 페이지네이션 초기화
    document.getElementById("pointListPaginationArea").innerHTML = "";
    // 페이지네이션 ul 생성
    const pagination = document.createElement("ul")
    pagination.classList.add("pointListPagination")
    // 첫 페이지로 이동
    const firstPage =  document.createElement("li")
    const firstPageImg = document.createElement("img");
    firstPageImg.setAttribute("id", "firstPage")
    firstPageImg.setAttribute("src", "/images/common/paging/first-page.svg")
    firstPage.append(firstPageImg);
    firstPage.addEventListener("click", () => {
      loadPointList (memberNo, 1);
    });
    pagination.append(firstPage);
    // 이전 목록 마지막 번호로 이동
    const prevPage =  document.createElement("li")
    const prevPageImg = document.createElement("img");
    prevPageImg.setAttribute("id", "prevPage")
    prevPageImg.setAttribute("src", "/images/common/paging/prev-page.svg")
    prevPage.append(prevPageImg);
    prevPage.addEventListener("click", () => {
      loadPointList (memberNo, PointListpagination.prevPage);
    });
    pagination.append(prevPage);
    // 다음 목록 시작 번호로 이동
    const nextPage =  document.createElement("li")
    const nextPageImg = document.createElement("img");
    nextPageImg.setAttribute("id", "prevPage")
    nextPageImg.setAttribute("src", "/images/common/paging/next-page.svg")
    nextPage.append(nextPageImg);
    nextPage.addEventListener("click", () => {
      loadPointList (memberNo, PointListpagination.nextPage);
    });
    pagination.append(nextPage);
    // 끝 페이지로 이동
    const maxPage =  document.createElement("li")
    const maxPageImg = document.createElement("img");
    maxPageImg.setAttribute("id", "prevPage")
    maxPageImg.setAttribute("src", "/images/common/paging/last-page.svg")
    maxPage.append(maxPageImg);
    maxPage.addEventListener("click", () => {
      loadPointList (memberNo, PointListpagination.maxPage);
    });
    pagination.append(maxPage);
    // 특정 페이지로 이동
    for (let i = PointListpagination.startPage; i <= PointListpagination.endPage; i++) {
      if(i == PointListpagination.currentPage) {
        /* 현재 보고있는 페이지 */
        const currPage = document.createElement("li");
        currPage.innerText = i;
        currPage.classList.add("current");
        nextPage.parentElement.insertBefore(currPage, nextPage);
      } else {
        /* 현재 보고있는 페이지를 제외한 나머지 */
        const uniquePage = document.createElement("li");
        uniquePage.innerText = i;
        uniquePage.addEventListener("click", () => {
          loadPointList (memberNo, i);
        });
        nextPage.parentElement.insertBefore(uniquePage, nextPage);
      }
    }
    // 페이지네이션 영역에 추가
    document.getElementById("pointListPaginationArea").append(pagination)
  }  
    }) 
  .catch (e => { console.log(e)}); 
}







//----------------------------------------------------------------- 회원 상세 모달 오픈
const modal = document.getElementById("memberModalOverlay")
const selectedMembers = document.getElementsByClassName("selected-member")

for(let member of selectedMembers) {

  /* 회원 목록에서 한 회원 클릭시 */
  member.addEventListener('click', e => {
    // 회원 정보 불러오기
    const memberNo = e.target.getAttribute("memberNo");
    fetch("/admin/member/memberdetail?memberNo=" + memberNo)
    .then(response => response.json()) 
    .then(member => {
    let memberSocial;
    if (member.memberSocial == "N") memberSocial = "카카오 회원 가입"
    else                            memberSocial = "일반 회원 가입"
    let memberDelFl;
    if (member.memberDelFL == "Y") memberDelFl = "탈퇴 회원"
    else                           memberDelFl = "일반 회원"
    let memberGrade
    switch(member.memberGrade) {
        case "B" : memberGrade = "브론즈"; break;
        case "S" : memberGrade = "실버"; break;
        case "G" : memberGrade = "골드"; break;
        case "D" : memberGrade = "다이아"; break;
        default : break;
    }
    let memberAddress;
    if(member.memberAddress != null){
        const arr = member.memberAddress.split("^^^");
        memberAddress = arr.join(" ").substring(5);
    }

    document.getElementById("selectedMemberName").innerText = member.memberName;
    document.getElementById("selectedMemberInvironment").innerText= memberSocial;
    document.getElementById("selectedMemberEnrollDate").innerText= member.memberEnrollDate;
    document.getElementById("selectedMemberStatus").innerText= memberDelFl;
    document.getElementById("selectedMemberGrade").innerText= memberGrade;
    document.getElementById("selectedMemberId").innerText = member.memberId;
    document.getElementById("selectedMemberBirth").innerText = member.memberBirth;
    document.getElementById("selectedMemberAddress").innerText = memberAddress;

    }) 
    .catch (e => { console.log(e)}); 
    
    
    // 회원 기본 배송지 불러오기
    fetch("/admin/member/defaultAddress?memberNo=" + memberNo)
    .then(response => response.text()) 
    .then(address => {
    let memberdetailDefaultAddress;
    if(address == "N") {memberdetailDefaultAddress = "";}
    else {
        const arr = address.split("^^^");
        memberdetailDefaultAddress = arr.join(" ").substring(5);
    }
        document.getElementById("selectedMemberDefaultAddress").innerText = memberdetailDefaultAddress       
    }) 
    .catch (e => { console.log(e)}); 
  
    // 주문 내역 불러오기
    loadOrderList (memberNo,1);
    // 포인트 내역 불러오기
    loadPointList (memberNo,1);
  // 모달 오픈
  modal.style.display = "flex";
  document.body.style.overflowY = "hidden";
});
};


//---------------------------------------------------------------------- 회원 상세 모달 닫기

    
/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("member-modal-overlay")) {
        modal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
        modal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창 내부 닫기 버튼 */
const modalClose = document.getElementsByClassName("member-modal-close")[0];
modalClose.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.removeProperty('overflow');
});

  








/////////////////////////////////////////////////////////////////////// 쿠폰 발급 모달
//---------------------------------------------------------------------- 쿠폰 발급 클릭 시
const cuponModal = document.getElementById("memberCuponModalOverlay")
const OpenCuponModal = document.getElementById("OpenCuponModal");

/* 쿠폰 버튼 클릭 시 */
OpenCuponModal.addEventListener('click', () => {

  /* couponGetDate 기본세팅값 오늘로 설정, couponGetDate 와 couponDueDate는 오늘 이후로만 설정 가능하도록 */
  const today = new Date().toISOString().substring(0, 10);
  document.querySelector("input[name=couponGetDate]").value = today
  document.querySelector("input[name=couponGetDate]").setAttribute("min", today);
  document.querySelector("input[name=couponDueDate]").setAttribute("min", today);

  /* 모달창 활성화 */
  cuponModal.style.display = "flex";
  document.body.style.overflowY = "hidden";
});



//---------------------------------------------------------------------- 모달창 닫기


/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
cuponModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("member-cupon-modal-overlay")) {
        cuponModal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(cuponModal.style.display === "flex" && e.key === "Escape") {
        cuponModal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});


/* 모달창 내부 닫기 버튼 */
const cuponModalClose = document.getElementById("cuponModalClose")
cuponModalClose.addEventListener("click", e => {
    cuponModal.style.display = "none";
    document.body.style.removeProperty('overflow');
});




//---------------------------------------------------------------------- 유효성검사

// 확인해야 할 것
// - 쿠폰명은 한글 영어 숫자 특수문자 포함 100자 이내
// - 유효기간은 6자

// check확인용 
const couponCheckObj = {
  "couponName" : false,
  "couponGetDate" : false, 
  "couponDueDate" : false
};



// 쿠폰명이 입력되었을 때
const couponName = document.getElementById("couponName");
couponName.addEventListener("input", () => {

   // 쿠폰명이 입력되지 않은 경우
  if(couponName.value.trim().length == 0) {
    couponName.value = ""; // 띄어쓰기 못 넣게 하기
    couponCheckObj.couponName = false; // 빈칸 == 유효하지 않다
  return;
  }

  // 정규표현식으로 유효성 검사
  const regEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\-!/*& ()<>%^]+$/;
  if(regEx.test(couponName.value)) { // 유효
    couponCheckObj.couponName = true;
    } else { // 무효
    couponCheckObj.couponName = false;
  }
});

// 쿠폰 발급일이 입력되었을 때 
const couponGetDate = document.getElementById("couponGetDate");
couponGetDate.addEventListener("input", () => {

  // 쿠폰 발급일이 입력되지 않은 경우
  if(couponGetDate.value.trim().length == 0) {
  couponGetDate.value = ""; // 띄어쓰기 못 넣게 하기
    couponCheckObj.couponGetDate = false; // 빈칸 == 유효하지 않다
    return;
  }
  
  // 정규표현식으로 유효성 검사
  const regEx = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if(regEx.test(couponGetDate.value)) { // 유효
    couponCheckObj.couponGetDate = true;
  } else { // 무효
    couponCheckObj.couponGetDate = false;
  } 
});


// 쿠폰 유효기간이 입력되었을 때 
const couponDueDate = document.getElementById("couponDueDate");
couponDueDate.addEventListener("input", () => {

  // 정규표현식으로 유효성 검사
  const regEx = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if(regEx.test(couponDueDate.value)) { // 유효
    couponCheckObj.couponDueDate = true;
  } else { // 무효
    couponCheckObj.couponDueDate = false;
  } 
});


console.log(couponGetDate.value.trim().length)

// form태그가 제출 되었을 때
document.getElementById("submitCoupon").addEventListener("submit", e=>{
  

  // input 이벤트 없이 쿠폰 발급일 기본값(해당일) 그대로 제출하는 경우
  if(couponGetDate.value.trim().length > 0) {
    couponCheckObj.couponGetDate = true;
  }

  console.log(couponCheckObj)
  

  for(let key in couponCheckObj){
    if(!couponCheckObj[key]){
      switch(key){
        case "couponName": 
        alert("쿠폰명을 형식에 맞게 입력해 주세요."); break;
        case "couponGetDate": 
        alert("쿠폰 발급일을 형식에 맞게 입력해 주세요."); break;
        case "couponDueDate":
        alert("쿠폰 유효기한을 형식에 맞게 입력해 주세요."); break;
      }
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
    }
  }

});























/////////////////////////////////////////////////////////////////////// 적립금 발급 모달

const pointModal = document.getElementById("memberPointModalOverlay")
const OpenPointModal = document.getElementById("OpenPointModal");

//---------------------------------------------------------------------- 적립금 지급 클릭 시
OpenPointModal.addEventListener('click', () => {

    
  /* pointDate 기본세팅값 오늘로 설정, pointDate 와 pointDueDate는 오늘 이후로만 설정 가능하도록 */
  const today = new Date().toISOString().substring(0, 10);
  document.querySelector("input[name=pointDate]").value = today
  document.querySelector("input[name=pointDate]").setAttribute("min", today);
  document.querySelector("input[name=pointDueDate]").setAttribute("min", today);


  // 발급할 회원 목록 초기화
  const memberNameDiv = document.getElementsByClassName("point-member")[0]
  const memberNameAllDiv = document.getElementsByClassName("point-member-all")[0]
  memberNameDiv.innerHTML = '';
  memberNameAllDiv.innerHTML = '';


  // 선택된 체그박스 값 확인
  let members = [] // 객체로 만든 member에 대한 정보를 저장할 배열
  // const adminMemberCheckbox : 본문의 checkbox들 (상단 전체선택에서 이미 선언되어 있음)
  for(let i=0; i<adminMemberCheckbox.length; i++) {
    if(adminMemberCheckbox[i].checked) {
        // 만약 선택되어 있으면, 내부에 있는 value를 가져와 js object 형태로 만들기
        const checkboxDatas = adminMemberCheckbox[i].value;
        const regex = /(\w+)=(.+?)(?=, \w+=|$)/g;
        const checkboxDatasObjects = {};
        let match;
        while ((match = regex.exec(checkboxDatas))!= null) {
          const checkboxDataKey = match[1];
          const checkboxDataValu = match[2];
          checkboxDatasObjects[checkboxDataKey] = checkboxDataValu;
        }
        // 만든 object들을 배열로 만들기
        members.push(checkboxDatasObjects);
      }
  }
  if(members.length == 0) {
    alert("회원을 선택해 주시기 바랍니다.")
    return;
  }

  // 발급할 회원 이름 목록 출력 (대표자 외 1명)
  const selectedMemberName = document.createElement("span")
  if(members.length < 2) {
    selectedMemberName.innerText = members[0].memberName; 
  } else {
    selectedMemberName.innerText = members[0].memberName + "외 " + (members.length - 1) + "명";
  }
  memberNameDiv.append(selectedMemberName);



  // 발급할 회원 이름 목록 출력 (전체)
  const selectedMemberNameAll = document.createElement("span")
  for (let i=0; i<members.length; i++) {
    if(i == (members.length - 1)) {
      selectedMemberNameAll.innerText = selectedMemberNameAll.innerText + members[i].memberName;
    } else {
      selectedMemberNameAll.innerText = selectedMemberNameAll.innerText + members[i].memberName + ", ";
    }
  }
  memberNameAllDiv.append(selectedMemberNameAll);
  

  // 넘겨줄 memberNo를 input(hidden)에 value로 삽입
  for(let member of members) {
    const selectMemberNo = document.createElement("input");
    selectMemberNo.setAttribute("type", "hidden");
    selectMemberNo.setAttribute("name", "memberNo");
    selectMemberNo.value = member.memberNo
    memberNameDiv.append(selectMemberNo);
  }

  // 더보기 화살표 클릭 시 전체 회원 목록이 보이게
  document.getElementById("moreMember").addEventListener("click", e => {
    console.log(e.target)
    const pointMemberAll = document.getElementById("pointMemberAll")
    const modalWindow = document.querySelector("#memberPointModalOverlay > div")
    console.log(pointMemberAll)
    console.log(pointMemberAll.style.display)
    pointMemberAll.style.display = ((pointMemberAll.style.display=='none' || pointMemberAll.style.display=="") ? 'flex' : 'none');
    modalWindow.style.height = ((modalWindow.style.height!='350px') ? '350px' : '300px');
    });

  // 모달창 열기
    pointModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
});


//---------------------------------------------------------------------- 모달창 닫기


/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
pointModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("member-point-modal-overlay")) {
        pointModal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(pointModal.style.display === "flex" && e.key === "Escape") {
        pointModal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});


/* 모달창 내부 닫기 버튼 */
const pointModalClose = document.getElementById("pointModalClose")
pointModalClose.addEventListener("click", e => {
    pointModal.style.display = "none";
    document.body.style.removeProperty('overflow');
});



//---------------------------------------------------------------------- 유효성검사

// 확인해야 할 것
// - 적립금 입력은 숫자만
// - 유효기간은 6자
// - 사유는 한글 영어 숫자 특수문자 포함 100자 이내

// check확인용 
const pointCheckObj = {
  "pointAmount" : false,
  "pointDate" : false, 
  "pointDueDate" : true,
  "pointContent" : false
};

// 적립금 금액이 입력되었을 때
const pointAmount = document.getElementById("pointAmount");
pointAmount.addEventListener("input", () => {

   // 적립금이 입력되지 않은 경우
  if(pointAmount.value.trim().length == 0) {
    pointAmount.value = ""; // 띄어쓰기 못 넣게 하기
    pointCheckObj.pointAmount = false; // 빈칸 == 유효하지 않다
  return;
  }

  // 정규표현식으로 유효성 검사
  const regEx = /^[0-9]{1,6}$/;
  if(regEx.test(pointAmount.value)) { // 유효
    pointCheckObj.pointAmount = true;
    } else { // 무효
    pointCheckObj.pointAmount = false;
  }
});


// 적립금 지급/차감 날짜가 입력되었을 때 
const pointDate = document.getElementById("pointDate");
pointDate.addEventListener("input", () => {

  // 적립금 지급/차감 날짜가 입력되지 않은 경우
  if(pointDate.value.trim().length == 0) {
  pointDate.value = ""; // 띄어쓰기 못 넣게 하기
    pointCheckObj.pointDate = false; // 빈칸 == 유효하지 않다
    return;
  }
  
  // 정규표현식으로 유효성 검사
  const regEx = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if(regEx.test(pointDate.value)) { // 유효
    pointCheckObj.pointDate = true;
  } else { // 무효
    pointCheckObj.pointDate = false;
  } 
});


// 적립금 유효기간이 입력되었을 때 
const pointDueDate = document.getElementById("pointDueDate");
pointDueDate.addEventListener("input", () => {

  // 정규표현식으로 유효성 검사
  const regEx = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if(regEx.test(pointDueDate.value)) { // 유효
    pointCheckObj.pointDueDate = true;
  } else { // 무효
    pointCheckObj.pointDueDate = false;
  } 
});



// 적립 사유가 입력되었을 때
const pointContent = document.getElementById("pointContent");
pointContent.addEventListener("input", () => {

   // 적립 사유가 입력되지 않은 경우
  if(pointContent.value.trim().length == 0) {
    pointContent.value = ""; // 띄어쓰기 못 넣게 하기
    pointCheckObj.pointContent = false; // 빈칸 == 유효하지 않다
  return;
  }

  // 정규표현식으로 유효성 검사
  const regEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\-!/*& ()<>%^]+$/;
  if(regEx.test(pointContent.value)) { // 유효
    pointCheckObj.pointContent = true;
    } else { // 무효
    pointCheckObj.pointContent = false;
  }
});


// form태그가 제출 되었을 때
document.getElementById("submitPoint").addEventListener("submit", e=>{
  

  // input 이벤트 없이 적립/사용일 기본값(해당일) 그대로 제출하는 경우
  if(pointDate.value.trim().length > 0) {
    pointCheckObj.pointDate = true;
  }
  

  for(let key in pointCheckObj){
    if(!pointCheckObj[key]){
      switch(key){
        case "pointAmount": 
        alert("금액을 형식에 맞게 입력해 주세요."); break;
        case "pointDate": 
        alert("적립금 지급/차감일을 형식에 맞게 입력해 주세요."); break;
        case "pointDueDate":
        alert("적립금 유효기한을 형식에 맞게 입력해 주세요."); break;
        case "pointContent":
        alert("적립금 지급 사유를 형식에 맞게 입력해 주세요"); 
        break;
      }
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
    }
  }

});
