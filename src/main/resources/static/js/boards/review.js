
/* 작성한 리뷰 모달 */
const modal = document.getElementsByClassName("review-modal-overlay")[0];
const reviewDetail = document.getElementsByClassName("reviewListDetail");
let memberName = "";
let reviewCreateDate = "";
let option = "";
let productName = "";
let productPrice = "";
let productSalePrice = "";
let reviewCount = "";
let reviewContent = "";
let reviewScore = "";
let reviewNum = "";
let orderNo = "";
let reviewImg = [];
for(let review of reviewDetail) {
  /* 작성된 모든 리뷰 상세 클릭시 */
  review.addEventListener('click', e => {
    for (let index = 0; index < 5; index++) {
      document.getElementsByClassName("Detailpreview")[index].src = "/images/common/no-image.png";
      document.getElementsByClassName("preview")[index].src = "/images/common/no-image.png";
      document.getElementsByClassName("Detailpreview")[index].style.display = "block";
    }
    let reviewNo = e.target.getAttribute("value");
    if (reviewNo==null) {
      reviewNo= e.target.parentElement.parentElement.getAttribute("value")
    }
    
    // 리뷰 상세정보
    fetch("/review/detailReview?reviewNo="+reviewNo)  
    .then(review => review.json()) 
    .then(review => {
      if (review.memberNo==0) {
        alert("삭제된 리뷰입니다.");
        return location.href="/review";
      }
      modal.style.display = "flex";
      document.body.style.overflowY = "hidden";
  
      for (let i = 1; i < 5; i++) {
        document.getElementsByClassName("Detailpreview")[i].style.display= "none";
      }
      document.getElementById("reviewDetailModalStar").value="";
      document.getElementById("reviewDetailScoreColor").style.width=0+"px";
      document.getElementById("reviewDetailScoreColor").style.backgroundColor = "white";
      document.getElementById("reviewDetailModalName").innerText=review.memberName;
      document.getElementById("reviewDetailModalDate").innerText=review.reviewCreateDate;
      document.getElementById("reviewDetailModalOption").innerText=review.option.color+"/"+review.option.size;
      document.getElementById("reviewDetailModalProductName").innerText=review.product.productName;
      document.getElementById("reviewDetailModalProductPrice").innerText=review.product.productSalePrice.toLocaleString();
      document.getElementById("reviewDetailModalProductSalePrice").innerText=review.product.productPrice.toLocaleString();
      document.getElementById("reviewDetailModalReviewCount").innerText=review.reviewCount;
      document.getElementById("reviewDetailModalContent").innerText=review.reviewContent;
      document.getElementById("reviewModifyModalStar").value=review.reviewScore;
      document.getElementById("reviewDetailModalTextScore").value=review.reviewScore;
      document.getElementById("reviewDetailModalProductNo").href="/product/"+review.productNo;
      document.getElementById("reviewModifyModalStar").value=review.reviewScore;
      document.getElementById("reviewDetailProduct").src=review.product.thumbnailPath;
      document.getElementById("reviewModifyProduct").src= review.product.thumbnailPath;
      if (document.getElementById("bestReview")!=null) {
        
        document.getElementById("bestReview").style.display = "flex";
      }
      // 베스트 리뷰 체크
      for(let b of bestReviewNoList){
        if (b.reviewNo==review.reviewNo) {
          if (document.getElementById("bestReview")!=null) {
            document.getElementById("bestReview").style.display = "none";
          }
          document.getElementById("reviewDetailModalName").innerHTML="[★--BEST REVIEW--★] <br>"+review.memberName;
        }
      }
      const login = document.getElementById("reviewDetailModalMemberId").getAttribute("value");
      
      if(login!=review.memberNo){
        document.getElementById("reviewDetailModalModifyBtn").style.display = "none";
        document.getElementById("reviewDetailModalDeleteBtn").style.display = "none";
      }
      if(login==review.memberNo){
        document.getElementById("reviewDetailModalModifyBtn").style.display = "flex";
        document.getElementById("reviewDetailModalDeleteBtn").style.display = "flex";
      }
      if(document.getElementById("reviewListReview").getAttribute('grade')=='A'){
        document.getElementById("reviewDetailModalModifyBtn").style.display = "flex";
        document.getElementById("reviewDetailModalDeleteBtn").style.display = "flex";
      }
      // 리뷰 이미지 넣기
      for (let i = 0; i < review.reviewImg.length; i++) {
        for (let index = 0; index < 5; index++) {
          if (review.reviewImg[i].reviewImgOrder==index) {
            document.getElementsByClassName("Detailpreview")[index].src = "/images/common/no-image.png";
            document.getElementsByClassName("preview")[index].src = "/images/common/no-image.png";
            document.getElementsByClassName("Detailpreview")[index].src = review.reviewImg[i].reviewPath;
            document.getElementsByClassName("preview")[index].src = review.reviewImg[i].reviewPath;
            document.getElementsByClassName("Detailpreview")[index].style.display = "block";
          }
        }
      }
      if(review.reviewImg.length==0){
        for (let index = 1; index < 5; index++) {
          document.getElementsByClassName("Detailpreview")[index].style.display = "none";
        }
      }
      let i = (122/5*review.reviewScore);
      let color = Math.abs(74/5* review.reviewScore - 160)
      setTimeout(()=>{ 
        document.getElementById("reviewDetailScoreColor").style.width=i+"px";
        document.getElementById("reviewDetailScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
      }, 100);
      
    if (review.reviewScore>=5) {
      document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
    }else{
      document.getElementById("reviewScorePoint").innerText="점"
    }
      memberName = review.memberName
      reviewCreateDate = review.reviewCreateDate
      option = review.option.color+"/"+review.option.size
      productName = review.product.productName
      productPrice = review.product.productPrice
      productSalePrice =review.product.productSalePrice
      reviewCount = review.reviewCount
      reviewContent = review.reviewContent
      reviewScore=review.reviewScore
      reviewNum=review.reviewNo
      orderNo=review.orderNo
    }) 
    .catch (e => { console.log(e)}); 

  });
};
  
/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
if (modal!=null) {
  modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("review-modal-overlay")) {
      modal.style.display = "none";
        document.body.style.removeProperty('overflow');
        document.getElementById("reviewDetailScoreColor").style.width=0+"px";
    }
    
  });
}

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
  if (modal!=null) {
    if(modal.style.display === "flex" && e.key === "Escape") {
        modal.style.display = "none"
        document.body.style.removeProperty('overflow');
        document.getElementById("reviewDetailScoreColor").style.width=0+"px";
    }
  }
});

