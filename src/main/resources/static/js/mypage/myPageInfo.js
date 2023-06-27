// 취소 버튼 클릭 시 마이페이지 대시보드로 이동
document.getElementById("cancelButton").addEventListener("click", () => {
  location.href="/myPage";
});


/* DB에 있는 값이 미리 셀렉트 되어있게*/
/* 성별 */
const options = document.querySelector("[name=memberGender]").options;
for(let option of options) {
  if(option.value == loginMember.memberGender) {
    option.selected=true;
  }
}

/* 은행명 */
const banks = document.querySelector("[name=refundBank]").options;
for(let bank of banks) {
  if(bank.value == loginMember.refundBank) {
    bank.selected=true;
  }
}

/* 로그인 멤버 주소를 미리 주소 value로 넣어두기*/
if(loginMember.memberAddress != null){
  const arr = loginMember.memberAddress.split("^^^");
  document.querySelectorAll("input[name='memberAddress']").forEach( (item, i) =>{
    item.value = arr[i];
  } );
}


// 회원 가입 check확인용 
const checkObj = {
  "memberName" : true,
  "memberAddress" : true,
  "memberTel" : true,
  "memberEmail" : true,
  "authKey" : false,
  "mypageSignUpYear" : true,
  "mypageSignUpMonth" : true,
  "mypageSignUpDay" : true,
  "mypageSignUpRefundNo" : true,
};





// 이름 정규식 확인
const memberName = document.getElementById("mypageSignUpName");
  
memberName.addEventListener("input", () => {

    // 이름이 입력되지 않은 경우
    if(memberName.value.trim().length == 0) {
      memberName.value = ""; // 띄어쓰기 못 넣게 하기
      checkObj.memberName = false; // 빈칸 == 유효하지 않다
      return;
  }

// 정규식 최소 8글자 최대 16글자 문자/숫자/특수문자 중 두가지 이상 조합 비밀번호
  const regEx = /^[a-zA-Z가-힣]{1,20}$/;

  // 정규식을 통과한다면
  if(regEx.test(memberName.value)){
    checkObj.memberName = true;

  // 통과하지 않는다면
  }else{
    checkObj.memberName = false;
  }
});
  



//전화번호
// 전화번호 유효성 검사
const memberTel = document.getElementById("mypageSignUpTelF");
const phoneMessage = document.getElementById("phoneMessage");

// 전화번호가 입력되었을 때
memberTel.addEventListener("input", () => {

   // 전화번호가 입력되지 않은 경우
   if(memberTel.value.trim().length == 0) {
    memberTel.value = ""; // 띄어쓰기 못 넣게 하기
    phoneMessage.innerText="'-'를 제외한 숫자만 입력 바랍니다."
    memberTel.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
    checkObj.memberTel = false; // 빈칸 == 유효하지 않다
    return;
}

  // 정규표현식으로 유효성 검사
  const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;
  if(regEx.test(memberTel.value)) { // 유효
      phoneMessage.innerText="유효한 전화번호 입니다."
      memberTel.classList.add("confirm");
      memberTel.classList.remove("error");
      checkObj.memberTel = true;
    } else { // 무효
      phoneMessage.innerText="유효하지 않은 전화번호 입니다."
      memberTel.classList.add("error");
      memberTel.classList.remove("confirm");
      checkObj.memberTel = false;
  }
});


// 이메일 확인 방법
document.getElementById("mypageSignUpMail").addEventListener("input", () => {

  // 이메일 유효성 검사
  const memberEmail = document.getElementById("mypageSignUpMail");


  // 기존의 이메일과 지금의 이메일 주소가 같을 경우
  if(loginMember.memberAddress == memberEmail.value ) {
    checkObj.authKey = true;
    return;
  } 
  else { // 같지 않을 경우
    
      // 이메일이 입력되지 않은 경우
      if(memberEmail.value.trim().length == 0) {
        memberEmail.value = ""; // 띄어쓰기 못 넣게 하기
        memberEmail.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
        emailMessage.innerText=""
        emailMessage.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
        checkObj.memberEmail = false; // 빈칸 == 유효하지 않다
        return;
    }
    
      const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    
      if(regEx.test(memberEmail.value) ){ // 유효한 경우
        // 중복 검사
        fetch('/dupCheck/email?memberEmail=' + memberEmail.value)
        .then(response => response.text()) 
        .then(count => {
          if(count == 0){
            memberEmail.classList.add("confirm");  
            memberEmail.classList.remove("error");  
            emailMessage.innerText=""
            checkObj.memberEmail = true; 
            
          }else{
            memberEmail.classList.add("error"); 
            memberEmail.classList.remove("confirm"); 
            emailMessage.classList.add("error"); 
            emailMessage.innerText="중복된 이메일 입니다."
            checkObj.memberEmail = false; 
          }
        })
        
        .catch(err => console.log(err)); 
      } else { // 유효하지 않은 경우(무효인 경우)
        memberEmail.classList.add("error");  
        memberEmail.classList.remove("confirm");  
        emailMessage.classList.add("error"); 
        emailMessage.innerText="유효하지 않은 이메일 입니다."
        checkObj.memberEmail = false; 
      }
  }
})


