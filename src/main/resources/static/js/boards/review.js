/* 리뷰 상세 모달 */

const modal = document.getElementById("review-modal-overlay")
const reviewDetail = document.getElementsByClassName("reviews-item")


for(let review of reviewDetail) {

  /* 리뷰 리스트 클릭시 */
  review.addEventListener('click', () => {
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";
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