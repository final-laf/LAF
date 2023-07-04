
// 요소에 드래그 이벤트 추가
const addDragEvent = el => {
  el.addEventListener('dragstart', () => {
    el.classList.add('dragging');
  });

  el.addEventListener('dragend', e => {
    el.classList.remove('dragging');

    if(e.target.classList.contains('cc2')) {
      const ccno = e.target.getAttribute('ccno');
      const cc1 = document.querySelector('.cc1[ccno="'+ ccno +'"]');
      
      const beforeElement = e.target.previousElementSibling;
      if(beforeElement != null) {
        const bccno = beforeElement.getAttribute('ccno');
        document.querySelector('.cc1[ccno="'+ bccno +'"]').after(cc1);
      } else {
        cc1.parentElement.prepend(cc1);
      }
    }
  });
};

// 왼쪽 카테고리 목록에서 카테고리 삭제하기
function removeParentCategory(e) {
  e.stopPropagation();

  let el = e.target.parentElement;
  while (el.getAttribute('pcno') == null) {
    el = el.parentElement;
  }
  
  // 하위메뉴가 있으면 삭제 불가
  if (el.querySelectorAll(".category-second > div").length > 0) {
    alert('하위 메뉴가 있는 카테고리는 삭제할 수 없습니다.');
    return;
  }
  
  const pcno = el.getAttribute('pcno');

  // 해당 카테고리에 등록된 상품이 있으면 삭제 불가
  if(!checkCategoryEmpty(pcno, 0)) {
    alert('해당 카테고리에 등록된 상품이 있습니다.');
    return;
  }
  
  if (!confirm('카테고리를 삭제하시겠습니까?')) return;
  
  el.remove();
  document.querySelector('.pc2-container').innerHTML = '';
  document.getElementById('pcInput').disabled = false;
  document.getElementById('ccInput').disabled = true;
  document.getElementById('pcInput').focus();
}

// 삭제하려는 카테고리에 상품이 있는지 확인
function checkCategoryEmpty(pcno, ccno) {

  // 새로 생성한 카테고리인 경우 (아직 DB 등록 안됨)
  if(pcno < 0 || ccno < 0) return true;

  if(ccno == null) ccno = 0;
  fetch('/admin/category/empty?pcno=' + pcno + '&ccno=' + ccno)
  .then(resp => resp.text())
  .then(count => {
    console.log("pcno: " + pcno);
    if(count > 0) return false;
    else return true;
  })
  .catch(e => console.log(e));
}

// 부모 카테고리 삭제 버튼에 이벤트 연결
const removeBtns = document.querySelectorAll('.main-category-content-left .remove-btn');
for (const btn of removeBtns) {
  btn.addEventListener('click', e => removeParentCategory(e));
}

// 왼쪽 카테고리 목록 선택 -> 오른쪽에서 수정
const selectCategory = e => {
  e.stopPropagation();

  let el = e.target;
  while (true) {
    if (el.getAttribute("pcno") != null) break;
    el = el.parentElement;
  }

  const pcno = el.getAttribute("pcno");
  const before = document.querySelector('.select-edit');
  if (before != null)
    before.classList.remove('select-edit');
  el.classList.add('select-edit');
  document.querySelector('.main-category-content-right .first-content input').disabled = true;
  document.querySelector('.main-category-content-right .second-content input').disabled = false;

  // 카테고리 수정 탭 변경
  const parentCategoryContainer = document.querySelector('.parent-category-container');
  const childCategoryContainer = document.querySelector('.child-category-container');

  // 부모 카테고리
  parentCategoryContainer.innerHTML = '';
  const span = document.createElement('span');
  span.innerHTML = '&times;';

  // 오른쪽 부모 카테고리 삭제 시 수정 취소
  span.classList.add('remove-btn');
  span.addEventListener('click', () => {
    document.querySelector('.select-edit').classList.remove('select-edit');
    parentCategoryContainer.innerHTML = '';
    childCategoryContainer.innerHTML = '';
    document.getElementById('ccInput').disabled = true;
    document.getElementById('pcInput').disabled = false;
    document.getElementById('pcInput').focus();
  });

  const p = document.createElement('p');
  p.innerHTML = el.querySelector('.category-first .category-name').innerText;
  p.setAttribute("pcno", pcno);
  p.classList.add('pc2');
  p.append(span);

  parentCategoryContainer.append(p);

  // 자식 카테고리
  childCategoryContainer.innerHTML = '';
  const ccNameList = el.querySelectorAll('.category-second .category-name');

  for (let i = 0; i < ccNameList.length; i++) {
    const span2 = document.createElement('span');
    span2.innerHTML = '&times;';
    span2.classList.add('remove-btn');
    span2.addEventListener('click', e => {
      const ccno = e.target.parentElement.getAttribute('ccno');
      e.target.parentElement.remove();
      document.querySelector('.cc1[ccno="' + ccno + '"]').remove();
    });

    const ccno = ccNameList[i].parentElement.getAttribute('ccno');
    const p2 = document.createElement('p');
    p2.innerHTML = ccNameList[i].innerText;
    p2.setAttribute("ccno", ccno);
    p2.classList.add('drag-item');
    p2.classList.add('cc2');
    p2.setAttribute('draggable', true);
    p2.append(span2);
    addDragEvent(p2);

    childCategoryContainer.append(p2);
  }
};

