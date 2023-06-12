// 좋아요(♡) 클릭 시 이미지 변경
const likeImages = document.querySelectorAll('img.like');
for (let like of likeImages) {
  like.addEventListener('click', () => {
    if (like.getAttribute('src').includes('fill'))
      like.setAttribute('src', '/images/common/like-grey.svg');
    else
      like.setAttribute('src', '/images/common/like-fill.svg');
  });
}

// 옵션 버튼 선택 시 클래스(selected) 추가
const optionBtns = document.querySelectorAll('.option-btn > button');
for (let btn of optionBtns) {
  btn.addEventListener('click', e => {
    const preSelected = e.target.parentElement.parentElement.querySelector('.selected');
    if (preSelected != null)
      preSelected.classList.remove('selected');
    e.target.classList.add('selected');
  });
}

// 컬러 선택한 이후에 사이즈 선택하기 (품절 사이즈 제외)
const colorBtns = document.querySelectorAll('button[name="color"]');
const sizeBtns = document.querySelectorAll('button[name="size"]');
for (let colorBtn of colorBtns) {
  colorBtn.addEventListener('click', e => {
    const productNo = location.href.split('/')[4];
    const color = e.target.getAttribute('value');

    fetch("/getStock?" + "productNo=" + productNo + "&color=" + color)
      .then(resp => resp.json())
      .then(emptyStockList => {
        for (let size of emptyStockList) {
          for (let sizeBtn of sizeBtns) {
            if (sizeBtn.getAttribute('value') != size) {
              sizeBtn.disabled = false;
            }
          }
        }
      })
      .catch(e => console.log(e));
  });
}

// 총 상품금액, 갯수 업데이트
function updateTotal() {
  const totalPriceEl = document.querySelector('#totalSelectePrice');
  const totalCountEl = document.querySelector('#totalSelectedCount');
  const liList = document.querySelectorAll('#productCurrentItem > li');

  let totalPrice = 0;
  let totalCount = 0;
  for(let li of liList) {
    const price = Number(li.querySelector('.current-price').innerText.replace(',', ''));
    const count = Number(li.querySelector('.current-count > span').innerText);
    totalPrice += price;
    totalCount += count;
  }

  totalPriceEl.innerText = numberWithCommas(totalPrice);
  totalCountEl.innerText = totalCount;
}

// 옵션 모두 선택 시 [상품선택] 실시간 추가 
for(let btn of sizeBtns) {
  btn.addEventListener('click', e => {
    const selectedColorBtn = document.querySelector('button[name="color"].selected');
    const selectedSizeBtn = document.querySelector('button[name="size"].selected');
    const color = selectedColorBtn.getAttribute('value');
    const size = selectedSizeBtn.getAttribute('value');
    const price = Number(document.querySelector('#productSalePrice').innerText.replace(',', ''));
    
    // 이미 추가된 옵션인지 확인
    const curList = document.querySelectorAll('#productCurrentItem > li > .current-selected-option');
    for(let op of curList) {
      if(op.innerText == color + "/" + size) {
        alert('이미 추가된 옵션입니다.');
        return;
      }
    }

    const option = document.createElement('div');
    option.classList.add('current-selected-option');
    option.innerText = color + "/" + size;

    const minusBtn = document.createElement('button');
    minusBtn.setAttribute("type", "button");
    minusBtn.classList.add("count-down");
    minusBtn.innerText = "-";
    minusBtn.addEventListener('click', e => {
      const curCount = e.target.parentElement.querySelector('span');
      const newCount = Number(curCount.innerText) - 1;
      curCount.innerText = newCount;
      
      if(curCount.innerText == '0') {
        alert('최소 주문 수량은 1개 입니다.');
        curCount.innerText = 1;
      }

      const selectPrice = e.target.parentElement.parentElement.querySelector('.current-price');
      selectPrice.innerText = numberWithCommas(newCount * price);

      updateTotal(); // 총 상품금액, 갯수 업데이트
    });

    const span = document.createElement('span');
    span.innerText = "1";

    const plusBtn = document.createElement('button');
    plusBtn.setAttribute("type", "button");
    plusBtn.classList.add("count-up");
    plusBtn.innerText = "+";
    plusBtn.addEventListener('click', e => {
      const curCount = e.target.parentElement.querySelector('span');
      const newCount = Number(curCount.innerText) + 1;
      curCount.innerText = newCount;
      if(curCount.innerText == '100') {
        alert('최대 주문 수량은 99개 입니다.');
        curCount.innerText = 99;
      }

      const selectPrice = e.target.parentElement.parentElement.querySelector('.current-price');
      selectPrice.innerText = numberWithCommas(newCount * price);

      updateTotal(); // 총 상품금액, 갯수 업데이트
    });

    const countContainer = document.createElement('div');
    countContainer.classList.add('current-count');
    countContainer.append(minusBtn, span, plusBtn);

    const curPrice = document.createElement('div');
    curPrice.classList.add('current-price');
    curPrice.innerText = numberWithCommas(price);

    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute("type", "button");
    cancelBtn.classList.add("current-item-delete");
    cancelBtn.innerText = 'x';
    cancelBtn.addEventListener('click', e => {
      const li = e.target.parentElement;
      // 삭제 후 선택 옵션이 하나도 없을 경우 구분선 삭제
      if( li.parentElement.children.length == 1 ) {
        li.parentElement.nextSibling.remove();
      }
      li.remove();
      updateTotal(); // 총 상품금액, 갯수 업데이트
    });

    const li = document.createElement('li');
    li.append(option, countContainer, curPrice, cancelBtn);

    const parent = document.querySelector('#productCurrentItem');
    parent.append(li);
    
    // 처음 추가일 경우 구분선 추가
    if (parent.children.length == 1) {
      const hr = document.createElement('hr');
      parent.after(hr);
    }

    // 사이즈 옵션 선택 버튼 초기화
    selectedSizeBtn.classList.remove('selected');

    // 총 상품금액, 갯수 업데이트
    updateTotal();
  });
}