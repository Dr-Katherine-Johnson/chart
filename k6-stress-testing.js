import http from 'k6/http';
import { sleep, check } from 'k6';

// we can test in terms of rps by limiting how many requests each VU is able to make per second
let desiredRPS = 3000; //total rps for the test
let RPSperVU = 180; // max requests exec by one VU per second
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
// we want to test against the last 10% of the tickers
const max = 1350000 - 1;
const last10percent = Math.floor(max * .1);

export default function() {
  let iterationStart = new Date().getTime();
  const ticker = Math.floor(Math.random()*last10percent);
  for (let i of Array(RPSperVU).keys()) {
    const url = `http://localhost:4444/price/${ticker}`;
    // get route
    // const res = http.get(url);
    // post route
    // some fake price update
    const payload = JSON.stringify({
      dateTime: new Date(),
      open: Math.random()*1000,
      high: Math.random()*1000,
      low: Math.random()*1000,
      close: Math.random()*1000,
      volume: Math.round(Math.random() * 1000000),
    });
    const params = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const res = http.post(url, payload, params);
    let iterationDuration = (new Date().getTime() - iterationStart)/1000;
    // since requests are every second we can check if the virtual user needs
    // to sleep between executions
    let sleepTime = 1 - iterationDuration;
    if (sleepTime > 0) {
      sleep(sleepTime);
    }
    const checkRes = check(res, {
      // for get route
      // "status is 200": (r) => r.status === 200
      // for post route
      "status is 201": (r) => r.status === 201
    });
  }
}
