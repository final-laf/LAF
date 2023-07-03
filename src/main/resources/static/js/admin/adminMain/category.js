// 왼쪽 카테고리 목록에서 카테고리 삭제하기
const removeBtns = document.querySelectorAll('.main-category-content-left .remove-btn');
for(const btn of removeBtns) {
  btn.addEventListener('click', e => {
    let el = e.target.parentElement;
    while(el.getAttribute('pcno') == null && el.getAttribute('ccno') == null) {
      el = el.parentElement;
    }
    if(el.querySelectorAll(".category-second > div").length > 0) {
      alert('하위 메뉴가 있는 카테고리는 삭제할 수 없습니다.');
      return;
    }

    if(!confirm('카테고리를 삭제하시겠습니까?')) return;
    el.remove();
  });
}

// 왼쪽 카테고리 목록 선택 -> 오른쪽에서 수정
const categoryList = document.querySelectorAll('li.category-item');
for(const c of categoryList) {
  c.addEventListener('click', e => {
    e.stopPropagation();

    let el = e.target;
    while(true) {
      if( el.getAttribute("pcno") != null ) break;
      el = el.parentElement;
    }

    const pcno = el.getAttribute("pcno");
    const before = document.querySelector('.select-edit');
    if( before != null )
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
    span.classList.add('remove-btn');
    span.addEventListener('click', e => {
      const pcno = e.target.parentElement.getAttribute('pcno');
      e.target.parentElement.remove();
      document.querySelector('li[pcno="' + pcno + '"]').remove();
      document.getElementById('parentCategorySubmitBtn').previousElementSibling.disabled = false;
    });

    const p = document.createElement('p');
    p.innerHTML = el.querySelector('.category-first .category-name').innerText;
    p.setAttribute("pcno", pcno);
    p.append(span);

    parentCategoryContainer.append(p);

    // 자식 카테고리
    childCategoryContainer.innerHTML = '';
    const ccNameList = el.querySelectorAll('.category-second .category-name');

    for(let i=0; i<ccNameList.length; i++) {
      const span2 = document.createElement('span');
      span2.innerHTML = '&times;';
      span2.classList.add('remove-btn');
      span2.addEventListener('click', e => {
        const ccno = e.target.parentElement.getAttribute('ccno');
        e.target.parentElement.remove();
        document.querySelector('li .category-second div[ccno="' + ccno + '"]').remove();
      });
  
      const ccno = ccNameList[i].parentElement.getAttribute('ccno');
      const p2 = document.createElement('p');
      p2.innerHTML = ccNameList[i].innerText;
      p2.setAttribute("ccno", ccno);
      p2.append(span2);
  
      childCategoryContainer.append(p2);
    }
  });
}


// 자식 카테고리 추가
const childCategorySubmitBtn = document.getElementById('childCategorySubmitBtn');
const childCategoryNameInput = childCategorySubmitBtn.parentElement.querySelector('input');
const childCategoryContainer = document.querySelector('.child-category-container');
const addSecondCategory = e => {
  
  // 오른쪽에 추가
  if(childCategoryNameInput.value.trim().length == 0) {
    childCategoryNameInput.value = '';
    return;
  }
  
  const span2 = document.createElement('span');
  span2.innerHTML = '&times;';
  span2.classList.add('remove-btn');
  span2.addEventListener('click', e => {
    e.target.parentElement.remove();
  });
  
  const p2 = document.createElement('p');
  p2.innerHTML = childCategoryNameInput.value;
  p2.append(span2);
  
  childCategoryContainer.append(p2);
  childCategoryNameInput.value = '';
  childCategoryNameInput.focus();

  // 왼쪽에 추가
  
}

childCategorySubmitBtn.addEventListener('click', e => addSecondCategory(e));
childCategoryNameInput.addEventListener('keyup', e => {
  if( e.keyCode == 13 ) addSecondCategory(e);
});

// 부모 카테고리 추가
const parentCategorySubmitBtn = document.getElementById('parentCategorySubmitBtn');
const parentCategoryNameInput = parentCategorySubmitBtn.parentElement.querySelector('input');
const parentCategoryContainer = document.querySelector('.parent-category-container');
const addFirstCategory = e => {

  if(parentCategoryNameInput.value.trim().length == 0) {
    parentCategoryNameInput.value = '';
    return;
  }

  const span = document.createElement('span');
  span.innerHTML = '&times;';
  span.classList.add('remove-btn');
  span.addEventListener('click', e => {
    e.target.parentElement.remove();
    parentCategoryNameInput.disabled = false;
  });

  const p = document.createElement('p');
  p.innerHTML = parentCategoryNameInput.value;
  p.append(span);

  parentCategoryContainer.append(p);
  parentCategoryNameInput.disabled = true;
  parentCategoryNameInput.value = '';
  childCategoryNameInput.disabled = false;
  childCategoryNameInput.focus();
};

parentCategorySubmitBtn.addEventListener('click', e => addFirstCategory(e));
parentCategoryNameInput.addEventListener('keyup', e => {
  if( e.keyCode == 13 ) addFirstCategory(e);
});

// 카테고리 수정 초기화 / 제출
document.querySelector('#resetBtn').addEventListener('click', () => location.href = "/admin/category" );


// 요소 drag & drop 으로 이동
// https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5

(() => {
  // const $ = (select) => document.querySelectorAll(select);
  const draggables = document.querySelectorAll('.drag-item');
  const containers = document.querySelectorAll('.drag-container');
  
  draggables.forEach(el => {
      el.addEventListener('dragstart', () => {
          el.classList.add('dragging');
      });

      el.addEventListener('dragend', () => {
          el.classList.remove('dragging')
      });
  });

  function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')]
    
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect() //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
        const offset = y - box.top - box.height / 2 //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
        if (offset < 0 && offset > closest.offset) { // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
          return { offset: offset, element: child } // Element를 리턴
        } else {
          return closest
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element
  };

  containers.forEach(container => {
      container.addEventListener('dragover', e => {
          e.preventDefault()
          const afterElement = getDragAfterElement(container, e.clientY);
          const draggable = document.querySelector('.dragging')
          // container.appendChild(draggable)
          container.insertBefore(draggable, afterElement)
      })
  });
})();
