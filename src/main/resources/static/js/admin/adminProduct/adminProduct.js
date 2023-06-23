// 전체선택 체크박스
const checkboxStateSelectAll = document.getElementById('checkboxStateSelectAll');
if(checkboxStateSelectAll != null) {
  const checkboxList = document.querySelectorAll('[name="checkboxState"]:not(:disabled)');

  // 전체선택 체크박스 클릭 -> 모든 체크박스 선택
  checkboxStateSelectAll.addEventListener('click', e => {
    
    if(e.target.checked == true) {
      for(let ch of checkboxList)
      if(ch.disabled == false ) ch.checked = true;
    } else {
      for(let ch of checkboxList)
      ch.checked = false;
    }

  });

  // 개별 체크박스 선택
  for(let checkbox of checkboxList) {
    checkbox.addEventListener('click' , e => {
      if(e.target.checked == false) {
        checkboxStateSelectAll.checked = false;
      } else {
        let flag = true;
        for(let c of checkboxList) {
          if(c != checkboxStateSelectAll && c.checked == false) flag = false;
        }
        if(flag) checkboxStateSelectAll.checked = true;
      }
    });
  }
}

// 상품 판매상태 초기값 설정 + 변경 이벤트 설정
const productStateSelects = document.querySelectorAll('.product-state');
for(let p of productStateSelects) {
  const state = p.getAttribute('value');
  switch(state) {
    case 'O': p.querySelector('[value="O"]').selected = true; break;
    case 'N': p.querySelector('[value="N"]').selected = true; break;
    case 'S': p.querySelector('[value="S"]').selected = true; break;
  }

  // 상품 상태 변경 이벤트 추가
  p.addEventListener('change', e => {
    const productNo = e.target.getAttribute('pno');
    const state = e.target.value;

    fetch("/admin/product/update/state?productNo=" + productNo + "&state=" + state)
    .then(response => response.text()) 
    .then(res => {
      if(res <= 0) alert('변경 실패');
    }) 
    .catch (e => console.log(e));
  });
}