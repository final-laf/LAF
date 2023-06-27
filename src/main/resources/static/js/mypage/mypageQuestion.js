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
		document.getElementById("questionWrite").style.display="inline-block"
		document.getElementById("questionWrite").disabled = false;
		document.getElementById("questionAnswer").style.display="none"
		document.getElementById("questionAnswer").disabled = true;
		document.getElementById("questionCategory").style.display="none"
		document.getElementById("questionCategory").disabled = true;
	}
	if(category=="answer"){
		document.getElementById("questionAnswer").style.display="inline-block"
		document.getElementById("questionAnswer").disabled = false;
		document.getElementById("questionWrite").style.display="none"
		document.getElementById("questionWrite").disabled = true;
		document.getElementById("questionCategory").style.display="none"
		document.getElementById("questionCategory").disabled = true;
	}
	if(category=="question"){
		document.getElementById("questionCategory").style.display="inline-block"
		document.getElementById("questionCategory").disabled = false;
		document.getElementById("questionAnswer").style.display="none"
		document.getElementById("questionWrite").disabled = true;
		document.getElementById("questionWrite").style.display="none"
		document.getElementById("questionAnswer").disabled = true;
	}
}
// 폼 제출 전 수정사항
questionWrite = document.getElementById("questionWrite").
questionAnswer = document.getElementById("questionAnswer")
questionCategory = document.getElementById("questionCategory")

document.getElementById("myPageQuestionSubmit").addEventListener("submit", e=>{
	alert("asd")
})
function changeCategory(){
	if(document.getElementById("qnaCategoryList").value=="write"){
		document.getElementById("questionAnswer").disabled = true;
		document.getElementById("questionCategory").disabled = true;
	}
	if(document.getElementById("qnaCategoryList").value=="answer"){
		document.getElementById("questionWrite").disabled = true;
		document.getElementById("questionCategory").disabled = true;
	}
	if(document.getElementById("qnaCategoryList").value=="question"){
		document.getElementById("questionWrite").disabled = true;
		document.getElementById("questionAnswer").disabled = true;
	}
}