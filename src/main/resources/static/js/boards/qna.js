const notices = document.querySelector("div.list-wrapper > table > tbody")
let qnaLockNo =0;
if (notices!=null) {
  for(let notice of notices.children) {
    /* 문의 게시글(질문) 클릭시 */
    
    notice.addEventListener('click', e => {
      qnaLockNo = e.target.parentElement.getAttribute("value");
      // 비밀글일 경우 
      if(e.target.parentElement.getAttribute("fl")=="y"){
        document.getElementById("qnaModelBack").style.display = "flex";
        document.getElementById("qnaModal").style.display = "flex";


        e.stopPropagation();
        return;
      }
      // 비밀글 아닐 경우 바로 접속 
      document.location.href="/qna/detail/" + qnaNo
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

// 모달 비밀글 입력하기
if (document.getElementById("qnaModalBtn")!=null) {
  document.getElementById("qnaModalBtn").addEventListener("click", e => {
  const pw = e.target.parentElement.parentElement.children[1].children[0].value
  const data = {"qnaNo" : qnaLockNo , "qnaPw": pw};
  fetch("/qna/qnaLockNo",{
    method : "POST", headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(data)
  })
  .then(response => response.text() ) // 응답 객체를 필요한 형태로 파싱

  . then(count => {
      console.log("count = "+count);
      
      if (count == -1) { // INSERT DELETE 실패 시
          console.log("좋아요 처리 실패");
          return;            
      }
      

      // toggle() : 클래스가 있으면 없애고, 없으면 추가하고


      

    }) //파싱된 데이터를 받아서 처리하는 코드 작성
  
  .catch(err => {
      console.log("예외 발생");
      console.log(err);
  }) // 예외 발생 시 처리하는 부분
    
      
  // document.location.href="/qna/detail/" + qnaLockNo
  })
}


/* 글쓰기 버튼 클릭시  */
const insertBtn = document.getElementById("insertBtn")
if (insertBtn!=null) {
  insertBtn.addEventListener('click', () => {
    document.location.href="/qna/write"
  });
}

/* 문의 게시글(수정) 클릭시 */
const modifyBtn = document.getElementById("qnaModify")
if (modifyBtn!=null) {
  modifyBtn.addEventListener('click', e => {
    const qnaNo = e.target.value;
    console.log(qnaNo);
    document.location.href="/qna/modify/"+qnaNo
  });
}

  
/* 문의 게시글(답변) 클릭시 */
const answerBtn = document.getElementById("answerBtn")
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


// document.getElementById("qnaModify").addEventListener("click", ()=>{
  
// })