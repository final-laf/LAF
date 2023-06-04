/* 이미지 hover효과 */
function imgHover(input) {
    const productDescriptions = document.querySelectorAll(`.${input}-hover`);
    const productImgs = document.querySelectorAll(`.${input}-img`);

    productImgs.forEach((productImg, index) => {
        productImg.addEventListener("mouseover", () => {
            if (productDescriptions[index] && productDescriptions[index].classList) {
                productDescriptions[index].classList.remove('hidden');
            }
        });

        productImg.addEventListener("mouseout", () => {
            if (productDescriptions[index] && productDescriptions[index].classList) {
                productDescriptions[index].classList.add('hidden');
            }
        });
    });
}

imgHover('md-recommend');
imgHover('weekly-big');
imgHover('weekly');

/* 슬라이드효과 */
function slide(input) {
    const prevBtn = document.querySelector(`.${input}-lbtn`);
    const nextBtn = document.querySelector(`.${input}-rbtn`);
    const list = document.querySelector(`.${input}-list`);
    const images = document.querySelectorAll(`.${input}-list li`);

    list.style.width = images.length * (images[0].clientWidth + 20) + 'px'

    let position = 0;
    const IMAGE_WIDTH = 240;

    prevBtn.addEventListener("click", () => {
        position += IMAGE_WIDTH
        list.style.transition = 'transform 1s';
        list.style.transform = `translateX(${position}px)`
    })
    nextBtn.addEventListener("click", () => {
        position -= IMAGE_WIDTH
        list.style.transition = 'transform 1s';
        list.style.transform = `translateX(${position}px)`
    })
}
slide('md-recommend');
slide('new');
slide('only');

