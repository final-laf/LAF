const categoryList = document.querySelectorAll('li.category-item *');
for(const c of categoryList) {
  c.addEventListener('click', e => {
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
    
    e.stopPropagation();
  });
}