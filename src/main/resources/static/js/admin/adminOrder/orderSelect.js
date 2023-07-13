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

// 주문 상품정보 주문처리상태 세팅
const preOrderStates = document.querySelectorAll(".orderState");

for(let preOrderState of preOrderStates){
    let orderState = "";
    switch (preOrderState.innerText){
        case "A" : orderState = "주문접수"; break;
        case "B" : orderState = "결제확인"; break;
        case "C" : orderState = "상품준비"; break;
        case "D" : orderState = "출고완료"; break;
        case "E" : orderState = "배송중"; break;
        case "F" : orderState = "배송완료"; break;
        case "G" : orderState = "취소중"; break;
        case "H" : orderState = "취소완료"; break;
        case "I" : orderState = "교환중"; break;
        case "J" : orderState = "교환완료"; break;
        case "K" : orderState = "반품중"; break;
        case "L" : orderState = "반품완료"; break;
    }
    preOrderState.innerText = orderState;
}

/* 주문 상세 모달 */
const orderModal = document.getElementById("orderModalOverlay")
const selectedOrders = document.getElementsByClassName("order-modal-row")

for(let x = 0; x< selectedOrders.length; x++) {
    /* 주문 목록에서 한 주문 클릭시 */

    selectedOrders[x].addEventListener('click', () => {
        let i = orderMaps[x];
        orderModal.style.display = "flex";
        document.body.style.overflowY = "hidden";

        document.getElementById('modalOrderNo').value = i.order.orderNo
        document.getElementById('modalOrderUno').innerText = i.order.orderUno
        document.getElementById('modalOrderDate').innerText = i.order.orderDate
        document.getElementById('modalOrderState').innerText = orderState(i.order.orderState)
        document.getElementById('modalTotalPrice').innerText = i.order.orderTotalPrice.toLocaleString() + '원'
        document.getElementById('modalPayment').innerText = i.order.orderPayment.toLocaleString() + '원'
        document.getElementById('modalPaymentMethod').innerText = i.order.payment
        
        const table = document.querySelector('.orderDetail-order-info');
        table.innerHTML = table.rows[0].outerHTML;
        for(let j of i.odpList){
            // tr생성
            const odpTr = document.createElement("tr");
            // 첫 번째 td 요소 생성
            const imageCell = document.createElement("td");
            const image = document.createElement("img");
            image.setAttribute("width", "70px");
            image.setAttribute("src", j.product.thumbnailPath);
            imageCell.appendChild(image);
            odpTr.appendChild(imageCell);
            // 두 번째 td 요소 생성
            const productNameCell = document.createElement("td");
            const productName = document.createElement("div");
            productName.innerText = j.product.productName
            const productOption = document.createElement("div")
            if(j.option.size != null){
                productOption.innerText = '[ 옵션 : ' + j.option.color + ' ' + j.option.size + ' ]'
            }else{
                productOption.innerText = '[ 옵션 : ' + j.option.color +' ]'
            }
            productNameCell.append(productName);
            productNameCell.append(productOption);
            odpTr.appendChild(productNameCell);
            // 세 번째 td 요소 생성
            const quantityCell = document.createElement("td");
            const quantityText = document.createTextNode(j.count);
            quantityCell.appendChild(quantityText);
            odpTr.appendChild(quantityCell);
            // 네 번째 td 요소 생성
            const priceCell = document.createElement("td");
            const priceText = document.createTextNode(j.product.productSalePrice.toLocaleString() + '원');
            priceCell.appendChild(priceText);
            odpTr.appendChild(priceCell);
            // 생성된 tr 요소를 원하는 위치에 추가
            const table = document.querySelector('.orderDetail-order-info>tbody'); 
            table.append(odpTr);
        }
        
        document.getElementById('modalOrderRecvName').innerText = i.order.orderRecvName
        document.getElementById('modalOrderRecvPhone').innerText = i.order.orderRecvPhone
        const arr = i.order.orderRecvAdd;
        document.getElementById('modalAdd').innerText = arr;

        if(i.order.orderRecvRequire != null){
            document.getElementById('modalOrderRecvRequire').innerText = i.order.orderRecvRequire
        }

    }); 
};

