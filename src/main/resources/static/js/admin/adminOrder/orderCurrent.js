// 오늘 주문 현황
function todayOrderCur(){
    fetch("/admin/order/cur", {
        method: "POST"
    })
    .then(resp => resp.json())
    .then(todayOrderState =>{
        for(let i of todayOrderState){
            let num = i.os.charCodeAt(0) - 65;
            document.getElementById('orderState').children[num].innerText = i.count + '개';
        }
    })
    .catch(err => {
        console.log(err)
    });
}
// 페이지 로드시
todayOrderCur();
// 새로고침시
document.getElementById('refresh').addEventListener('click', () => {
    todayOrderCur();
});


/* 주문 상세 모달 */
const orderModal = document.getElementById("orderModalOverlay")

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

// 오늘 주문 목록
function todayOrderList(){
    fetch("/admin/order/list", {
        method: "POST"
    })
    .then(resp => resp.json())
    .then(orderMaps =>{
        for(let i of orderMaps){
            // tr 요소 생성
            const tr = document.createElement('tr');
            tr.classList.add('order-modal-row');
            tr.addEventListener('click', () => {
                
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
                const arr = i.order.orderRecvAdd.split("^^^");
                document.getElementById('modalAdd').innerText = arr[1] + arr[2]
                document.getElementById('modalAddNo').innerText = arr[0]

                if(i.order.orderRecvRequire != null){
                    document.getElementById('modalOrderRecvRequire').innerText = i.order.orderRecvRequire
                }

            }); 

            // 첫 번째 td 요소 생성
            const td1 = document.createElement('td');
            td1.addEventListener('click', e => {
                e.stopPropagation();
            })
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute("id",'checked')
            td1.appendChild(checkbox);
            const orderNo = document.createElement('input');
            orderNo.type = 'hidden';
            orderNo.setAttribute("value",i.order.orderNo)
            td1.appendChild(orderNo);
            tr.appendChild(td1);

            // 두 번째 td 요소 생성
            const td2 = document.createElement('td');
            const dateP = document.createElement('p');
            dateP.textContent = i.order.orderDate.substring(0,10);
            td2.appendChild(dateP);
            const codeP = document.createElement('p');
            codeP.textContent = '[' + i.order.orderUno + ']';
            td2.appendChild(codeP);
            tr.appendChild(td2);

            // 세 번째 td 요소 생성
            const td3 = document.createElement('td');
            const imageDiv = document.createElement('div');
            const image = document.createElement('img');
            image.src = i.odpList[0].product.thumbnailPath;
            imageDiv.appendChild(image);
            td3.appendChild(imageDiv);
            tr.appendChild(td3);

            // 네 번째 td 요소 생성
            const td4 = document.createElement('td');
            const descP1 = document.createElement('p');
            descP1.textContent = i.odpList[0].product.productName;
            td4.appendChild(descP1);
            const descP2 = document.createElement('p');
            descP2.textContent ='[옵션 : '+ i.odpList[0].option.color + ']';
            td4.appendChild(descP2);
            tr.appendChild(td4);

            // 다섯 번째 td 요소 생성
            const td5 = document.createElement('td');
            let sumCount = 0;
            for(let j of i.odpList){
                sumCount += j.count;
            }
            td5.textContent = sumCount;
            tr.appendChild(td5);

            // 여섯 번째 td 요소 생성
            const td6 = document.createElement('td');
            td6.textContent = i.order.orderPayment.toLocaleString();
            tr.appendChild(td6);

            // 일곱 번째 td 요소 생성
            const td7 = document.createElement('td');
            td7.textContent = orderState(i.order.orderState);
            tr.appendChild(td7);

            // 생성된 tr 요소를 원하는 위치에 추가
            const table = document.querySelector('.recent-order-table>tbody'); 
            table.append(tr);
        }
    })
    .catch(err => {
        console.log(err)
    });
}
todayOrderList()

document.getElementById('bTreflesh').addEventListener('click', () => {
    const table = document.querySelector('.recent-order-table');
    table.innerHTML = table.rows[0].outerHTML;
    todayOrderList();
})


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

// 일괄수정
const changeStateAllBtn = document.getElementById('changeStateAllBtn');
changeStateAllBtn.addEventListener('click', () => {
    const checkedNos = document.querySelectorAll('input[type=checkbox]:checked~input');
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
    console.log(data)
    console.log( JSON.stringify(data) )
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
        window.location.href = "cur"
    })
    .catch(err => {
        console.log(err)
    });
}