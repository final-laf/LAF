// [회원, 비회원] 카트 정보 업데이트
function updateCart() {
  const data = getAllData();
  let url = "";

  if(loginMember != undefined) {
    // 회원 : update DB
    const dataStr = encodeURIComponent(JSON.stringify(data));
    url = "/cart/update?data=" + dataStr;
  } else {
    // 비회원 : update cookie
    let cookieStr = "";
    for(let d of data)
      cookieStr += d.productNo + '-' + d.optionNo + '-' + d.count + '@';
    url = "/cart/update2?data=" + cookieStr;
  }

  fetch(url)
  .then(resp => resp.text())
  .then(result => {
    if(result <= 0 ) alert('업데이트 실패');
  }) 
  .catch(err => console.log(err));
}


// 결제예상금액 계산
function estimate() {
  const totalOrigin = document.querySelector('.table-data > .cart-price-total-origin');
  const shipping = document.querySelector('.table-data > .cart-price-shipping');
  const totalDiscount = document.querySelector('.table-data > .cart-price-total-discount');
  const totalPayment = document.querySelector('.table-data > .cart-price-total-payment');

  let totalOriginCalc = 0;
  let totalPaymentCalc = 0;

  const rowList = document.querySelectorAll('.data-tr');
  for(let row of rowList) {
    const checkbox = row.querySelector('[name="checkbox"]');
    const countInput = row.querySelector('input[name="count"]');

    if(checkbox.checked == true) {
      const pay = Number(row.querySelector('.cart-item-price').innerText.replaceAll(',', ''));
      const origin = row.querySelector('.cart-item-price-origin') == null ? pay : Number(row.querySelector('.cart-item-price-origin').innerText.replaceAll(',', ''));
      totalOriginCalc += origin * Number(countInput.value);
      totalPaymentCalc += pay * Number(countInput.value);
    }
  }

  const shippingCalc = (totalPaymentCalc >= 100000 || totalPaymentCalc == 0) ? 0 : 3000;
  totalOrigin.innerText = numberWithCommas(totalOriginCalc);
  totalDiscount.innerText = '- ' + numberWithCommas(totalOriginCalc - totalPaymentCalc);
  shipping.innerText = '+ ' + (numberWithCommas(shippingCalc));
  totalPayment.innerText = numberWithCommas(totalPaymentCalc + shippingCalc);
}

const checkboxList = document.querySelectorAll('[name="checkbox"]');
for(let checkbox of checkboxList) {
  checkbox.addEventListener('change', () => {
    estimate();
  });
}

// 전체선택 체크박스
const checkboxSelectAll = document.getElementById('checkboxSelectAll');
checkboxSelectAll.addEventListener('click', e => {
  const checkboxList = document.querySelectorAll('[name="checkbox"]:not(:disabled)');
  
  if(e.target.checked == true) {
    for(let ch of checkboxList)
    if(ch.disabled == false ) ch.checked = true;
  } else {
    for(let ch of checkboxList)
    ch.checked = false;
  }
});

// 장바구니 기본값 : 전체선택
checkboxSelectAll.click();

// 전체상품 데이터 추출
function getAllData() {
  const productInputList = document.querySelectorAll('input[name="productNo"]');
  const optionInputList = document.querySelectorAll('input[name="optionNo"]');
  const countInputList = document.querySelectorAll('input[name="count"]');
  
  let data = [];
  for(let i=0; i<productInputList.length; i++) {
    data.push({
      "productNo": productInputList[i].value,
      "optionNo": optionInputList[i].value,
      "count":countInputList[i].value
    });
  }
  return data;
}

// 선택상품 데이터 추출
function getSelectedData() {
  let data = [];
  const rowList = document.querySelectorAll('.data-tr');
  for(let i=0; i<rowList.length; i++) {
    if(rowList[i].querySelector('[name="checkbox"]').checked == true) {
      data.push({
        "productNo": rowList[i].querySelector('input[name="productNo"]').value,
        "optionNo": rowList[i].querySelector('input[name="optionNo"]').value,
        "count": rowList[i].querySelector('input[name="count"]').value
      });
    }
  }
  return data;
}

