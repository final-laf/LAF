/* 함수창을 닫을 때 마다 페이지네이션을 생성하는 함수  */
function getSelectedOption() {
  // 페이지네이션이 없으면 페이지네이션 다시 생성
  if(!document.getElementById("orderListPagination")) {

    const paginationArea = document.getElementById("orderListPaginationArea")
    const orderListUl = document.createElement("ul");
    orderListUl.classList.add("pagination")
    orderListUl.setAttribute("id", "orderListPagination")
    /* 첫 페이지로 이동 */
    const firstPage = document.createElement("li");
    const firstPageA = document.createElement("a");
    const firstPageImg = document.createElement("img");
    firstPageImg.setAttribute("src", "/images/common/paging/first-page.svg")
    firstPageA.append(firstPageImg);
    firstPage.append(firstPageA);
    orderListUl.append(firstPage);
    /* 이전 목록 마지막 번호로 이동 */
    const prevPage = document.createElement("li");
    const prevPageA = document.createElement("a");
    const prevPageImg = document.createElement("img");
    prevPageImg.setAttribute("src", "/images/common/paging/prev-page.svg")
    prevPageA.append(prevPageImg);
    prevPage.append(prevPageA);
    orderListUl.append(prevPage);
    /* 다음 목록 시작 번호로 이동 */
    const nextPage = document.createElement("li");
    const nextPageA = document.createElement("a");
    const nextPageImg = document.createElement("img");
    nextPageImg.setAttribute("src", "/images/common/paging/next-page.svg")
    nextPageA.append(nextPageImg);
    nextPage.append(nextPageA);
    orderListUl.append(nextPage);
    /* 끝 페이지로 이동 */
    const maxPage = document.createElement("li");
    const maxPageA = document.createElement("a");
    const maxPageImg = document.createElement("img");
    maxPageImg.setAttribute("src", "/images/common/paging/last-page.svg")
    maxPageA.append(maxPageImg);
    maxPage.append(maxPageA);
    orderListUl.append(maxPage);


    paginationArea.append(orderListUl)
    
    const notExist = document.getElementById("notExist")
    if(notExist) {
      notExist.remove();
    }
    
  }
  return;
}




/* 회원 상세 모달 */
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

  modal.style.display = "flex";
  document.body.style.overflowY = "hidden";

});

};

function loadOrderList (memberNo, cp){
  const orderTable = document.querySelector("#member-modal-orderlist-table > tbody")

  orderTable.innerHTML = '';

  fetch("/admin/member/memberOrderList?memberNo=" + memberNo + "&cp=" + cp)
  .then(response => response.json()) 
  .then(resultMap => {

  // 주문이 없는 경우
  if (resultMap.orderMaps.length == 0) {

    console.log(document.getElementById("orderListPagination"))

    // 페이지네이션 삭제
    const removePagenation = document.getElementById("orderListPagination");
    removePagenation.remove();
    const newRow = document.createElement("tr");
    // 주문이 없다는 테이블 row 생성
    const notExist = document.createElement("td");
    newRow.append(notExist);
    const notExistMessage = document.createElement("div");
    notExistMessage.innerText = "주문이 존재하지 않습니다.";
    notExist.append(notExistMessage);
    notExist.setAttribute("colspan", 6)
    notExist.setAttribute("id", "notExist")
    orderTable.append(newRow);

  } else {
    // 주문이 있는 경우
    console.log(resultMap)

    for(orderList of resultMap.orderMaps) {
      const order = orderList.order;
      const orderProductList = orderList.orderProductList;


      // tr생성
      const newRow = document.createElement("tr");
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
      orderUno.innerText = order.orderUno;
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
      orderTable.append(newRow)
    }

   /* 페이지네이션 */
  const OrderListpagination = resultMap.OrderListpagination

  // prevPage 다음 요소부터 endPage개수만큼 삭제
  // const removePaginations = document.getElementById("orderListPagination");
  // const list = removePaginations.children;
  // console.log(list.length)
  // if(list.length > (OrderListpagination.endPage + 2)) {
  //   console.log("삭제해야 할 때")
  //   for(let i=2; i< 2 + OrderListpagination.endPage; i++) {
  //     console.log(list[i])
  //     list[i].remove();
  //     console.log("list[i]")
  //   }
  // }

  document.getElementById("orderListPaginationArea").innerHTML = "";
  
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

  
  console.log(OrderListpagination.endPage)
  console.log(OrderListpagination.currentPage)
  console.log(nextPage.parentElement)

  // 특정 페이지로 이동
  for (let i = 1; i <= OrderListpagination.endPage; i++) {
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
  document.getElementById("orderListPaginationArea").append(pagination)


  // firstPage.setAttribute("href", "/admin/member/memberOrderList?cp=1")
  // // 이전 목록 마지막 번호로 이동
  // const prevPage =  document.querySelector("#prevPage > a");
  // prevPage.setAttribute("href", "/admin/member/memberOrderList?cp=" + OrderListpagination.prevPage)
  // // 특정 페이지로 이동
  // const nextPage =  document.querySelector("#nextPage > a");
  // for (let i = 1; i <= OrderListpagination.endPage; i++) {
  //   if(i == OrderListpagination.currentPage) {
  //     /* 현재 보고있는 페이지 */
  //     const currPage = document.createElement("li");
  //     const currPageA = document.createElement("a");
  //     currPageA.innerText = i;
  //     currPageA.classList.add("current");
  //     currPage.append(currPageA);
  //     nextPage.parentElement.before(currPage);
  //   } else {
  //     /* 현재 보고있는 페이지를 제외한 나머지 */
  //     const uniquePage = document.createElement("li");
  //     const uniquePageA = document.createElement("a");
  //     uniquePageA.innerText = i;
  //     uniquePageA.setAttribute("href", "#")

  //     uniquePageA.addEventListener("click", e => {
  //       e.preventDefault();
        
  //       loadOrderList (memberNo, i);
  //     });



  //     uniquePage.append(uniquePageA);
  //     nextPage.parentElement.before(uniquePage);
  //   }
  // }
  // // 다음 목록 시작 번호로 이동
  // nextPage.setAttribute("href", "/admin/member/memberOrderList?cp=" + OrderListpagination.nextPage)
  // // 끝 페이지로 이동
  // const maxPage =  document.querySelector("#maxPage > a");
  // nextPage.setAttribute("href", "/admin/member/memberOrderList?cp=" + OrderListpagination.maxPage)


  }  
    }) 
  .catch (e => { console.log(e)}); 
}




    
/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("member-modal-overlay")) {
        getSelectedOption()
        modal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
        getSelectedOption()
        modal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창 내부 닫기 버튼 */
const modalClose = document.getElementsByClassName("member-modal-close")[0];
modalClose.addEventListener("click", e => {
    getSelectedOption()
    modal.style.display = "none";
    document.body.style.removeProperty('overflow');
});

  
  



  
/* 쿠폰 발급 모달 */
const cuponModal = document.getElementById("memberCuponModalOverlay")
const OpenCuponModal = document.getElementById("OpenCuponModal");

/* 쿠폰 버튼 클릭 시 */
OpenCuponModal.addEventListener('click', () => {
    cuponModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
});


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




  
/* 포인트 발급 모달 */
const pointModal = document.getElementById("memberPointModalOverlay")
const OpenPointModal = document.getElementById("OpenPointModal");

/* 포인트 버튼 클릭 시 */
OpenPointModal.addEventListener('click', () => {
    pointModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
});


/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
pointModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("member-cupon-modal-overlay")) {
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




