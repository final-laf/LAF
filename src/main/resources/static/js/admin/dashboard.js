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
const categoryData = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
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

const categoryChart = document.getElementById('categoryChart');
new Chart(categoryChart, categoryChartConfig);

/* 회원 수 추이 */
const memberData = {
  labels: [
    'January',
    'February',
    'March',
    'April'
  ],
  datasets: [{
    type: 'line',
    label: '신규 가입자',
    data: [10, 20, 30, 40],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)'
  }, {
    type: 'line',
    label: '장기 미접속자(1년)',
    data: [50, 40, 10, 50],
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

const memberChart = document.getElementById('memberChart');
new Chart(memberChart, memberChartConfig);