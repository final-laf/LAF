// includes header, footer
(() => {
    const includes = document.getElementsByClassName('link');

    for(let i of includes) {
        const file = i.getAttribute("data-include");

        if (file) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {i.innerHTML = this.responseText;}
                    if (this.status == 404) {i.innerHTML = "Page not found.";}
                    i.removeAttribute("data-include");
                }
            }

            xhttp.open("GET", file, true);
            xhttp.send();
        }
    }
})();

// 좋아요(♡) 클릭 시 이미지 변경
const likeImages = document.querySelectorAll('img.like');
for(let like of likeImages) {
    like.addEventListener('click', () => {
        if( like.getAttribute('src').includes('fill') )
            like.setAttribute('src', '/resources/images/common/like-grey.svg');
        else
            like.setAttribute('src', '/resources/images/common/like-fill.svg');
    });
}