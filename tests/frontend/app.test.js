const React = require('react');
const _ = require('lodash');
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
        // console.log(`path.attributes['d']: `, path.attributes['d']);
        // console.log(`console.dir(path.attributes['d']): `, console.dir(path.attributes['d']));
        // console.log(`path.getAttributeNS(null, 'd'): `, path.getAttributeNS(null, 'd'));
        // console.log(`typeof path.attributes['d'].value: `, typeof path.attributes['d'].value);

        let str;
        // str = path.attributes['d'].value.split(' ').length;
        // str = path.attributes['d'].value.split(' ');

        str = JSON.parse(JSON.stringify(path.attributes['d'].value));
        console.log('str: ', str);
        // str = _.cloneDeep(path.attributes['d']);
        return Promise.resolve(str);
        // return str;
      });



      // console.log('path.attributes: ', path.attributes);
      // console.log('d: ', d);
      // await page.click('.chart-1D');
      await page.waitFor(2000);
      console.log('d: ', d);
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