/* 이메일 미리보기 모달 */
const modal = document.getElementById("modal")
const submit = document.getElementById("emailPreview")

/* 이메일 미리보기 버튼 클릭 시 */
submit.addEventListener("click", e => {
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";

    // 제목 대입
    const updateTitle = document.getElementsByClassName("dashboard-update-input")[0];
    const modalTitle = document.getElementsByClassName("modal-content-title")[0];
    modalTitle.innerHTML = updateTitle.value;


    // 써머노트 컨텐츠 대입
    const summernote = $('#summernote');
    const previewContent = document.getElementById('summernotePreview');
    previewContent.innerHTML = summernote.summernote('code');

    

})



/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
})


/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
        modal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
})

/* 이메일 미리보기 모달창 내부 닫기 버튼 */
const modalClose = document.getElementById("modalClose");
modalClose.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.removeProperty('overflow');
});