// 상품 삭제하기 버튼(개별)
const deleteBtns = document.querySelectorAll('.cart-item-choose button');
for(let btn of deleteBtns) {
  btn.addEventListener('click', e => {
    if(!confirm("해당 상품을 정말로 삭제하시겠습니까?")) return;
    
    const tr = e.target.parentElement.parentElement;
    const productNo = tr.querySelector('input[name="productNo"]').value;
    const optionNo = tr.querySelector('input[name="optionNo"]').value;
    const count = tr.querySelector('input[name="count"]').value;
    
    const data = [{
      "productNo": productNo,
      "optionNo": optionNo
    }];
    let url = "/cart/delete?data=" + encodeURIComponent(JSON.stringify(data));

    if(loginMember == undefined) {
      url = "/cart/delete2?data=" + productNo + "-" + optionNo + "-" + count + "@";
    }
    
    fetch(url)
    .then(resp => resp.text())
    .then(result => {
      if(result > 0) {
        tr.remove();
        estimate();

        // 장바구니에 남은 상품이 하나도 없을 경우 비어있는 행 추가
        const table = document.querySelector('#cartItemList > table');
        if(table.querySelector('.data-tr') == null) {
          const td = document.createElement('td');
          td.classList.add('cart-item-empty');
          td.colspan = 7;
          td.innerText = '장바구니가 비어 있습니다.';
          const tr = document.createElement('tr');
          tr.append(td);
          table.append(tr);
        }

        // 스크롤 맨 위로 이동
        window.scrollTo(0, 0);
      } else {
        alert("삭제 실패");
      }
    })
    .catch(err => console.log(err));
  });
}

// 상품 전체 삭제
const clearCartBtn = document.getElementById('clearCartBtn');
clearCartBtn.addEventListener('click', () => {
  
  const data = getAllData();
  if(data == null || data.length == 0) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  if(!confirm("장바구니를 비우시겠습니까?")) return;
  
  // [회원]
  const dataStr = encodeURIComponent(JSON.stringify(data));
  let url = "/cart/delete?data=" + dataStr;
  
  // [비회원]
  if(loginMember == undefined) {
    url = "/cart/delete2All"
  }
  
  fetch(url)
  .then(resp => resp.text())
  .then(result => {
    if(result > 0) {

      // 전체 행 제거
      const rowList = document.querySelectorAll('.data-tr');
      for(let el of rowList) {
          el.remove();
      }
      estimate();

      // 남은 상품이 하나도 없다고 표시
      const td = document.createElement('td');
      td.classList.add('cart-item-empty');
      td.colspan = 7;
      td.innerText = '장바구니가 비어 있습니다.';
      const tr = document.createElement('tr');
      tr.append(td);
      const table = document.querySelector('#cartItemList > table');
      table.append(tr);

      // 스크롤 맨 위로 이동
      window.scrollTo(0, 0);
      alert("장바구니를 비웠습니다.")
    } else {
      alert("삭제 실패");
    }
  }) 
  .catch(err => console.log(err));
}); 

// 선택한 상품만 삭제
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
deleteSelectedBtn.addEventListener('click', () => {
  
  const data = getSelectedData();
  if(data.length == 0) {
    alert('선택한 상품이 없습니다.');
    return;
  }

  if(!confirm("해당 상품을 정말로 삭제하시겠습니까?")) return;
  
  let url = "/cart/delete?data=" + encodeURIComponent(JSON.stringify(data));
  
  // 비회원인 경우
  if(loginMember == undefined) {
    url = "/cart/delete2?data=";
    for(let d of data) {
      url += d.productNo + "-" + d.optionNo + "-" + d.count + "@";
    }
  }
  
  fetch(url)
  .then(resp => resp.text())
  .then(result => {
    if(result > 0) {

      // 삭제한 행 제거
      const rowList = document.querySelectorAll('.data-tr');
      for(let el of rowList) {
        if(el.querySelector('[name="checkbox"]').checked == true) {
          el.remove();
        }
      }
      estimate();

      // 장바구니에 남은 상품이 하나도 없을 경우 비어있는 행 추가
      const table = document.querySelector('#cartItemList > table');
      if(table.querySelector('.data-tr') == null) {
        const td = document.createElement('td');
        td.classList.add('cart-item-empty');
        td.colspan = 7;
        td.innerText = '장바구니가 비어 있습니다.';
        const tr = document.createElement('tr');
        tr.append(td);
        table.append(tr);
      }

      // 스크롤 맨 위로 이동
      window.scrollTo(0, 0);
      alert("선택하신 상품을 삭제했습니다.")
    } else {
      alert("삭제 실패");
    }
  })
  .catch(err => console.log(err));
});

