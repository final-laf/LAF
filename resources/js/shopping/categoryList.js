// 베스트 아이템 마우스오버 시 정보 출력
const bestItemImages = document.querySelectorAll('.categoryList-best-item img');
const itemDescriptions = document.getElementsByClassName('item-description');
for(let i=0; i<bestItemImages.length; i++) {
    bestItemImages[i].addEventListener('mouseover', e => {
        itemDescriptions[i].classList.remove('hidden');
    });
    bestItemImages[i].addEventListener('mouseout', e => {
        itemDescriptions[i].classList.add('hidden');
    });
}

// 좋아요 이모티콘 클릭 시 이미지 변경
const likeImages = document.querySelectorAll('img.like');
for(let like of likeImages) {
    like.addEventListener('click', () => {
        if( like.getAttribute('src').includes('fill') )
            like.setAttribute('src', '/resources/image/common/like-white.svg');
        else
            like.setAttribute('src', '/resources/image/common/like-fill.svg');
    });
}