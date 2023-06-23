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

/* 배송지 등록 시 다음 주소검색 api 활용
   같은 html 파일 내에서 등록/수정 각각의 경우마다 다른 input으로 입력해야 하기 때문에 함수 재정의
*/
function add_sample6_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
          var addr = ''; // 주소 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('add_sample6_postcode').value = data.zonecode;
          document.getElementById("add_sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("add_sample6_detailAddress").focus();
      }
  }).open();
}


/* 배송지 등록 유효성 검사 */
const checkObj = {
  "addAddressName" : false,
  "addRessReceiver" : false,
  "addAddressTel" : false,
  "addAddressCounts" : false
};

// 배송지명 정규식 확인
const addAddressName = document.getElementById("addAddressName");
addAddressName.addEventListener("input", () => {

// 30자 이내 (한글, 영문, 숫자 가능)
const regEx = /^[a-zA-Z가-힣0-9]{1,30}$/;

// 정규식을 통과한다면
if(regEx.test(addAddressName.value)){
  
  
  // 배송지명 중복 검사(수정필요)
  const existingAddressNames = document.querySelectorAll(".shipping-list-table > tbody > tr > td:nth-child(2)");
  for(let existingName of existingAddressNames) {
    console.log(existingName.innerText)
    console.log(addAddressName.value)
    if(existingName.innerText == addAddressName.value) {
      console.log("같잖아")
      checkObj.addAddressName = false;
    }
    return;
  }
  checkObj.addAddressName = true;


// 통과하지 않는다면
}else{
    checkObj.addAddressName = false;
}

});





// 받는 사람 성명 정규식 확인
const addRessReceiver = document.getElementById("addRessReceiver");
addRessReceiver.addEventListener("input", () => {

  // 20자 이내 (한글, 영문 가능)
  const regEx = /^[a-zA-Z가-힣]{1,20}$/;

  // 정규식을 통과한다면
  if(regEx.test(addRessReceiver.value)){
      checkObj.addRessReceiver = true;

  // 통과하지 않는다면
  }else{
      checkObj.addRessReceiver = false;
  }
});

// 전화번호 유효성 검사
const addAddressTel = document.getElementById("addAddressTel");

// 전화번호가 입력되었을 때
addAddressTel.addEventListener("input", () => {

  // 정규표현식으로 유효성 검사
  const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;
  if(regEx.test(addAddressTel.value)) {
      checkObj.addAddressTel = true;
    } else {
      checkObj.addAddressTel = false;
    } 
});

// 배송지가 3개 이상이면 false
const addAddressCounts = document.getElementsByClassName("orderShipping-Shipping-list")
if(addAddressCounts.length < 3) {
  checkObj.addAddressCounts = true;
}


// 배송지 등록 form태그가 제출 되었을 때
document.getElementById("submitAddShipping").addEventListener("submit", e=>{


  // 체크 되어 있으면 default flag가 Y로
  if(addAddressDefaultFL.checked) addAddressDefaultFL.value = "Y"  

  for(let key in checkObj){
      if(!checkObj[key]){ 
      switch(key){
          case "addAddressName":
          alert("배송지명은 30자 이내의 한글, 영문, 숫자만 입력 가능합니다."); break;
          case "addRessReceiver":
          alert("성명은 20자 이내의 한글, 영문만 입력 가능합니다."); break;
          case "addAddressTel" : 
          alert("휴대전화는 '-'를 제외한 숫자 11자리로 입력해주시기 바랍니다."); break;
          case "addAddressCounts" : 
          alert("배송 주소록은 최대 3개까지 등록할 수 있습니다."); break;
      }
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
      }
  }

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


