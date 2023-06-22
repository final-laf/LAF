/* 작성한 리뷰 모달 */
const modal = document.getElementsByClassName("review-modal-overlay")[0];
const reviewDetail = document.getElementsByClassName("reviewListDetail");
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
  /* 작성한 리뷰 리뷰 수정 클릭시 */
  review.addEventListener('click', e => {
    const reviewNo = e.target.getAttribute("value");
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";

    fetch("/review/detail?reviewNo="+reviewNo)  
    .then(response => response.json()) 
    .then(review => {
      document.getElementById("reviewDetailModalName").innerText=review.memberName;
      document.getElementById("reviewDetailModalDate").innerText=review.reviewCreateDate;
      document.getElementById("reviewDetailModalOption").innerText=review.option.color+"/"+review.option.size;
      document.getElementById("reviewDetailModalProductName").innerText=review.product.productName;
      document.getElementById("reviewDetailModalProductPrice").innerText=review.product.productPrice;
      document.getElementById("reviewDetailModalProductSalePrice").innerText=review.product.productSalePrice;
      document.getElementById("reviewDetailModalReviewCount").innerText=review.reviewCount;
      document.getElementById("reviewDetailModalContent").innerText=review.reviewContent;
      memberName = review.memberName
      reviewCreateDate = review.reviewCreateDate
      option = review.option.color+"/"+review.option.size
      productName = review.product.productName
      productPrice = review.product.productPrice
      productSalePrice =review.product.productSalePrice
      reviewCount = review.reviewCount
      reviewContent = review.reviewContent
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
    }
  });
}

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

score.addEventListener("change", (e) => console.log(e.target.value))
score.addEventListener("mousemove", (e) => console.log(e.target.value));


// f