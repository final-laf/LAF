const notices = document.querySelector("div.list-wrapper > table > tbody")


for(let notice of notices.children) {

    /* 문의 게시글(질문) 클릭시 */
    notice.addEventListener('click', () => {
        document.location.href="/qna/detail-q"
    });
  
  };

  /* 글쓰기 버튼 클릭시  */
  const insertBtn = document.getElementById("insertBtn")

  insertBtn.addEventListener('click', () => {
    document.location.href="/qna/write"
  });


  
/* 문의 게시글(답변) 클릭시 */
/* notice.addEventListener('click', () => {
  document.location.href="/qna/detail-a"
});
 */