const categoryList = document.querySelectorAll('li.category-item');
for (const c of categoryList) {
  c.addEventListener('click', e => selectCategory(e));
}




/* 카테고리 추가 */

const newIndex = {
  pc: -1,
  cc: -1
};

// 자식 카테고리 추가
const childCategoryNameInput = document.querySelector('#ccInput');
const childCategoryContainer = document.querySelector('.child-category-container');
const addSecondCategory = e => {

  // 오른쪽에 추가
  if (childCategoryNameInput.value.trim().length == 0) {
    childCategoryNameInput.value = '';
    return;
  }

  const span2 = document.createElement('span');
  span2.innerHTML = '&times;';
  span2.classList.add('remove-btn');
  span2.addEventListener('click', e => {
    const ccno = e.target.parentElement.getAttribute('ccno');
    e.target.parentElement.remove();
    document.querySelector('.cc1[ccno="' + ccno + '"]').remove();
  });

  const p2 = document.createElement('p');
  p2.innerHTML = childCategoryNameInput.value;
  p2.classList.add('drag-item');
  p2.classList.add('cc2');
  p2.setAttribute('draggable', true);
  p2.setAttribute('ccno', newIndex.cc);
  p2.append(span2);
  addDragEvent(p2);
  
  childCategoryContainer.append(p2);
  
  // 왼쪽에 추가
  const cc1span = document.createElement('span');
  cc1span.classList.add('category-name');
  cc1span.innerText = childCategoryNameInput.value;

  const input1 = document.createElement('input');
  input1.type = 'hidden';
  input1.name = 'childCategoryName';
  input1.value = childCategoryNameInput.value;

  const input2 = document.createElement('input');
  input2.type = 'hidden';
  input2.name = 'childCategoryNo';
  input2.value = newIndex.cc;

  const input3 = document.createElement('input');
  input3.type = 'hidden';
  input3.name = 'parentCategoryNo';
  input3.value = document.querySelector('.select-edit').getAttribute('pcno');
  
  const cc1div = document.createElement('div');
  cc1div.classList.add('cc1');
  cc1div.setAttribute('ccno', newIndex.cc--);
  cc1div.append(cc1span, input1, input2, input3);
  
  document.querySelector('.select-edit .cc1-container').append(cc1div);

  childCategoryNameInput.value = '';
  childCategoryNameInput.focus();
}

// 엔터로 자식 카테고리 추가
childCategoryNameInput.addEventListener('keyup', e => {
  if (e.keyCode == 13) addSecondCategory(e);
});

