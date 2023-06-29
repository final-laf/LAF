/* 상품 수정 버튼 클릭 => 기존 데이터 불러오기 */
const modBtnList = document.querySelectorAll('.modify-product');
for(const btn of modBtnList) {
  btn.addEventListener('click', e => {
    
    document.querySelector('.product-modal-window').scrollTop = 0;

    const productNo = e.target.parentElement.parentElement.querySelector('.p-no').innerText;
    document.getElementById('productNoHiddenInput').value = productNo;
    fetch("/admin/product/mod?productNo=" + productNo)
    .then(resp => resp.json())
    .then(map => {
      
      const product = map.product;
      const imageList = map.productImageList;
      const categoryList = map.categoryList;
      const optionList = map.optionList;
      const index = {
        'file': 0,
        'img': 0,
        'name': 0
      };
      
      document.querySelector('#productName').value = product.productName; // 상품명
      document.querySelector('#thumbnailImagePreview').src = product.thumbnailPath; // 썸네일

      /* 카테고리 */
      for(const category of categoryList) {
        const pCategoryNo = category.parentCategoryNo;
        const pCateName = category.parentCategoryName;
        const cCategoryNo = category.categoryNo;
        const cCateName = category.categoryName;
        
        const span = document.createElement('span');
        const input = document.createElement('input');
        input.type = 'hidden';

        // 자식 카테고리가 있는 경우
        if(cCategoryNo > 0) {
          span.innerText = pCateName + " > " + cCateName;
          span.setAttribute("child", cCategoryNo);
          span.addEventListener('click', e => {
            const categoryNo = e.target.getAttribute("child");
            e.target.parentElement.querySelector('input[value="' + categoryNo + '"]').remove();
            e.target.remove();
          });          

          input.name = 'childCategory';
          input.value = cCategoryNo;

        // 자식 카테고리가 없는 경우
        } else {
          span.innerText = pCateName;
          span.setAttribute("parent", pCategoryNo);
          span.addEventListener('click', e => {
            const categoryNo = e.target.getAttribute("parent");
            e.target.parentElement.querySelector('input[value="' + categoryNo + '"]').remove();
            e.target.remove();
          });
          
          input.name = 'parentCategory';
          input.value = pCategoryNo;
        }

        selectedCategory.querySelector('.info').before(span, input);
      }
      
      /* 할인율 */
      const productSale = document.querySelector('.enroll-price [name="productSale"]');
      if(product.productSale != null && product.productSale > 0) {
        productSale.innerText = product.productSale;
      } else {
        productSale.innerText = 0;
      }
      document.querySelector('.enroll-price [name="productPrice"]').innerText = numberWithCommas(product.productPrice); // 판매가
      document.querySelector('.enroll-price [name="productSalePrice"]').innerText = numberWithCommas(product.productSalePrice); // 최종할인가
      document.querySelector('.enroll-point [name="productPoint"]').innerText = numberWithCommas(product.productPoint); // 포인트
      
      // document.querySelector('.enroll-price .checkbox').checked = false; // 최종할인가 자동계산 해제
      // document.querySelector('.enroll-point .checkbox').checked = false; // 포인트 자동계산 해제
      // document.querySelector('.enroll-price input[name="productPrice"]').value = numberWithCommas(product.productPrice); // 판매가
      // document.querySelector('.enroll-price input[name="productSalePrice"]').value = numberWithCommas(product.productSalePrice); // 최종할인가
      // document.querySelector('.enroll-point input[name="productPoint"]').value = numberWithCommas(product.productPoint); // 포인트

      /* 이미지 */
      for(const i of imageList) {

        /* 파일명 출력 */
        let td = document.querySelector('#detailImgNameTr > td');
        const noDetailImgInfo = document.getElementById('noDetailImgInfo');
        if(noDetailImgInfo != undefined) {
          noDetailImgInfo.remove();
          td = document.createElement('td');
          detailImgNameTr.append(td);
        }
        
        // 위로 버튼
        const btnUp = document.createElement('button');
        btnUp.className = 'up';
        btnUp.type = "button";
        btnUp.innerText = "▲";
        btnUp.addEventListener('click', e => {
          const btn = e.target;

          // 파일명 순서 변경
          const container = btn.parentElement;
          const prevSibling = container.previousElementSibling;
          const value = container.getAttribute('value');

          // 이동한 애 버튼 변경
          prevSibling.before(container);
          if(container.previousElementSibling == null) btn.disabled = true; // 이동했더니 첫 번째면 ▲버튼 비활성화
          btn.parentElement.querySelector('.down').disabled = false; // ▼버튼 비활성화 해제

          // 원래 위에 있던 애 버튼 변경
          const sibling = btn.parentElement.nextElementSibling;
          sibling.querySelector('.up').disabled = false; // 원래 위에있던 애 ▲버튼 활성화
          if(sibling.nextElementSibling == null)
            sibling.querySelector('.down').disabled = true; // 원래 위에있던 애가 마지막으로 갔으면 ▼ 버튼 비활성화

          // 이미지 순서 변경
          const img = document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]');
          const prevImg = img.previousElementSibling;
          prevImg.before(img);

          // file input 순서 변경
          reorderImgFileUp(value);
        });
        if(detailImgNameTr.querySelector('.detailImgNameContainer') == null) btnUp.disabled = true;

        // 아래로 버튼
        const btnDown = document.createElement('button');
        btnDown.className = 'down';
        btnDown.type = "button";
        btnDown.innerText = "▼";
        btnDown.addEventListener('click', e => {
          const btn = e.target;

          // 파일명 순서 변경
          const container = btn.parentElement;
          const nextSibling = container.nextElementSibling;
          const value = container.getAttribute('value');

          // 이동한 애 버튼 변경
          nextSibling.after(container);
          if(container.nextElementSibling == null) btn.disabled = true;
          btn.parentElement.querySelector('.up').disabled = false;

          // 원래 밑에 있던 애 버튼 변경
          const sibling = btn.parentElement.previousElementSibling;
          sibling.querySelector('.down').disabled = false; // 원래 밑에 있던 애 ▼버튼 활성화
          if(sibling.previousElementSibling == null)
            sibling.querySelector('.up').disabled = true; // 원래 위에있던 애가 처음으로 갔으면 ▲버튼 비활성화

          // 이미지 순서 변경
          const img = document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]');
          const nextImg = img.nextElementSibling;
          nextImg.after(img);

          // file input 순서 변경
          reorderImgFileDown(value);
        });
        btnDown.disabled = true;
        if(detailImgNameTr.querySelector('.detailImgNameContainer') != null) // 원래 마지막이었던 요소 ▼ 버튼 활성화
          detailImgNameTr.querySelector('td').lastChild.querySelector('.down').disabled = false;

        const span = document.createElement('span');
        span.innerText = i.imgPath.split('/')[3];
        span.value = i.imgOrder;
        
        // 삭제버튼
        const btnRm = document.createElement('button');
        btnRm.type = 'button';
        btnRm.innerHTML = '&times;';
        btnRm.addEventListener('click', e => {
          const value = e.target.parentElement.getAttribute('value');
          e.target.parentElement.remove();
          document.querySelector('#detailImgTr .detailImgContainer[value="' + value + '"]').remove();
          deleteImgFile(value);
          
          // 이미지 삭제 후 순서 변경에 따른 버튼 비활성화 추가 설정
          const imgNameList = detailImgNameTr.querySelectorAll('.detailImgNameContainer');
            if(imgNameList.length > 0) {
              imgNameList[0].querySelector('.up').disabled = true;
              imgNameList[imgNameList.length - 1].querySelector('.down').disabled = true;
            }

          // 남은 요소가 하나도 없을 경우
          if(detailImgNameTr.querySelector('td > div') == null) {
            detailImgNameTr.innerHTML = '<td id="noDetailImgInfo">업로드한 이미지가 없습니다</td>';
            detailImgTd.remove();
          }
        });
        
        const nameContainer = document.createElement('div');
        nameContainer.className = "detailImgNameContainer";
        nameContainer.setAttribute('value', index.name++);
        nameContainer.setAttribute('imgNo', i.imgNo);
        nameContainer.append(btnUp, btnDown, span, btnRm);
        td.append(nameContainer);

        /* 이미지 출력 */
        const img = document.createElement('img');
        img.src = i.imgPath;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rmImgBtn';
        btn.innerHTML = '&times';
        btn.addEventListener('click', e => {
          const value = e.target.parentElement.getAttribute('value');
          e.target.parentElement.remove();
          document.querySelector('#detailImgNameTr .detailImgNameContainer[value="' + value + '"]').remove();
          deleteImgFile(value);

          // 이미지 삭제 후 순서 변경에 따른 버튼 비활성화 추가 설정
          const imgNameList = detailImgNameTr.querySelectorAll('.detailImgNameContainer');
          if(imgNameList.length > 0) {
            imgNameList[0].querySelector('.up').disabled = true;
            imgNameList[imgNameList.length - 1].querySelector('.down').disabled = true;
          }

          // 남은 요소가 하나도 없을 경우
          if(detailImgNameTr.querySelector('td > div') == null) {
            detailImgNameTr.innerHTML = '<td id="noDetailImgInfo">업로드한 이미지가 없습니다</td>';
            detailImgTd.remove();
          }
        });

        const imgContainer = document.createElement('div');
        imgContainer.className = 'detailImgContainer';
        imgContainer.append(img, btn);
        imgContainer.setAttribute('value', index.img++);
        imgContainer.setAttribute('imgNo', i.imgNo);

        if(detailImgTr.querySelector('td') == null) {
          detailImgTd = document.createElement('td');
          detailImgTr.append(detailImgTd);
        }
        detailImgTd.append(imgContainer);
      }

      /* 옵션 */
    
      // 원사이즈 체크여부 확인
      document.getElementById('oneSizeCheckbox').checked = false;
      if(optionList[0].size == null || optionList[0].size.trim().length == 0) {
        document.getElementById('oneSizeCheckbox').checked = true;
      }
      for(const option of optionList) {

        const input1 = document.createElement('input');
        input1.type = 'checkbox';
        input1.classList.add('option-checkbox');
        input1.classList.add('registered');
        const td1 = document.createElement('td');
        td1.append(input1);

        const input2 = document.createElement('input');
        input2.name = 'size';
        input2.type = 'hidden';
        input2.value = option.size;
        input2.disabled = true;

        const span2 = document.createElement('span');
        span2.innerText = option.size;
        const td2 = document.createElement('td');
        td2.append(span2, input2);

        const input3 = document.createElement('input');
        input3.name = 'color';
        input3.type = 'hidden';
        input3.value = option.color;
        input3.disabled = true;

        const span3 = document.createElement('span');
        span3.innerText = option.color;
        const td3 = document.createElement('td');
        td3.append(span3, input3);
        
        const input4 = document.createElement('input');
        input4.name = 'stock';
        input4.type = 'text';
        input4.value = option.stock;
        input4.required = true;
        const td4 = document.createElement('td');
        td4.append(input4);

        const checkbox = document.createElement('input');
        checkbox.classList.add('hidden-fl');
        checkbox.type = 'checkbox';
        checkbox.checked = (option.hiddenFl == 'Y');
        checkbox.addEventListener('click', e => {
          if(e.target.checked) {
            e.target.nextElementSibling.value = 'Y';
          } else {
            e.target.nextElementSibling.value = 'N';
          }
        });
        
        const checkboxInput = document.createElement('input');
        checkboxInput.name = 'hiddenFl';
        checkboxInput.type = 'hidden';
        checkboxInput.value = option.hiddenFl;
        
        const td5 = document.createElement('td');
        td5.append(checkbox, checkboxInput);

        const optionNoInput = document.createElement('input');
        optionNoInput.name = 'optionNo';
        optionNoInput.type = 'hidden';
        optionNoInput.value = option.optionNo;

        const tr = document.createElement('tr');
        tr.append(optionNoInput, td1, td2, td3, td4, td5);
        optionTable.append(tr);
      }

    });
  });
}

///////////////////////////////////////// U P D A T E ////////////////////////////////////////////
document.getElementById('productUpdateFrm').addEventListener('submit', e => {
  e.preventDefault();

  // 상품명 입력 확인
  if(document.getElementById('productName').value.trim().length == 0) {
    alert("상품명을 입력해주세요");
    document.getElementById('productName').focus();
    return;
  }

  // 카테고리 선택 확인
  if(document.querySelectorAll('#selectedCategory span:not(.info)').length == 0) {
    alert("카테고리는 반드시 하나 이상 선택해야 합니다");
    return;
  }

  // 썸네일 이미지 업로드 확인
  if(document.getElementById('thumbnailImagePreview').src.indexOf('/images/common/no-image.png') != -1) {
    alert("썸네일 이미지를 업로드해주세요");
    return;
  }

  document.getElementById('queryStringHiddenInput').value = location.search; // 현재 검색 결과 유지
  e.target.submit();
});