// 선택상품주문
const orderSelectedBtn = document.getElementById('orderSelectedBtn');
orderSelectedBtn.addEventListener('click', e => {
  e.preventDefault();

  const rowList = document.querySelectorAll('.data-tr');
  let flag = true; // 아무것도 체크 안했을 때 확인
  for(let row of rowList) {
    const checkbox = row.querySelector('[name="checkbox"]:not(:disabled)');
    const productNoInput = row.querySelector('input[name="productNo"]:not(:disabled)');
    const optionNoInput = row.querySelector('input[name="optionNo"]:not(:disabled)');
    const countInput = row.querySelector('input[name="count"]:not(:disabled)');

    if(checkbox.checked == false) {
      productNoInput.disabled = true;
      optionNoInput.disabled = true;
      countInput.disabled = true;
    } else {
      flag = false;
    }
  }

  if(flag) {
    alert('선택한 상품이 없습니다.');
    return;
  }
  
  document.getElementById('cartFrm').submit();
});

// 장바구니 상품 수량 변경
const countBtns = document.querySelectorAll('.cart-item-count button');
const upBtns = document.querySelectorAll('.plus-btn');
const downBtns = document.querySelectorAll('.minus-btn');
const count = document.querySelectorAll('.cart-item-count span');
const countInput = document.querySelectorAll('input[name="count"]');

for(let i=0; i<upBtns.length; i++) {
  // 수량변경 버튼 초기설정
  if( count[i].innerText == '1' ) downBtns[i].disabled = true;
  if( Number(count[i].innerText) >= Number(count[i].getAttribute('max')) ) upBtns[i].disabled = true;

  // [+] 버튼 이벤트 추가
  upBtns[i].addEventListener('click', e => {
    downBtns[i].disabled = false;
    count[i].innerText = countInput[i].value = Number(count[i].innerText) + 1;
    if(Number(count[i].innerText) >= Number(count[i].getAttribute('max'))) {
      e.target.disabled = true;
    } 

    updateCart();
    estimate();
  });

  // [-] 버튼 이벤트 추가
  downBtns[i].addEventListener('click', e => {
    count[i].innerText = countInput[i].value = Number(count[i].innerText) - 1;
    if(count[i].innerText == '1') {
      e.target.disabled = true;
    } else {
      
      // 재고 부족 경고 없애기
      if(Number(count[i].innerText) == Number(count[i].getAttribute('max'))) {
        const stockAlert = e.target.parentElement.parentElement.querySelector('.out-of-stock-3');
        if(stockAlert != null) {
          stockAlert.remove();
          count[i].classList.remove('out-of-stock-2');
        }

      // 재고량 이하로 떨어졌을 때만 [+] 버튼 활성화
      } else if(Number(count[i].innerText) < Number(count[i].getAttribute('max'))) {
        upBtns[i].disabled = false;
      }
    }

    updateCart();
    estimate();
  });
}

// 옵션 변경 모달 띄우기
const modalOverlay = document.querySelector('.bubble-overlay');
const bubbleContainer = document.querySelector('.bubble-container');

// 색상 옵션 변경
const optionChangeBtns = document.querySelectorAll('.option-change-btn')
const colorSelector = document.querySelector('#colorChangeSelector');
for(let btn of optionChangeBtns) {
  btn.addEventListener('click', e => {

    // 데이터 가져오기
    const productNo = e.target.parentElement.parentElement.parentElement.querySelector('input[name="productNo"]').value;
    const optionNo = e.target.parentElement.parentElement.parentElement.querySelector('input[name="optionNo"]').value;

    // 데이터 미리 심어두기
    colorSelector.setAttribute('productNo', productNo);
    colorSelector.setAttribute('optionNo', optionNo);

    fetch("/getOption?" + "productNo=" + productNo)
    .then(resp => resp.json())
    .then(optionList => {
      
      const color = [];
      const stock = [];
      const opNo = [];
      
      // 모든 사이즈가 품절인 경우 컬러 선택 버튼 비활성화
      for (let op of optionList) {
        if(color.indexOf(op.color) == -1) {
          color.push(op.color);
          stock.push(op.stock);
          opNo.push(op.optionNo);
        }
        // if(op.stock > 0)
          // stock[color.indexOf(op.color)] = true;
      }
      
      // select option 생성
      const optionTitle = document.createElement('option');
      optionTitle.classList.add('bubble-content');
      optionTitle.value = 'none';
      optionTitle.innerText = '색상';
      optionTitle.selected = true;

      colorSelector.innerHTML = '';
      colorSelector.append(optionTitle);

      for(let i=0; i<stock.length; i++) {
        const option = document.createElement('option');
        option.classList.add('bubble-content');
        option.value = color[i];
        option.innerText = color[i];
        option.disabled = stock[i] <= 0;
        option.setAttribute('opno', opNo[i]);
        option.setAttribute('max', stock[i]);
        colorSelector.append(option);
      }
    })
    .catch(e => console.log(e));

    // 화면 출력
    const bubble = document.querySelector('.bubble');
    bubble.style.top = e.target.getBoundingClientRect().top + 25 + 'px';
    bubble.style.left = e.target.getBoundingClientRect().left - 30 + 'px';
    modalOverlay.classList.toggle('hidden');
  });
}

