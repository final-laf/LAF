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