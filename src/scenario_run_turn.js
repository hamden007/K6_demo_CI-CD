import { check, group, sleep } from "k6";
import http from "k6/http";

export function scenarioRunTurn() {
    let response

    const vars = {}
    group('Get method HTTP', function () {
        let resHome = http.get('https://test.k6.io/')
        sleep(2)
        let resContact = http.get('https://test.k6.io/contacts.php')
        sleep(2.8)
        check(resHome, {
            'Time waiting to Homepage less than 250ms': (r) => r.timings.waiting < 250
        });
        check(resContact, {
            'Time waiting to Contact page less than 300ms': (r) => r.timings.waiting < 300,
            'Time spent handshaking TLS session with host more than 2.5ms': (r) => r.timings.tls_handshaking > 2.5
        });
    })

    group('Back to https://test.k6.io/ add headers', function () {
        response = http.get('https://test.k6.io/', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })
        sleep(3)
    })

    group('Get method - https://test.k6.io/my_messages.php', function () {
        response = http.get('https://test.k6.io/my_messages.php')
        sleep(2.3)
    })

    group('Post method - https://httpbin.test.k6.io/post', function () {
        const url = 'https://httpbin.test.k6.io/post';
        let data = { name: 'Bert' };
        let res = http.post(url, JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
          });
        check(res, {
            'is status code 200': (r) => r.status === 200,
            'Time sending less than 200ms': (r) => r.timings.sending < 200,
        });
    })
}