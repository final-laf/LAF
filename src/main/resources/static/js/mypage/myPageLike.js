// 상품 삭제하기 버튼(개별)
const deleteBtns = document.querySelectorAll('.item-choose > button');
for(let btn of deleteBtns) {
  btn.addEventListener('click', e => {
    if(!confirm("해당 상품을 정말로 삭제하시겠습니까?")) return;
    
    const tr = e.target.parentElement.parentElement;
    const productNo = tr.getAttribute("pno");
    
    fetch("/like/delete?productNo=" + productNo)
    .then(resp => resp.text())
    .then(result => {
      if(result > 0) {
        tr.remove();

        // 남은 상품이 하나도 없을 경우 비어있는 행 추가
        const table = document.querySelector('#likeList > table');
        if(table.querySelector('.data-tr') == null) {
          const td = document.createElement('td');
          td.classList.add('item-empty');
          td.colspan = 5;
          td.innerText = '찜 목록이 비어 있습니다.';
          const tr = document.createElement('tr');
          tr.append(td);
          table.append(tr);
        }

        // 스크롤 맨 위로 이동
        window.scrollTo(0, 0);
        alert('삭제되었습니다.');
      } else {
        alert("삭제 실패");
      }
    })
    .catch(err => console.log(err));
  });
}


// 선택한 상품만 삭제
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
deleteSelectedBtn.addEventListener('click', () => {
  
  let data = '';
  const rowList = document.querySelectorAll('.data-tr');
  for(let i=0; i<rowList.length; i++) {
    if(rowList[i].querySelector('[name="checkbox"]').checked == true) {
      data += rowList[i].getAttribute("pno") + '-';
    }
  }

  if(data.length == 0) {
    alert('선택한 상품이 없습니다.');
    return;
  }

  if(!confirm("해당 상품을 정말로 삭제하시겠습니까?")) return;
  
  fetch("/like/delete/selected?data=" + data)
  .then(resp => resp.text())
  .then(result => {
    if(result > 0) {

      // 삭제한 행 제거
      const rowList = document.querySelectorAll('.data-tr');
      for(let el of rowList) {
        if(el.querySelector('[name="checkbox"]').checked == true) {
          el.remove();
        }
      }

      // 장바구니에 남은 상품이 하나도 없을 경우 비어있는 행 추가
      const table = document.querySelector('#likeList > table');
      if(table.querySelector('.data-tr') == null && document.querySelectorAll('.pagination > li').length == 5) {
        const td = document.createElement('td');
        td.classList.add('item-empty');
        td.colspan = 5;
        td.innerText = '찜 목록이 비어 있습니다.';
        const tr = document.createElement('tr');
        tr.append(td);
        table.append(tr);
      } else if(table.querySelector('.data-tr') == null && document.querySelectorAll('.pagination > li').length > 5) {
        location.href = "/myPage/like";
      }

      // 스크롤 맨 위로 이동
      window.scrollTo(0, 0);
      alert("선택하신 상품을 삭제했습니다.")
    } else {
      alert("삭제 실패");
    }
  })
  .catch(err => console.log(err));
});