// 상품 삭제하기 버튼(개별)
const deleteBtns = document.querySelectorAll('.cart-item-choose > button');
for(let btn of deleteBtns) {
  btn.addEventListener('click', e => {
    if(!confirm("해당 상품을 정말로 삭제하시겠습니까?")) return;
    
    let data = [];
    data.push({
      "productNo": e.target.getAttribute('product'),
      "optionNo": e.target.getAttribute('option')
    });

    const dataStr = encodeURIComponent(JSON.stringify(data));

    fetch("/cart/delete?data=" + dataStr)
    .then(resp => resp.text())
    .then(result => {
      if(result > 0) {
        alert("해당 상품을 삭제하였습니다.")
        location.href = "/cart"
      } else {
        alert("삭제 실패");
      }
    }) 
    .catch(err => console.log(err));
  });
}

// 상품 전체 삭제
const clearCartBtn = document.getElementById('clearCartBtn');
clearCartBtn.addEventListener('click', e => {
  if(!confirm("해당 상품을 정말로 삭제하시겠습니까?")) return;
  
  let data = [];
  for(let btn of deleteBtns) {
      data.push({
      "productNo": btn.getAttribute('product'),
      "optionNo": btn.getAttribute('option')
    });
  }

  const dataStr = encodeURIComponent(JSON.stringify(data));

  fetch("/cart/delete?data=" + dataStr)
  .then(resp => resp.text())
  .then(result => {
    if(result > 0) {
      alert("장바구니를 비웠습니다.")
      location.href = "/"
    } else {
      alert("삭제 실패");
    }
  }) 
  .catch(err => console.log(err));
});

// 선택한 상품만 삭제
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const checkboxList = document.getElementsByClassName('checkbox-item');

deleteSelectedBtn.addEventListener('click', () => {
  
  let data = []; 
  for(let box of checkboxList) {
    if(box.checked == true) {
      data.push({
        // 그 박스의 부모의 버튼 찾기~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!
        "productNo": btn.getAttribute('product'),
        "optionNo": btn.getAttribute('option')
      });
    }
  }
});

