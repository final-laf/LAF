// 카테고리 누를 시
function categoryChange(category){
    const href = (location.href).split('/');
    console.log(href);
    fetch("/my/qna/category?category="+category)  // 지정된 주소로 GET방식 비동기 요청(ajax)
    // 전달하고자 하는 파라미터를 주소 뒤 쿼리스트링으로 추가
    .then(response => response.text()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    .then(qna => { 
       console.log(qna)
     }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    .catch (e => { console.log(e)}); // 예외 발생 시 처리할 내용을 작성
    // b.forEach(element => {
    //     console.log(element);
    //     element.innerText = i;
    // });
}
// 검색버튼 누를 시 검색어와 타입 합쳐서 주소요청
document.getElementById("QuestionContent").addEventListener("click", () => {
    const type = document.getElementById("QuestionSearchType").value;
    const content = document.getElementById("QuestionSearchcontent").value;
    if(content!=null){
        const search = type+"-"+content;
        alert(location.href)
        location.href = "http://localhost/my/qna/"+search;
    }
})