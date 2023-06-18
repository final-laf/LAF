// 내 1:1문의에서 qna 선택
const perQna = document.getElementsByClassName("mypageQuestion-Question-list");
// qna list에서 삭제
if (perQna!=null) {
  for(let qna of perQna) {
    /* 내 1:1 문의 클릭시 */
    qna.addEventListener('click', e => {
        const qnaNo = e.target.parentElement.getAttribute("value");
        document.location.href="/qna/detail/" + qnaNo
    });
  };
}

// 카테고리 누를 시
function categoryChange(category){
    if(category=="write"){
        document.getElementById("mypageQuestionRecent").style.display="block"
        document.getElementById("mypageQuestionAnswered").style.display="none"
    }
    if(category=="answer"){
        document.getElementById("mypageQuestionAnswered").style.display="block"
        document.getElementById("mypageQuestionRecent").style.display="none"
    }
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

