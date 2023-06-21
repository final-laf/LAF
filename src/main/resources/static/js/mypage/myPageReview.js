/* 리뷰 상세 모달 */
const modal = document.getElementsByClassName("review-modal-overlay")[1];
const reviewDetail = document.getElementsByClassName("myPageReviewModify");
console.log(modal);
let memberName = "";
let reviewCreateDate = "";
let option = "";
let productName = "";
let productPrice = "";
let productSalePrice = "";
let reviewCount = "";
let reviewContent = "";
for(let review of reviewDetail) {
  /* 리뷰 아이템 클릭시 */
  review.addEventListener('click', e => {

    const reviewNo = e.target.getAttribute("value");
    console.log(reviewNo)
    console.log(modal)
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";

    fetch("/review/detail?reviewNo="+reviewNo)  
    .then(response => response.json()) 
    .then(review => {
      document.getElementById("reviewModifyModalProductName").innerText=review.product.productName;
      document.getElementById("reviewModifyModalProductPrice").innerText=review.product.productPrice;
      document.getElementById("reviewModifyModalProductSalePrice").innerText=review.product.productSalePrice;
      document.getElementById("reviewModifyModalReviewCount").innerText=review.reviewCount;
      document.getElementById("reviewModifyModalContent").innerText=review.reviewContent;
      memberName = review.memberName
      reviewCreateDate = review.reviewCreateDate
      option = review.option.color+"/"+review.option.size
      productName = review.product.productName
      productPrice = review.product.productPrice
      productSalePrice =review.product.productSalePrice
      reviewCount = review.reviewCount
      reviewContent = review.reviewContent
      console.log(review.reviewScore)
      // document.getElementById("reviewModalName").innerText="review.memberName";
    }) 
    .catch (e => { console.log(e)}); 
  });
};
  
/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
modal.addEventListener("click", e => {
  const evTarget = e.target
  if(evTarget.classList.contains("review-modal-overlay")) {
    modal.style.display = "none";
      document.body.style.removeProperty('overflow');
  }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
  if(modal.style.display === "flex" && e.key === "Escape") {
      modal.style.display = "none"
      document.body.style.removeProperty('overflow');
  }
});

/* 모달창 내부 닫기 버튼 */
const modalClose = document.getElementsByClassName("review-modal-close")[0];
modalClose.addEventListener("click", e => {
  modal.style.display = "none";
  document.body.style.removeProperty('overflow');
});


// 수정하기 모달~*************************************
const modifyModal = document.getElementsByClassName("review-modal-overlay")[1];
if (document.getElementById("reviewDetailModalModifyBtn")!=null) {
  document.getElementById("reviewDetailModalModifyBtn").addEventListener("click", e=>{
    modal.style.display = "none";
    document.getElementsByClassName("review-modal-overlay")[1].style.display = "flex";
    // document.getElementById("reviewModifyModalDate").innerText=reviewCreateDate;
    // document.getElementById("reviewModifyModalOption").innerText=option;
    document.getElementById("reviewModifyModalProductName").innerText=productName;
    document.getElementById("reviewModifyModalProductPrice").innerText=productPrice;
    document.getElementById("reviewModifyModalProductSalePrice").innerText=productSalePrice;
    document.getElementById("reviewModifyModalReviewCount").innerText=reviewCount;
    document.getElementById("reviewModifyModalContent").innerText=reviewContent;
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
score.addEventListener("mousedown", (e) => {
      isClicked = true;
	});
// 3. `isClicked == true` 일 때만 `mousemove` 이벤트가 시작한다.
score.addEventListener("mousemove", (e) => {
      if (isClicked) {
        console.log(e.target.value);
        let i = (123/5*e.target.value);
        document.getElementById("reviewScoreColor").style.width=i+"px";
        document.getElementById("reviewModalTextScore").value = e.target.value;
        let color = Math.abs(74/5* e.target.value - 160)
        console.log(color)
        // document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206, 74)';
        document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
        
      }
    });
    
    score.addEventListener("change", (e) => {
      console.log(e.target.value);
      let i = ((123/5)*e.target.value);
      document.getElementById("reviewScoreColor").style.width=i+"px";
      document.getElementById("reviewModalTextScore").value = e.target.value;
      let color = Math.abs(74/5* e.target.value - 160)
      console.log(color)
      // document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206, 74)';
      document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
    });
    
    // 4. 마우스에서 손을 땠을 때의 이벤트 `mouseup` 을 추가한다.
    window.addEventListener("mouseup", () => {
      isClicked = false;
    });
    
    
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

}
// 74 160