/* 모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기 */
orderModal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("order-modal-overlay")) {
        orderModal.style.display = "none";
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기 */
window.addEventListener("keyup", e => {
    if(orderModal.style.display === "flex" && e.key === "Escape") {
        orderModal.style.display = "none"
        document.body.style.removeProperty('overflow');
    }
});

/* 모달창 내부 닫기 버튼 */
const orderModalClose = document.getElementsByClassName("order-modal-close")[0];
orderModalClose.addEventListener("click", e => {
    orderModal.style.display = "none";
    document.body.style.removeProperty('overflow');
});


function orderState(input){
    let orderState = "";
    switch (input){
        case "A" : orderState = "주문접수"; break;
        case "B" : orderState = "결제확인"; break;
        case "C" : orderState = "상품준비"; break;
        case "D" : orderState = "출고완료"; break;
        case "E" : orderState = "배송중"; break;
        case "F" : orderState = "배송완료"; break;
        case "G" : orderState = "취소중"; break;
        case "H" : orderState = "취소완료"; break;
        case "I" : orderState = "교환중"; break;
        case "J" : orderState = "교환완료"; break;
        case "K" : orderState = "반품중"; break;
        case "L" : orderState = "반품완료"; break;
    }
    return orderState;
}

document.querySelectorAll('[id="checkedSelect"]').forEach( e => {

    e.addEventListener('click', e => {
        e.stopPropagation();
    })

})

// 초기화
document.getElementById("resetBtn").addEventListener('click', () => {
    window.location.href = "http://localhost/admin/order";
});


// 일괄수정
const changeStateAllBtn = document.getElementById('changeStateAllBtn');
changeStateAllBtn.addEventListener('click', () => {
    
    const checkedNos = document.querySelectorAll('[id="checkedSelect"]:checked~input');
    const selectState = document.querySelector('[id="orderStateC"]').value;

    if(checkedNos.length != 0 && selectState !='0'){
        const data = [];
        for(let checkedNo of checkedNos){
            data.push({
                "orderState" : selectState,
                "orderNo" : checkedNo.value
            });
        }
        changeOrderState(data)
    }
});

// 개별수정
document.getElementById('modalChangeBtn').addEventListener('click', () => {
    const modalOrderNo = document.getElementById('modalOrderNo').value;
    const modalOrderStateC = document.querySelector('[id="modalOrderStateC"]').value;
    if(modalOrderStateC !='0'){
        const data = [];
        data.push({
            "orderState" : modalOrderStateC,
            "orderNo" : modalOrderNo
        });
        changeOrderState(data)
    }
});

// 주문상태 변경 처리
function changeOrderState(data){
    fetch("/admin/order/state", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(result =>{
        if(result > 0){
            alert("주문처리상태 수정 성공")
        }else{
            alert("실패...")
        }
        window.location.href = "order"
    })
    .catch(err => {
        console.log(err)
    });
}

// 검색데이터 유지

if(dataMap.findState != null) document.querySelector('[name="findState"]').value = dataMap.findState;
if(dataMap.findKeyword != null) document.querySelector('[name="findKeyword"]').value = dataMap.findKeyword;
if(dataMap.findStartDate != null) document.querySelector('[name="findStartDate"]').value = dataMap.findStartDate;
if(dataMap.findEndDate != null) document.querySelector('[name="findEndDate"]').value = dataMap.findEndDate;

const sellStateCheckeds = document.querySelectorAll('[id="sellStateChecked"]>input');

if(dataMap.sellState != null){
    for(let ss of dataMap.sellState){
        for(let sellStateChecked of sellStateCheckeds){
            if(sellStateChecked.value == ss){
                sellStateChecked.checked = true;
            }
        }
    }
}

const payStateCheckeds = document.querySelectorAll('[id="payStateChecked"]>input');

if(dataMap.payState != null){
    for(let ss of dataMap.payState){
        for(let payStateChecked of payStateCheckeds){
            if(payStateChecked.value == ss){
                payStateChecked.checked = true;
            }
        }
    }
}

/* 페이지네이션 주소세팅 */
const paginationUrls = document.querySelectorAll('[class="pagination"] a');

paginationUrls.forEach( e => {
    if(e.getAttribute("href") != null){
        let purl = e.getAttribute("href");
        e.href = purl + "&" + new URLSearchParams(dataMap).toString();
    }
});