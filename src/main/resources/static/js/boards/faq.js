const faqcontents = document.querySelectorAll('.faq-content li');

// 아코디언 메뉴
faqcontents.forEach((faqitem) => {
  const title = faqitem.querySelector('.faq-item-title');
  const content = faqitem.querySelector('.faq-item-content');

  title.addEventListener('click', () => {
    content.classList.toggle('hidden');
  });
});

const categoryList = document.getElementsByClassName("sub-sub-category")
// 카테고리 변경 시
for(let category of categoryList){
  category.addEventListener("click", e=>{
    switch (e.target.innerText) {
      case "모두보기":
        for (let i = 0; i < 5; i++) {
          document.getElementsByClassName("sub-sub-category")[i].classList.remove("current")
          document.getElementsByClassName("choose-category")[i].style.display="none";
        }
        document.getElementsByClassName("sub-sub-category")[0].classList.add("current")
        document.getElementsByClassName("choose-category")[0].style.display="block";
        for(let i of document.getElementsByClassName("faq-item-content")){
          i.classList.add('hidden');
        }
        break;
      case "상품관련":
        for (let i = 0; i < 5; i++) {
          document.getElementsByClassName("sub-sub-category")[i].classList.remove("current")
          document.getElementsByClassName("choose-category")[i].style.display="none";
        }
        document.getElementsByClassName("sub-sub-category")[1].classList.add("current")
        document.getElementsByClassName("choose-category")[1].style.display="block";
        for(let i of document.getElementsByClassName("faq-item-content")){
          i.classList.add('hidden');
        }
        break;
      case "배송관련":
        for (let i = 0; i < 5; i++) {
          document.getElementsByClassName("sub-sub-category")[i].classList.remove("current")
          document.getElementsByClassName("choose-category")[i].style.display="none";
        }
        document.getElementsByClassName("sub-sub-category")[2].classList.add("current")
        document.getElementsByClassName("choose-category")[2].style.display="block";
        for(let i of document.getElementsByClassName("faq-item-content")){
          i.classList.add('hidden');
        }
        break;
      case "교환/반품관련":
        for (let i = 0; i < 5; i++) {
          document.getElementsByClassName("sub-sub-category")[i].classList.remove("current")
          document.getElementsByClassName("choose-category")[i].style.display="none";
        }
        document.getElementsByClassName("sub-sub-category")[3].classList.add("current")
        document.getElementsByClassName("choose-category")[3].style.display="block";
        for(let i of document.getElementsByClassName("faq-item-content")){
          i.classList.add('hidden');
        }
        break;
      case "기타관련":
        for (let i = 0; i < 5; i++) {
          document.getElementsByClassName("sub-sub-category")[i].classList.remove("current")
          document.getElementsByClassName("choose-category")[i].style.display="none";
        }
        document.getElementsByClassName("sub-sub-category")[4].classList.add("current")
        document.getElementsByClassName("choose-category")[4].style.display="block";
        for(let i of document.getElementsByClassName("faq-item-content")){
          i.classList.add('hidden');
        }
        break;
    
      default:
        break;
    }
    
  })
}