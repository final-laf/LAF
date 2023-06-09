// /* 메인슬라이드 */
// document.addEventListener("DOMContentLoaded", function () {
//   const slides = document.querySelectorAll(".main-banner input[name='slide']");
//   const slideImages = document.querySelectorAll(".main-banner .slide-img li");
//   const prevButton = document.querySelector(".main-banner-lbtn");
//   const nextButton = document.querySelector(".main-banner-rbtn");
//   let currentSlide = 0;

//   prevButton.addEventListener("click", function () {
//     currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
//     updateSlide();
//   });

//   nextButton.addEventListener("click", function () {
//     currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
//     updateSlide();
//   });

//   for (var i = 0; i < slides.length; i++) {
//     slides[i].addEventListener("click", function () {
//       currentSlide = Array.prototype.indexOf.call(slides, this);
//       updateSlide();
//     });
//   }

//   function updateSlide() {
//     for (var i = 0; i < slides.length; i++) {
//       slides[i].checked = false;
//       slideImages[i].style.display = "none";
//     }
//     slides[currentSlide].checked = true;
//     slideImages[currentSlide].style.display = "block";

//     let slideContainer = document.querySelector(".main-banner");
//     slideContainer.scrollLeft = currentSlide * slideContainer.offsetWidth;
//   }

//   updateSlide();
// });



/* 이미지 hover효과 */
function imgHover(input) {
  const productDescriptions = document.querySelectorAll(`.${input}-hover`);
  const productImgs = document.querySelectorAll(`.${input}-img`);

  productImgs.forEach((productImg, index) => {
    productImg.addEventListener("mouseover", () => {
      if (productDescriptions[index] && productDescriptions[index].classList) {
        productDescriptions[index].classList.remove('hidden');
      }
    });

    productImg.addEventListener("mouseout", () => {
      if (productDescriptions[index] && productDescriptions[index].classList) {
        productDescriptions[index].classList.add('hidden');
      }
    });
  });
}

imgHover('md-recommend');
imgHover('weekly-big');
imgHover('weekly');



/* 슬라이드효과 */
function slide(input) {
  const prevBtn = document.querySelector(`.${input}-lbtn`);
  const nextBtn = document.querySelector(`.${input}-rbtn`);
  const list = document.querySelector(`.${input}-list`);
  const images = document.querySelectorAll(`.${input}-list li`);

  list.style.width = images.length * (images[0].clientWidth + 20) + 'px'

  let position = 0;
  const IMAGE_WIDTH = 240;

  prevBtn.addEventListener("click", () => {
    position += IMAGE_WIDTH
    list.style.transition = 'transform 1s';
    list.style.transform = `translateX(${position}px)`
  })
  nextBtn.addEventListener("click", () => {
    position -= IMAGE_WIDTH
    list.style.transition = 'transform 1s';
    list.style.transform = `translateX(${position}px)`
  })
}
slide('md-recommend');
slide('new');
slide('only');




(() => {
  const slideList = document.querySelector('.slide-img');  // Slide parent dom
  const slideContents = document.querySelectorAll('.slide-img > li');  // each slide dom
  const slideBtnNext = document.querySelector('.main-banner-rbtn'); // next button
  const slideBtnPrev = document.querySelector('.main-banner-lbtn'); // prev button
  const pagination = document.querySelector('.slide_pagination');
  const slideLen = slideContents.length;  // slide length
  const slideWidth = window.offsetWidth; // slide width
  const slideSpeed = 300; // slide speed
  const startNum = 0; // initial slide index (0 ~ 4)

  slideList.style.width = slideWidth * (slideLen + 2) + "px";

  // Copy first and last slide
  let firstChild = slideList.firstElementChild;
  let lastChild = slideList.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  // Add copied Slides
  slideList.appendChild(clonedFirst);
  slideList.insertBefore(clonedLast, slideList.firstElementChild);

  // Add pagination dynamically
  let pageChild = '';
  for (var i = 0; i < slideLen; i++) {
    pageChild += '<li class="dot';
    pageChild += (i === startNum) ? ' dot_active' : '';
    pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
  }
  pagination.innerHTML = pageChild;
  const pageDots = document.querySelectorAll('.dot'); // each dot from pagination

  slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

  let curIndex = startNum; // current slide index (except copied slide)
  let curSlide = slideContents[curIndex]; // current slide dom
  curSlide.classList.add('slide_active');

  /** Next Button Event */
  slideBtnNext.addEventListener('click', function () {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(function () {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
  });

  /** Prev Button Event */
  slideBtnPrev.addEventListener('click', function () {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(function () {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
  });

  /** Pagination Button Event */
  let curDot;
  Array.prototype.forEach.call(pageDots, function (dot, i) {
    dot.addEventListener('click', function (e) {
      e.preventDefault();
      curDot = document.querySelector('.dot_active');
      curDot.classList.remove('dot_active');

      curDot = this;
      this.classList.add('dot_active');

      curSlide.classList.remove('slide_active');
      curIndex = Number(this.getAttribute('data-index'));
      curSlide = slideContents[curIndex];
      curSlide.classList.add('slide_active');
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
    });
  });
})();