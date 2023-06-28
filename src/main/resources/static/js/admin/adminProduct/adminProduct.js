//////////////////////////////////////// M O D A L //////////////////////////////////////////////

// 모달 내부 불필요 요소 삭제
document.querySelector('.enroll-middle-table tr:last-child').remove();

/* 상품 상세 모달 */
const productModal = document.getElementById("productModalOverlay")
const selectedProduct = document.getElementsByClassName("modify-product")

// 창 닫을 때 모달 내부 데이터 삭제
function deleteModalData() {
  document.querySelector('#productName').value = '';
  document.querySelector('#thumbnailImagePreview').src = '/images/common/no-image.png'
  document.querySelector('#selectedCategory').innerHTML = '<span class="info">클릭해서 삭제</span>';
  document.querySelector('.enroll-price input[name="productSale"]').value = '';
  detailImgTr.innerHTML = '';
  detailImgNameTr.innerHTML = '<td id="noDetailImgInfo">업로드한 이미지가 없습니다</td>';
  const optionTableContent = document.querySelectorAll('.enroll-middle-table tr:not(.table-header)');
  for(const el of optionTableContent) el.remove();
}

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
      deleteModalData();
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(productModal.style.display === "flex" && e.key === "Escape") {
      productModal.style.display = "none"
      document.body.style.removeProperty('overflow');
      deleteModalData();
    }
});

/* 모달창 내부 닫기 버튼 */
const productModalClose = document.getElementsByClassName("product-modal-close")[0];
productModalClose.addEventListener("click", e => {
  productModal.style.display = "none";
  document.body.style.removeProperty('overflow');
  deleteModalData();
});

//////////////////////////////////////////////////////////////////////////////////////////


/* 스크롤바 이동 효과 */
const scrollTop = document.querySelector('.scroll-top');
const scroll = document.querySelector('.scroll');

const fullHeight = document.documentElement.scrollHeight;
const windowHeight = window.innerHeight;
const maxScroll = fullHeight - windowHeight;
const scrollHeight = windowHeight - maxScroll - 2;
scroll.style.height = scrollHeight + 'px';

