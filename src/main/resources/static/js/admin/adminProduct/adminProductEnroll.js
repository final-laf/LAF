/* 입력값 유효성 검사 */
const enrollForm = document.getElementById('enrollForm');
enrollForm.addEventListener('submit', e => {
  e.preventDefault();

  // 상품명 입력 확인
  if(document.getElementById('productName').value.trim().length == 0) {
    alert("상품명을 입력해주세요");
    document.getElementById('productName').focus();
    return;
  }

  // 카테고리 선택 확인
  if(document.querySelectorAll('#selectedCategory span:not(.info)').length == 0) {
    alert("카테고리는 반드시 하나 이상 선택해야 합니다");
    return;
  }

  // 썸네일 이미지 업로드 확인
  if(thumbnailInput.value.trim().length == 0) {
    alert("썸네일 이미지를 업로드해주세요");
    return;
  }

  e.target.submit();
});

// 재고 입력 유효성 검사
document.querySelector('.enroll-middle-table input[name="stock"]').addEventListener('input', e => {
  // 숫자와 ,만 입력 가능
  const regEx = /[0-9,]*/g;
  e.target.value = regEx.exec(e.target.value);
  e.target.value = numberWithCommas(e.target.value.replaceAll(",",""));
});