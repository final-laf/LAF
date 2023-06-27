/* 스크롤바 이동 효과 */
const scrollTop = document.querySelector('.scroll-top');
const scroll = document.querySelector('.scroll');

const fullHeight = document.documentElement.scrollHeight;
const windowHeight = window.innerHeight;
const maxScroll = fullHeight - windowHeight;
const scrollHeight = windowHeight - maxScroll;
scroll.style.height = scrollHeight + 'px';

window.addEventListener('scroll', () => { 
  scroll.style.backgroundColor = '#493e5d80';
  scrollTop.style.height = window.scrollY + 'px';
  setTimeout(() => {
    scroll.style.backgroundColor = '#493e5d00';
  }, 1000);
});

//////////////////////////////////////////////////////////////////////////////////////////

/* 검색조건 : 판매상태 */
const salesStateCheckboxList = document.querySelectorAll('input[name="state"]');
let uri = decodeURI(location.search);
let stateIndex = uri.indexOf('state=');

// 기존에 선택한 게 없을 경우 항상 모두 선택
for(let c of salesStateCheckboxList) {
  c.checked = stateIndex == -1;
}

//////////////////////////////////////////////////////////////////////////////////////////

/* 쿼리스트링으로 화면 초기설정 */
new URLSearchParams(location.search).forEach((value, key) => {
  if(value == '') return;

  switch(key) {
    case 'query' : document.getElementById('query').value = value; break;
    case 'qk' : document.querySelector('#queryKey > option[value="' + value + '"]').selected = true; break;
    case 'ordering' :
      document.querySelector('.result-ordering-item.current').classList.remove('current');
      document.querySelector('.result-ordering-item[value="' + value + '"]').classList.add('current');
      break;
    case 'pc' : document.querySelector('#parentCategory > option[value="' + value + '"]').selected = true; break;
    case 'cc' : 
      document.querySelector('#childCategory').disabled = false;
      document.querySelector('#childCategory > option[value="' + value + '"]').selected = true; 
      break; 
    case 'state' : document.querySelector('input[value="' + value + '"]').checked = true; break;
  }
})

//////////////////////////////////////////////////////////////////////////////////////////

// pagination 링크 설정
const paginationLinks = document.querySelectorAll('.pagination a');
for(let a of paginationLinks) {
  const queryuStr = addQueryStringParams();
  if(queryuStr.length == 0) continue;

  if(a.href.indexOf('?') == -1) a.href += "?" + queryuStr;
  else                          a.href += "&" + queryuStr;
}

// 정렬 순서 링크 설정
const orderingLinks = document.querySelectorAll('.result-info a');
for(let a of orderingLinks) {
  const queryStr = addQueryStringParams('ordering');
  if(queryStr.length == 0) continue;

  if(a.href.indexOf('?') == -1) a.href += "?" + queryStr;
  else                          a.href += "&" + queryStr;
}

// 쿼리 스트링 파라미터 셋팅
function addQueryStringParams(except) {

  const result = new URLSearchParams();
  new URLSearchParams(location.search).forEach((value, key) => {
    if(value == '') return;
    result.append(key, value);
  })

  if(except != null) result.delete(except);
  return result;
}

//////////////////////////////////////////////////////////////////////////////////////////

/* 체크박스(일반) */

// 전체선택 체크박스
const adminCheckboxStateSelectAll = document.getElementById('checkboxStateSelectAll');
if(adminCheckboxStateSelectAll != null) {
  const checkboxList = document.querySelectorAll('[name="state"]:not(:disabled):not(#checkboxStateSelectAll)');

  // 전체선택 체크박스 클릭 -> 모든 체크박스 선택
  adminCheckboxStateSelectAll.addEventListener('click', e => {
    
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
          if(c.checked == false) flag = false;
        }
        if(flag) adminCheckboxStateSelectAll.checked = true;
      }
    });
  }

  // 모든 체크박스가 체크 상태일 때 전체 체크박스도 체크해주기
  let flag = true;
  for(let c of checkboxList) {
    if(c.checked == false) flag = false;
  }
  if(flag) adminCheckboxStateSelectAll.checked = true;
}

///////////////////////////////////////////////////////////////////////////////////////////////