window.addEventListener('scroll', () => { 
  scroll.style.backgroundColor = '#493e5d80';
  scrollTop.style.height = window.scrollY + 'px';
  // setTimeout(() => {
  //   scroll.style.backgroundColor = '#493e5d00';
  // }, 1000);
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
  const queryStr = addQueryStringParams();
  if(queryStr.length == 0) continue;

  if(a.href.indexOf('?') == -1) a.href += "?" + queryStr;
  else                          a.href += "&" + queryStr;
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
    if(value == '' || key == 'cp') return;
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
    
    document.querySelector('.product-modal-window').scrollTop = 0;

    const productNo = e.target.parentElement.parentElement.querySelector('.p-no').innerText;
    document.getElementById('productNoHiddenInput').value = productNo;
    fetch("/admin/product/mod?productNo=" + productNo)
    .then(resp => resp.json())
    .then(map => {
      
      const product = map.product;
      const imageList = map.productImageList;
      const categoryList = map.categoryList;
      const optionList = map.optionList;
      const index = {
        'file': 0,
        'img': 0,
        'name': 0
      };
      
      document.querySelector('#productName').value = product.productName; // 상품명
      document.querySelector('#thumbnailImagePreview').src = product.thumbnailPath; // 썸네일

      /* 카테고리 */
      for(const category of categoryList) {
        const pCategoryNo = category.parentCategoryNo;
        const pCateName = category.parentCategoryName;
        const cCategoryNo = category.categoryNo;
        const cCateName = category.categoryName;
        
        const span = document.createElement('span');
        const input = document.createElement('input');
        input.type = 'hidden';

        // 자식 카테고리가 있는 경우
        if(cCategoryNo > 0) {
          span.innerText = pCateName + " > " + cCateName;
          span.setAttribute("child", cCategoryNo);
          span.addEventListener('click', e => {
            const categoryNo = e.target.getAttribute("child");
            e.target.parentElement.querySelector('input[value="' + categoryNo + '"]').remove();
            e.target.remove();
          });          

          input.name = 'childCategory';
          input.value = cCategoryNo;

        // 자식 카테고리가 없는 경우
        } else {
          span.innerText = pCateName;
          span.setAttribute("parent", pCategoryNo);
          span.addEventListener('click', e => {
            const categoryNo = e.target.getAttribute("parent");
            e.target.parentElement.querySelector('input[value="' + categoryNo + '"]').remove();
            e.target.remove();
          });
          
          input.name = 'parentCategory';
          input.value = pCategoryNo;
        }

        selectedCategory.querySelector('.info').before(span, input);
      }
      
      /* 할인율 */
      const productSale = document.querySelector('.enroll-price input[name="productSale"]');
      if(product.productSale != null && product.productSale > 0) {
        productSale.value = product.productSale;
      }
      
      document.querySelector('.enroll-price .checkbox').checked = false; // 최종할인가 자동계산 해제
      document.querySelector('.enroll-point .checkbox').checked = false; // 포인트 자동계산 해제
      document.querySelector('.enroll-price input[name="productPrice"]').value = numberWithCommas(product.productPrice); // 판매가
      document.querySelector('.enroll-price input[name="productSalePrice"]').value = numberWithCommas(product.productSalePrice); // 최종할인가
      document.querySelector('.enroll-point input[name="productPoint"]').value = numberWithCommas(product.productPoint); // 포인트

      /* 이미지 */
      for(const i of imageList) {

        /* 파일명 출력 */
        let td = document.querySelector('#detailImgNameTr > td');
        const noDetailImgInfo = document.getElementById('noDetailImgInfo');
        if(noDetailImgInfo != undefined) {
          noDetailImgInfo.remove();
          td = document.createElement('td');
          detailImgNameTr.append(td);
        }
        
        // 위로 버튼
        const btnUp = document.createElement('button');
        btnUp.className = 'up';
        btnUp.type = "button";
        btnUp.innerText = "▲";
        btnUp.addEventListener('click', e => {
          const btn = e.target;

          // 파일명 순서 변경
          const container = btn.parentElement;
          const prevSibling = container.previousElementSibling;
          const value = container.getAttribute('value');

          // 이동한 애 버튼 변경
          prevSibling.before(container);
          if(container.previousElementSibling == null) btn.disabled = true; // 이동했더니 첫 번째면 ▲버튼 비활성화
          btn.parentElement.querySelector('.down').disabled = false; // ▼버튼 비활성화 해제

          // 원래 위에 있던 애 버튼 변경
          const sibling = btn.parentElement.nextElementSibling;
          sibling.querySelector('.up').disabled = false; // 원래 위에있던 애 ▲버튼 활성화
          if(sibling.nextElementSibling == null)
            sibling.querySelector('.down').disabled = true; // 원래 위에있던 애가 마지막으로 갔으면 ▼ 버튼 비활성화

          // 이미지 순서 변경
          const img = document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]');
          const prevImg = img.previousElementSibling;
          prevImg.before(img);

          // file input 순서 변경
          reorderImgFileUp(value);
        });
        if(detailImgNameTr.querySelector('.detailImgNameContainer') == null) btnUp.disabled = true;

        // 아래로 버튼
        const btnDown = document.createElement('button');
        btnDown.className = 'down';
        btnDown.type = "button";
        btnDown.innerText = "▼";
        btnDown.addEventListener('click', e => {
          const btn = e.target;

          // 파일명 순서 변경
          const container = btn.parentElement;
          const nextSibling = container.nextElementSibling;
          const value = container.getAttribute('value');

          // 이동한 애 버튼 변경
          nextSibling.after(container);
          if(container.nextElementSibling == null) btn.disabled = true;
          btn.parentElement.querySelector('.up').disabled = false;

          // 원래 밑에 있던 애 버튼 변경
          const sibling = btn.parentElement.previousElementSibling;
          sibling.querySelector('.down').disabled = false; // 원래 밑에 있던 애 ▼버튼 활성화
          if(sibling.previousElementSibling == null)
            sibling.querySelector('.up').disabled = true; // 원래 위에있던 애가 처음으로 갔으면 ▲버튼 비활성화

          // 이미지 순서 변경
          const img = document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]');
          const nextImg = img.nextElementSibling;
          nextImg.after(img);

          // file input 순서 변경
          reorderImgFileDown(value);
        });
        btnDown.disabled = true;
        if(detailImgNameTr.querySelector('.detailImgNameContainer') != null) // 원래 마지막이었던 요소 ▼ 버튼 활성화
          detailImgNameTr.querySelector('td').lastChild.querySelector('.down').disabled = false;

        const span = document.createElement('span');
        span.innerText = i.imgPath.split('/')[3];
        span.value = i.imgOrder;
        
        // 삭제버튼
        const btnRm = document.createElement('button');
        btnRm.type = 'button';
        btnRm.innerHTML = '&times;';
        btnRm.addEventListener('click', e => {
          const value = e.target.parentElement.getAttribute('value');
          e.target.parentElement.remove();
          document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]').remove();
          deleteImgFile(value);
          
          // 이미지 삭제 후 순서 변경에 따른 버튼 비활성화 추가 설정
          const imgNameList = detailImgNameTr.querySelectorAll('.detailImgNameContainer');
            if(imgNameList.length > 0) {
              imgNameList[0].querySelector('.up').disabled = true;
              imgNameList[imgNameList.length - 1].querySelector('.down').disabled = true;
            }

          // 남은 요소가 하나도 없을 경우
          if(detailImgNameTr.querySelector('td > div') == null) {
            detailImgNameTr.innerHTML = '<td id="noDetailImgInfo">업로드한 이미지가 없습니다</td>';
            detailImgTd.remove();
          }
        });
        
        const nameContainer = document.createElement('div');
        nameContainer.className = "detailImgNameContainer";
        nameContainer.setAttribute('value', index.name++);
        nameContainer.append(btnUp, btnDown, span, btnRm);
        td.append(nameContainer);

        /* 이미지 출력 */
        const img = document.createElement('img');
        img.src = i.imgPath;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rmImgBtn';
        btn.innerHTML = '&times';
        btn.addEventListener('click', e => {
          const value = e.target.parentElement.getAttribute('value');
          e.target.parentElement.remove();
          document.querySelector('#detailImgNameTr .detailImgNameContainer[value="' + value + '"]').remove();
          deleteImgFile(value);

          // 이미지 삭제 후 순서 변경에 따른 버튼 비활성화 추가 설정
          const imgNameList = detailImgNameTr.querySelectorAll('.detailImgNameContainer');
          if(imgNameList.length > 0) {
            imgNameList[0].querySelector('.up').disabled = true;
            imgNameList[imgNameList.length - 1].querySelector('.down').disabled = true;
          }

          // 남은 요소가 하나도 없을 경우
          if(detailImgNameTr.querySelector('td > div') == null) {
            detailImgNameTr.innerHTML = '<td id="noDetailImgInfo">업로드한 이미지가 없습니다</td>';
            detailImgTd.remove();
          }
        });

        const imgContainer = document.createElement('div');
        imgContainer.className = 'detailImgContainer';
        imgContainer.append(img, btn);
        imgContainer.setAttribute('value', index.img++);

        if(detailImgTr.querySelector('td') == null) {
          detailImgTd = document.createElement('td');
          detailImgTr.append(detailImgTd);
        }
        detailImgTd.append(imgContainer);
      }

      /* 옵션 */
      
      // 신규 내용 출력
      document.getElementById('oneSizeCheckbox').checked = false;
      if(optionList[0].size == null || optionList[0].size.trim().length == 0) {
        document.getElementById('oneSizeCheckbox').click();
      }
      for(const option of optionList) {

        const input1 = document.createElement('input');
        input1.type = 'checkbox';
        input1.classList.add('option-checkbox');
        const td1 = document.createElement('td');
        td1.append(input1);

        const input2 = document.createElement('input');
        input2.name = 'size';
        input2.type = 'text';
        input2.value = option.size;
        input2.required = true;
        if(document.getElementById('oneSizeCheckbox').checked) input2.disabled = true;
        const td2 = document.createElement('td');
        td2.append(input2);

        const input3 = document.createElement('input');
        input3.name = 'color';
        input3.type = 'text';
        input3.value = option.color;
        input3.required = true;
        const td3 = document.createElement('td');
        td3.append(input3);
        
        const input4 = document.createElement('input');
        input4.name = 'stock';
        input4.type = 'text';
        input4.value = option.stock;
        input4.required = true;
        const td4 = document.createElement('td');
        td4.append(input4);

        const input5 = document.createElement('input');
        input5.name = 'location';
        input5.type = 'text';
        input5.value = option.location;
        const td5 = document.createElement('td');
        td5.append(input5);

        const tr = document.createElement('tr');
        tr.append(td1, td2, td3, td4, td5);
        optionTable.append(tr);
      }

    });
  });
}

///////////////////////////////////////// U P D A T E ////////////////////////////////////////////

document.getElementById('productUpdateFrm').addEventListener('submit', e => {
  e.preventDefault();

  document.getElementById('queryStringHiddenInput').value = location.search;

  e.target.submit();
});