/* 부모 카테고리 선택 시 자식 카테고리 목록 활성화 + 선택 카테고리 추가 */
const detailParentCategorySelector = document.getElementById('detailParentCategory');
const detailChildCategorySelector = document.getElementById('detailChildCategory');
const selectedCategory = document.getElementById('selectedCategory');

detailParentCategorySelector.addEventListener('change', e => {

  const selectorTitle = detailChildCategorySelector.firstElementChild;
  const categoryNo = e.target.value;
  detailChildCategorySelector.innerHTML = "";
  detailChildCategorySelector.appendChild(selectorTitle);

  fetch("/admin/product/getChildCategories?categoryNo=" + categoryNo)
  .then(res => res.json())
  .then(categoryList => {

    for(let c of categoryList) {
      const option = document.createElement('option');
      option.name = "cc";
      option.value = c.categoryNo;
      option.innerText = c.categoryName;
      detailChildCategorySelector.append(option);
    }

    // 자식카테고리가 있을 경우 selector 활성화
    detailChildCategorySelector.disabled = (categoryList.length <= 0);

    // 2차 카테고리가 없는 상품일 경우 카테고리 바로 추가
    if(detailChildCategorySelector.disabled == true) {

      // 이미 존재하는 카테고리일 경우 추가 안함
      const spanList = selectedCategory.querySelectorAll('span');
      for(const s of spanList) {
        if(s.getAttribute("parent") == categoryNo) return;
      }

      // 신규 카테고리 추가
      const span = document.createElement('span');
      span.innerText = e.target.querySelector('[value="' + categoryNo + '"]').innerText;
      span.setAttribute("parent", categoryNo);
      span.addEventListener('click', e => {
        const categoryNo = e.target.getAttribute("parent");
        e.target.parentElement.querySelector('input[value="' + categoryNo + '"]').remove();
        e.target.remove();
      });
      
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'parentCategory';
      input.value = categoryNo;
  
      selectedCategory.querySelector('.info').before(span, input);
    }
  })
  .catch (e => console.log(e));
});

detailChildCategorySelector.addEventListener('change', e => {

  const pCategoryNo = detailParentCategorySelector.value;
  const cCategoryNo = e.target.value;
  
  // 이미 존재하는 카테고리일 경우 추가 안함
  const spanList = selectedCategory.querySelectorAll('span');
  for(const s of spanList) {
    if(s.getAttribute("categoryNo") == cCategoryNo) return;
  }
  
  const pCateName = detailParentCategorySelector.querySelector('[value="' + pCategoryNo + '"]').innerText;
  const cCateName = e.target.querySelector('[value="' + cCategoryNo + '"]').innerText;
  
  const span = document.createElement('span');
  span.innerText = pCateName + " > " + cCateName;
  span.setAttribute("child", cCategoryNo);
  span.addEventListener('click', e => {
    const categoryNo = e.target.getAttribute("child");
    e.target.parentElement.querySelector('input[value="' + categoryNo + '"]').remove();
    e.target.remove();
  });

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'childCategory';
  input.value = cCategoryNo;

  selectedCategory.querySelector('.info').before(span, input);

});

/////////////////////////////////// O P T I O N ///////////////////////////////////////////

const addOptionBtn = document.getElementById('addOptionBtn');
const cpOptionBtn = document.getElementById('cpOptionBtn');
const rmOptionBtn = document.getElementById('rmOptionBtn');
const optionTable = document.querySelector('.enroll-middle-table');
const checkboxAll = document.querySelector('.option-checkbox.all');

