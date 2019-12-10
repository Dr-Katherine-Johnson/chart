import React from 'react';
const puppeteer = require('puppeteer');
const url = 'http://localhost:4444';

const setup = async () => {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
}

setup();

describe('App', () => {
  it('Should do app things', async () => {
    await page.goto(url);
  });

  afterAll(() => {
    browser.close();
  })
});