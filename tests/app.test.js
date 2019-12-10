const React = require('react');
// const { shallow } = require('enzyme');
const puppeteer = require('puppeteer');
const url = 'http://localhost:4444';
let page;

describe('App', () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
  });

  describe('updateTimeFrame()', () => {
    it('Should correctly update the number of data points in the <svg> path based on which timeframe is selected', async () => {
      await page.goto(url);
      let d = await page.$eval('path', (path) => {
        console.log(`path.attributes['d'].value: `, path.attributes['d'].value);
        const str = path.attributes['d'].value;
        return str;
      });

      // console.log('path.attributes: ', path.attributes);
      // console.log('d: ', d);
      // await page.click('.chart-1D');
      await page.waitFor(2000);
      console.log('d: ', d); // TODO: why is this showing undefined??
      console.log('undefined: ', undefined);
      console.log('null: ', null);
      // await expect(d.value.split(' ')).toHaveLength(16);

      // Datapoints in the svg for each timeframe
      // 1D >>> 16
      // 1W >>> 72
      // 1M >>> 282
      // 3M >>> 842
      // 1Y >>> 3362
    });
  });

  afterAll(() => {
    browser.close();
  });
});