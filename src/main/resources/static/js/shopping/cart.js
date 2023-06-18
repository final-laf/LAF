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

  const shippingCalc = totalPaymentCalc >= 100000 ? 0 : 3000;
  totalOrigin.innerText = numberWithCommas(totalOriginCalc);
  totalDiscount.innerText = '- ' + numberWithCommas(totalOriginCalc - totalPaymentCalc);
  shipping.innerText = '+ ' + numberWithCommas(shippingCalc);
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
  const checkboxList = document.querySelectorAll('[name="checkbox"]');
  
  if(e.target.checked == true) {
    for(let ch of checkboxList)
    ch.checked = true;
  } else {
    for(let ch of checkboxList)
    ch.checked = false;
  }
});

// 장바구니 기본값 : 전체선택
checkboxSelectAll.click();

// 전체상품 데이터 추출
const productInputList = document.querySelectorAll('input[name="productNo"]');
const optionInputList = document.querySelectorAll('input[name="optionNo"]');
const countInputList = document.querySelectorAll('input[name="count"]');
function getAllData() {
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
        "productNo": productInputList[i].value,
        "optionNo": optionInputList[i].value,
        "count": countInputList[i].value
      });
    }
  }
  return data;
}

// 상품 삭제하기 버튼(개별)
const deleteBtns = document.querySelectorAll('.cart-item-choose > button');
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
  if(!confirm("장바구니를 비우시겠습니까?")) return;

  // [회원]
  const data = getAllData();
  const dataStr = encodeURIComponent(JSON.stringify(data));
  let url = "/cart/delete?data=" + dataStr;

  // [비회원]
  if(loginMember == undefined) {
    url = "/cart/deleteAll2"
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
    const checkbox = row.querySelector('[name="checkbox"]');
    const productNoInput = row.querySelector('input[name="productNo"]');
    const optionNoInput = row.querySelector('input[name="optionNo"]');
    const countInput = row.querySelector('input[name="count"]');

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
const countBtns = document.querySelectorAll('.cart-item-count > button');
for(let btn of countBtns) {
  btn.addEventListener('click', e => {
    const countText = e.target.parentElement.querySelector('span');
    const countInput = e.target.parentElement.parentElement.querySelector('input[name="count"]');

    let count = Number(countInput.value);
    if(btn.classList.contains('minus-btn')) count--;
    else count++;

    if(count <= 0) {
      alert('최소 주문 수량은 1개 입니다.');
      count = 1;
    } else if(count >= 100) {
      alert('최대 주문 수량은 99개 입니다.');
      count = 99;
    }

    countText.innerText = count;
    countInput.value = count;

    const data = getAllData();
    let url = "";

    if(loginMember != undefined) {
      // 회원 : update DB
      const dataStr = encodeURIComponent(JSON.stringify(data));
      url = "/cart/update?data=" + dataStr;
      console.log("dataStr : " + dataStr);
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
      if(result <= 0) alert("수량 변경 실패");
    }) 
    .catch(err => console.log(err));

    estimate();
  });
}