/* 이미지 hover효과 추가용 함수*/
function hoverInfo(md) {
  md.querySelector('img').addEventListener("mouseover", () => {
    md.querySelector('.hover-info').classList.remove('hidden');
  });
  md.querySelector('img').addEventListener("mouseout", () => {
    md.querySelector('.hover-info').classList.add('hidden');
  });
}

/* 이미지 hover효과 : 페이지 로딩 시 실행*/
const thumbList = document.querySelectorAll('.thumbnail');
for(let el of thumbList) {
  el.addEventListener("mouseover", e => {
    e.target.parentElement.nextElementSibling.classList.remove('hidden');
  });
  el.addEventListener("mouseout", e => {
    e.target.parentElement.nextElementSibling.classList.add('hidden');
  });
}

// 위클리 베스트 카테고리 변경
const categoryBtns = document.querySelectorAll('.weekly-title button');
for(let btn of categoryBtns) {
  btn.addEventListener('click', e => {
    const curCategory = document.querySelector('.weekly-title button.current');
    curCategory.classList.remove('current');
    e.target.classList.add('current');

    // ajax로 카테고리 베스트 상품 불러오기
    fetch("/weekly?no=" + e.target.getAttribute('no'))
    .then(resp => resp.json())
    .then(productList => {
      
      const container = document.getElementById('weeklyProductContainer');
      container.innerHTML = '';

      for(product of productList) {
        
        // 상품 썸네일 이미지
        const img = document.createElement('img');
        img.classList.add('thumbnail');
        if(product.thumbnailPath != null) {
          img.setAttribute('src', product.thumbnailPath);
        } else {
          img.setAttribute('src', '/images/common/no-image.png');
        }

        const a = document.createElement('a');
        a.setAttribute("href", '/product/' + product.productNo);
        a.append(img);

        // 상품명
        const name = document.createElement('div');
        name.classList.add('item-name');
        name.innerText = product.productName;

        // 상품 가격정보
        const priceSet = document.createElement('div');
        priceSet.classList.add('item-price-set');

        const salePrice = document.createElement('span');
        salePrice.classList.add('item-price');
        salePrice.innerText = numberWithCommas(product.productSalePrice);
        priceSet.append(salePrice);

        // 할인중인 경우
        if(product.productSale != 0) {
          const discount = document.createElement('span');
          discount.classList.add('item-price-discount');
          discount.innerText = product.productSale + '%';

          const origin = document.createElement('span');
          origin.classList.add('item-price-origin');
          origin.innerText = numberWithCommas(product.productPrice);

          priceSet.append(discount, origin);
        }

        // 추가정보
        const review = document.createElement('div');
        review.classList.add('item-rieview-count');
        review.innerText = '리뷰 : ' + product.reviewCount;

        const heart = document.createElement('img');
        heart.src = '/images/common/like-fill.svg';

        const likeCount = document.createElement('span');
        likeCount.innerText = product.likeCount;

        const info = document.createElement('div');
        info.classList.add('item-additional-info');
        info.append(review, heart, likeCount);

        // 상품정보(hover)
        const hover = document.createElement('div');
        hover.classList.add('hover-info');
        hover.classList.add('hidden');
        hover.append(name, priceSet, info);

        // weeklyProduct
        const weekly = document.createElement('div');
        weekly.classList.add('weekly-product');
        weekly.append(a);
        weekly.append(hover);
        hoverInfo(weekly); // hover 이벤트 추가

        container.append(weekly);
      }
    })
    .catch(e => console.log(e));
  });
}


/* 메인화면 Banner */
(function () {
  const slideList = document.querySelector('.slide_list');  // Slide parent dom
  const slideContents = document.querySelectorAll('.slide_content');  // each slide dom
  const slideBtnNext = document.querySelector('.slide_btn_next'); // next button
  const slideBtnPrev = document.querySelector('.slide_btn_prev'); // prev button
  const pagination = document.querySelector('.slide_pagination');
  const slideLen = slideContents.length;  // slide length
  const slideWidth = window.innerWidth < 1920 ? 1920 : window.innerWidth; // slide width
  const slideSpeed = 500; // slide speed
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
    pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
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

// 3초마다 배너 변경하기
setInterval(() => document.querySelector('.slide_btn_next').click(), 3000);