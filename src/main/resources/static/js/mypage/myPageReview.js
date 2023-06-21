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
      review.
      memberName = review.memberName
      reviewCreateDate = review.reviewCreateDate
      option = review.option.color+"/"+review.option.size
      productName = review.product.productName
      productPrice = review.product.productPrice
      productSalePrice =review.product.productSalePrice
      reviewCount = review.reviewCount
      reviewContent = review.reviewContent
      console.log(review.reviewScore)
      switch(review.reviewScore){
        case 5 :
          asd.classList
          break;
      }
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