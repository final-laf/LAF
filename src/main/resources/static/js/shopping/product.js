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

// 옵선 관련 버튼 요소
const colorBtns = document.querySelectorAll('button[name="color"]');
const sizeBtns = document.querySelectorAll('button[name="size"]');
const productNo = location.href.split('/')[4];

// 특정 컬러의 모든 사이즈가 품절인 경우 컬러 선택 버튼 비활성화
(() => {
  fetch("/getOption?" + "productNo=" + productNo)
  .then(resp => resp.json())
  .then(optionList => {
    for (let btn of colorBtns)
    for (let op of optionList)
    if  (btn.innerText == op.color && op.stock > 0) {
      btn.disabled = false;

      // 단일 사이즈 상품인 경우 컬러 버튼에 옵션 정보 추가
      if(sizeBtns.length <= 1) {
        btn.removeAttribute("option-no");
        btn.setAttribute("option-no", op.optionNo);
      }
    }
  })
  .catch(e => console.log(e));
})();

// 컬러 선택한 이후에 사이즈 선택하기 (품절 사이즈 제외)
// 단일 사이즈 제품의 경우 컬러만 선택
for (let colorBtn of colorBtns) {
  colorBtn.addEventListener('click', e => {
    const color = e.target.innerText;

    fetch("/getStock?" + "productNo=" + productNo + "&color=" + color)
    .then(resp => resp.json())
    .then(optionList => {

      // 사이즈가 여러개인 상품인 경우 사이즈 버튼에 옵션번호 추가
      for (let btn of sizeBtns)
      for (let op of optionList) {
        if(btn.innerText == op.size) {
          btn.removeAttribute("option-no");
          btn.setAttribute("option-no", op.optionNo);
          
          if(op.stock == 0) btn.disabled = true;
          else              btn.disabled = false;
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

// 옵션 모두 선택 시 선택상품목록 실시간 추가 
const eventBtns = sizeBtns.length <= 1 ? colorBtns : sizeBtns;
for(let btn of eventBtns) {
  btn.addEventListener('click', e => {
    const selectedColorBtn = document.querySelector('button[name="color"].selected');
    const selectedSizeBtn = document.querySelector('button[name="size"].selected');
    const color = selectedColorBtn.innerText;
    const size = selectedSizeBtn == null ? null : selectedSizeBtn.innerText;
    const price = Number(document.querySelector('#productSalePrice').innerText.replace(',', ''));
    const optionNo = btn.getAttribute('option-no');
    
    // 이미 추가된 옵션인지 확인
    const curList = document.querySelectorAll('#productCurrentItem > li > .current-selected-option');
    for(let op of curList) {
      if(op.innerText == color + "/" + size || op.innerText == color) {
        alert('이미 추가된 옵션입니다.');
        
        // 옵션 선택 버튼 초기화
        if(selectedSizeBtn == null) selectedColorBtn.classList.remove('selected');
        else                        selectedSizeBtn.classList.remove('selected');
        
        return;
      }
    }

    const option = document.createElement('div');
    option.classList.add('current-selected-option');
    if(size == null) option.innerText = color;
    else option.innerText = color + "/" + size;

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
    li.setAttribute("option-no", optionNo);
    li.append(option, countContainer, curPrice, cancelBtn);

    const parent = document.querySelector('#productCurrentItem');
    parent.append(li);
    
    // 처음 추가일 경우 구분선 추가
    if (parent.children.length == 1) {
      const hr = document.createElement('hr');
      parent.after(hr);
    }

    // 옵션 선택 버튼 초기화
    if(selectedSizeBtn == null) selectedColorBtn.classList.remove('selected');
    else                        selectedSizeBtn.classList.remove('selected');

    // 총 상품금액, 갯수 업데이트
    updateTotal();
  });
}

/* 장바구니 담기 */
const submitBtn = document.getElementById('addCartBtn');
submitBtn.addEventListener('click', e => {
  const curItems = document.getElementById('productCurrentItem').querySelectorAll('li');
  
  const data = [];
  for(let item of curItems) {
    data.push({
      "productNo": location.href.split('/')[4],
      "optionNo": item.getAttribute('option-no'),
      "count": item.querySelector('.current-count span').innerText
    });
  }
  
  // 비회원 : 쿠키로 브라우저에 저장 (당일 24시 만료)
  if( loginMember == undefined ) {

    // 기존 장바구니와 합치기
    const preCart = getCart();
    if(preCart != null) {
      let flag = false;

      for(let cart of preCart) {
        for(let i=0; i<data.length; i++) {
          // 장바구니에 이미 담긴 상품일 경우 제외
          if(data[i].optionNo == cart.optionNo) {
            data.splice(i, 1);
            flag = true;
          } else break;
        }

        // 합치기
        data.push(cart);
      }

      alert("중복된 상품을 제외하고 장바구니에 추가하였습니다.");
    }
    
    // 쿠키 저장
    var expDate = new Date();
    expDate.setHours(23, 59, 59);
    document.cookie = "cart=" + JSON.stringify(data) + "; path=/; domain=localhost; max-age=" + expDate;
  }
  
  // 회원 : 서버 DB에 저장
  else {
    // 장바구니 데이터 가져와서 중복 있는지 확인
    fetch("/cart/list")
    .then(resp => resp.json())
    .then(cartList => {
      console.log(cartList);
      return;
      // 중복 데이터 검사
    }) 
    .catch(err => {
      console.log(err);
    });

    // 장바구니 정보 DB에 저장 
    // const dataStr = encodeURIComponent(JSON.stringify(data));
    // fetch("/cart/add?data=" + dataStr)
    // .then(resp => resp.text())
    // .then(result => {
    //   if(result > 0) {
    //     alert("장바구니 담기 성공!")
    //   } else {
    //     alert("장바구니 담기 실패")
    //   }
    // }) 
    // .catch(err => {
    //     console.log(err);
    // });
  }

});