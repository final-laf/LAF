/* 검색조건 : 판매상태 */
const salesStateCheckboxList = document.querySelectorAll('input[name="state"]');
let uri = decodeURI(location.search);
let index = uri.indexOf('state=');

// 기존에 선택한 게 없을 경우 항상 모두 선택
for(let c of salesStateCheckboxList) {
  c.checked = index == -1;
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

  // if(queryStr.length == 0) continue;

  // if(a.href.indexOf('?') == -1) a.href += "?" + queryStr;
  // else                          a.href += "&" + queryStr;
}

// 쿼리 스트링 파라미터 셋팅
function addQueryStringParams(except) {

  const result = new URLSearchParams();
  new URLSearchParams(location.search).forEach((value, key) => {
    if(value == '') return;

    result.append(key, value);
    // string += '&' + key + '=' + value;
  })

  // return string.substring(1);
  if(except != null) result.delete(except);
  return result;
}

//////////////////////////////////////////////////////////////////////////////////////////

/* 체크박스(일반) */

// 전체선택 체크박스
const checkboxStateSelectAll = document.getElementById('checkboxStateSelectAll');
if(checkboxStateSelectAll != null) {
  const checkboxList = document.querySelectorAll('[name="state"]:not(:disabled):not(#checkboxStateSelectAll)');

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
          if(c.checked == false) flag = false;
        }
        if(flag) checkboxStateSelectAll.checked = true;
      }
    });
  }

  // 모든 체크박스가 체크 상태일 때 전체 체크박스도 체크해주기
  let flag = true;
  for(let c of checkboxList) {
    if(c.checked == false) flag = false;
  }
  if(flag) checkboxStateSelectAll.checked = true;
}

///////////////////////////////////////////////////////////////////////////////////////////////

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
    childCategorySelector.disabled = false;
  })
  .catch (e => console.log(e));
});