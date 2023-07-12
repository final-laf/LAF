

// qna 게시판에서 qna 선택
const qnas = document.querySelector(".qna-list")

// qna list에서 삭제
let qnaLockNo =0;
// qna 선택
if (qnas!=null) {
  for(let qna of qnas.children) {
    /* 문의 게시글(질문) 클릭시 */
    
    qna.addEventListener('click', e => {
      qnaLockNo = e.target.parentElement.getAttribute("value");
      const loginMember = e.target.parentElement.getAttribute("memberNo");
      const writeMember = e.target.parentElement.getAttribute("writerNo");
      const memberGrade = e.target.parentElement.getAttribute("memberGrade");
      // 로그인멤버와 작성자가 같거나 운영자일 경우 바로 접속
      if(loginMember==writeMember || memberGrade=='A'){
        document.location.href="/qna/detail/" + qnaLockNo;
        return;
      }
      // 비밀글일 경우 
      if(e.target.parentElement.getAttribute("fl")=="Y"){
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
//삭제하기 비밀번호 모달
if (document.getElementById("qnaDeleteModelBack")!=null) {
  document.getElementById("qnaDeleteModelBack").addEventListener("click", ()=>{
    document.getElementById("qnaDeleteModelBack").style.display = "none";
    document.getElementById("qnaDeleteModal").style.display = "none";
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
    .then(count => {
      if (count == -1) { // 비밀번호 불일치 시
        document.getElementById("qnaDetailModalInput").value = "";
        return;            
      }
      document.location.href="/qna/detail/" + qnaLockNo;

    }) //파싱된 데이터를 받아서 처리하는 코드 작성
    .catch(err => {
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



const orderUnoList = document.getElementById("orderUno");
// 내 주문내역 조회
if (orderUnoList!=null) {
  orderUnoList.addEventListener("click", e=>{
    document.getElementById("qnaOrderList").style.height="250px";
    document.getElementById("qnaModalBack").style.display="block";
  })
  const orderUno = document.getElementsByClassName("qnaOrder");
  
  for(let order of orderUno){
    order.addEventListener("click", e => {
      if(e.target.classList.contains("qnaOrder")) {
        document.getElementById("orderUno").value=e.target.getAttribute("value")
        document.getElementById("qnaOrderList").style.height=0;
        document.getElementById("qnaModalBack").style.display="none";
      }else{
        if(e.target.parentElement.classList.contains("qnaOrder")){
          document.getElementById("orderUno").value=e.target.parentElement.getAttribute("value")
        }else{
          document.getElementById("orderUno").value=e.target.parentElement.parentElement.getAttribute("value")
        }
        document.getElementById("qnaOrderList").style.height=0;
        document.getElementById("qnaModalBack").style.display="none";
      }
    });
  }
}

// 모달창 닫기
if (document.getElementById("qnaModalBack")!=null) {
  document.getElementById("qnaModalBack").addEventListener("click", e=>{
    document.getElementById("qnaOrderList").style.height=0;
    document.getElementById("qnaModalBack").style.display="none";
  })
}

// 모달창에 상품 정보 넣기
if (document.getElementById("qnaProductName")) {
  document.getElementById("qnaProductName").addEventListener("keyup", e=> {
    const productName = document.getElementById("qnaProductName").value;
    fetch("/qna/product?productName="+productName)
    .then(response => response.json()) 
    .then(productList => {
      for(let i = 0; i<3; i++){
        document.getElementsByClassName("qnaProduct")[i].style.display="none"
      }
      for(let i=0; i<productList.length; i++){
        if (i==3) {
          document.getElementById("qnaProductList").style.height="auto";
          return
        }
        document.getElementById("qnaProductList").style.height=(i+1)*43+"px";
        document.getElementsByClassName("productNo")[i].innerText=productList[i].productNo
        document.getElementsByClassName("productImg")[i].src=productList[i].thumbnailPath
        document.getElementsByClassName("productName")[i].innerText=productList[i].productName
        document.getElementsByClassName("qnaProduct")[i].setAttribute("value", productList[i].productName)
        document.getElementsByClassName("qnaProduct")[i].style.display="flex"
        
      }
      
      const qnaProduct = document.getElementsByClassName("qnaProduct")
      // for(let product of qnaProduct){
        
        // }
      })
    .catch (e => { console.log(e)}); 
  }) 
}


const qnaProductName = document.getElementById("qnaProductName");
// 상품 조회
if (qnaProductName!=null) {
  qnaProductName.addEventListener("click", e=>{
    document.getElementById("qnaProductList").style.height="auto";
    document.getElementById("qnaModalBack").style.display="flex";
  })
}

// 주문정보 넣기
const orderUno = document.getElementsByClassName("qnaOrder");
for(let order of orderUno){
  order.addEventListener("click", e => {
    if(e.target.classList.contains("qnaOrder")) {
      document.getElementById("orderUno").value=e.target.getAttribute("value")
    }else{
      if(e.target.parentElement.classList.contains("qnaOrder")){
        document.getElementById("orderUno").value=e.target.parentElement.getAttribute("value")
      }else{
        if(e.target.parentElement.parentElement.classList.contains("qnaOrder")){
          document.getElementById("orderUno").value=e.target.parentElement.parentElement.getAttribute("value")
        }else{
          document.getElementById("orderUno").value=e.target.parentElement.parentElement.parentElement.getAttribute("value")

        }
      }
    }
    document.getElementById("qnaOrderList").style.height=0;
    document.getElementById("qnaModalBack").style.display="none";
  });
}

// 상품 클릭 시 넣기
const qnaProduct = document.getElementsByClassName("qnaProduct");
for(let product of qnaProduct){
  product.addEventListener("click", e => {
    document.getElementById("qnaProductName").value=e.target.getAttribute("value")
    if(e.target.classList.contains("qnaProductName")) {
      document.getElementById("qnaProductName").value=e.target.getAttribute("value")
    }else{
      if(e.target.parentElement.classList.contains("qnaProduct")){
        document.getElementById("qnaProductName").value=e.target.parentElement.getAttribute("value")
      }else{
        if(e.target.parentElement.parentElement.classList.contains("qnaProduct")){
          document.getElementById("qnaProductName").value=e.target.parentElement.parentElement.getAttribute("value")
        }else{
          document.getElementById("qnaProductName").value=e.target.parentElement.parentElement.parentElement.getAttribute("value")
        }
      }
    }
    document.getElementById("qnaProductList").style.height=0;
    document.getElementById("qnaModalBack").style.display="none";
  });
}

// 모달창 닫기
if (document.getElementById("qnaModalBack")!=null) {
  document.getElementById("qnaModalBack").addEventListener("click", e=>{
    document.getElementById("qnaProductList").style.height=0;
    document.getElementById("qnaModalBack").style.display="none";
  })
}



/* 문의 게시글(수정) 클릭시 */
const modifyBtn = document.getElementById("qnaModify")
if (modifyBtn!=null) {
  modifyBtn.addEventListener('click', e => {
    const loginMember = e.target.getAttribute("memberNo");
    const writeMember = e.target.getAttribute("writerNo");
    const qnaNo = e.target.value;
    const grade = document.getElementsByClassName("board-list")[0].getAttribute("grade");
    if(loginMember==writeMember||grade=='A'){
      const qnaNo = e.target.value;
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
      
      if (count == -1) { // 비밀번호 불일치 시
        document.getElementById("qnaDetailModalInput").value = "";
        return;            
      }
      document.location.href="/qna/modify/" + qnaLockNo;
    }) //파싱된 데이터를 받아서 처리하는 코드 작성
    .catch(err => {
    }) 
  })
}

// 삭제하기 모달 비밀글 입력하기
if (document.getElementById("qnaDeleteModalBtn")!=null) {
  document.getElementById("qnaDeleteModalBtn").addEventListener("click", e => {
    const pw = e.target.parentElement.parentElement.children[1].children[0].value
    const data = {"qnaNo" : qnaLockNo , "qnaPw": pw};
    fetch("/qna/qnaLockNo",{
      method : "POST", headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
    })
    .then(response => response.text() ) // 응답 객체를 필요한 형태로 파싱
    .then(count => {
      
      if (count == -1) { // 비밀번호 불일치 시
        document.getElementById("qnaDeleteModalInput").value = "";
        return;            
      }
      if (confirm("작성한 QNA가 삭제됩니다. 그래도 삭제하시겠습니까?")) {
        const qnaNo = e.target.value;
        fetch("/qna/delete?qnaNo="+qnaNo)  
        .then(response => response.text()) 
        .then(() => {}) 
        .catch (e => { console.log(e)}); 
      
        setTimeout(function(){
        document.location.href="/qna"
        },500);
      } else {
        e.preventDefault()
      }
    }) //파싱된 데이터를 받아서 처리하는 코드 작성
    .catch(err => {
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
    const loginMember = e.target.getAttribute("memberNo");
    const writeMember = e.target.getAttribute("writerNo");
    const qnaNo = e.target.value;
    const grade = document.getElementsByClassName("board-list")[0].getAttribute("grade");
    if(loginMember==writeMember||grade=='A'){
      const qnaNo = e.target.value;
      fetch("/qna/delete?qnaNo="+qnaNo)  
      .then(response => response.text()) 
      .then(() => {}) 
      .catch (e => { console.log(e)}); 
    
      setTimeout(function(){
      document.location.href="/qna"
      },500);
      return;
    }

    if(loginMember!=writeMember){
      qnaLockNo=qnaNo;
      document.getElementById("qnaDeleteModelBack").style.display = "flex";
      document.getElementById("qnaDeleteModal").style.display = "flex";
      e.stopPropagation();
      return;
    }
  });
    // const qnaNo = e.target.value;
    // fetch("/qna/delete?qnaNo="+qnaNo)  
    // .then(response => response.text()) 
    // .then(() => {}) 
    // .catch (e => { console.log(e)}); 
  
    // setTimeout(function(){
    //   document.location.href="/qna"
    // },500);
}

// qna 게시글 mouse hover 시 배경색 변경
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