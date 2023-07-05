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

// 옵션별 재고량
let stocks = [];

// 특정 컬러의 모든 사이즈가 품절인 경우 컬러 선택 버튼 비활성화
(() => {
  fetch("/getOption?" + "productNo=" + productNo)
  .then(resp => resp.json())
  .then(optionList => {
    for(let btn of colorBtns)
    for(let op of optionList) {

      // 재고 있는 옵션 버튼 활성화
      if(btn.innerText == op.color && op.stock > 0) {
        btn.disabled = false;
        
        // 단일 사이즈 상품인 경우 컬러 버튼에 옵션 정보 추가
        if(sizeBtns.length <= 1) {
          btn.removeAttribute("option-no");
          btn.setAttribute("option-no", op.optionNo);
        }
      }
    }

    for(let op of optionList) {
      stocks.push({
        'optionNo': op.optionNo,
        'stock': op.stock
      });
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
    const price = Number(li.querySelector('.current-price').innerText.replaceAll(',', ''));
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
  btn.addEventListener('click', () => {
    const selectedColorBtn = document.querySelector('button[name="color"].selected');
    const selectedSizeBtn = document.querySelector('button[name="size"].selected');
    const color = selectedColorBtn.innerText;
    const size = selectedSizeBtn == null ? null : selectedSizeBtn.innerText;
    const price = Number(document.querySelector('#productSalePrice').innerText.replaceAll(',', ''));
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
    minusBtn.disabled = true;
    minusBtn.addEventListener('click', e => {
      const curCount = e.target.parentElement.querySelector('span');
      const newCount = Number(curCount.innerText) - 1;
      curCount.innerText = newCount;
      
      e.target.parentElement.querySelector('.count-up').disabled = false;
      if(curCount.innerText == '1') {
        e.target.disabled = true;
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
    for(let s of stocks) { // 현재 재고가 1개면 [+]버튼 비활성화
      if(s.optionNo == optionNo && s.stock == 1) {
        plusBtn.disabled = true;
      }
    }
    plusBtn.addEventListener('click', e => {
      const curCount = e.target.parentElement.querySelector('span');
      let newCount = Number(curCount.innerText) + 1;
      curCount.innerText = newCount;
      if(curCount.innerText == '99') {
        e.target.disabled = true;
      }

      e.target.parentElement.querySelector('.count-down').disabled = false;
      for(let s of stocks) {
        if(s.optionNo == optionNo && curCount.innerText >= s.stock) {
          e.target.disabled = true;
        }
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
const addCartBtn = document.getElementById('addCartBtn');
addCartBtn.addEventListener('click', () => {
  const curItems = document.getElementById('productCurrentItem').querySelectorAll('li');
  const selectedColorBtn = document.querySelector('button[name="color"].selected');
  const selectedSizeBtn = document.querySelector('button[name="size"].selected');
  const sizeBtns = document.querySelectorAll('button[name="size"]');
  const productNo = location.href.split('/')[4];

  // 선택한 상품이 없을 경우
  if(curItems.length == 0 && selectedColorBtn == null) {
    alert('색상을 선택해 주세요');
    return;
  } else if(curItems.length == 0 && sizeBtns && selectedSizeBtn == null) {
    alert('사이즈를 선택해 주세요');
    return;
  }
  
  // 비회원 : 쿠키로 브라우저에 저장 (당일 24시 만료)
  if( loginMember == undefined ) {
    
    let flag = false;

    // 쿠키 데이터 생성
    let cookieStr = "";
    for(let item of curItems) {
      const curStr = productNo + "-"
        + item.getAttribute('option-no');

      // 중복제거
      if(getCookie('cart') && getCookie('cart').includes(curStr)) {
        flag = true;
      } else {
        cookieStr += curStr + "-" + item.querySelector('.current-count span').innerText + "@";
      }
    }

    if(cookieStr == "") {
      alert("이미 추가된 상품입니다. 새로 추가할 상품이 없습니다.");
      return;
    }

    // 서버 전송
    fetch("/cart/add2?data=" + cookieStr)
    .then(resp => resp.text())
    .then(result => {
      if(result == "성공") {
        if(flag) alert("중복된 상품을 제외하고 장바구니에 추가하였습니다.");
        else alert("선택한 상품을 장바구니에 담았습니다.");
        updateCartCount2();
      } else {
        alert(result);
      }
    }).catch(err => console.log(err));
  }
  
  // 회원 : 서버 DB에 저장
  else {

    // 선택한 상품 object 데이터로 변환
    let data = [];
    for(let item of curItems) {
      data.push({
        "productNo": productNo,
        "optionNo": item.getAttribute('option-no'),
        "count": item.querySelector('.current-count span').innerText
      });
    }

    // 장바구니 정보 DB에 저장 
    const dataStr = encodeURIComponent(JSON.stringify(data));
    fetch("/cart/add?data=" + dataStr)
    .then(resp => resp.text())
    .then(result => {
      
      alert(result);

      fetch("/cart/count")
      .then(resp => resp.text()) 
      .then(res => cartCount.innerText = res)
      .catch(e => console.log(e));
    }) 
    .catch(err => console.log(err));
  }

});


/* 주문하기 */
const orderNowBtn = document.getElementById('orderNow');
orderNowBtn.addEventListener('click', () => {
  const curItems = document.getElementById('productCurrentItem').querySelectorAll('li');
  const selectedColorBtn = document.querySelector('button[name="color"].selected');
  const selectedSizeBtn = document.querySelector('button[name="size"].selected');
  const sizeBtns = document.querySelectorAll('button[name="size"]');

  const productNo = location.href.split('/')[4];

  // 선택한 상품이 없을 경우
  if(curItems.length == 0 && selectedColorBtn == null) {
    alert('색상을 선택해 주세요');
    return;
  } else if(curItems.length == 0 && sizeBtns && selectedSizeBtn == null) {
    alert('사이즈를 선택해 주세요');
    return;
  }

  if(!confirm('선택하신 상품을 주문하시겠습니까?')) return;

  // 선택한 상품 object 데이터로 변환
  let data = [];
  for(let item of curItems) {
    data.push({
      "productNo": productNo,
      "optionNo": item.getAttribute('option-no'),
      "count": item.querySelector('.current-count span').innerText
    });
  }

  const dataStr = encodeURIComponent(JSON.stringify(data));
  location.href = "/cart/orderNow?data=" + dataStr;
});

/* 하트 모양 이미지로 찜 목록 추가/삭제 */
const img = document.querySelector('#productLike > img');

/* 찜 목록 추가 함수 */
function like(productNo) {
  
  // 비회원인 경우 로그인 화면으로 이동 유도
  if(loginMember == undefined) {
    if(confirm('찜하기는 회원만 사용 가능합니다. 로그인 하시겠습니까?'))
    location.href = "/login";
    return;
  }
  
  fetch("/like/add?productNo=" + productNo)
  .then(resp => resp.text())
  .then(result => {
    if(result > 0) {
      img.setAttribute('src', '/images/common/like-fill.svg');
      img.setAttribute('value', 'like');
    } else {
      alert("찜 목록 추가 실패");
      return false;
    }
    return true;
  }) 
  .catch(err => console.log(err));
}

img.addEventListener('click', () => {
  // 찜 목록 삭제
  if (img.getAttribute('src').includes('fill')) {
    fetch("/like/delete?productNo=" + productNo)
    .then(resp => resp.text())
    .then(result => {
      if(result > 0) {
        img.setAttribute('src', '/images/common/like-grey.svg');
        img.removeAttribute('value');
      } else {
        alert("찜 목록 삭제 실패");
      }
    }) 
    .catch(err => console.log(err));
    
  } else { like(productNo); }
});