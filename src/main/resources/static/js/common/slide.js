// MD추천 : 아이템 1개씩 슬라이드
function slide1(slide_wrap) {
  const slideList = slide_wrap.querySelector('.slide_list_sub');  // Slide parent dom
  const slideContents = slide_wrap.querySelectorAll('.slide_content_sub');  // each slide dom
  const slideBtnNext = slide_wrap.querySelector('.slide_btn_next_sub'); // next button
  const slideBtnPrev = slide_wrap.querySelector('.slide_btn_prev_sub'); // prev button
  const slideLen = slideContents.length;  // slide length
  const slideWidth = 290; // slide width
  const slideSpeed = 300; // slide speed
  const startNum = 3; // initial slide index (0 ~ 4)
  
  slideList.style.width = slideWidth * (slideLen + 8) + "px";
  
  const limit = slideLen < 4 ? slideLen : 4;
  for(let i=0; i<limit; i++) {
    let clonedFrontChild = slideContents[i].cloneNode(true);
    let clonedRearChild = slideContents[slideLen-1-i].cloneNode(true);
    hoverInfo(clonedFrontChild);
    hoverInfo(clonedRearChild);
    slideList.appendChild(clonedFrontChild);
    slideList.insertBefore(clonedRearChild, slideList.firstElementChild);
  }

  slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

  let curIndex = startNum; // current slide index (except copied slide)
  let curSlide = slideContents[curIndex]; // current slide dom
  curSlide.classList.add('slide_active');

  /** Next Button Event */
  slideBtnNext.addEventListener('click', function() {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
  });

  /** Prev Button Event */
  slideBtnPrev.addEventListener('click', function() {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
  });
}

const md_reccomend = document.querySelector('.md-recommend.slide_wrap_sub');
slide1(md_reccomend);



// 신규상품, 추천상품 : 한 페이지(아이템 5개)씩 슬라이드
function slide2(slide_wrap) {
  const slideList = slide_wrap.querySelector('.slide_list_sub');  // Slide parent dom

  // 슬라이드 아이템 5의 배수로 맞춰주기
  let slideContents = slide_wrap.querySelectorAll('.slide_content_sub');  // each slide dom
  for(let i=0; i<(5 - slideContents.length % 5); i++) {
    if( slideContents.length % 5 == 0 ) break;
    let dummyChild = document.createElement('li');
    dummyChild.classList.add('slide_content_sub');
    slideList.appendChild(dummyChild);
  }
  slideContents = slide_wrap.querySelectorAll('.slide_content_sub');

  const slideBtnNext = slide_wrap.querySelector('.slide_btn_next_sub'); // next button
  const slideBtnPrev = slide_wrap.querySelector('.slide_btn_prev_sub'); // prev button
  const slideLen = Math.ceil(slideContents.length / 5);  // slide length
  const slideWidth = 1210; // slide width
  const slideSpeed = 300; // slide speed
  const startNum = 0; // initial slide index (0 ~ 4)

  slideList.style.width = slideWidth * (slideLen + 2) + "px";
  
  for(let i=0; i<5; i++) {
    let clonedFrontChild = slideContents[i].cloneNode(true);
    let clonedRearChild = slideContents[slideContents.length-1-i].cloneNode(true);
    slideList.appendChild(clonedFrontChild);
    slideList.insertBefore(clonedRearChild, slideList.firstElementChild);
  }

  slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

  let curIndex = startNum; // current slide index (except copied slide)
  let curSlide = slideContents[curIndex]; // current slide dom
  curSlide.classList.add('slide_active');

  /** Next Button Event */
  slideBtnNext.addEventListener('click', function() {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
  });

  /** Prev Button Event */
  slideBtnPrev.addEventListener('click', function() {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
  });
}

const sildeWrap2List = document.querySelectorAll('.slide_wrap_sub-2');
for(let el of sildeWrap2List) {
  slide2(el);
}