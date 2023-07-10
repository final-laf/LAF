const notices = document.getElementsByClassName('trup');
for(let notice of notices) {
    /* 공지 게시글 클릭시 */
    notice.addEventListener('click', e => {
      const noticeNo = e.target.parentElement.getAttribute("value");
      document.location.href="/notice/"+noticeNo
    });
  
};
// 공지 글쓰기 버튼
if(document.getElementById("insertBtn") != null){
  document.getElementById("insertBtn").addEventListener('click', () => {
    document.location.href="/notice/write"
  });
}
if(document.getElementById("submitNotice") != null){
  document.getElementById("submitNotice").addEventListener('submit', e=>{
    if (document.getElementById("noticeTitle").value=="") {
      alert("공지사항 제목을 입력해주세요")
      e.preventDefault();
    }
    if (document.getElementById("noticeContent").value=="") {
      alert("공지사항 내용을 입력해주세요")
      e.preventDefault();
    }
  })
}
// if(document.getElementById("submitNotice") != null){
//   document.getElementById("submitNotice").addEventListener('click', e=>{
//     if (document.getElementById("noticeContent").value=="") {
//       console.log(document.getElementById("noticeContent").value)
//       alert("공지사항 내용을 입력해주세요")
//       e.preventDefault;
//     }
//   })
// }


//  공지 수정하기 버튼
if(document.getElementById("noticeDetailModify")!=null){
  document.getElementById("noticeDetailModify").addEventListener("click", e=>{
    const noticeNo = document.getElementById("noticeDetailModify").getAttribute("value")
    document.location.href="/notice/modify/"+noticeNo
  })
}





/* 공지사항 삭제 버튼 */
if (document.getElementById("noticeDelete") != null) {
  document.getElementById("noticeDelete").addEventListener("click", e=>{
    const noticeNo = e.target.value;
    if (confirm("삭제하시겠습니까?")) {
      fetch("/notice/delete?noticeNo="+noticeNo)  
      .then(response => response.text()) 
      .then(() => {
      }) 
      .catch (e => { console.log(e)}); 
  
      setTimeout(function(){
        document.location.href="/notice"
      },500);
    } else {
      e.preventDefault()
    }
    
  })
}

// 게시글 mouse hover 시 배경색 변경
const trList = document.querySelectorAll('.list-table tbody tr');
for(const el of trList) {
	el.addEventListener('mouseover', e => {
		const children = el.children;
    for(const ch of children) {
			ch.classList.add('hover');
    }
  });
	
	el.addEventListener('mouseout', e => {
		const children = el.children;
    for(const ch of children) {
      ch.classList.remove('hover');
    }
  });
}