// 상품 판매상태 초기값 설정 + 변경 이벤트 설정
const productStateSelects = document.querySelectorAll('.product-state:not(.all)');
for(let p of productStateSelects) {
  const state = p.getAttribute('value');
  switch(state) {
    case 'O': p.querySelector('[value="O"]').selected = true; break;
    case 'N': p.querySelector('[value="N"]').selected = true; break;
    case 'S': p.querySelector('[value="S"]').selected = true; break;
  }


  //////////////////////////////////////////////////////////////////////////////////////////

  // 상품 상태 변경 이벤트 추가
  p.addEventListener('change', e => {
    const productNo = e.target.parentElement.parentElement.querySelector('.p-no').innerText;
    const state = e.target.value;

    fetch("/admin/product/update/state?productNo=" + productNo + "&state=" + state)
    .then(response => response.text()) 
    .then(res => {
      if(res <= 0) alert('변경 실패');
    }) 
    .catch (e => console.log(e));
  });
}

// 상품 판매상태 일괄변경
const changeSelectedBtn = document.getElementById('changeSelectedBtn');
changeSelectedBtn.addEventListener('click', () => {

  // 선택 상품 추출
  const checkboxList = document.querySelectorAll('.p-checkbox > .input-checkbox:checked:not(#adminCheckboxStateSelectAll)');
  if(checkboxList.length == 0) {
    alert('선택상품이 없습니다.');
    return;
  }

  // 전송할 데이터 생성
  let data = '';
  for(const ch of checkboxList) {
      data += ch.parentElement.parentElement.querySelector('.p-no').innerText + '-';
  }
  const state = document.getElementById('allProductState').value;

  // 서비스 요청
  fetch("/admin/product/updateAll/state?data=" + data + "&state=" + state)
  .then(response => response.text()) 
  .then(res => {
    if(res <= 0) alert('변경 실패');
    else alert('변경되었습니다.');

    for(const ch of checkboxList) {
      const options = ch.parentElement.parentElement.querySelectorAll('.product-state > option');
      for(const o of options) {
        if(o.value == state)
          o.selected = true;
      }
    }
  }) 
  .catch (e => console.log(e));
});

//////////////////////////////////////////////////////////////////////////////////////////

/* 부모 카테고리 선택 시 자식 카테고리 목록 활성화 */
const parentCategorySelector = document.getElementById('parentCategory');
const childCategorySelector = document.getElementById('childCategory');
parentCategorySelector.addEventListener('change', e => {

  const selectorTitle = childCategorySelector.firstElementChild;
  childCategorySelector.innerHTML = "";
  childCategorySelector.appendChild(selectorTitle);

  fetch("/admin/product/getChildCategories?categoryNo=" + e.target.value)
  .then(res => res.json())
  .then(categoryList => {

    for(let c of categoryList) {
      const option = document.createElement('option');
      option.name = "cc";
      option.value = c.categoryNo;
      option.innerText = c.categoryName;
      childCategorySelector.append(option);
    }

    // 자식카테고리가 있을 경우 selector 활성화
    childCategorySelector.disabled = (categoryList.length <= 0);
  })
  .catch (e => console.log(e));
});


/* 상품 수정 버튼 클릭 */
const modBtnList = document.querySelectorAll('.modify-product');
for(const btn of modBtnList) {
  btn.addEventListener('click', e => {
    const productNo = e.target.parentElement.parentElement.querySelector('.p-no').innerText;
    fetch("/admin/product/mod?productNo=" + productNo)
    .then(resp => resp.json())
    .then(map => {
      console.log(map.test);
    });
  });
}

//////////////////////////////////////// M O D A L //////////////////////////////////////////////

/* 상품 상세 모달 */
const productModal = document.getElementById("productModalOverlay")
const selectedProduct = document.getElementsByClassName("modify-product")


/* 상품 목록 클릭시 */
for(let product of selectedProduct) {
  product.addEventListener('click', () => {
    productModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
  });
};
    
/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
productModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("product-modal-overlay")) {
      productModal.style.display = "none";
      document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(productModal.style.display === "flex" && e.key === "Escape") {
      productModal.style.display = "none"
      document.body.style.removeProperty('overflow');
    }
});

/* 모달창 내부 닫기 버튼 */
const productModalClose = document.getElementsByClassName("product-modal-close")[0];
productModalClose.addEventListener("click", e => {
  productModal.style.display = "none";
  document.body.style.removeProperty('overflow');
});

//////////////////////////////////////////////////////////////////////////////////////////