// 사이즈 옵션 변경
colorSelector.addEventListener('change', e => {
  
  const productNo = e.target.getAttribute('productNo');
  const optionNo = e.target.getAttribute('optionNo');
  const color = e.target.value;
  let max = null;

  const optionInput = document.querySelector('input[name="optionNo"][value="' + optionNo + '"]');
  const optionText = optionInput.parentElement.querySelector('.cart-item-selected-option');

  fetch("/getOption?" + "productNo=" + productNo)
  .then(resp => resp.json())
  .then(optionList => {

    const size = [];
    const stock = [];
    const opNo = [];

    for (let op of optionList) {
      if(op.color == color && (op.size == null || size.indexOf(op.size) == -1)) {
        if(op.size != null) size.push(op.size);
        stock.push(op.stock);
        opNo.push(op.optionNo);
      }
    }

    /* 원사이즈 제품인 경우 */
    if(size.length <= 1) {
      
      let newOpNo = -1;
      for(let o of e.target.children) {
        if(o.innerText == color) {
          newOpNo = o.getAttribute('opNo');
          max = o.getAttribute('max');
        }
      }

      // 장바구니에 있는 상품인지 검사
      const data = getAllData();
      for(let d of data) {
        if(d.optionNo == newOpNo) { 
          if(newOpNo != optionNo) // 옵션이 그대로가 아니면 안내문구 출력
            alert('이미 장바구니에 담겨있는 옵션입니다.');
          modalOverlay.click();
          return;
        }
      }

      // 옵션 변경에 따른 정보 변경
      const countInput = optionText.parentElement.parentElement.parentElement.querySelector('input[name="count"]');
      const countContainer = optionText.parentElement.parentElement.parentElement.querySelector('.cart-item-count');
      const plusBtn = countContainer.querySelector('.plus-btn');
      const minusBtn = countContainer.querySelector('.minus-btn');
      const alertMessage = countContainer.querySelector('.out-of-stock-3');
      const countText = countContainer.querySelector('.count');
      
      // 주문수량 제한을 위한 재고량 저장
      countText.setAttribute('max', max);
      
      // 수량버튼 초기화
      countText.innerText = '1';
      countInput.value = 1;
      minusBtn.disabled = true;
      plusBtn.disabled = max < 1;
      if(alertMessage) alertMessage.remove();
      countText.classList.remove('out-of-stock-2');
      
      // DB, 쿠키 업데이트
      optionInput.value = newOpNo;
      optionText.innerText = '[옵션 : ' + color + ']';
      updateCart();
      
      modalOverlay.click();
      return;
    }

    const optionTitle = document.createElement('option');
    optionTitle.classList.add('bubble-content');
    optionTitle.value = 'none';
    optionTitle.innerText = '사이즈';
    optionTitle.selected = true;

    const select = document.createElement('select');
    select.setAttribute('name', 'sizeChange');
    select.append(optionTitle);
    select.setAttribute('id', 'sizeChangeSelector');
    select.addEventListener('change', e => {

      let size = e.target.value;
      let newOpNo = -1;
      for(let o of e.target.children) {
        if(o.innerText == size) {
          newOpNo = o.getAttribute('opNo');
          max = o.getAttribute('max');
        }
      }

      // 장바구니에 있는 상품인지 검사
      const data = getAllData();
      for(let d of data) {

        if(d.optionNo == newOpNo) { 
          if(newOpNo != optionNo) // 옵션이 그대로가 아니면 안내문구 출력
            alert('이미 장바구니에 담겨있는 옵션입니다.');
          modalOverlay.click();
          return;
        }
      }

      // 옵션 변경에 따른 정보 변경
      const countInput = optionText.parentElement.parentElement.parentElement.querySelector('input[name="count"]');
      const countContainer = optionText.parentElement.parentElement.parentElement.querySelector('.cart-item-count');
      const plusBtn = countContainer.querySelector('.plus-btn');
      const minusBtn = countContainer.querySelector('.minus-btn');
      const alertMessage = countContainer.querySelector('.out-of-stock-3');
      const countText = countContainer.querySelector('.count');
      
      // 주문수량 제한을 위한 재고량 저장
      countText.setAttribute('max', max);
      
      // 수량버튼 초기화
      countText.innerText = '1';
      countInput.value = 1;
      minusBtn.disabled = true;
      plusBtn.disabled = max < 1;
      if(alertMessage) alertMessage.remove();
      countText.classList.remove('out-of-stock-2');

      // DB, 쿠키 업데이트
      optionInput.value = newOpNo;
      optionText.innerText = '[옵션 : ' + color + ' / ' + size + ']';
      updateCart();

      modalOverlay.click();
    });
    
    for(let i=0; i<size.length; i++) {
      const option = document.createElement('option');
      option.classList.add('bubble-content');
      option.value = size[i];
      option.innerText = size[i];
      option.disabled = !stock[i];
      option.setAttribute('opno', opNo[i]);
      option.setAttribute('max', stock[i]);
      select.append(option);
    }

    bubbleContainer.lastChild.remove();
    bubbleContainer.append(select);
  })
  .catch(e => console.log(e));

});

