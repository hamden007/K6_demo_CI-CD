import { check, group } from 'k6';
//import { TimeElement } from 'k6/html';
import http from 'k6/http';
import { Trend } from 'k6/metrics';

let myCustomTrend = new Trend('duration_time');

export function scenaruioTestYoutube() {
    group('Youtube with 50000 access', function() {
        const url = 'https://www.youtube.com/';
        let res = http.get(url);
        myCustomTrend.add(res.timings.duration)
            check(res, {
                'Time waiting less than 150ms': (r) => r.timings.waiting < 850,
                'Connection status successful':(r) => r.status_text === "200 OK"
            });
    });
}
