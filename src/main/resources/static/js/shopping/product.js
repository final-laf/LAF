// 좋아요(♡) 클릭 시 이미지 변경
const likeImages = document.querySelectorAll('img.like');
for(let like of likeImages) {
    like.addEventListener('click', () => {
        if( like.getAttribute('src').includes('fill') )
            like.setAttribute('src', '/images/common/like-grey.svg');
        else
            like.setAttribute('src', '/images/common/like-fill.svg');
    });
}