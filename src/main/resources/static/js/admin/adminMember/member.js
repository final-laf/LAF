/* 회원 상세 모달 */
const modal = document.getElementById("memberModalOverlay")
const selectedMembers = document.getElementsByClassName("selected-member")


for(let member of selectedMembers) {

  /* 회원 목록에서 한 회원 클릭시 */
  member.addEventListener('click', () => {
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




