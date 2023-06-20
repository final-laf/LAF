// 취소 버튼 클릭 시 마이페이지 대시보드로 이동
document.getElementById("cancelButton").addEventListener("click", () => {
  location.href="/myPage";
});

// check확인용 
const checkObj = {
  "memberPw" : true,
  "newMemberPw" : false,
  "memberPwConfirm" : false
};

// 현재 비밀번호가 입력되면
document.getElementById("memberPw").addEventListener("input", () => {
  checkObj.memberPw = true;
});


// 새로운 비밀번호 유효성 검사
const newMemberPw = document.getElementById("newMemberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");


// 새로운 비밀번호가 입력되면
newMemberPw.addEventListener("input", () => {

    // 비밀번호가 입력되지 않은 경우
    if(newMemberPw.value.trim().length == 0) {
      newMemberPw.value = ""; // 띄어쓰기 못 넣게 하기
      newMemberPw.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
      checkObj.newMemberPw = false; // 빈칸 == 유효하지 않다
      return;
  }

// 정규식 최소 8글자 최대 16글자 문자/숫자/특수문자 중 두가지 이상 조합 비밀번호
  const regEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/;

  // 새로운 비밀번호가 정규식에 맞을 경우
  if(regEx.test(newMemberPw.value)){
    checkObj.newMemberPw = true;
    newMemberPw.classList.remove("error");
    newMemberPw.classList.add("confirm");

      // 비밀번호 == 비밀번호 확인
    if(newMemberPw.value == memberPwConfirm.value){
      memberPwConfirm.classList.add("confirm");
      memberPwConfirm.classList.remove("error");
      checkObj.newMemberPw = true;
      
    } else { //비밀번호 != 비밀번호 확인
      memberPwConfirm.classList.remove("confirm");
      memberPwConfirm.classList.add("error");
      checkObj.memberPwConfirm = false;
    }

  // 새로운 비밀번호가 정규식에 맞지 않을 경우
  }else{
    newMemberPw.classList.remove("confirm");
    newMemberPw.classList.add("error");
    checkObj.newMemberPw = false;
  }
});
  

// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener('input', ()=>{

  
    // 비밀번호 확인이 입력되지 않은 경우
    if(memberPwConfirm.value.trim().length == 0) {
      memberPwConfirm.value = ""; // 띄어쓰기 못 넣게 하기
      memberPwConfirm.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
      checkObj.memberPwConfirm = false; // 빈칸 == 유효하지 않다
      return;
  }
    
  if(checkObj.newMemberPw){ // 비밀번호가 유효하게 작성된 경우에
    // 비밀번호 == 비밀번호 확인
    if(newMemberPw.value == memberPwConfirm.value){
      memberPwConfirm.classList.add("confirm");
      memberPwConfirm.classList.remove("error");
      checkObj.memberPwConfirm = true;
      
    } else { // 비밀번호 != 비밀번호 확인
      memberPwConfirm.classList.remove("confirm");
      memberPwConfirm.classList.add("error");
      checkObj.memberPwConfirm = false;
    }
  } else{ // 비밀번호 확인이 유효하지 않은 경우
    checkObj.memberPwConfirm = false;
  }
});


// form태그가 제출 되었을 때
document.getElementById("mypageSignUpSubmit").addEventListener("submit", e=>{
  
  // 비밀번호가 입력되지 않은 경우
  const memberPw = document.getElementById("memberPw");
  if(memberPw.value.trim().length == 0) {
    memberPw.value = ""; // 띄어쓰기 못 넣게 하기
    memberPw.classList.remove("confirm", "error"); // 검정 글씨로 바꾼다
    checkObj.memberPw = false; // 빈칸 == 유효하지 않다
  }

  for(let key in checkObj){
    if(!checkObj[key]){

      switch(key){
        case "memberPw": 
        alert("기존 비밀번호를 입력해 주세요."); break;
        case "newMemberPw": 
        alert("새로운 비밀번호가 유효하지 않습니다"); break;
        case "memberPwConfirm":
        alert("새로운 비밀번호와 확인된 비밀번호가 동일하지 않았습니다"); break;
      }
      e.preventDefault(); // form 태그 기본 이벤트 제거
      return; // 함수 종료
    }
  }
});



