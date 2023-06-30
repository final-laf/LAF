// 삭제된 이미지 정보 저장
const deleteSet = new Set();

const uploadBtnList = document.querySelectorAll('.upload-btn');
for(const btn of uploadBtnList) {
  btn.addEventListener('click', e => {
    const li = e.target.parentElement.parentElement.parentElement;
    const input = li.querySelector('.input-img');
    input.click();
  });
}

const deleteBtnList = document.querySelectorAll('.delete-btn');
for(const btn of deleteBtnList) {
  btn.addEventListener('click', e => {
    const li = e.target.parentElement.parentElement.parentElement;
    const input = li.querySelector('.input-img');
    const imgPreview = input.previousElementSibling;
    imgPreview.setAttribute("src", "/images/common/no-banner-image.png");
    deleteSet.add(bannerNo);
    input.value = '';
  });
}

const ImageInputList = document.querySelectorAll('.input-img');
for(const input of ImageInputList) {
  input.addEventListener('change', e => {
    const imgPreview = e.target.previousElementSibling;
    const file = e.target.files[0]; // 선택된 파일의 데이터
    if(file != undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = e => { 
        imgPreview.setAttribute("src", e.target.result);
      };
    }
  });
}

const addBannerBtn = document.querySelector('.main-control-add button');
addBannerBtn.addEventListener('click', e => {

  const bannerFrm = document.getElementById('bannerFrm');

  const lastIndex = bannerFrm.querySelector('li:last-child').getAttribute('bannerNo');
  const title = document.createElement('div');
  title.classList.add('main-control-subtitle');
  title.innerText = "메인 이미지 " + (lastIndex + 1);

  const uploadBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  uploadBtn.classList.add('upload-btn');
  deleteBtn.classList.add('delete-btn');
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('main-control-btn');
  btnContainer.append(uploadBtn, deleteBtn);

  const imageController = document.createElement('div');
  imageController.classList.add('image-controller');
  imageController.append(title, btnContainer);

  const img = document.createElement('img');
  img.src = "/images/common/no-banner-image.png";

  const input = document.createElement('input');
  input.classList.add('hidden');




  const li = document.createElement('li');
});