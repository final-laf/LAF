/* 리뷰 상세 모달 */
const modal = document.getElementsByClassName("review-modal-overlay")[0];
const reviewDetail = document.getElementsByClassName("myPageReviewModify");
console.log(modal);
// let memberName = "";
// let reviewCreateDate = "";
// let option = "";
// let productName = "";
// let productPrice = "";
// let productSalePrice = "";
// let reviewCount = "";
// let reviewContent = "";
for(let review of reviewDetail) {
  /* 리뷰 아이템 클릭시 */
  review.addEventListener('click', e => {

    const reviewNo = e.target.getAttribute("value");
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";

    fetch("/review/detail?reviewNo="+reviewNo)  
    .then(response => response.json()) 
    .then(review => {
      document.getElementById("reviewModifyModalStar").value="";
      document.getElementById("reviewModalTextScore").value="";
      document.getElementById("reviewModifyModalStar").value="";
      document.getElementById("reviewScoreColor").style.width=0+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = "white";

      document.getElementById("reviewModifyModalProductName").innerText=review.product.productName;
      document.getElementById("reviewModifyModalProductPrice").innerText=review.product.productPrice;
      document.getElementById("reviewModifyModalProductSalePrice").innerText=review.product.productSalePrice;
      document.getElementById("reviewModifyModalReviewCount").innerText=review.reviewCount;
      document.getElementById("reviewModifyModalContent").innerText=review.reviewContent;
      document.getElementById("reviewModifyModalReviewNo").value=review.reviewNo;
      document.getElementById("reviewModifyModalOrderNo").value=review.orderNo;
      document.getElementById("reviewModifyModalStar").value=review.reviewScore;
      document.getElementById("reviewModalTextScore").value=review.reviewScore;
      document.getElementById("reviewModifyModalStar").value=review.reviewScore;
      let i = (123/5*review.reviewScore);
      let color = Math.abs(74/5* review.reviewScore - 160)
      document.getElementById("reviewScoreColor").style.width=i+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
      if (review.reviewScore==5) {
        document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
      }else{
        document.getElementById("reviewScorePoint").innerText="점"
      }
      // memberName = review.memberName
      // reviewCreateDate = review.reviewCreateDate
      // option = review.option.color+"/"+review.option.size
      // productName = review.product.productName
      // productPrice = review.product.productPrice
      // productSalePrice =review.product.productSalePrice
      // reviewCount = review.reviewCount
      // reviewContent = review.reviewContent
      // document.getElementById("reviewModalName").innerText="review.memberName";
    }) 
    .catch (e => { console.log(e)}); 
  });
};

// 리뷰 작성하기
const wirteReview = document.getElementsByClassName("myPageReviewBtn");
for(let review of wirteReview) {
  /* 리뷰 아이템 클릭시 */
  review.addEventListener('click', e => {

    console.log(review)
    console.log(modal)
    const reviewNo = e.target.getAttribute("value");
    modal.style.display = "block";
    document.body.style.overflowY = "hidden";

    fetch("/review/detail?reviewNo="+reviewNo)  
    .then(response => response.json()) 
    .then(review => {
      document.getElementById("reviewModifyModalStar").value="";
      document.getElementById("reviewModalTextScore").value="";
      document.getElementById("reviewModifyModalStar").value="";
      document.getElementById("reviewScoreColor").style.width=0+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = "white";

      document.getElementById("reviewModifyModalProductName").innerText=review.product.productName;
      document.getElementById("reviewModifyModalProductPrice").innerText=review.product.productPrice;
      document.getElementById("reviewModifyModalProductSalePrice").innerText=review.product.productSalePrice;
      document.getElementById("reviewModifyModalReviewCount").innerText=review.reviewCount;
      document.getElementById("reviewModifyModalContent").innerText="";
      document.getElementById("reviewModifyModalReviewNo").value=review.reviewNo;
      document.getElementById("reviewModifyModalOrderNo").value=review.orderNo;
      document.getElementById("reviewModifyModalStar").value=5;
      document.getElementById("reviewModalTextScore").value=5;
      document.getElementById("reviewModifyModalStar").value=5;
      let i = (123);
      let color = Math.abs(86)
      document.getElementById("reviewScoreColor").style.width=i+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
      document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
      // memberName = review.memberName
      // reviewCreateDate = review.reviewCreateDate
      // option = review.option.color+"/"+review.option.size
      // productName = review.product.productName
      // productPrice = review.product.productPrice
      // productSalePrice =review.product.productSalePrice
      // reviewCount = review.reviewCount
      // reviewContent = review.reviewContent
      // document.getElementById("reviewModalName").innerText="review.memberName";
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
        document.getElementById("reviewScoreColor").style.width=0+"px";
    }
  });
}

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
if (modal!=null) {
  window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
        modal.style.display = "none"
        document.body.style.removeProperty('overflow');
        document.getElementById("reviewScoreColor").style.width=0+"px";
    }
  });
}

/* 모달창 내부 닫기 버튼 */

const modalClose = document.getElementsByClassName("review-modal-close")[1];
if (modalClose!=null) {
  modalClose.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.removeProperty('overflow');
    document.getElementById("reviewScoreColor").style.width=0+"px";
  });
  
}



// 리뷰 별점///////////////////////
const score = document.getElementById("reviewModifyModalStar");

// 1. 클릭 중인지 아닌지를 나타내는 상태변수 `isClicked` 를 추가한다.
let isClicked = false;
// 2. 마우스를 계속 누르고 있으면 상태를 바꾼다.
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
        if (e.target.value==5) {
          document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
        }else{
          document.getElementById("reviewScorePoint").innerText="점"
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
      if (e.target.value==5) {
        document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
      }else{
        document.getElementById("reviewScorePoint").innerText="점"
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
      if (e.target.value==5) {
        document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
      }else{
        document.getElementById("reviewScorePoint").innerText="점"
      }

}
// 74 160

// 미리보기 관련 요소 
const preview = document.getElementsByClassName("preview"); 
const inputImg = document.getElementsByClassName("reviewImg");
const deleteImg = document.getElementsByClassName("deleteImg");

// 파일이 선택되거나 선택 후 취소 되었을 때
for(let i=0; i<inputImg.length; i++){
  inputImg[i].addEventListener('change', e=>{
    const file = e.target.files[0];

    if(file != undefined){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // 지정된 파일을 읽은 후 result 변수에 URL 형식으로 저장

      reader.onload= e=> {
        preview[i].setAttribute("src", e.target.result);
      }

    }else{ //선택 후 취소되었을 때
      preview[i].removeAttribute("src");
    }
  })
  deleteImg[i].addEventListener('click', () => {
    // 미리보기 이미지가 있을 경우
    if(preview[i].getAttribute("src") != ""){
      preview[i].src="/images/review/review_image_upload.png";

      inputImg[i].value="";
    }
    
  });
}
// function emot(){
//   if (document.getElementById("reviewScorePoint").innerText=="점 ╰(*°▽°*)╰") {
//     document.getElementById("reviewScorePoint").innerText="점 (╯*°▽°*)╯";
//   }
//   if (document.getElementById("reviewScorePoint").innerText=="점 (╯*°▽°*)╯") {
//     document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)";
//   }
  
//   if (document.getElementById("reviewModalTextScore").value!=5){
//     document.getElementById("reviewScorePoint").innerText="점";
//     return"";
//   }
//   return setTimeout(emot(), 100);
// }