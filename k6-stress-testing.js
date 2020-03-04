import http from 'k6/http';
import { sleep, check } from 'k6';

// we can test in terms of rps by limiting how many requests each VU is able to make per second
let desiredRPS = 840; //total rps for the test
let RPSperVU = 47 // max requests exec by one VU per second
// we do a unit conversion to get VUs required
// desired RPS
// ---------- => VU = desiredRPs/RPSperVU
// RSP/VU
let VUsRequired = Math.round(desiredRPS/RPSperVU);
// the idea would be less than 50


export const options = {
  vus: VUsRequired,
  duration: '30s',
};

// is there a way to generate a random ticker to ask from the database?
const ticker = 'ABCDE';

export default function() {
  let iterationStart = new Date().getTime();
  for (let i of Array(RPSperVU).keys()) {
    const res = http.get(`http://localhost:4444/current-price/${ticker}`);
    let iterationDuration = (new Date().getTime() - iterationStart)/1000;
    // since requests are every second we can check if the virtual user needs
    // to sleep between executions
    let sleepTime = 1 - iterationDuration;
    if (sleepTime > 0) {
      sleep(sleepTime);
    }
    const checkRes = check(res, {
      "status is 200": (r) => r.status === 200
    });
  }
}
