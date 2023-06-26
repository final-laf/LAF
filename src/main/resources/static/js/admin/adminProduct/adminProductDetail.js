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

    const option1 = document.createElement('option');
    option1.innerText = '판매중';
    option1.setAttribute('value', 'O');
    const option2 = document.createElement('option');
    option2.innerText = '품절';
    option2.setAttribute('value', 'S');
    const option3 = document.createElement('option');
    option3.innerText = '비공개';
    option3.setAttribute('value', 'N');
    option3.selected = true;
    const select = document.createElement('select');
    select.name = "productState";
    select.append(option1, option2, option3);
    const td6 = document.createElement('td');
    td6.append(select);

    const tr = document.createElement('tr');
    tr.append(td1, td2, td3, td4, td5, td6);
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
      'location': tr.querySelector('[name="location"]').value,
      'productState': tr.querySelector('[name="productState"]').value
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

    const option1 = document.createElement('option');
    option1.innerText = '판매중';
    option1.setAttribute('value', 'O');
    const option2 = document.createElement('option');
    option2.innerText = '품절';
    option2.setAttribute('value', 'S');
    const option3 = document.createElement('option');
    option3.innerText = '비공개';
    option3.setAttribute('value', 'N');
    option3.selected = true;
    const select = document.createElement('select');
    select.name = "productState";
    select.append(option1, option2, option3);
    const td6 = document.createElement('td');
    td6.append(select);

    const tr = document.createElement('tr');
    tr.append(td1, td2, td3, td4, td5, td6);
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
    td.colSpan = '6';
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
    salePriceInput.disabled = true;
    salePriceInput.value = calcSalePrice();
  } else {
    salePriceInput.disabled = false;
  }
});

/* 적립금 자동계산 설정/해제 */
pointAutoCheck.addEventListener('click', e => {
  if(e.target.checked) {
    pointInput.disabled = true;
    pointInput.value = calcPoint();
  } else {
    pointInput.disabled = false;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////