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
  shipping.addEventListener('click', (e) => {

    const shippingData = e.target.getAttribute("value");

    /* 정규식으로 키=값 이렇게 한 쌍이 되는 형식을 검증 */
    const regex = /(\w+)=(.+?)(?=, \w+=|$)/g;

    /* 키 값을 저장할 객체 */
    const shippingValues = {};

    /* 가져온 address의 value들을 values에 저장 */
    let match;
    while ((match = regex.exec(shippingData)) !== null) {
        const shippingKey = match[1]; // 
        const shippingValue = match[2]; // 속성값
        shippingValues[shippingKey] = shippingValue; // 객체에 속성과 값을 저장
    }

    
    // 배송지명, 수신자이름, 전화번호 입력
    document.getElementById("addressName").value = shippingValues.addressName
    document.getElementById("addressReceiver").value = shippingValues.addressReceiver
    document.getElementById("addressTel").value = shippingValues.addressTel

    // 주소 입력
    const arr = shippingValues.address.split("^^^");
    console.log(arr);
    const inputAddress =  document.getElementsByClassName("modyfy-shipping-address");
    inputAddress[0].value = arr[0];
    inputAddress[1].value = arr[1];
    inputAddress[2].value = arr[2];

    // 모달 열기
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