/* 옵션 입력 칸 추가 */
addOptionBtn.addEventListener('click', () => {

  if(optionTable.querySelector('.no-data')) 
    optionTable.lastElementChild.remove();

  const input1 = document.createElement('input');
    input1.type = 'checkbox';
    input1.classList.add('option-checkbox');
    const td1 = document.createElement('td');
    td1.append(input1);

    const input2 = document.createElement('input');
    input2.name = 'size';
    input2.type = 'text';
    const td2 = document.createElement('td');
    td2.append(input2);

    const input3 = document.createElement('input');
    input3.name = 'color';
    input3.type = 'text';
    input3.required = true;
    const td3 = document.createElement('td');
    td3.append(input3);
    
    const input4 = document.createElement('input');
    input4.name = 'stock';
    input4.type = 'text';
    const td4 = document.createElement('td');
    td4.append(input4);

    const input5 = document.createElement('input');
    input5.name = 'location';
    input5.type = 'text';
    const td5 = document.createElement('td');
    td5.append(input5);

    // const option1 = document.createElement('option');
    // option1.innerText = '판매중';
    // option1.setAttribute('value', 'O');
    // const option2 = document.createElement('option');
    // option2.innerText = '품절';
    // option2.setAttribute('value', 'S');
    // const option3 = document.createElement('option');
    // option3.innerText = '비공개';
    // option3.setAttribute('value', 'N');
    // option3.selected = true;
    // const select = document.createElement('select');
    // select.name = "productState";
    // select.append(option1, option2, option3);
    // const td6 = document.createElement('td');
    // td6.append(select);

    const tr = document.createElement('tr');
    // tr.append(td1, td2, td3, td4, td5, td6);
    tr.append(td1, td2, td3, td4, td5);
    optionTable.append(tr);
});

/* 선택 옵션 추출 */
function getSelectedOption() {
  const arr = [];

  const checkboxList = document.querySelectorAll('.option-checkbox:not(.all)');
  for(const c of checkboxList) {
    if(c.checked == false) continue;

    const tr = c.parentElement.parentElement;
    arr.push({
      'size': tr.querySelector('[name="size"]').value,
      'color': tr.querySelector('[name="color"]').value,
      'stock': tr.querySelector('[name="stock"]').value,
      'location': tr.querySelector('[name="location"]').value
      // 'productState': tr.querySelector('[name="productState"]').value
    });
  }
  
  return arr;
}

/* 선택 옵션 복제 */
cpOptionBtn.addEventListener('click', () => {

  const checkedOptionArr = getSelectedOption();
  for(const arr of checkedOptionArr) {

    const input1 = document.createElement('input');
    input1.type = 'checkbox';
    input1.classList.add('option-checkbox');
    const td1 = document.createElement('td');
    td1.append(input1);

    const input2 = document.createElement('input');
    input2.name = 'size';
    input2.type = 'text';
    input2.value = arr.size;
    const td2 = document.createElement('td');
    td2.append(input2);

    const input3 = document.createElement('input');
    input3.name = 'color';
    input3.type = 'text';
    input3.value = arr.color;
    input3.required = true;
    const td3 = document.createElement('td');
    td3.append(input3);
    
    const input4 = document.createElement('input');
    input4.name = 'stock';
    input4.type = 'text';
    input4.value = arr.stock;
    const td4 = document.createElement('td');
    td4.append(input4);

    const input5 = document.createElement('input');
    input5.name = 'location';
    input5.type = 'text';
    input5.value = arr.location;
    const td5 = document.createElement('td');
    td5.append(input5);

    // const option1 = document.createElement('option');
    // option1.innerText = '판매중';
    // option1.setAttribute('value', 'O');
    // const option2 = document.createElement('option');
    // option2.innerText = '품절';
    // option2.setAttribute('value', 'S');
    // const option3 = document.createElement('option');
    // option3.innerText = '비공개';
    // option3.setAttribute('value', 'N');
    // option3.selected = true;
    // const select = document.createElement('select');
    // select.name = "productState";
    // select.append(option1, option2, option3);
    // const td6 = document.createElement('td');
    // td6.append(select);

    const tr = document.createElement('tr');
    // tr.append(td1, td2, td3, td4, td5, td6);
    tr.append(td1, td2, td3, td4, td5);
    optionTable.append(tr);
  } 
});

