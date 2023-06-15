// 한페이지에서 같은함수를 써서 매개변수를 넣어서 검색된 값을 넣어줄 곳을 구분함
function sample6_execDaumPostcode(target) {
  new daum.Postcode({
    oncomplete: function(data) {
       // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수

      if (data.userSelectedType === 'R') {// 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
      }

      if (target === 'order') {
        document.getElementById('order_postcode').value = data.zonecode;
        document.getElementById("order_address").value = addr;
        document.getElementById("order_detailAddress").focus();
      } else if (target === 'recv') {
        document.getElementById('recv_postcode').value = data.zonecode;
        document.getElementById("recv_address").value = addr;
        document.getElementById("recv_detailAddress").focus();
      } else if (target === 'sample6') {
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById("sample6_address").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("sample6_detailAddress").focus();
      }
    }
  }).open();
}
