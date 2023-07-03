// 삭제된 이미지 정보 저장
const deleteSet = new Set();

// 이미지 추가
const imgUploadFn = e => {
  const li = e.target.parentElement.parentElement.parentElement;
  const input = li.querySelector('.input-img');
  if(li.getAttribute('bannerNo') != null)
    deleteSet.add(li.getAttribute('bannerNo'));
  input.click();
};

// 이미지 삭제
const imgDeleteFn = e => {
  if(!confirm('배너를 삭제하시겠습니까?')) return;

  const li = e.target.parentElement.parentElement.parentElement;
  const input = li.querySelector('.input-img');
  const imgPreview = input.previousElementSibling;
  imgPreview.setAttribute("src", "/images/common/no-banner-image.png");
  if(li.getAttribute('bannerNo') != null )
    deleteSet.add(li.getAttribute('bannerNo'));
  input.value = '';
};

// 파일 input 변경 시 미리보기 변경
const imgPreviewFn = e => {
  const imgPreview = e.target.previousElementSibling;
  const file = e.target.files[0]; // 선택된 파일의 데이터
  if(file != undefined) {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = e => { 
      imgPreview.setAttribute("src", e.target.result);
    };
  }
};

const uploadBtnList = document.querySelectorAll('.upload-btn');
for(const btn of uploadBtnList) {
  btn.addEventListener('click', e => imgUploadFn(e));
}

const deleteBtnList = document.querySelectorAll('.delete-btn');
for(const btn of deleteBtnList) {
  btn.addEventListener('click', e => imgDeleteFn(e));
}

const ImageInputList = document.querySelectorAll('.input-img');
for(const input of ImageInputList) {
  input.addEventListener('change', e => imgPreviewFn(e));
}

const addBannerBtn = document.querySelector('.main-control-add button');
addBannerBtn.addEventListener('click', e => {

  const title = document.createElement('div');
  title.classList.add('main-control-subtitle');
  title.innerText = "신규 이미지";

  const uploadBtn = document.createElement('button');
  uploadBtn.classList.add('upload-btn');
  uploadBtn.type = 'button';
  uploadBtn.innerText = '업로드';
  uploadBtn.addEventListener('click', e => imgUploadFn(e));

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.type = 'button';
  deleteBtn.innerText = '삭제';
  deleteBtn.addEventListener('click', e => imgDeleteFn(e));
  
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
  input.classList.add('input-img');
  input.type = 'file';
  input.name = 'banner';
  input.addEventListener('change', e => imgPreviewFn(e));
  
  const previewContainer = document.createElement('div');
  previewContainer.classList.add('main-thumbnail');
  previewContainer.append(img, input);

  const li = document.createElement('li');
  li.append(imageController, previewContainer);

  const bannerFrm = document.getElementById('bannerFrm');
  const ul = bannerFrm.querySelector('ul');
  ul.append(li);
});

const bannerFrm = document.getElementById('bannerFrm');
bannerFrm.addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('[name="removedImages"]').value = Array.from(deleteSet);
  e.target.submit();
});