/* 선택 옵션 삭제 */
rmOptionBtn.addEventListener('click', () => {
  const checkboxList = document.querySelectorAll('.option-checkbox:not(.all)');
  for(const c of checkboxList) {
    if(c.checked)
      c.parentElement.parentElement.remove();
  }
  if(optionTable.querySelectorAll('tr').length <= 1) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.innerText = "옵션을 추가해주세요.";
    // td.colSpan = '6';
    td.colSpan = '5';
    td.classList.add("no-data");
    tr.append(td);
    optionTable.append(tr);
    checkboxAll.checked = false;
  }
});

/* 전체선택 체크박스 */
checkboxAll.addEventListener('click', e => {
  const checkboxList = document.querySelectorAll('.option-checkbox:not(.all)');
  for(const c of checkboxList) {
    c.checked = e.target.checked;
    c.addEventListener('click', e2 => {
      if(!e2.target.checked) checkboxAll.checked = false;
    });
  }
});

///////////////////////////////////// P R I C E ///////////////////////////////////////////

const priceInput = document.querySelector('input[name="productPrice"]');
const discountInput = document.querySelector('input[name="productSale"]');
const salePriceInput = document.querySelector('input[name="productSalePrice"]');
const pointInput = document.querySelector('input[name="productPoint"]');

const salePriceAutoCheck = document.querySelector('.enroll-price .checkbox');
const pointAutoCheck = document.querySelector('.enroll-point .checkbox');

/* 할인가 자동계산 */
function calcSalePrice() {
  const originPrice = Number(priceInput.value.replaceAll(",", ""));
  const discount = Number(discountInput.value);
  const result = Math.floor((originPrice - (originPrice / 100 * discount)) / 100) * 100;
  return numberWithCommas(result);
}

/* 포인트 자동계산 */
function calcPoint() {
  const salePrice = Number(salePriceInput.value.replaceAll(",", ""));
  const result = Math.floor(salePrice / 100);
  return numberWithCommas(result);
}

/* 금액 입력 시 자동으로 , 찍어줌 */
priceInput.addEventListener('input', e => {
  const number = e.target.value.replaceAll(",", "");
  e.target.value = numberWithCommas(number);
  if(salePriceAutoCheck.checked) salePriceInput.value = calcSalePrice();
  if(pointAutoCheck.checked) pointInput.value = calcPoint();
});

/* 할인율 입력 시 자동계산 */
discountInput.addEventListener('input', () => {
  salePriceInput.value = calcSalePrice();
  pointInput.value = calcPoint();
});

/* 최종할인가 수동입력 시 , 추가 + 적립금 자동계산 */
salePriceInput.addEventListener('input', e => {
  const number = e.target.value.replaceAll(",", "");
  e.target.value = numberWithCommas(number);
  if(pointAutoCheck.checked) pointInput.value = calcPoint();
});

/* 적립금 수동입력 시 , 추가 */
pointInput.addEventListener('input', e => {
  const number = e.target.value.replaceAll(",", "");
  e.target.value = numberWithCommas(number); 
});


/* 할인가 자동계산 설정/해제 */
salePriceAutoCheck.addEventListener('click', e => {
  if(e.target.checked) {
    salePriceInput.readOnly = true;
    salePriceInput.value = calcSalePrice();
    if(pointAutoCheck.checked) pointInput.value = calcPoint();
  } else {
    salePriceInput.readOnly = false;
  }
});

