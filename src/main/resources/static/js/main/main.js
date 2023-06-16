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

/* 퀵메뉴 스크롤 숨김효과 */
const quickMenu = document.querySelector('.quick-menu');
let isHidden = true;

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition > 300 && isHidden) {
    quickMenu.style.transform = 'translateX(0)';
    isHidden = false;
  }

  if (scrollPosition <= 300 && !isHidden) {
    quickMenu.style.transform = 'translateX(100px)';
    isHidden = true;
  }

  if (scrollPosition + windowHeight >= documentHeight - 300) {
    quickMenu.style.transform = 'translateX(100px)';
    isHidden = true;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  quickMenu.style.transform = 'translateX(100px)';
});