// 부모 카테고리 추가
const parentCategoryNameInput = document.querySelector('#pcInput');
const parentCategoryContainer = document.querySelector('.parent-category-container');
const addFirstCategory = e => {

  if (parentCategoryNameInput.value.trim().length == 0) {
    parentCategoryNameInput.value = '';
    return;
  }
  
  /* 오른쪽 추가 */
  const span = document.createElement('span');
  span.innerHTML = '&times;';
  span.classList.add('remove-btn');
  span.addEventListener('click', e => {
    e.target.parentElement.remove();
    parentCategoryNameInput.disabled = false;
    childCategoryContainer.innerHTML = '';
    childCategoryNameInput.disabled = true;
    parentCategoryNameInput.focus();
  });

  const p = document.createElement('p');
  p.innerHTML = parentCategoryNameInput.value;
  p.setAttribute('pcno', newIndex.pc);
  p.classList.add('pc2');
  p.append(span);

  parentCategoryContainer.append(p);
  
  /* 왼쪽 추가 */
  const pc1span = document.createElement('span');
  pc1span.classList.add('category-name');
  pc1span.innerText = parentCategoryNameInput.value;

  const pc1rmBtn = document.createElement('div');
  pc1rmBtn.classList.add('remove-btn');
  pc1rmBtn.innerHTML = '&times;';
  pc1rmBtn.addEventListener('click', e => removeParentCategory(e));
  
  const input1 = document.createElement('input');
  input1.type = 'hidden';
  input1.name = 'categoryName';
  input1.value = parentCategoryNameInput.value;

  const input2 = document.createElement('input');
  input2.type = 'hidden';
  input2.name = 'categoryNo';
  input2.value = newIndex.pc;

  const pc1div = document.createElement('div');
  pc1div.classList.add('category-first');
  pc1div.classList.add('pc1');
  pc1div.append(pc1span, pc1rmBtn, input1, input2);

  const cc1Container = document.createElement('div');
  cc1Container.classList.add('category-second');
  cc1Container.classList.add('cc1-container');

  const li = document.createElement('li');
  li.classList.add('category-item');
  li.classList.add('drag-item');
  li.classList.add('pc1-container');
  li.setAttribute('pcno', newIndex.pc--);
  li.setAttribute('draggable', true);
  li.append(pc1div, cc1Container);
  li.addEventListener('click', e => selectCategory(e));
  li.click();
  addDragEvent(li);

  document.querySelector('ul.drag-container').append(li);
  
  parentCategoryNameInput.disabled = true;
  childCategoryNameInput.disabled = false;
  parentCategoryNameInput.value = '';
  childCategoryNameInput.focus();
};

// 엔터로 부모 카테고리 추가
parentCategoryNameInput.addEventListener('keyup', e => {
  if (e.keyCode == 13) addFirstCategory(e);
});

// 카테고리 수정 초기화 / 제출
document.querySelector('#resetBtn').addEventListener('click', () => location.href = "/admin/category");


// 요소 drag & drop 으로 이동
// https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5
(() => {
  // const $ = (select) => document.querySelectorAll(select);
  const draggables = document.querySelectorAll('.drag-item');
  const containers = document.querySelectorAll('.drag-container');

  draggables.forEach(el => addDragEvent(el));

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()     //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
      const offset = y - box.top - box.height / 2   //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
      if (offset < 0 && offset > closest.offset) {  // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
        return { offset: offset, element: child }   // Element를 리턴
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  };

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      container.appendChild(draggable);
      container.insertBefore(draggable, afterElement);
    })
  });
})();




document.getElementById('submitBtn').addEventListener('click', () => {
  document.getElementById('categoryUpdateFrm').submit();
});


/* 카테고리 변경사항 저장 */
// document.querySelector('#categoryModifyBtnContainer').addEventListener('submit', e => {
  

  // const parentCategory = document.querySelector('input[name="parentCategory"]');
  // const childCategory = document.querySelector('input[name="childCategory"]');

  // const pcList = document.querySelectorAll('.pc1-container');
  // const pcArr = [];
  // const ccArr = [];
  // for(const pc of pcList) {
  //   const pcno = pc.getAttribute('pcno');
  //   pcArr.push(pcno);

  //   const ccList = pc.querySelectorAll('.cc1');
  //   for(const cc of ccList) {
  //     ccArr.push(pc + '^' + cc.getAttribute('ccno'));
  //   }
  // }

  // parentCategory.value = pcArr;
  // childCategory.value = ccArr;

  // e.target.submit();
// });