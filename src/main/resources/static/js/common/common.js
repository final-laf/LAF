// 금액 3자리마다 쉼표
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 쿠키 얻어오기
if(!window.getCookie) {
  function getCookie(key) {
    const cookies = document.cookie;
    const cookieList = cookies.split("; ").map(cookie => cookie.split("="));

    const obj = {};
    for (let i = 0; i < cookieList.length; i++) {
      obj[cookieList[i][0]] = cookieList[i][1];
    }

    return obj[key];
  }
}

// 전체선택 체크박스
// 상위 체크박스 id="checkboxSelectAll"
// 하위 체크박스 name="checkbox"
if(document.getElementById('checkboxSelectAll') != undefined) {
  const checkboxSelectAll = document.getElementById('checkboxSelectAll');
  checkboxSelectAll.addEventListener('click', e => {
    const checkboxList = document.querySelectorAll('[name="checkbox"]:not(:disabled)');
    
    if(e.target.checked == true) {
      for(let ch of checkboxList)
      if(ch.disabled == false ) ch.checked = true;
    } else {
      for(let ch of checkboxList)
      ch.checked = false;
    }
  });
}

// 장바구니 갯수 갱신
if(!window.updateCartCount2) {
  function updateCartCount2() {
    let cartCountCalc = 0;
    const cookieStr = getCookie('cart');
    if(cookieStr != null)
      cartCountCalc = cookieStr.split('@').length - 1;
    
    if(cartCountCalc > 0) {
      document.getElementById('cartCount').innerText = cartCountCalc;
      document.getElementById('cartCountContainer').classList.remove('hidden');
    } else {
      document.getElementById('cartCountContainer').classList.add('hidden');
    }
  }
}