/* 모달창 내부 닫기 버튼 */
const modalClose = document.getElementsByClassName("review-modal-close")[0];
if (modalClose != null) {
  modalClose.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.removeProperty('overflow');
    document.getElementById("reviewDetailScoreColor").style.width=0+"px";
  });
  
}



// 수정하기 모달~*************************************
const modifyModal = document.getElementsByClassName("review-modal-overlay")[1];
if (document.getElementById("reviewDetailModalModifyBtn")!=null) {
  document.getElementById("reviewDetailModalModifyBtn").addEventListener("click", e=>{
    modal.style.display = "none";
    modifyModal.style.display = "flex";
    // document.getElementById("reviewModifyModalDate").innerText=reviewCreateDate;
    // document.getElementById("reviewModifyModalOption").innerText=option;
    document.getElementById("reviewModifyModalProductName").innerText=productName;
    document.getElementById("reviewModifyModalProductPrice").innerText=productPrice.toLocaleString();
    document.getElementById("reviewModifyModalProductSalePrice").innerText=productSalePrice.toLocaleString();
    document.getElementById("reviewModifyModalReviewCount").innerText=reviewCount;
    document.getElementById("reviewModifyModalContent").value=reviewContent;
    document.getElementById("reviewModifyModalReviewNo").value=reviewNum;
    document.getElementById("reviewModifyModalOrderNo").value=orderNo;
    document.getElementById("reviewModifyModalStar").value=reviewScore;
    document.getElementById("reviewModalTextScore").value=reviewScore;
    document.getElementById("reviewModifyModalStar").value=reviewScore;
   

    let i = (122/5*reviewScore);
    let color = Math.abs(74/5* reviewScore - 160)
    document.getElementById("reviewScoreColor").style.width=i+"px";
    document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';

    if (reviewScore>=5) {
      document.getElementById("reviewModifyScorePoint").innerText="점 ╰(*°▽°*╰)"
    }else{
      document.getElementById("reviewModifyScorePoint").innerText="점"
    }
  })
}

