

// qna 게시판에서 qna 선택
const qnas = document.querySelector(".qna-list")

// qna list에서 삭제
let qnaLockNo =0;
if (qnas!=null) {
  for(let notice of qnas.children) {
    /* 문의 게시글(질문) 클릭시 */
    
    notice.addEventListener('click', e => {
      qnaLockNo = e.target.parentElement.getAttribute("value");
      const loginMember = e.target.parentElement.getAttribute("memberNo");
      const writeMember = e.target.parentElement.getAttribute("writerNo");
      // 로그인멤버와 작성자가 같거나 운영자일 경우 바로 접속
      if(loginMember==writeMember || loginMember==1){
        document.location.href="/qna/detail/" + qnaLockNo;
        return;
      }
      // 비밀글일 경우 
      if(e.target.parentElement.getAttribute("fl")=="y"){
        document.getElementById("qnaModelBack").style.display = "flex";
        document.getElementById("qnaModal").style.display = "flex";
        e.stopPropagation();
        return;
      }
      // 비밀글 아닐 경우 바로 접속 
      document.location.href="/qna/detail/" + qnaLockNo
    });
  };
}
// 모달 외부 클릭 시 모달창 끄기
if (document.getElementById("qnaModelBack")!=null) {
  document.getElementById("qnaModelBack").addEventListener("click", ()=>{
    document.getElementById("qnaModelBack").style.display = "none";
    document.getElementById("qnaModal").style.display = "none";
  })
}
//수정하기 비밀번호 모달
if (document.getElementById("qnaDetailModelBack")!=null) {
  document.getElementById("qnaDetailModelBack").addEventListener("click", ()=>{
    document.getElementById("qnaDetailModelBack").style.display = "none";
    document.getElementById("qnaDetailModal").style.display = "none";
  })
}

// 모달 비밀글 입력하기
if (document.getElementById("qnaModalBtn")!=null) {
  document.getElementById("qnaModalBtn").addEventListener("click", e => {
    const pw = e.target.parentElement.parentElement.children[1].children[0].value
    const data = {"qnaNo" : qnaLockNo , "qnaPw": pw};
    console.log(pw)
    console.log(data)
    fetch("/qna/qnaLockNo",{
      method : "POST", headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
    })
    .then(response => response.text() ) // 응답 객체를 필요한 형태로 파싱
    .then(count => {
      console.log("count = "+count);
      if (count == -1) { // 비밀번호 불일치 시
        console.log("비밀번호 입력 실패");
        document.getElementById("qnaDetailModalInput").value = "";
        return;            
      }
      document.location.href="/qna/detail/" + qnaLockNo;

    }) //파싱된 데이터를 받아서 처리하는 코드 작성
    .catch(err => {
        console.log("예외 발생");
        console.log(err);
    }) 
  })
}


/* 글쓰기 버튼 클릭시  */
const insertBtn = document.getElementById("insertBtn")
if (insertBtn!=null) {
  insertBtn.addEventListener('click', () => {
    document.location.href="/qna/write"
  });
}

// 글쓰기 내부 select 클릭 시
const changeValue = (target) => {

  console.log(target.value);
  if(target.value=="product"){
    document.getElementById("qnaWriteProduct").style.display = "table-row"
    document.getElementById("qnaWriteShipping").style.display = "none"
  }
  if(target.value=="shipping"){
    document.getElementById("qnaWriteShipping").style.display = "table-row"
    document.getElementById("qnaWriteProduct").style.display = "none"
    
  }
  if(target.value=="etc"){
    document.getElementById("qnaWriteShipping").style.display = "none"
    document.getElementById("qnaWriteProduct").style.display = "none"

  }
}


/* 문의 게시글(수정) 클릭시 */
const modifyBtn = document.getElementById("qnaModify")
if (modifyBtn!=null) {
  modifyBtn.addEventListener('click', e => {
    const loginMember = e.target.getAttribute("memberNo");
    const writeMember = e.target.getAttribute("writerNo");
    const qnaNo = e.target.value;
    if(loginMember==writeMember){
      const qnaNo = e.target.value;
      console.log(qnaNo);
      document.location.href="/qna/modify/"+qnaNo
      return;
    }
    if(loginMember!=writeMember){
      qnaLockNo=qnaNo;
      document.getElementById("qnaDetailModelBack").style.display = "flex";
      document.getElementById("qnaDetailModal").style.display = "flex";
      e.stopPropagation();
      return;
    }
    console.log(qnaNo);
    document.location.href="/qna/modify/"+qnaNo
  });
}

// 수정하기 모달 비밀글 입력하기
if (document.getElementById("qnaDetailModalBtn")!=null) {
  document.getElementById("qnaDetailModalBtn").addEventListener("click", e => {
    const pw = e.target.parentElement.parentElement.children[1].children[0].value
    const data = {"qnaNo" : qnaLockNo , "qnaPw": pw};
    fetch("/qna/qnaLockNo",{
      method : "POST", headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
    })
    .then(response => response.text() ) // 응답 객체를 필요한 형태로 파싱
    .then(count => {
      
      console.log("count = "+count);
      if (count == -1) { // 비밀번호 불일치 시
        console.log("비밀번호 입력 실패");
        document.getElementById("qnaDetailModalInput").value = "";
        return;            
      }
      document.location.href="/qna/modify/" + qnaLockNo;
    }) //파싱된 데이터를 받아서 처리하는 코드 작성
    .catch(err => {
      console.log("예외 발생");
      console.log(err);
    }) 
  })
}



  
/* 문의 게시글(답변) 클릭시 */
const answerBtn = document.getElementById("qnaAnswer")
if (answerBtn!=null) {
  answerBtn.addEventListener('click', e => {
    const qnaNo = e.target.value;
    document.location.href="/qna/answer/"+qnaNo
  });
}



// qna 삭제
if (document.getElementById("qnaDelete") != null) {
  document.getElementById("qnaDelete").addEventListener("click", e=>{
    alert("123")
    const qnaNo = e.target.value;
    fetch("/qna/delete?qnaNo="+qnaNo)  
    .then(response => response.text()) 
    .then(() => {}) 
    .catch (e => { console.log(e)}); 
  
    setTimeout(function(){
      document.location.href="/qna"
    },500);
  })
}

