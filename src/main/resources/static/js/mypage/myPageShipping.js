/* 배송지 등록 모달 */
const enrollShippingModal = document.getElementById("ShippingEnrollModalOverlay")
const OpenenrollShippingModal = document.getElementById("openEnrollShippingModal");

/* 배송지 등록 버튼 클릭 시 */
OpenenrollShippingModal.addEventListener('click', () => {
    enrollShippingModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
});

/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
enrollShippingModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("shipping-enroll-modal-overlay")) {
        enrollShippingModal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(enrollShippingModal.style.display === "flex" && e.key === "Escape") {
        enrollShippingModal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});


/* 모달창 내부 닫기 버튼 */
const enrollShippingModalClose = document.getElementById("enrollShippingModalClose")
enrollShippingModalClose.addEventListener("click", e => {
    enrollShippingModal.style.display = "none";
    document.body.style.removeProperty('overflow');
});




/* 배송지 수정 모달 */
const modifyShippingModal = document.getElementById("ShippingModifyModalOverlay")
const selectedshippings = document.getElementsByClassName("selected-modifying-shipping")


for(let shipping of selectedshippings) {

  /* 회원 목록에서 한 회원 클릭시 */
  shipping.addEventListener('click', () => {
    modifyShippingModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
  });

};
    

/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
modifyShippingModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("shipping-modify-modal-overlay")) {
        modifyShippingModal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(modifyShippingModal.style.display === "flex" && e.key === "Escape") {
        modifyShippingModal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창 내부 닫기 버튼 */
const modifyShippingModalClose = document.getElementById("modifyShippingModalClose")
modifyShippingModalClose.addEventListener("click", e => {
    modifyShippingModal.style.display = "none";
    document.body.style.removeProperty('overflow');
});
