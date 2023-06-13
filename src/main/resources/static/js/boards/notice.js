const notices = document.getElementsByClassName('trup');


for(let notice of notices) {
  

    /* 공지 게시글 클릭시 */
    notice.addEventListener('click', e => {
      const noticeNo = e.target.parentElement.getAttribute("value");
      document.location.href="/notice/"+noticeNo
    });
  
};

const insertBtn = document.getElementById("insertBtn")

insertBtn.addEventListener('click', () => {
  document.location.href="/notice/write"
});

