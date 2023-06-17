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

// 전체상품 데이터 추출
const productInputList = document.querySelectorAll('input[name="productNo"]');
const optionInputList = document.querySelectorAll('input[name="optionNo"]');
function getAllData() {
  let data = [];
  for(let i=0; i<productInputList.length; i++) {
    data.push({
      "productNo": productInputList[i].value,
      "optionNo": optionInputList[i].value
    });
  }
  return data;
}

// 선택상품 데이터 추출
function getSelectedData() {
  let data = [];
  const rowList = document.querySelectorAll('.data-tr');
  for(let el of rowList) {
    if(el.querySelector('[name="checkbox"]').checked == true) {
      data.push({
        "productNo": el.getAttribute('product'),
        "optionNo": el.getAttribute('option')
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
    let data = [];
    data.push({
      "productNo": productNo,
      "optionNo": optionNo
    });
    
    const dataStr = encodeURIComponent(JSON.stringify(data));
    fetch("/cart/delete?data=" + dataStr)
    .then(resp => resp.text())
    .then(result => {
      if(result > 0) {
        tr.remove();

        // 장바구니에 남은 상품이 하나도 없을 경우 비어있는 행 추가
        if(tr.querySelector('.data-tr') == null) {
          const td = document.createElement('td');
          td.classList.add('cart-item-empty');
          td.colspan = 7;
          td.innerText = '장바구니가 비어 있습니다.';
          const tr = document.createElement('tr');
          tr.append(td);
          const table = document.querySelector('#cartItemList > table');
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

  const data = getAllData();
  const dataStr = encodeURIComponent(JSON.stringify(data));
  fetch("/cart/delete?data=" + dataStr)
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
  const dataStr = encodeURIComponent(JSON.stringify(data));
    fetch("/cart/delete?data=" + dataStr)
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
orderSelectedBtn.addEventListener('click', () => {
  if(data.length == 0) {
    alert('선택된 상품이 없습니다.');
    return ;
  }
  alert('선택상품주문');
});

// 전체상품주문
const orderAllBtn = document.getElementById('orderAllBtn');
orderAllBtn.addEventListener('click', () => {
  // const data = getAllData();
  // fetch("/cart/order", {
  //   method : "POST",
  //   headers : {"Content-Type" : "application/json"},
  //   body : JSON.stringify(data)
  // })
  // .then(resp => resp.text())
  // .then() 
  // .catch(err => {
  //   alert("결제화면 이동 실패");
  //   console.log(err);
  // });
});