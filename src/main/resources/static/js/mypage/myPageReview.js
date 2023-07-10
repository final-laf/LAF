// 리뷰 작성하기
const wirteReview = document.getElementsByClassName("myPageReviewBtn");
for(let review of wirteReview) {
  /* 리뷰 아이템 클릭시 */
  review.addEventListener('click', e => {

    const orderNo = e.target.getAttribute("orderNo");
    const productNo = e.target.getAttribute("productNo");
    const optionNo = e.target.getAttribute("optionNo");
    const orderProduct = {orderNo:orderNo, productNo:productNo,optionNo:optionNo}
    modal.style.display = "block";
    document.body.style.overflowY = "hidden";

    fetch("/review/detail",{
      method : "POST", 
      headers : {"Content-Type" : "application/json; charset=UTF-8"},
      body : JSON.stringify(orderProduct)

    })
    .then(response => response.json()) 
    .then(review => {
      for (let i = 0; i < 5; i++) {
        document.getElementsByClassName("preview")[i].src = "/images/common/no-image.png";
      }
      document.getElementById("reviewModifyModalStar").value="";
      document.getElementById("reviewModalTextScore").value="";
      document.getElementById("reviewModifyModalStar").value="";
      document.getElementById("reviewModifyModalContent").innerText="";
      document.getElementById("reviewScoreColor").style.width=0+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = "white";

      document.getElementById("reviewModifyModalProductName").innerText=review.product.productName;
      document.getElementById("reviewModifyModalProductPrice").innerText=review.product.productPrice;
      document.getElementById("reviewModifyModalProductSalePrice").innerText=review.product.productSalePrice;
      document.getElementById("reviewWriteProduct").src=review.product.thumbnailPath;
      document.getElementById("reviewModifyModalReviewCount").innerText=review.reviewCount;
      document.getElementById("reviewModifyModalOptionNo").value=review.optionNo;
      document.getElementById("reviewModifyModalProductNo").value=review.productNo;
      document.getElementById("reviewModifyModalOrderNo").value=review.orderNo;
      document.getElementById("reviewModifyModalStar").value=5;
      document.getElementById("reviewModalTextScore").value=5;
      document.getElementById("reviewModifyModalStar").value=5;
      
      for (let i = 0; i < review.reviewImg.length; i++) {
        for (let index = 0; index < 5; index++) {
          if (review.reviewImg[i].reviewImgOrder==index) {
            document.getElementsByClassName("preview")[index].src = review.reviewImg[i].reviewPath;
          }
        }
      }
      let i = (122);
      let color = Math.abs(86)
      document.getElementById("reviewScoreColor").style.width=i+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
      document.getElementById("reviewScorePoint").innerText="점 ╰(*°▽°*╰)"
    }) 
    .catch (e => { console.log(e)}); 
  });
};
/* 리뷰 수정 모달 */
const modal = document.getElementsByClassName("review-modal-overlay")[0];
const modifyReview = document.getElementsByClassName("myPageReviewModify");
for(let review of modifyReview) {
  /* 리뷰 아이템 클릭시 */
  review.addEventListener('click', e => {

    const reviewNo = e.target.getAttribute("value");
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";

    fetch("/review/detailReview?reviewNo="+reviewNo)  
    .then(response => response.json()) 
    .then(review => {
      for (let i = 0; i < 5; i++) {
            document.getElementsByClassName("preview")[i].src = "/images/common/no-image.png";
      }
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
      document.getElementById("reviewModifyProduct").src=review.product.thumbnailPath;
      for (let i = 0; i < review.reviewImg.length; i++) {
        for (let index = 0; index < 5; index++) {
          if (review.reviewImg[i].reviewImgOrder==index) {
            document.getElementsByClassName("preview")[index].src = review.reviewImg[i].reviewPath;
          }
        }
      }

      for (let i = 0; i < review.reviewImg.length; i++) {
        for (let index = 0; index < 5; index++) {
          if (review.reviewImg[i].reviewImgOrder==index) {
            document.getElementsByClassName("preview")[index].src = review.reviewImg[i].reviewPath;
            document.getElementsByClassName("preview")[index].style.display = "block";
          }
        }
      }

      let i = (122/5*review.reviewScore);
      let color = Math.abs(74/5* review.reviewScore - 160)
      document.getElementById("reviewScoreColor").style.width=i+"px";
      document.getElementById("reviewScoreColor").style.backgroundColor = 'rgb(238, 206,'+ color+')';
      if (review.reviewScore==5) {
        document.getElementById("reviewModifyScorePoint").innerText="점 ╰(*°▽°*╰)"
      }else{
        document.getElementById("reviewModifyScorePoint").innerText="점"
      }
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

const modalClose = document.getElementsByClassName("review-modal-close")[0];
if (modalClose!=null) {
  modalClose.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.removeProperty('overflow');
    document.getElementById("reviewScoreColor").style.width=0+"px";
  });
  
}
/* 수정모달창 내부 닫기 버튼 */

const modalModifyClose = document.getElementsByClassName("review-modal-close")[1];
if (modalModifyClose!=null) {
  modalModifyClose.addEventListener("click", e => {
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
if (document.getElementById("deleteReview")!=null) {
  document.getElementById("deleteReview").addEventListener("click", e=> {
    const reviewNo =document.getElementById("reviewModifyModalReviewNo").value;
    var url = "/review/delete?reviewNo="+reviewNo;
    location.href=url
  })
}
if (document.getElementById("listDelete")!=null) {
  document.getElementById("listDelete").addEventListener("click", e=> {
    const reviewNo =e.target.getAttribute("value");
    alert(reviewNo)
    var url = "/review/delete?reviewNo="+reviewNo;
    location.href=url
  })
}
// 리뷰 내용 확인
if(document.getElementById("reviewSubmit")!=null){
  document.getElementById("reviewSubmit").addEventListener("submit", e=> {

    if(document.getElementById("reviewModifyModalContent").value.trim() === ""){
      alert("리뷰 내용을 입력주세요.")
      e.preventDefault();
    }
  })
}