/* 적립금 자동계산 설정/해제 */
pointAutoCheck.addEventListener('click', e => {
  if(e.target.checked) {
    pointInput.readOnly = true;
    pointInput.value = calcPoint();
  } else {
    pointInput.readOnly = false;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////

/* 썸네일 이미지 파일 업로드 */
const enrollImgBtn = document.getElementById('enrollImgBtn');
const thumbnailInput = document.getElementById('thumbnailPath');
const deleteImgBtn = document.getElementById('deleteImgBtn');
const thumbnailImagePreview = document.getElementById('thumbnailImagePreview');

// 썸네일 업로드 버튼과 input 연결
enrollImgBtn.addEventListener('click', () => thumbnailInput.click());

// 썸네일 업로드 시 미리보기
thumbnailInput.addEventListener('change', e => {
  const file = e.target.files[0]; // 선택된 파일의 데이터
  if(file != undefined) {
    const reader = new FileReader(); // 파일을 읽는 객체
    reader.readAsDataURL(file); // 지정된 파일을 읽은 후 result 변수에 URL 형식으로 저장
    reader.onload = e => { // 파일을 다 읽은 후 수행
      thumbnailImagePreview.setAttribute("src", e.target.result);
    };
  }
});

// 썸네일 삭제
deleteImgBtn.addEventListener('click', () => {
  if(thumbnailImagePreview.getAttribute("src") != null) {
    thumbnailImagePreview.setAttribute("src", "/images/common/no-image.png");
      thumbnailInput.value = ""; 
  }
});

/* 제품 상세 이미지 파일 업로드 */
const uploadDetailImgBtn = document.getElementById('uploadDetailImgBtn');
const detailImgInput = document.getElementById('detailImgInput');
const detailImgNameTr = document.getElementById('detailImgNameTr');
const detailImgTr = document.getElementById('detailImgTr');
let detailImgTd = detailImgTr.querySelector('td');
const index = {
  'img': 0,
  'name': 0
}

// 이미지 업로드 버튼과 input 연결
uploadDetailImgBtn.addEventListener('click', () => detailImgInput.click());

// 업로드한 이미지 미리보기(파일명, 사진)
detailImgInput.addEventListener('change', e => {

  const fileArr = e.target.files; // 선택된 파일의 데이터
  for(const file of fileArr) {

    /* 파일명 출력 */
    let td = document.querySelector('#detailImgNameTr > td');
    const noDetailImgInfo = document.getElementById('noDetailImgInfo');
    if(noDetailImgInfo != undefined) {
      noDetailImgInfo.remove();
      td = document.createElement('td');
      detailImgNameTr.append(td);
    }
    
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
    });
    if(detailImgNameTr.querySelector('.detailImgNameContainer') == null) btnUp.disabled = true;

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
    });
    btnDown.disabled = true;
    if(detailImgNameTr.querySelector('.detailImgNameContainer') != null) // 원래 마지막이었던 요소 ▼ 버튼 활성화
      detailImgNameTr.querySelector('td').lastChild.querySelector('.down').disabled = false;

    const span = document.createElement('span');
    span.innerText = file.name;
    
    const btnRm = document.createElement('button');
    btnRm.type = 'button';
    btnRm.innerHTML = '&times;';
    btnRm.addEventListener('click', e => {
      const value = container.getAttribute('value');
      e.target.parentElement.remove();
      document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]').remove();
      
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
    
    const container = document.createElement('div');
    container.className = "detailImgNameContainer";
    container.setAttribute('value', index.name++);
    container.append(btnUp, btnDown, span, btnRm);
    td.append(container);
    


    /* 이미지 미리보기 출력 */
    const reader = new FileReader(); // 파일을 읽는 객체
    reader.readAsDataURL(file); // 지정된 파일을 읽은 후 result 변수에 URL 형식으로 저장
    reader.onload = e => { // 파일을 다 읽은 후 수행
      
      const img = document.createElement('img');
      img.src = e.target.result;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rmImgBtn';
      btn.innerHTML = '&times';
      btn.addEventListener('click', e => {
        const value = e.target.parentElement.getAttribute('value');
        e.target.parentElement.remove();
        document.querySelector('#detailImgNameTr .detailImgNameContainer[value="' + value + '"]').remove();

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

      const container = document.createElement('div');
      container.className = 'detailImgContainer';
      container.append(img, btn);
      container.setAttribute('value', index.img++);

      if(detailImgTr.querySelector('td') == null) {
        detailImgTd = document.createElement('td');
        detailImgTr.append(detailImgTd);
      }
      detailImgTd.append(container);
    };
  }
});