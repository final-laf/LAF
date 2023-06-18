// 금액 3자리마다 쉼표
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 쿠키 얻어오기
function getCookie(key) {
  const cookies = document.cookie;
  const cookieList = cookies.split("; ").map(cookie => cookie.split("="));

  const obj = {};
  for (let i = 0; i < cookieList.length; i++) {
    obj[cookieList[i][0]] = cookieList[i][1];
  }

  return obj[key];
}