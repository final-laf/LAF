const notices = document.querySelector("div.list-wrapper > table > tbody")

if (notices!=null) {
  for(let notice of notices.children) {
    /* 문의 게시글(질문) 클릭시 */
    notice.addEventListener('click', e => {
      const qnaNo = e.target.parentElement.getAttribute("value");
      document.location.href="/qna/detail/" + qnaNo
    });
  
  };
  
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



// qna 
if (document.getElementById("qnaDelete") != null) {
  document.getElementById("qnaDelete").addEventListener("click", e=>{
    alert("123")
    const qnaNo = e.target.value;
    fetch("/qna/delete?qnaNo="+qnaNo)  
    .then(response => response.text()) 
    .then(() => {
    }) 
    .catch (e => { console.log(e)}); 
  
    setTimeout(function(){
      document.location.href="/qna"
    },500);
  })
}


// document.getElementById("qnaModify").addEventListener("click", ()=>{
  
// })