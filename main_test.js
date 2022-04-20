// Scenario: Scenario_1 (executor: ramping-vus)
//* Below, I only make comments in Vietnamese because I want to be fast, 
//* but in the actual project I will make comments in English

import { sleep } from 'k6'


import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


import { scenarioRunParallel } from "./src/scenario_run_parallel.js";
import { scenarioRunTurn } from "./src/scenario_run_turn.js";
import { myOptions } from "./my_options.js";
import { scenaruioTestYoutube } from './src/scenario_test_youtube.js';

export let options = myOptions;

// const { spawn } = require("child_process");
// const { createWriteStream } = require("fs");
// const { K6Parser } = require("k6-to-junit");

// const parser = new K6Parser();
// const test = spawn("k6", ["run", "test.js"]);

// parser.pipeFrom(test.stdout).then(() => {
//   const writer = createWriteStream("junit.xml");
//   parser.toXml(writer);
//   writer.once("finished", () => {
//     process.exit(parser.allPassed() ? 0 : 99);
//   });
// });




export function funcScenarioRunParallel() {
    scenarioRunParallel()
    sleep(2);
};

// export function funcScenarioRunTurn() {
//     scenarioRunTurn()
//     sleep(2);
// };

export function funcScenarioTestYoutube() {
    scenaruioTestYoutube()
    sleep(2);
}

// export function handleSummary(data) {
//     return {
//         "result.html": htmlReport(data),  //xuất kết quả ra HTML
//         // stdout: textSummary(data, { indent: " ", enableColors: true }), //mở dòng này nếu bạn muốn xuất ra console
//     };
// }