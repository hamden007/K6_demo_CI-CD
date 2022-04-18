export const myOptions = {
  ext: {
    loadimpact: {
      projectID: 3579220,
      name: "My Project Demo",
    },
  },
  thresholds: {
    'http_req_duration{test_type:testYoutube}': [ // nó đang dựa vào tags để gắn vào
    {	
      threshold: 'p(90)<280', // 90% yêu cầu được phản hồi dưới 280ms	
      abortOnFail: false, //có hủy bỏ thử nghiệm hay không
      delayAbortEval: '10s', //đặt thời gian để trì hoãn đánh giá ngưỡng để có thể thực thi các công việc khác
    },
    {
      threshold: 'p(95)<285', // 95% yêu cầu được phản hồi dưới 285ms	
      abortOnFail: false, //có hủy bỏ thử nghiệm hay không
      delayAbortEval: '10s', //đặt thời gian để trì hoãn đánh giá ngưỡng để có thể thực thi các công việc khác
    }],
    checks: ['rate>0.8'], // tất cả các check phải thành công hơn 80%
    'http_req_duration{scenario:scenario_run_parallel}': ['p(95)<300'],
    'http_req_duration{scenario:my_api_test_2}': ['p(95)<280'],
    'http_req_sending': ['avg < 0.4'],  // cái này là cho cả 3 kịch bản luôn
  },
  scenarios: {
  scenario_run_parallel  : {
      executor: 'ramping-vus',
      gracefulStop: '10s',
      stages: [
        // { target: 100, duration: '3m' },
        // { target: 200, duration: '5m30s' },
        // { target: 0, duration: '1m' },
        { target: 5, duration: '30s' },
        { target: 10, duration: '1m' },
        { target: 0, duration: '10s' },
      ],
      gracefulRampDown: '10s',
      exec: 'funcScenarioRunParallel',
    },
    // scenario_run_turn: {
    //   executor: 'ramping-vus',
    //   gracefulStop: '30s',
    //   startVUs: 30,    //số lượng người lúc ảo lúc bắt đầu 
    //   stages: [
    //     { target: 100, duration: '2m' },
    //     { target: 500, duration: '5m' },
    //     { target: 500, duration: '7m' },
    //     { target: 300, duration: '3m' },
    //     { target: 300, duration: '5m' },
    //     { target: 0, duration: '1m' },
    //   ],
    //   gracefulRampDown: '30s', //Thời gian chờ một lần lặp đã bắt đầu kết thúc trước khi dừng nó trong khi xuống dốc.
    //   exec: 'funcScenarioRunTurn',
    // },
    scenario_test_youtube:{
      executor: 'shared-iterations',
      exec: 'funcScenarioTestYoutube', // func mà kịch bản này sẽ chạy
      gracefulStop: '0s', // không đợi các lần lặp lại kết thúc
      vus: 100,
      iterations: 100,  // số lần lặp lại
      tags: { test_type: 'testYoutube' },
    }
  },
};