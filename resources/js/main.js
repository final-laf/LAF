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
