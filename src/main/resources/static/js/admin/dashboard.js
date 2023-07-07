// 오늘 주문 현황
function todayOrderCur(){
  fetch("/admin/order/cur", {
      method: "POST"
  })
  .then(resp => resp.json())
  .then(todayOrderState =>{
      for(let i of todayOrderState){
          let num = i.os.charCodeAt(0) - 65;
          document.getElementById('orderState').children[num].innerText = i.count + '건';
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


/* 매출 추이 */
const ctx = document.getElementById('revenueChart');
let revenueChart = null;
function renewChart(append) {

  fetch('/admin/revenue' + append)
  .then(resp => resp.json())
  .then(data => {

    if(revenueChart != null)
      revenueChart.destroy();

    revenueChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(row => row.date),
        datasets: [{
          data: data.map(row => row.revenue),
          borderWidth: 2,
          borderColor: '#7f7698',
          backgroundColor: '#7F769880',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

  })
  .catch(e => console.log(e));
};
renewChart(''); // 초기값


// 일별 차트 출력
document.getElementById('day').addEventListener('click', e => {
  renewChart('');
  document.querySelector('button.cur').classList.remove('cur');
  e.target.classList.add('cur');
});

// 월별 차트 출력
document.getElementById('month').addEventListener('click', e => {
  renewChart('/month');
  document.querySelector('button.cur').classList.remove('cur');
  e.target.classList.add('cur');
});

// 연도별 차트 출력
document.getElementById('year').addEventListener('click', e => {
  renewChart('/year');
  document.querySelector('button.cur').classList.remove('cur');
  e.target.classList.add('cur');
});