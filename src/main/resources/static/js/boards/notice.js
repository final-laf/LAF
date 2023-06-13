const notices = document.getElementsByClassName('trup');
for(let notice of notices) {
    /* 공지 게시글 클릭시 */
    notice.addEventListener('click', e => {
      const noticeNo = e.target.parentElement.getAttribute("value");
      document.location.href="/notice/"+noticeNo
    });
  
};

if(document.getElementById("insertBtn") != null){
  document.getElementById("insertBtn").addEventListener('click', () => {
    document.location.href="/notice/write"
  });
}


/* 공지사항 삭제 버튼 */
if (document.getElementById("noticeDelete") != null) {
  document.getElementById("noticeDelete").addEventListener("click", e=>{
    console.log(e.target.value);
    const noticeNo = e.target.value;
    fetch("/notice/delete?noticeNo="+noticeNo)  
    .then(response => response.text()) 
    .then(() => {
    }) 
    .catch (e => { console.log(e)}); 

    setTimeout(function(){
      document.location.href="/notice"
    },500);
    
  })
  
}
