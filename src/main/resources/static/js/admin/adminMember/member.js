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
  fetch("/admin/member/memberOrderList?memberNo=" + memberNo)
  .then(response => response.json()) 
  .then(resultMap => {
    for(let order of resultMap.orderList){
      // tr생성
      const newRow = document.createElement("tr");
      // 네 번째 td 요소 생성
      const orderNoCell = document.createElement("td");
      orderNoCell.innerText = order.orderNo;
      newRow.appendChild(orderNoCell);
      const table = document.querySelector('.member-modal-orderlist-table>tbody'); 
      table.append(newRow);
  }

    }) 
  .catch (e => { console.log(e)}); 


  modal.style.display = "flex";
  document.body.style.overflowY = "hidden";

});

};
    
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