// 이메일 인증
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
let authTimer;
let authMin = 4;
let authSec = 59;

// 인증번호를 발송한 이메일 저장
let tempEmail;

sendAuthKeyBtn.addEventListener("click", function(){
  
  const memberEmail = document.getElementById("mypageSignUpMail");
  
  // 기존의 이메일과 지금의 이메일 주소가 같을 경우
  if(loginMember.memberEmail == document.getElementById("mypageSignUpMail").value ) {
    alert("이미 인증된 메일입니다.")
    return;
  } else {
    
    authMin = 4;
    authSec = 59;
    
    checkObj.authKey = false;
  
    if(checkObj.memberEmail){ // 중복이 아닌 이메일인 경우
  
  
      // 이메일 인증 버튼을 누를 시 인증하기 row가 나오게
      const authKeyInput = document.querySelector(".reqired-information tr:nth-child(6)")
      authKeyInput.style.display="table-row"
  
          /* fetch() API 방식 ajax */
          fetch("/sendEmail/signUp?memberEmail="+memberEmail.value)
          .then(resp => resp.text())
          .then(result => {
              if(result > 0){
                  console.log("인증 번호가 발송되었습니다.")
                  tempEmail = memberEmail.value;
              }else{
                  console.log("인증번호 발송 실패")
              }
          })
          .catch(err => {
              console.log("이메일 발송 중 에러 발생");
              console.log(err);
          });
          
  
          alert("인증번호가 발송 되었습니다.");
  
          
          authKeyMessage.innerText = "05:00";
          authKeyMessage.classList.remove("confirm");
  
          authTimer = window.setInterval(()=>{
  
              authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
              
              // 남은 시간이 0분 0초인 경우
              if(authMin == 0 && authSec == 0){
                  checkObj.authKey = false;
                  clearInterval(authTimer);
                  return;
              }
  
              // 0초인 경우
              if(authSec == 0){
                  authSec = 60;
                  authMin--;
              }
  
  
              authSec--; // 1초 감소
  
          }, 1000)
  
      } else{
        
          alert("중복되지 않은 이메일을 작성해주세요.");
          memberEmail.focus();
      }
    
  }
});


// 이메일 인증 확인
const authKey = document.getElementById("authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");

checkAuthKeyBtn.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
        /* fetch API */
        const obj = {"inputKey":authKey.value, "email":tempEmail}
        const query = new URLSearchParams(obj).toString()
        // inputKey=123456&email=user01

        fetch("/sendEmail/checkAuthKey?" + query)
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                clearInterval(authTimer);
                authKeyMessage.innerText = "인증되었습니다.";
                authKeyMessage.classList.add("confirm");
                checkObj.authKey = true;

            } else{
                alert("인증번호가 일치하지 않습니다.")
                checkObj.authKey = false;
            }
        })
        .catch(err => console.log(err));


    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }

});


//생년월일(년)
document.getElementById("mypageSignUpYear").addEventListener("input", () => {
  const mypageSignUpBirth = document.getElementById("mypageSignUpYear");
  const regEx = /^19[2-9]{2,2}$/;
  const regEx1 = /^20[0-2][0-9]$/;

  //입력을 받지 않아도 넘어갈 수 있도록 설정
  if(mypageSignUpBirth.value==""){
    checkObj.mypageSignUpYear = true;
    if(document.getElementById("mypageSignUpMonth").value==""){
      checkObj.mypageSignUpMonth = true;
    }
    if(document.getElementById("mypageSignUpDay").value==""){
      checkObj.mypageSignUpDay = true;
    }
  }

   // 생년월일을 입력했다 지우는 경우
   if(mypageSignUpBirth.value.trim().length == 0) {
    mypageSignUpBirth.value = ""; // 띄어쓰기 못 넣게 하기
    mypageSignUpBirth.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
    return;
  }


  if(regEx.test(mypageSignUpBirth.value)||regEx1.test(mypageSignUpBirth.value)){

    mypageSignUpBirth.classList.remove("error");
    mypageSignUpBirth.classList.add("confirm");
    checkObj.mypageSignUpYear = true;
  }else{
    mypageSignUpBirth.classList.remove("confirm");
    mypageSignUpBirth.classList.add("error");
    checkObj.mypageSignUpYear = false;
  }
});

//생년월일(월)
document.getElementById("mypageSignUpMonth").addEventListener("input", () => {
  const mypageSignUpBirth = document.getElementById("mypageSignUpMonth");
  const regEx = /^1[0-2]$/;
  const regEx1 = /^0[0-9]$/;

//입력을 받지 않아도 넘어갈 수 있도록 설정
  if(mypageSignUpBirth.value==""){
    checkObj.mypageSignUpMonth = true;
    if(document.getElementById("mypageSignUpYear").value==""){
      checkObj.mypageSignUpYear = true;
    }
    if(document.getElementById("mypageSignUpDay").value==""){
      checkObj.mypageSignUpDay = true;
    }
  }

     // 생년월일을 입력했다 지우는 경우
    if(mypageSignUpBirth.value.trim().length == 0) {
      mypageSignUpBirth.value = ""; // 띄어쓰기 못 넣게 하기
      mypageSignUpBirth.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
      return;
  }

  if(regEx.test(mypageSignUpBirth.value)||regEx1.test(mypageSignUpBirth.value) ){
    mypageSignUpBirth.classList.remove("error");
    mypageSignUpBirth.classList.add("confirm");
    checkObj.mypageSignUpMonth = true;
  }else{
    mypageSignUpBirth.classList.remove("confirm");
    mypageSignUpBirth.classList.add("error");
    checkObj.mypageSignUpMonth = false;
  }
});


