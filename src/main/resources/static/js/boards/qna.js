const notices = document.querySelector("div.list-wrapper > table > tbody")


for(let notice of notices.children) {

    /* 문의 게시글 클릭시 */
    notice.addEventListener('click', () => {
        document.location.href="/qna/detail"
    });
  
  };

  const insertBtn = document.getElementById("insertBtn")

  insertBtn.addEventListener('click', () => {
    document.location.href="/qna/write-q"
  });