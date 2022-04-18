import http from 'k6/http';
import { check,group } from 'k6';
import { Trend } from 'k6/metrics';

let myCustomTrend = new Trend('sending_time');

export function scenarioRunParallel() {
    const req1 = {
        method: 'GET',
        url: 'https://httpbin.test.k6.io/get',
    };
    const req2 = {
        method: 'GET',
        url: 'https://test.k6.io',
    };
    const req3 = {
        method: 'POST',
        url: 'https://httpbin.test.k6.io/post',
        body: {
            hello: 'world!',
        },
        params: {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
    };
    group('Scenario run in parallel', function () {
        const responses = http.batch([req1, req2, req3]);
        // console.log("*** Responses 2 is: ", JSON.stringify(responses[2],null, 4))
        myCustomTrend.add(responses[1].timings.sending)
        check(responses[2], {
            'Request time is less than 275ms': (r) => r.timings.duration < 275,
        });
        check(responses[0], {
            'is status code 200': (r) => r.status === 200,
            'Connect time is less than 100ms': (r) => r.timings.connecting < 100,
        });
    });

}
