const categoryList = document.querySelectorAll('li.category-item *');
for(const c of categoryList) {
  c.addEventListener('click', e => {
    e.stopPropagation();

    let el = e.target;
    while(true) {
      if( el.getAttribute("pcno") != null ) break;
      el = el.parentElement;
    }

    // const pcno = el.getAttribute("pcno");
    const before = document.querySelector('.select-edit');
    if( before != null )
    before.classList.remove('select-edit');
    el.classList.add('select-edit');
    
    // 카테고리 수정 탭 변경
    const parentCategoryContainer = document.querySelector('.parent-category-container');
    const childCategoryContainer = document.querySelector('.child-category-container');

    // 부모 카테고리
    parentCategoryContainer.innerHTML = '';
    
    const span = document.createElement('span');
    span.innerHTML = '&times;';

    const p = document.createElement('p');
    p.innerHTML = el.querySelector('.category-first .category-name').innerText;
    p.append(span);

    parentCategoryContainer.append(p);

    // 자식 카테고리
    childCategoryContainer.innerHTML = '';
    const ccNameList = el.querySelectorAll('.category-second .category-name');

    for(let i=0; i<ccNameList.length; i++) {
      const span2 = document.createElement('span');
      span2.innerHTML = '&times;';
  
      const p2 = document.createElement('p');
      p2.innerHTML = ccNameList[i].innerText;
      p2.append(span2);
  
      childCategoryContainer.append(p2);
    }
  });
}