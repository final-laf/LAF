// 주문 조회 날짜필터
const dateFilterBtn = document.querySelectorAll('[name="during"]');
const dateFilter = document.querySelectorAll('#dateFilter>input');

dateFilterBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
    const currentDate = new Date();
    const startDate = new Date();

    if (index === 0) startDate.setDate(currentDate.getDate());
    else if (index === 1)startDate.setDate(currentDate.getDate() - 7);
    else if (index === 2)startDate.setMonth(currentDate.getMonth() - 1);
    else if (index === 3) startDate.setMonth(currentDate.getMonth() - 3);
    else if (index === 4)  startDate.setMonth(currentDate.getMonth() - 6);
    
    dateFilter[0].value = formatDate(startDate);
    dateFilter[1].value = formatDate(currentDate);
    });
});

// "YYYY-MM-DD" 형식으로 변환
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



// 주문 조회
document.getElementById('orderSelectForm').addEventListener('click', () => {
    // 판매상태세팅
    const sellStateCheckeds = document.querySelectorAll('#sellStateChecked>input:checked')
    if(sellStateCheckeds.length > 0){
        const sellState = [];
        sellStateCheckeds.forEach( e => {
            sellState.push(e.value)
        })
        console.log(sellState)
        document.querySelector('[name="sellState"]').value = sellState;
    }
    // 결제방식세팅
    const payStateChecked = document.querySelectorAll('#payStateChecked>input:checked')
    if(payStateChecked.length > 0){
        const payState = [];
        payStateChecked.forEach( e => {
            payState.push(e.value)
        })
        document.querySelector('[name="payState"]').value = payState;
    }
});