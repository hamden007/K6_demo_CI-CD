## Run the test.

Default run and output HTML file.

```bash
k6 run main_test.js
```

Note: If you want to output the results to the console you can delete the comment
```javascript
stdout: textSummary(data, { indent: " ", enableColors: true }),
```

## Run and out to cloud.

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
k6 run --out cloud main_test.js
```

Because I don't have a license for the cloud, I can only run on the cloud as trial account with limitation of 50 VUs.


## Run and out debug.

```bash
k6 run --http-debug main_test.js
```




