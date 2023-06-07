const notices = document.querySelector("div.list-wrapper > table > tbody")


for(let notice of notices.children) {

    /* 공지 게시글 클릭시 */
    notice.addEventListener('click', () => {
        document.location.href="/notice/detail"
    });
  
  };

  const insertBtn = document.getElementById("insertBtn")

  insertBtn.addEventListener('click', () => {
    document.location.href="/notice/write"
  });