// 오늘 주문 현황
function todayOrderCur(){
  fetch("/admin/today")
  .then(resp => resp.json())
  .then(todayOrderState =>{
    let todayOrderCount = 0;

    for(let i of todayOrderState) {
      if(i.todayRevenue == undefined && i.todayPayment == undefined) {
        let num = i.os.charCodeAt(0) - 65;
        document.getElementById('orderState').children[num].innerText = i.count + '건';
        if(num <= 5) todayOrderCount += Number(i.count);
      } else {
        document.getElementsByClassName('today-count')[1].innerText = numberWithCommas(i.todayPayment) + ' KRW';
        document.getElementsByClassName('today-count')[2].innerText = numberWithCommas(i.todayRevenue) + ' KRW';
      }
    }
    document.getElementsByClassName('today-count')[0].innerText = todayOrderCount + ' 건';
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
          label: '총 매출',
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

/* 카테고리별 판매량 */
(() => {
  fetch('/admin/statistics/category')
  .then(resp => resp.json())
  .then(data => {
    
    const categoryChart = document.getElementById('categoryChart');
    const categoryData = {
      labels: data.map(row => row.category),
      datasets: [{
        data: data.map(row => row.count),
        backgroundColor: [
          '#7F769880',
          '#9bc6d3',
          '#a6d6c3',
          '#cbddc3',
          '#e8e3cc',
          '#eae8df',
          '#f5d3d6',
        ],
        hoverOffset: 4
      }]
    };
    
    const categoryChartConfig = {
      type: 'doughnut',
      data: categoryData,
      options: {
        responsive: false,
      },
    };

    new Chart(categoryChart, categoryChartConfig);
  })
  .catch(e => console.log(e));
})();


/* 회원 수 추이 */
(() => {
  fetch('/admin/statistics/member')
  .then(resp => resp.json())
  .then(data => {
    
    const memberChart = document.getElementById('memberChart');
    const memberData = {
      labels: data.map(row => row.date),
      datasets: [{
        type: 'line',
        label: '신규 가입자',
        data: data.map(row => row.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      }, {
        type: 'line',
        label: '장기 미구매자(1개월)',
        data: data.map(row => row.count2),
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      }]
    };
    
    const memberChartConfig = {
      type: 'scatter',
      data: memberData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    };

    new Chart(memberChart, memberChartConfig);
  })
  .catch(e => console.log(e));
})();