// 회원 가입 check확인용 
const checkObj = {
  "mypageSignUpId" : false,
  "mypageSignUpPw" : false,
  "memberPwConfirm" : false,
  "mypageSignUpTelF" : true,
  "mypageSignUpTelS" : false,
  "mypageSignUpTelT" : false,
  "mypageSignUpMail" : false,
  "mypageSignUpYear" : true,
  "mypageSignUpMonth" : true,
  "mypageSignUpDay" : true,
  "mypageSignUpRefundNo" : true,
  "mypageSignUptermsAll" : false,
};


document.getElementById("mypageEditInfoSubmit").addEventListener("submit", e=> {
  console.log(checkObj);
  for(let key in checkObj){
    if(!checkObj[key]){ // 각 key에 대한 value를 얻어와 false인 경우 
      switch(key){
        case "mypageSignUpId": alert("아이디가 유효하지 않습니다."); break;
        case "mypageSignUpPw": alert("비밀번호가 유효하지 않습니다."); break;
        case "memberPwConfirm": alert("비밀번호가 동일하지 않습니다."); break;
        case "mypageSignUpTelF": alert("전화번호가 유효하지 않습니다."); break;
        case "mypageSignUpTelS": alert("전화번호가 유효하지 않습니다."); break;
        case "mypageSignUpTelT": alert("전화번호가 유효하지 않습니다."); break;
        case "mypageSignUpMail": alert("이메일이 유효하지 않습니다."); break;
        case "mypageSignUpYear": alert("생년월일(년)이 유효하지 않습니다."); break;
        case "mypageSignUpMonth": alert("생년월일(월)이 유효하지 않습니다."); break;
        case "mypageSignUpDay": alert("생년월일(일)이 유효하지 않습니다."); break;
        case "mypageSignUptermsAll": alert("약관에 동의해 주십시오."); break;
      }
      document.getElementById(key).focus(); //false로 이동
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
    }
  }
});

// 아이디 유효성 검사
const memberId = document.getElementById("mypageSignUpId");
// 정규 표현식을 이용해서 유효한 형식인지 판별
memberId.addEventListener("input", () => {
  const regEx = /^[a-z\d]{4,16}/;
  if(regEx.test(memberId.value) ){ // 유효한 경우
    /**********************************************************************/ 
    fetch('/memberIdCheck/memberId?memberId=' + memberId.value)
    .then(response => response.text()) 
    .then(count => {
      count=0;
      // count : 중복되면 1, 중복 아니면 0
      if(count == 0){
        memberId.classList.add("confirm");  
        memberId.classList.remove("error"); 
        checkObj.mypageSignUpId = true; 
    
      }else{
        memberId.classList.add("error");  
        memberId.classList.remove("confirm");  
        checkObj.mypageSignUpId = false; 
      }
    }) 
    .catch(err => console.log(err)); // 예외 처리
    /**********************************************************************/ 
  } else { 
    memberId.classList.add("error");  
    memberId.classList.remove("confirm");  
    checkObj.mypageSignUpId = false; 
  }
})
////////////////////비밀번호
// 비밀번호/ 비밀번호 확인 유효성 검사
const memberPw = document.getElementById("mypageSignUpPw");
const memberPwConfirm = document.getElementById("mypageSignUpPwConfirm");
  
memberPw.addEventListener("input", () => {
// 정규식 최소 8글자 최대 16글자 문자/숫자/특수문자 중 두가지 이상 조합 비밀번호
  const regEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/;
  if(regEx.test(memberPw.value)){
    checkObj.mypageSignUpPw = true;
    memberPw.classList.remove("error");
    memberPw.classList.add("confirm");
      // 비밀번호 == 비밀번호 확인 (같을 경우)
    if(memberPw.value == memberPwConfirm.value){
      memberPwConfirm.classList.add("confirm");
      memberPwConfirm.classList.remove("error");
      checkObj.mypageSignUpPw = true;
      
    } else { //다를 경우
      memberPwConfirm.classList.remove("confirm");
      memberPwConfirm.classList.add("error");
      checkObj.memberPwConfirm = false;
    }
  }else{
    memberPw.classList.remove("confirm");
    memberPw.classList.add("error");
    checkObj.mypageSignUpPw = false;
  }
});
  
// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener('input', ()=>{
    
  if(checkObj.mypageSignUpPw){ // 비밀번호가 유효하게 작성된 경우에
  
    // 비밀번호 == 비밀번호 확인 (같을 경우)
    if(memberPw.value == memberPwConfirm.value){
      memberPwConfirm.classList.add("confirm");
      memberPwConfirm.classList.remove("error");
      checkObj.memberPwConfirm = true;
    } else { //다를 경우
      memberPwConfirm.classList.remove("confirm");
      memberPwConfirm.classList.add("error");
      checkObj.memberPwConfirm = false;
    }
  } else{ // 비밀번호가 유효하지 않은 경우
    checkObj.memberPwConfirm = false;
  }
});
  
