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