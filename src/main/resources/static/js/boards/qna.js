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
    console.log(qnaLockNo)
    fetch("/qna/qnaLockNo?qnaLockNo="+qnaLockNo)  
      .then(response => response.text()) 
      .then(() => {}) 
      .catch (e => { console.log(e)}); 
      
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