//전화번호
document.getElementById("mypageSignUpTelF").addEventListener("input", () => {
  const mypageSignUpTelF = document.getElementById("mypageSignUpTelF");
  const regEx = /^0[0-9]{1,2}$/;
  if(regEx.test(mypageSignUpTelF.value)){
    mypageSignUpTelF.classList.remove("error");
    mypageSignUpTelF.classList.add("confirm");
    checkObj.mypageSignUpTelF = true;
  }else{
    mypageSignUpTelF.classList.remove("confirm");
    mypageSignUpTelF.classList.add("error");
    checkObj.mypageSignUpTelF = false;
  }
});
document.getElementById("mypageSignUpTelS").addEventListener("input", () => {
  const mypageSignUpTel = document.getElementById("mypageSignUpTelS");
  const regEx = /^[0-9]{3,4}$/;
  if(regEx.test(mypageSignUpTel.value)){
    mypageSignUpTel.classList.remove("error");
    mypageSignUpTel.classList.add("confirm");
    checkObj.mypageSignUpTelS = true;
  }else{
    mypageSignUpTel.classList.remove("confirm");
    mypageSignUpTel.classList.add("error");
    checkObj.mypageSignUpTelS = false;
  }
});
document.getElementById("mypageSignUpTelT").addEventListener("input", () => {
  const mypageSignUpTel = document.getElementById("mypageSignUpTelT");
  const regEx = /^[0-9]{3,4}$/;
  if(regEx.test(mypageSignUpTel.value)){
    mypageSignUpTel.classList.remove("error");
    mypageSignUpTel.classList.add("confirm");
    checkObj.mypageSignUpTelT = true;
  }else{
    mypageSignUpTel.classList.remove("confirm");
    mypageSignUpTel.classList.add("error");
    checkObj.mypageSignUpTelT = false;
  }
});
  

///////////////
// 이메일 유효성 검사
const memberEmail = document.getElementById("mypageSignUpMail");

// 이메일 확인 방법
memberEmail.addEventListener("input", () => {
  const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;

  if(regEx.test(memberEmail.value) ){ // 유효한 경우
    fetch('/memberEmailCheck/memberEmail?memberEmail=' + memberEmail.value)
    .then(response => response.text()) 
    .then(count => {
      count=0;
      if(count == 0){
        memberEmail.classList.add("confirm");  
        memberEmail.classList.remove("error");  
        checkObj.mypageSignUpMail = true; 
      
      }else{
        memberEmail.classList.add("error"); 
        memberEmail.classList.remove("confirm"); 
        checkObj.mypageSignUpMail = false; 
      }
    })
    .catch(err => console.log(err)); 
    /**********************************************************************/ 
  } else { // 유효하지 않은 경우(무효인 경우)
    memberId.classList.add("error");  
    memberId.classList.remove("confirm");  
    checkObj.mypageSignUpMail = false; 
  }

})

//생년월일(년)
document.getElementById("mypageSignUpYear").addEventListener("input", () => {
  const mypageSignUpBirth = document.getElementById("mypageSignUpYear");
  const regEx = /^19[2-9]{2,2}$/;
  const regEx1 = /^20[0-2][0-9]$/;
  //입력 받으면 생년월일 다 확인할 수 있도록 생년월일 
  if(mypageSignUpBirth.value==""){
    checkObj.mypageSignUpYear = true;
    if(document.getElementById("mypageSignUpMonth").value==""){
      checkObj.mypageSignUpMonth = true;
    }
    if(document.getElementById("mypageSignUpDay").value==""){
      checkObj.mypageSignUpDay = true;
    }
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
  const regEx1 = /^[0-9]$/;
  if(mypageSignUpBirth.value==""){
    checkObj.mypageSignUpMonth = true;
    if(document.getElementById("mypageSignUpYear").value==""){
      checkObj.mypageSignUpYear = true;
    }
    if(document.getElementById("mypageSignUpDay").value==""){
      checkObj.mypageSignUpDay = true;
    }
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
  const regEx = /^[0-9]$/;
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
  if(regEx.test(mypageSignUpBirth.value)||regEx1.test(mypageSignUpBirth.value)||regEx2.test(mypageSignUpBirth.value) ){
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



//약관 전체 동의 시 전체 적용 or 전체 해제
document.getElementById("mypageSignUptermsAll").addEventListener("click", e=>{
    const allButton = document.getElementById("mypageSignUptermsAll")
    const useButton = document.getElementById("mypageSignUptermsUse")
    const infoButton = document.getElementById("mypageSignUptermsInfo")
    const shopButton = document.getElementById("mypageSignUptermsReceiving")
    if (allButton.checked) {
        useButton.checked = true;
        infoButton.checked = true;
        shopButton.checked = true;
        checkObj.mypageSignUptermsAll = true;
        return;
    }
    if (!allButton.checked) {
        useButton.checked = false;
        infoButton.checked = false;
        shopButton.checked = false;
        checkObj.mypageSignUptermsAll = false;
        return;
    }
});
// 약관 동의 체크
const terms = document.getElementsByClassName("mypageSignUp-terms-content");
for(let i=0; i<terms.length; i++) {
  terms[i].addEventListener("click", () => {
    if (document.getElementById("mypageSignUptermsUse").checked && document.getElementById("mypageSignUptermsInfo").checked && document.getElementById("mypageSignUptermsReceiving").checked) {
      document.getElementById("mypageSignUptermsAll").checked = true;
      checkObj.mypageSignUptermsAll = true;
    } else{
      document.getElementById("mypageSignUptermsAll").checked = false;
      checkObj.mypageSignUptermsAll = false;
    }
  });
};

