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
// todayOrderCur();
// 새로고침시
document.getElementById('reflesh').addEventListener('click', () => {
    todayOrderCur();
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

            // 첫 번째 td 요소 생성
            const td1 = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            td1.appendChild(checkbox);
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
            image.src = i.orderProduct.product.thumbnailPath
            ;
            imageDiv.appendChild(image);
            td3.appendChild(imageDiv);
            tr.appendChild(td3);

            // 네 번째 td 요소 생성
            const td4 = document.createElement('td');
            const descP1 = document.createElement('p');
            descP1.textContent = i.orderProduct.product.productName;
            td4.appendChild(descP1);
            const descP2 = document.createElement('p');
            descP2.textContent ='[옵션 : '+ i.orderProduct.option.color + ']';
            td4.appendChild(descP2);
            tr.appendChild(td4);

            // 다섯 번째 td 요소 생성
            const td5 = document.createElement('td');
            td5.textContent = i.orderProduct.count;
            tr.appendChild(td5);

            // 여섯 번째 td 요소 생성
            const td6 = document.createElement('td');
            td6.textContent = i.order.orderPayment.toLocaleString();
            tr.appendChild(td6);

            // 일곱 번째 td 요소 생성
            const td7 = document.createElement('td');
            td7.textContent = '상품준비중';
            tr.appendChild(td7);

            // 생성된 tr 요소를 원하는 위치에 추가
            const table = document.querySelector('.recent-order-table'); 
            table.appendChild(tr);

        }
    })
    .catch(err => {
        console.log(err)
    });
}

todayOrderList()