/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
modalOverlay.addEventListener("click", e => {
  const evTarget = e.target
  if(evTarget.classList.contains("bubble-overlay")) {
      modalOverlay.classList.toggle('hidden');
      const sizeChangeSelector = document.getElementById('sizeChangeSelector');
      if(sizeChangeSelector != null)
        sizeChangeSelector.remove();
  }
});

/* 품절 상품 삭제 */
const emptyStockRemoveBtn = document.getElementById('emptyStockRemoveBtn');
emptyStockRemoveBtn.addEventListener('click', () => {
  
  let data = [];
  const rowList = document.querySelectorAll('.data-tr');
  for(let i=0; i<rowList.length; i++) {
    if(rowList[i].querySelector('.out-of-stock') != null) {
      data.push({
        "productNo": rowList[i].querySelector('input[name="productNo"]').value,
        "optionNo": rowList[i].querySelector('input[name="optionNo"]').value,
        "count": rowList[i].querySelector('input[name="count"]').value
      });
      flag = true;
    }
  }
  
  if(data.length == 0) {
    alert('품절 상품이 없습니다.');
    return;
  }

  if(!confirm('품절 상품을 일괄 삭제하시겠습니까?')) return;
  
  // 회원인 경우
  let url = "/cart/delete?data=" + encodeURIComponent(JSON.stringify(data));
  
  // 비회원인 경우
  if(loginMember == undefined) {
    url = "/cart/delete2?data=";
    for(let d of data) {
      url += d.productNo + "-" + d.optionNo + "-" + d.count + "@";
    }
  }
  
  fetch(url)
  .then(resp => resp.text())
  .then(result => {
    if(result > 0) {

      console.log(url);
      // 삭제한 행 제거
      const rowList = document.querySelectorAll('.data-tr');
      for(let el of rowList) {
        if(el.querySelector('.out-of-stock') != null) {
          el.remove();
        }
      }
      estimate();

      // 장바구니에 남은 상품이 하나도 없을 경우 비어있는 행 추가
      const table = document.querySelector('#cartItemList > table');
      if(table.querySelector('.data-tr') == null) {
        const td = document.createElement('td');
        td.classList.add('cart-item-empty');
        td.colspan = 7;
        td.innerText = '장바구니가 비어 있습니다.';
        const tr = document.createElement('tr');
        tr.append(td);
        table.append(tr);
      }

      // 스크롤 맨 위로 이동
      window.scrollTo(0, 0);
      alert('품절 상품을 삭제했습니다.');
    } else {
      alert("삭제 실패");
    }
  })
  .catch(err => console.log(err));
});

/* 품절상품 input 비활성화 */
const soldOutList = document.querySelectorAll('.out-of-stock');
for(let el of soldOutList) {
  const inputs = el.parentElement.parentElement.querySelectorAll("input");
  for(let i of inputs) i.disabled=true;
}

// 품절상품 제외하고 주문하기
const form = document.getElementById('cartFrm');
form.addEventListener('submit', e => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input[name="productNo"]:not(:disabled)');
  if(inputs.length == 0) {
    alert('주문 가능한 상품이 없습니다.');
    return;
  }

  e.target.submit();
});