//생년월일(일)
document.getElementById("mypageSignUpDay").addEventListener("input", () => {
  const mypageSignUpBirth = document.getElementById("mypageSignUpDay");
  const regEx1 = /^[0-2][0-9]$/;
  const regEx2 = /^3[0-1]$/;

  if(mypageSignUpBirth.value==""){
    checkObj.mypageSignUpDay = true;
    if(document.getElementById("mypageSignUpYear").value==""){
      checkObj.mypageSignUpYear = true;
    }
    if(document.getElementById("mypageSignUpMonth").value==""){
      checkObj.mypageSignUpMonth = true;
    }
  }

  // 생년월일을 입력했다 지우는 경우
  if(mypageSignUpBirth.value.trim().length == 0) {
  mypageSignUpBirth.value = ""; // 띄어쓰기 못 넣게 하기
  mypageSignUpBirth.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
  return;
  }

  if(regEx1.test(mypageSignUpBirth.value)||regEx2.test(mypageSignUpBirth.value) ){
    mypageSignUpBirth.classList.remove("error");
    mypageSignUpBirth.classList.add("confirm");
    checkObj.mypageSignUpDay = true;
  }else{
    mypageSignUpBirth.classList.remove("confirm");
    mypageSignUpBirth.classList.add("error");
    checkObj.mypageSignUpDay = false;
  }
});



//계좌번호
document.getElementById("mypageSignUpRefundNo").addEventListener("input", () => {
  const mypageSignUpRefundNo = document.getElementById("mypageSignUpRefundNo");
  const regEx = /^[0-9\-]{10,20}$/
  if(mypageSignUpRefundNo.value==""){
    checkObj.mypageSignUpRefundNo = true;
  }
  if(regEx.test(mypageSignUpRefundNo.value)){
    mypageSignUpRefundNo.classList.remove("error");
    mypageSignUpRefundNo.classList.add("confirm");
    checkObj.mypageSignUpRefundNo = true;
  }else{
    mypageSignUpRefundNo.classList.remove("confirm");
    mypageSignUpBirth.classList.add("error");
    checkObj.mypageSignUpRefundNo = false;
  }
});




// 회원 가입 form태그가 제출 되었을 때
document.getElementById("mypageSignUpSubmit").addEventListener("submit", e=>{

  // 이메일 유효성 검사
  const memberEmail = document.getElementById("mypageSignUpMail");
// 기존의 이메일과 지금의 이메일 주소가 같을 경우
if(loginMember.memberEmail == memberEmail.value ) {
  checkObj.authKey = true;
} 

  // 주소
const memberAddress = document.querySelectorAll('input[name="memberAddress"]');
  for(let address of memberAddress) {
      // 주소값이 하나라도 입력되어 있지 않은 경우
      if(address.value.trim().length == 0) {
        checkObj.memberAddress = false;
      } else {
          // 주소값이 다 입력되어 있는 경우
            checkObj.memberAddress = true;
      }
  }


  for(let key in checkObj){
    if(!checkObj[key]){ // 각 key에 대한 value(true/false)를 얻어와
      // false인 경우 == 유효하지 않다!
      switch(key){
        case "memberName":
        alert("이름이 입력되지 않았습니다"); break;
        case "memberAddress":
        alert("상세 주소까지 주소를 다 적어 주시기 바랍니다."); break;
        case "memberTel" : 
        alert("전화번호가 유효하지 않습니다"); break;
        case "memberEmail" : 
        alert("이메일이 유효하지 않습니다"); break;
        case "authKey" : 
        alert("이메일 인증이 필요합니다."); break;
        case "mypageSignUpYear" : 
        alert("생년월일(년)이 유효하지 않습니다"); break;
        case "mypageSignUpMonth" : 
        alert("생년월일(월) 유효하지 않습니다"); break;
        case "mypageSignUpDay" : 
        alert("생년월일(일) 유효하지 않습니다"); break;
        case "mypageSignUpRefundNo" : 
        alert("계좌번호가 유효하지 않습니다"); break;
      }
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
    }
  }
});



/* 회원 탈퇴 모달 */
const cuponModal = document.getElementById("memberDeleteModalOverlay")
const deleteMember = document.getElementById("deleteMember");

/* 회원 탈퇴 버튼 클릭 시 */
deleteMember.addEventListener('click', () => {
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
const modalClose = document.getElementById("modalClose")
modalClose.addEventListener("click", e => {
    cuponModal.style.display = "none";
    document.body.style.removeProperty('overflow');
});