// 삭제하기 모달
if (document.getElementById("reviewDetailModalDeleteBtn")!=null) {
  document.getElementById("reviewDetailModalDeleteBtn").addEventListener("click", e=>{
    const reviewNo = reviewNum;
    var url = "/review/delete?reviewNo="+reviewNo;
    location.href=url;
  })
}

/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
if (modifyModal!=null) {
  modifyModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("review-modal-overlay")) {
      modifyModal.style.display = "none";
      document.body.style.removeProperty('overflow');
    }
  });
  
}

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
if (modifyModal!=null) {
  window.addEventListener("keyup", e => {
    if(modifyModal.style.display === "flex" && e.key === "Escape") {
      modifyModal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
  });
}

/* 모달창 내부 닫기 버튼 */
const modifyModalClose = document.getElementsByClassName("review-modal-close")[1];
if (modifyModalClose!=null) {
  modifyModalClose.addEventListener("click", e => {
    modifyModal.style.display = "none";
    document.body.style.removeProperty('overflow');
  });
  
}

// 리뷰 별점///////////////////////
const score = document.getElementById("reviewModifyModalStar");

// 1. 클릭 중인지 아닌지를 나타내는 상태변수 `isClicked` 를 추가한다.
let isClicked = false;
// 2. 마우스를 계속 누르고 있으면 상태를 바꾼다.
if (score != null) {
  
  score.addEventListener("mousedown", (e) => {
        isClicked = true;
    });
  // 3. `isClicked == true` 일 때만 `mousemove` 이벤트가 시작한다.
  score.addEventListener("mousemove", (e) => {
        if (isClicked) {
          let i = (123/5*e.target.value);
          document.getElementById("reviewScoreColor").style.width=i+"px";
          document.getElementById("reviewModalTextScore").value = e.target.value;
          let color = Math.abs(74/5* e.target.value - 160)
          // document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206, 74)';
          document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
          if (e.target.value>=5) {
            document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
          }else{
            document.getElementById("reviewScorePoint").innerText="점"
          }
          if (e.target.value>=5) {
            document.getElementById("reviewModifyScorePoint").innerText="점 ╰(*°▽°*╰)"
          }else{
            document.getElementById("reviewModifyScorePoint").innerText="점"
          }
          
        }
      });
      // 바뀔 때 마다 변경
      score.addEventListener("change", (e) => {
        let i = ((123/5)*e.target.value);
        document.getElementById("reviewScoreColor").style.width=i+"px";
        document.getElementById("reviewModalTextScore").value = e.target.value;
        let color = Math.abs(74/5* e.target.value - 160)
        // document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206, 74)';
        document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
        if (e.target.value>=5) {
          document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
        }else{
          document.getElementById("reviewScorePoint").innerText="점"
        }
        if (e.target.value>=5) {
          document.getElementById("reviewModifyScorePoint").innerText="점 ╰(*°▽°*╰)"
        }else{
          document.getElementById("reviewModifyScorePoint").innerText="점"
        }
      });
  
      
      
      // 4. 마우스에서 손을 땠을 때의 이벤트 `mouseup` 을 추가한다.
      window.addEventListener("mouseup", () => {
        isClicked = false;
      });
      
      // 입력 시 변경
      function scoreValue(score){
        let scoreNum = score;
        if(score>5){
          document.getElementById("reviewModalTextScore").value=5;
          scoreNum = 5;
        }
        document.getElementById("reviewModifyModalStar").value=scoreNum;
        let i = (123/5*scoreNum);
        document.getElementById("reviewScoreColor").style.width=i+"px";
        let color = Math.abs(74/5* scoreNum - 160);
        document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
        // document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206, 74)';
        if (score>=5) {
          document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
        }else{
          document.getElementById("reviewScorePoint").innerText="점"
        }
        if (score>=5) {
          document.getElementById("reviewModifyScorePoint").innerText="점 ╰(*°▽°*╰)"
        }else{
          document.getElementById("reviewModifyScorePoint").innerText="점"
        }
  
  }
}

// 게시글 수정 시 삭제된 이미지의 순서를 기록할 Set 객체 생성
const preview = document.getElementsByClassName("preview");
const deleteSet = new Set(); // 순서x, 중복x 
const deleteImage = document.getElementsByClassName("deleteImg");
// -> x버튼 클릭 시 순서를 한 번만 저장하는 용도
const inputImage = document.getElementsByClassName("reviewImg");
for(let i=0; i<inputImage.length; i++){
  inputImage[i].addEventListener('change', e=>{

  // 파일이 선택되거나, 선택 후 취소 되었을 때
      const file = e.target.files[0]; // 선택된 파일의 데이터

      if(file != undefined){ // 파일이 선택되었을 때
          const reader = new FileReader(); // 파일을 읽는 객체

          reader.readAsDataURL(file);
          // 지정된 파일을 읽은 후 result 변수에 URL 형식으로 저장

          reader.onload = e => { // 파일을 다 읽은 후 수행
              preview[i].setAttribute("src", e.target.result);

              // 이미지가 성공적으로 읽어지면 
              // delelteSet에서 삭제
              deleteSet.delete(i);
          }


      } else{ // 선택 후 취소 되었을 때 -> 선택된 파일 없음 -> 미리보기 삭제
          preview[i].removeAttribute("src");
      }
  })
  deleteImage[i].addEventListener('click', () => {
    // 미리보기 이미지가 있을 경우
    if(preview[i].getAttribute("src") != ""){
          // 미리보기 삭제
          preview[i].removeAttribute("src");

          // input type = "file" 태그의 value를 삭제
          // ** input type="file" 의 value는 ""(빈칸)만 대입 가능
          inputImage[i].value = "";
          document.getElementsByClassName("preview")[i].src="/images/common/no-image.png";
          // deleteSet에 삭제된 이미지 순서 추가
          deleteSet.add(i);
      }
  })
}

if (document.getElementById("modifyReview")!=null) {
  
  document.getElementById("modifyReview").addEventListener('click', e=>{
  
      // input type = "hidden" 태그에 deleteSet에 저장된 값을 "1,2,3" 형태로 변경해서 저장
  
      /* JS 배열은  string에 대입되거나 출력될 때 요소, 요소, 요소 형태의 문자열을 반환한다! */
      document.querySelector("[name='deleteList']").value = Array.from(deleteSet);/* set -> Array 변경 */
  
  });
}
//  flqb tkrwp
if (document.getElementById("deleteReview")!=null) {
  document.getElementById("deleteReview").addEventListener("click", e=> {
    const reviewNo =document.getElementById("reviewModifyModalReviewNo").value;
    var url = "/review/delete?reviewNo="+reviewNo;
    location.href=url;
  })
}
//  리뷰 삭제
if (document.getElementById("listDelete")!=null) {
  document.getElementById("listDelete").addEventListener("click", e=> {
    const reviewNo =e.target.getAttribute("value");
    alert(reviewNo)
    var url = "/review/delete?reviewNo="+reviewNo;
    location.href=url;
  })
}

// 베스트 리뷰 모달창
if (document.getElementById("bestReview")!=null) {
  
  document.getElementById("bestReview").addEventListener("click", e=> {
    document.getElementById("bestReview-modal-overlay").style.display = "flex";
  
    document.getElementById("newBestReviewNo").value = reviewNum;
    document.getElementById("newBestReview").innerText = reviewNum;
    document.getElementById("newBestProduct").innerText = productName;
    document.getElementById("newBestContent").innerText =(reviewContent.length>20)? reviewContent.substring(0, 20)+"...":reviewContent;
    document.getElementById("newBestScore").innerText = reviewScore;
    document.getElementById("newBestWrite").innerText = memberName;
    document.getElementById("newBestDate").innerText = reviewCreateDate;
  })
}
const bestModal = document.getElementById("bestReview-modal-overlay");
/* 베스트 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
if (bestModal!=null) {
  bestModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.getAttribute("value")=="modalBack") {
      bestModal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
    
  });
  
}


/* 모달창 내부 닫기 버튼 */
const bestReviewCan = document.getElementById("bestReviewCan");
if (bestReviewCan!=null) {
  bestReviewCan.addEventListener("click", e => {
    bestModal.style.display = "none";
  });
  
}

if(document.getElementById("reviewSubmit")!=null){
  document.getElementById("reviewSubmit").addEventListener("submit", e=> {
    if(document.getElementById("reviewContent")==""){
      alert("리뷰 내용을 입력주세요.")
      e.preventDefault();
    }
  })
}