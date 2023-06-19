// 베스트 아이템 마우스오버 시 정보 출력
const bestItemImages = document.querySelectorAll('.categoryList-best-item img');
const itemDescriptions = document.getElementsByClassName('item-description');
for (let i = 0; i < bestItemImages.length; i++) {
  bestItemImages[i].addEventListener('mouseover', e => {
    itemDescriptions[i].classList.remove('hidden');
  });
  bestItemImages[i].addEventListener('mouseout', e => {
    itemDescriptions[i].classList.add('hidden');
  });
}

// 좋아요(♡) 클릭 시 이미지 변경 + 찜 목록에 추가
const likeImages = document.querySelectorAll('img.like');
for (let like of likeImages) {
  like.addEventListener('click', e => {

    // 비회원인 경우 로그인 화면으로 이동 유도
    if (loginMember == undefined) {
      if (confirm('찜하기는 회원만 사용 가능합니다. 로그인 하시겠습니까?'))
        location.href = "/login";
      return;
    }

    // 찜 목록 추가
    const productNo = e.target.parentElement.getAttribute('productNo');
    if (like.getAttribute('value') != 'like') {
      fetch("/like/add?productNo=" + productNo)
      .then(resp => resp.text())
      .then(result => {
        if (result > 0) {
          like.setAttribute('src', '/images/common/like-fill.svg');
          like.setAttribute('value', 'like');
        } else {
          alert("찜 목록 추가 실패");
        }
      })
      .catch(err => console.log(err));

    // 찜 목록 삭제
    } else {
      fetch("/like/delete?productNo=" + productNo)
      .then(resp => resp.text())
      .then(result => {
        if(result > 0) {
          like.setAttribute('src', '/images/common/like-grey.svg');
          like.removeAttribute('value');
        } else {
          alert("찜 목록 삭제 실패");
        }
      }) 
      .catch(err => console.log(err));
    }
  });
}